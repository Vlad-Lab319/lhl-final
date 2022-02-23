//mui material
import { Grid, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const DeleteRoom = (props) => {
  const { room, deleteRoom } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  function confirm() {
    deleteRoom(room.id);
    toggleOpen();
  }

  return (
    <>
      <MenuItem onClick={toggleOpen}>Delete Room</MenuItem>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Are you sure you want to delete the room?</DialogTitle>
        <DialogActions>
          <Grid container direction="row" justifyContent="space-around">
            <Grid item>
              <Button variant="outlined" color="error" onClick={toggleOpen}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={confirm}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteRoom;
