//mui material
import { Input, MenuItem, Stack, Switch, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

const EditRoom = (props) => {
  const { room, editRoom } = props;

  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState(room.name);
  const [description, setDescription] = useState(room.description);
  const [checked, setChecked] = useState(room.is_public);

  const toggleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  function edit() {
    const roomData = {
      name: newRoomName,
      description: description,
      is_public: checked,
    };

    editRoom(roomData, room.id);
    toggleOpen();
  }

  return (
    <>
      <MenuItem onClick={toggleOpen}>Edit</MenuItem>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Edit Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="Name"
            fullWidth
            variant="standard"
            value={newRoomName}
            onChange={(event) => setNewRoomName(event.target.value)}
          />
          <TextField
            margin="dense"
            type="text"
            label="Description"
            fullWidth
            variant="standard"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            Private
            <Switch
              checked={checked}
              onChange={toggleSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
            Public
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button onClick={edit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditRoom;
