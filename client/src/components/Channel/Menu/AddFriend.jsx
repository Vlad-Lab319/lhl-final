//mui material
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

const AddFriend = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    props.close();
  };

  const handleChange = (event, value) => setSelectedOptions(value);

  const handleSubmit = () => console.log(selectedOptions);

  const friends = props.friends.map((friend) => {
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
            options={friends}
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
