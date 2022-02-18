//mui material
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRoomName("");
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
    handleClose();
  }

  const addButton = (
    <div className="room-container">
      <IconButton color="inherit">
        <AddCircleIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new room</DialogTitle>
        <DialogContent>
          <DialogContentText>Create your amazing new room!</DialogContentText>
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
          <Button onClick={handleClose}>Cancel</Button>
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
      <ArrowDropDownOutlinedIcon />
    </div>
  );
};

export default RoomList;
