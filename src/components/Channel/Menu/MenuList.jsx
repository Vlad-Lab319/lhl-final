import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import AddFriend from "./AddFriend";
import Rename from "./Rename";
import Confirm from "./Confirm";
import "./MenuList.scss";

export default function MenuList(props) {
  const { remainingMemberList, addUserToRoom, room, editRoom, deleteRoom } =
    props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "white",
        }}
      >
        {props.children}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <AddFriend
          close={handleClose}
          remainingMemberList={remainingMemberList}
          addUserToRoom={addUserToRoom}
          room={room}
        />
        <Rename room={room} editRoom={editRoom} />
        <Confirm room={room} deleteRoom={deleteRoom} />
      </Menu>
    </Box>
  );
}
