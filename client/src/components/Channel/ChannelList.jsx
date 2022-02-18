//mui material
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useState } from "react";
import "./ChannelList.scss";
import ChannelListItem from "./ChannelListItem";
import "./ChannelListItem.scss";
import MenuList from "./Menu/MenuList";

const ChannelList = (props) => {
  const {
    channelList,
    setChannel,
    value,
    room,
    createChannel,
    friends,
    addUserToRoom,
  } = props;

  const [open, setOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewChannelName("");
  };

  const channels = channelList.map((channel) => {
    return (
      <ChannelListItem
        key={channel.id}
        name={channel.name}
        setChannel={() => setChannel(channel)}
        selected={channel.id === value.id}
        type={channel.type}
      />
    );
  });

  function create() {
    const roomID = room.id;
    const channelData = {
      roomID,
      newChannelName,
    };
    createChannel(channelData);
    handleClose();
  }

  const addButton = (
    <>
      <div className="channel-item" onClick={handleClickOpen}>
        <div className="channel-icon">
          <AddBoxIcon />
        </div>
        <span>Create a channel</span>
      </div>
      <Dialog open={open} onClose={handleClose} className="add-channel-box">
        <DialogTitle className="add-channel-title">{room.name}</DialogTitle>
        <DialogContent className="add-channel-content">
          <DialogContentText className="add-channel-text">
            Create new channel
          </DialogContentText>
          <Input
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            id="room_id"
            value={newChannelName}
            onChange={(event) => setNewChannelName(event.target.value)}
          />
        </DialogContent>
        <div className="add-channel-btn-container">
          <button className="add-channel-btn cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="add-channel-btn confirm" onClick={create}>
            Create
          </button>
        </div>
      </Dialog>
    </>
  );

  return (
    <div className="sidebar sidebar--channels">
      {room.name && (
        <>
          <h3 className="channel-title">
            <MenuList
              friends={friends}
              addUserToRoom={addUserToRoom}
              room={room}
            >
              {room.name}
              <SettingsIcon className="room-options" />
            </MenuList>
          </h3>
          <div className="channel-separator"></div>
          {channels}
          {channels.length !== 0 && <div className="channel-separator"></div>}
          {addButton}
        </>
      )}
    </div>
  );
};

export default ChannelList;
