import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import classNames from "classnames";
import "./RoomList.scss";

// TODO: RoomListItem needs new message notifications implemented, consider incrementing a message count as new messages come in and when the user is in the room currently don't increment the counter or reset it or something

const RoomListItem = (props) => {
  const { name, icon, setRoom, selected } = props;

  const roomItemClass = classNames(
    "list-icon",
    selected && "list-icon--selected"
  );

  const formatRoomName = (name) => {
    return name
      .split(" ")
      .map((word, index) => {
        if (index < 3) {
          return word.length > 1 ? word[0].toUpperCase() : word.toUpperCase();
        }
      })
      .join(" ");
  };

  const roomInitials = formatRoomName(name);
  return (
    <div className="list-item" onClick={setRoom}>
      <FiberManualRecordIcon className="notification" />
      <img className={roomItemClass} src={icon} alt="" />
      <div className="room-name">{roomInitials}</div>
    </div>
  );
};

export default RoomListItem;
