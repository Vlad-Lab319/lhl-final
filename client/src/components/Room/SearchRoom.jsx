//mui material
import { IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SearchRoom = (props) => {
  const { publicRooms, user, addUserToRoom } = props;

  const userID = user.id;

  const options = publicRooms.map((room) => {
    const newObj = {};
    newObj["label"] = room.name;
    newObj["id"] = room.id;
    return newObj;
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const openDialog = () => {
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
