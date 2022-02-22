// MUI
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Grid, IconButton, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Switch from "@mui/material/Switch";
// React
import { useState } from "react";
// Styles
import "./RoomList.scss";
// Components
import RoomListItem from "./RoomListItem";
import SearchRoom from "./SearchRoom";

const RoomList = (props) => {
  const {
    user,
    roomList,
    setRoom,
    value,
    createRoom,
    directMessage,
    toggleDirectMessage,
    setSeenMessages,
    addUserToRoom,
    getFilteredArray,
  } = props;
  const userID = user.id;

  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(true);

  const toggleNewRoom = () => {
    setNewRoomName("");
    setDescription("");
    setChecked(true);
    setOpen(!open);
  };

  const toggleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const rooms = roomList.map((room) => {
    return (
      <RoomListItem
        key={room.id}
        id={room.id}
        name={room.name}
        room={room}
        user={user}
        icon={room.icon_url}
        setRoom={() => {
          setRoom(room, user, directMessage);
        }}
        selected={room.id === value.id}
        messageCount={room.messageCount}
        messagesSeen={room.messagesSeen}
        setSeenMessages={setSeenMessages}
      />
    );
  });

  function create() {
    const roomData = {
      userID,
      newRoomName,
      description,
      checked,
      icon: null,
    };
    createRoom(roomData);
    toggleNewRoom();
  }

  const addButton = (
    <div className="list-item">
      <IconButton color="inherit" onClick={toggleNewRoom}>
        <AddCircleIcon className="list-icon" />
      </IconButton>
      <Dialog open={open} onClose={toggleNewRoom}>
        <DialogTitle>Create new room</DialogTitle>
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
          <Grid container direction="row" justifyContent="space-around">
            <Grid item>
              <Button variant="contained" color="error" onClick={toggleNewRoom}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success" onClick={create}>
                Create
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );

  const friendButton = (
    <div
      className="list-item"
      onClick={() => toggleDirectMessage(directMessage)}
    >
      <IconButton color="inherit">
        {directMessage ? (
          <PersonIcon className="list-icon-options" />
        ) : (
          <GroupIcon className="list-icon-options" />
        )}
      </IconButton>
    </div>
  );

  return (
    <div className="sidebar sidebar--rooms">
      <div className="room-list">
        {friendButton}
        <SearchRoom
          getFilteredArray={getFilteredArray}
          roomList={roomList}
          user={user}
          addUserToRoom={addUserToRoom}
        />
        <div className="separator" />
        {rooms}
        {rooms.length > 0 && <div className="separator" />}
        {addButton}
      </div>
    </div>
  );
};

export default RoomList;
