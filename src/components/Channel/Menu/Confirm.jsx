//mui material
import { Input, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

const Confirm = (props) => {
  const { room, deleteRoom } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  function confirm() {
    deleteRoom(room.id);
    toggleOpen();
  }

  return (
    <>
      <MenuItem onClick={toggleOpen}>Delete Room</MenuItem>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Are you sure you want to delete the room?</DialogTitle>
        <DialogActions>
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button onClick={confirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Confirm;
