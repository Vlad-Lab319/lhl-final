import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import AddFriend from "./AddFriend";
import Rename from "./Rename";

export default function MenuList(props) {
  const { friends, addUserToRoom, room, editRoom } = props;

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
          friends={friends}
          addUserToRoom={addUserToRoom}
          room={room}
        />
        <Rename room={room} editRoom={editRoom} />
        <MenuItem onClick={handleClose}>Delete Room</MenuItem>
      </Menu>
    </Box>
  );
}
