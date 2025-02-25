//mui material
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useState } from "react";
import "./ChannelList.scss";
import ChannelListItem from "./ChannelListItem";
import MenuList from "./Menu/MenuList";

const ChannelList = (props) => {
  const {
    user,
    channelList,
    setChannel,
    value,
    room,
    createChannel,
    remainingMemberList,
    addUserToRoom,
    editRoom,
    editChannel,
    deleteRoom,
    deleteChannel,
  } = props;

  const [open, setOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const toggleOpen = () => {
    setOpen(!open);
    setNewChannelName("");
  };

  const channels = channelList.map((channel) => {
    return (
      <ChannelListItem
        key={channel.id}
        name={channel.name}
        setChannel={() => setChannel(channel, room, user)}
        selected={channel.id === value.id}
        type={channel.type}
        editChannel={editChannel}
        channel={channel}
        deleteChannel={deleteChannel}
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
    toggleOpen();
  }

  const addButton = (
    <div className="channel-list-item" onClick={toggleOpen}>
      <span className="channel-list-info">
        <div className="channel-list-icon">
          <AddBoxIcon />
        </div>
        Create a channel
      </span>
      <Dialog open={open} onClose={toggleOpen} className="add-channel-box">
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
        <DialogActions>
          <Button variant="outlined" color="error" onClick={toggleOpen}>
            Cancel
          </Button>
          <Button variant="outlined" color="success" onClick={create}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className="sidebar sidebar--channels">
      {room.name && (
        <div className="channel-list">
          <h3 className="channel-list-title">
            <div className="channel-list-room-name">{room.name}</div>
            <div className="channel-list-channel-options">
              <MenuList
                remainingMemberList={remainingMemberList}
                addUserToRoom={addUserToRoom}
                room={room}
                editRoom={editRoom}
                deleteRoom={deleteRoom}
              >
                <SettingsIcon className="channel-list-gear-icon" />
              </MenuList>
            </div>
          </h3>
          <div className="channel-list-separator" />
          {channels}
          {channels.length > 0 && <div className="channel-list-separator" />}
          {addButton}
        </div>
      )}
    </div>
  );
};

export default ChannelList;
