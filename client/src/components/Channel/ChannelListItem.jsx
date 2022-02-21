import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import classNames from "classnames";
import { useState } from "react";
import "./ChannelList.scss";

const ChannelListItem = (props) => {
  const {
    name,
    setChannel,
    selected,
    type,
    editChannel,
    channel,
    deleteChannel,
  } = props;

  const [newChannelName, setNewChannelName] = useState(channel.name);

  // edit menu
  const [openEdit, setOpenEdit] = useState(false);

  const toggleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  function edit() {
    editChannel(newChannelName, channel.id);
    toggleOpenEdit();
  }

  const editMenu = (
    <Dialog open={openEdit} onClose={toggleOpenEdit}>
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
        <Button onClick={toggleOpenEdit}>Cancel</Button>
        <Button onClick={edit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
  // edit menu ends

  // confirm menu
  const [openConfirm, setOpenConfirm] = useState(false);

  const toggleOpenConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  function confirm() {
    deleteChannel(channel.id);
    toggleOpenConfirm();
  }

  const confirmMenu = (
    <Dialog open={openConfirm} onClose={toggleOpenConfirm}>
      <DialogTitle>Are you sure you want to delete the channel?</DialogTitle>
      <DialogActions>
        <Button onClick={toggleOpenConfirm}>Cancel</Button>
        <Button onClick={confirm}>Confirm</Button>
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
      <SettingsIcon onClick={toggleOpenEdit} />
      <DeleteIcon onClick={toggleOpenConfirm} />
      {editMenu}
      {confirmMenu}
    </div>
  );
};

export default ChannelListItem;
