//mui material
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useState } from "react";
import "./RoomList.scss";
import RoomListItem from "./RoomListItem";
const RoomList = (props) => {
  const { userID, roomList, setRoom, value, createRoom } = props;

  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  const toggleOpen = () => {
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
        setRoom={() => setRoom(room)}
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
    toggleOpen();
  }

  const addButton = (
    <div className="room-container">
      <IconButton color="inherit">
        <AddCircleIcon onClick={toggleOpen} />
      </IconButton>
      <Dialog open={open} onClose={toggleOpen}>
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
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button onClick={create}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const friendButton = (
    <div className="room-container">
      <IconButton color="inherit">
        <GroupIcon />
      </IconButton>
    </div>
  );

  return (
    <div className="sidebar sidebar--rooms">
      {friendButton}
      {rooms}
      {addButton}
      {/* <ArrowDropDownOutlinedIcon /> */}
    </div>
  );
};

export default RoomList;
