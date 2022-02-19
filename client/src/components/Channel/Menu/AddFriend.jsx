//mui material
import { MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const AddFriend = (props) => {
  const { close, friends, addUserToRoom, room } = props;

  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    close();
  };

  const handleChange = (event, value) => setSelectedOptions(value);

  const handleSubmit = () => {
    addUserToRoom(selectedOptions.id, room);
    closeDialog();
  };

  const newFriends = friends.map((friend) => {
    const newObj = {};
    newObj["label"] = friend.username;
    newObj["id"] = friend.id;
    return newObj;
  });

  return (
    <>
      <MenuItem onClick={openDialog}>Add Friend</MenuItem>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="combo-box-demo"
            options={newFriends}
            onChange={handleChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Friends" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFriend;
