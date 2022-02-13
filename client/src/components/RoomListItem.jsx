import classNames from "classnames";
import "../styles/RoomListItem.scss";
// TODO:

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
  console.log(roomInitials);
  return (
    <div className="container">
      <div className="room-name">{roomInitials}</div>
      <img className={roomItemClass} src={icon} alt="" onClick={setRoom} />
    </div>
  );
};

export default RoomListItem;
