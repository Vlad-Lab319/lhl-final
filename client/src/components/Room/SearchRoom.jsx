//mui material
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchRoom = (props) => {
  const { user, addUserToRoom, getFilteredArray, roomList } = props;

  const userID = user.id;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/rooms/public`).then((res) => {
      setData(res.data);
    });
  }, [open]);

  const options = getFilteredArray(data, roomList);

  const openDialog = () => {
    setInputValue("");
    setValue(null);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    addUserToRoom(userID, value.id);
    closeDialog();
  };

  return (
    <>
      <div className="list-item" onClick={openDialog}>
        <IconButton color="inherit">
          <SearchIcon className="list-icon-options" />
        </IconButton>
      </div>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Public Rooms</DialogTitle>
        <DialogContent>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={options}
            getOptionLabel={(option) => `${option.name}`}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Card sx={{ width: 300, backgroundColor: "#262626" }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {option.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            )}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Rooms" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Join</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchRoom;
