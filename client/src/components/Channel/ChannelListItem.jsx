import TextsmsIcon from "@mui/icons-material/Textsms";
import classNames from "classnames";
import "./ChannelListItem.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

const ChannelListItem = (props) => {
  const { name, setChannel, selected, type, editChannel, channel } = props;

  const [open, setOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState(channel.name);

  const toggleOpen = () => {
    setOpen(!open);
  };

  function edit() {
    editChannel(newChannelName, channel.id);
    toggleOpen();
  }

  const editMenu = (
    <Dialog open={open} onClose={toggleOpen}>
      <DialogTitle>Rename Channel</DialogTitle>
      <DialogContent>
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
        <Button onClick={toggleOpen}>Cancel</Button>
        <Button onClick={edit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );

  const channelListClass = classNames(
    "channel-item",
    selected && "channel-item--selected"
  );

  const iconClass = classNames(
    "channel-icon",
    selected && "channel-icon--selected"
  );

  return (
    <div className={channelListClass} onClick={setChannel}>
      <div className={iconClass}>{type === "text" && <TextsmsIcon />}</div>
      <span>{name}</span>
      <SettingsIcon onClick={toggleOpen} />
      {editMenu}
    </div>
  );
};

export default ChannelListItem;
