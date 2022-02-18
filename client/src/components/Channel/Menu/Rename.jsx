//mui material
import { Input, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

const AddFriend = (props) => {
  const { room, editRoom } = props;

  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState(room.name);

  const toggleOpen = () => {
    setOpen(!open);
  };

  function edit() {
    editRoom(newRoomName, room.id);
    toggleOpen();
  }

  return (
    <>
      <MenuItem onClick={toggleOpen}>Rename</MenuItem>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Rename Room</DialogTitle>
        <DialogContent>
          <Input
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            id="room_id"
            value={newRoomName}
            onChange={(event) => setNewRoomName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button onClick={edit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFriend;
