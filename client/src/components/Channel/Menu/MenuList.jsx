import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import AddFriend from "./AddFriend";
import EditRoom from "./EditRoom";
import DeleteRoom from "./DeleteRoom";
import "./MenuList.scss";

export default function MenuList(props) {
  const {
    getFilteredArray,
    friends,
    addUserToRoom,
    room,
    user,
    editRoom,
    deleteRoom,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const toggleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <>
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
            getFilteredArray={getFilteredArray}
            friends={friends}
            addUserToRoom={addUserToRoom}
            room={room}
          />
          {user.id === room.user_id && (
            <>
              <MenuItem onClick={toggleOpenEdit}>Edit</MenuItem>
              <DeleteRoom room={room} deleteRoom={deleteRoom} />
            </>
          )}
        </Menu>
      </Box>
      <EditRoom
        room={room}
        editRoom={editRoom}
        openEdit={openEdit}
        toggleOpenEdit={toggleOpenEdit}
      />
    </>
  );
}
