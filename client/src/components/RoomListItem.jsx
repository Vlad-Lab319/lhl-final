import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import classNames from "classnames";
import "../styles/RoomListItem.scss";

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
