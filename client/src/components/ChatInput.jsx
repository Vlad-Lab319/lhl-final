import { useState } from "react";
import "../styles/ChatInput.scss";

// TODO: ChatInput needs to post to the database and also update state, checkout the useReducer function in "../hooks/useApplicationDat"

const ChatInput = (props) => {
  const [message, setMessage] = useState("");
  const { channel, user, sendMessage } = props;

  const send = () => {
    const userID = user.id;
    const channelID = channel.id;
    const messageData = {
      userID,
      channelID,
      message,
    };

    sendMessage(messageData);
    setMessage("");
  };

  return (
    <form
      className="input-form"
      onSubmit={(event) => {
        event.preventDefault();
        send();
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
