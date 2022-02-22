import { useState } from "react";
import "./ChatInput.scss";

const ChatInput = (props) => {
  const [message, setMessage] = useState("");
  const {
    channel,
    room,
    privateRoom,
    user,
    friend,
    sendMessage,
    sendPrivateMessage,
    isPrivate,
  } = props;

  const handleSubmit = () => {
    if (isPrivate) {
      const user_id = user.id;
      const private_room_id = privateRoom.id;
      const messageData = {
        user_id,
        private_room_id,
        message,
        participants: privateRoom.participants,
      };
      sendPrivateMessage(messageData);
    } else {
      const userID = user.id;
      const channelID = channel.id;
      const room_id = room.id;
      const messageData = {
        userID,
        channelID,
        room_id,
        message,
      };

      sendMessage(messageData);
    }

    setMessage("");
  };

  return (
    <form
      className="input-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        className="text-field"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
    </form>
  );
};

export default ChatInput;
