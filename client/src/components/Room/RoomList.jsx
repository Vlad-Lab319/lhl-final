// MUI
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
// React
import { useState } from "react";
// Styles
import "./RoomList.scss";
// Components
import RoomListItem from "./RoomListItem";

const RoomList = (props) => {
  const {
    user,
    roomList,
    setRoom,
    value,
    createRoom,
    channel,
    directMessage,
    toggleDirectMessage,
  } = props;
  const userID = user.id;

  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  const toggleNewRoom = () => {
    setNewRoomName("");
    setOpen(!open);
  };

  const rooms = roomList.map((room) => {
    return (
      <RoomListItem
        key={room.id}
        id={room.id}
        name={room.name}
        icon={room.icon_url}
        setRoom={() => setRoom(channel, room, user)}
        selected={room.id === value.id}
      />
    );
  });

  function create() {
    const roomData = {
      userID,
      newRoomName,
      icon: "https://i.pinimg.com/736x/f5/23/3a/f5233afc4af9c7be02cc1c673c7c93e9.jpg",
    };
    createRoom(roomData);
    toggleNewRoom();
  }

  const addButton = (
    <div className="room-container">
      <IconButton color="inherit">
        <AddCircleIcon onClick={toggleNewRoom} />
      </IconButton>
      <Dialog open={open} onClose={toggleNewRoom}>
        <DialogTitle>Create new room</DialogTitle>
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
          <Button onClick={toggleNewRoom}>Cancel</Button>
          <Button onClick={create}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const friendButton = (
    <div className="room-container">
      <IconButton
        color="inherit"
        onClick={toggleDirectMessage}
        // className="room-icon"
      >
        {directMessage ? (
          <PersonIcon className="room-icon" />
        ) : (
          <GroupIcon className="room-icon" />
        )}
      </IconButton>
    </div>
  );

  return (
    <div className="sidebar sidebar--rooms">
      {friendButton}
      {rooms.length && <div className="room-separator"></div>}
      {rooms}
      {rooms.length && <div className="room-separator"></div>}
      {addButton}
      {/* <ArrowDropDownOutlinedIcon /> */}
    </div>
  );
};

export default RoomList;
