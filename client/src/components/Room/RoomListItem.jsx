import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import stringAvatar from "../../helpers/helpers";
import "./RoomList.scss";

// TODO: RoomListItem needs new message notifications implemented, consider incrementing a message count as new messages come in and when the user is in the room currently don't increment the counter or reset it or something

const RoomListItem = (props) => {
  const { name, icon, setRoom, selected } = props;

  const roomItemClass = classNames(
    "list-icon",
    selected && "list-icon--selected"
  );

  return (
    <div className="list-item" onClick={setRoom}>
      <FiberManualRecordIcon className="notification" />
      {icon ? (
        <img src={icon} alt="" className={roomItemClass} />
      ) : (
        <Avatar {...stringAvatar(name)} className={roomItemClass} />
      )}
    </div>
  );
};

export default RoomListItem;
