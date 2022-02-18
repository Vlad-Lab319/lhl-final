//mui material
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import "./ChannelList.scss";
import ChannelListItem from "./ChannelListItem";
import { IconButton } from "@mui/material";
import MenuList from "./Menu/MenuList";

const ChannelList = (props) => {
  const { channelList, setChannel, value, room, createChannel, friends } =
    props;

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
    console.log(`Create channel ${roomID} ${newChannelName} ${channelData}`);
    createChannel(channelData);
    handleClose();
  }

  const addButton = (
    <>
      <IconButton color="inherit">
        <AddBoxIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new channel</DialogTitle>
        <DialogContent>
          <DialogContentText>Create new channel</DialogContentText>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={create}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return (
    <div className="sidebar sidebar--channels">
      <h3 className="channel-title">
        <MenuList friends={friends}>{room.name && `${room.name}`}</MenuList>
      </h3>
      {channels}
      {addButton}
    </div>
  );
};

export default ChannelList;
