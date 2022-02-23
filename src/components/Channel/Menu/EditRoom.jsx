//mui material
import { Grid, MenuItem, Stack, Switch, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

const EditRoom = (props) => {
  const { room, editRoom, openEdit, toggleOpenEdit } = props;

  const [newRoomName, setNewRoomName] = useState(room.name);
  const [description, setDescription] = useState(room.description);
  const [checked, setChecked] = useState(room.is_public);

  const toggleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  function edit() {
    const roomData = {
      name: newRoomName,
      description: description,
      is_public: checked,
    };

    editRoom(roomData, room.id);
    toggleOpenEdit();
  }

  return (
    <Dialog open={openEdit} onClose={toggleOpenEdit}>
      <DialogTitle>Edit Room</DialogTitle>
      <DialogContent>
        <TextField
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
        <Grid container direction="row" justifyContent="space-around">
          <Grid item>
            <Button variant="contained" color="error" onClick={toggleOpenEdit}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={edit}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoom;
