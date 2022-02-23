//mui material
import { Grid, MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";

const AddFriend = (props) => {
  const { close, getFilteredArray, friends, addUserToRoom, room } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/rooms/members/${room.id}`).then((res) => {
      setData(res.data);
    });
  }, [open]);

  const options = getFilteredArray(friends, data);

  const openDialog = () => {
    setInputValue("");
    setValue(null);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    close();
  };

  const handleSubmit = () => {
    addUserToRoom(value, room.id);
    closeDialog();
  };

  return (
    <>
      <MenuItem onClick={openDialog}>Add Friend</MenuItem>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Add Friend</DialogTitle>
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
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label="Friends" variant="standard" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justifyContent="space-around">
            <Grid item>
              <Button variant="contained" color="error" onClick={closeDialog}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFriend;
