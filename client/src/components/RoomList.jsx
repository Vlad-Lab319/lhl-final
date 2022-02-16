import { useState } from "react";
import "../styles/RoomList.scss";
import RoomListItem from "./RoomListItem";
import AddCircleIcon from '@mui/icons-material/AddCircle';

//mui material 
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const RoomList = (props) => {
  const { roomList, setRoom, value } = props;

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

  function createRoom() {
    console.log(`Create room ${newRoomName}`);
    handleClose();
  }

  return (
    <>
      <div className="sidebar sidebar--rooms">
        {rooms}
        <div className="room-container">
          <AddCircleIcon onClick={handleClickOpen} />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create new room</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Create your amazing new room!
              </DialogContentText>
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
              <Button onClick={createRoom}>Create</Button>
            </DialogActions>
          </Dialog>

        </div>
      </div>
    </>
  );
};

export default RoomList;