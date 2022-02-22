import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import { useEffect } from "react";
import stringAvatar from "../../helpers/helpers";
import "./RoomList.scss";
// TODO: RoomListItem needs new message notifications implemented, consider incrementing a message count as new messages come in and when the user is in the room currently don't increment the counter or reset it or something

const RoomListItem = (props) => {
  const {
    user,
    id,
    name,
    room,
    icon,
    setRoom,
    selected,
    messageCount,
    messagesSeen,
    setSeenMessages,
  } = props;

  useEffect(() => {
    if (room.id === user.room_id) {
      setSeenMessages(user, room, null);
    }
  }, [messageCount]);

  const roomItemClass = classNames(
    "list-icon",
    selected && "list-icon--selected"
  );

  return (
    <div className="list-item" onClick={setRoom}>
      {messageCount > messagesSeen && (
        <FiberManualRecordIcon className="notification" />
      )}
      {icon ? (
        <img src={icon} alt="" className={roomItemClass} />
      ) : (
        <Avatar {...stringAvatar(name)} className={roomItemClass} />
      )}
    </div>
  );
};

export default RoomListItem;
