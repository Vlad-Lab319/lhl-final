//mui material
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const AddFriend = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Add Friend</MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFriend;
