import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import AddFriend from "./AddFriend";

export default function MenuList(props) {
  const { friends, addUserToRoom } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        />
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Delete Room</MenuItem>
      </Menu>
    </div>
  );
}
