import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import classNames from "classnames";
import "./RoomListItem.scss";

// TODO: RoomListItem needs new message notifications implemented, consider incrementing a message count as new messages come in and when the user is in the room currently don't increment the counter or reset it or something

const RoomListItem = (props) => {
  const { name, icon, setRoom, selected } = props;

  const roomItemClass = classNames(
    "room-icon",
    selected && "room-icon--selected"
  );

  const formatRoomName = (name) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join(" ");
  };

  const roomInitials = formatRoomName(name);
  return (
    <div className="room-container" onClick={setRoom}>
      <FiberManualRecordIcon className="notification" />
      <div className="room-name">{roomInitials}</div>
      <img className={roomItemClass} src={icon} alt="" />
    </div>
  );
};

export default RoomListItem;
