import { useState } from "react";
import "../styles/ChatInput.scss";

// TODO: ChatInput needs to post to the database and also update state, checkout the useReducer function in "../hooks/useApplicationDat"

const ChatInput = (props) => {
  const [message, setMessage] = useState("");
  const { sendMessage, channel, user } = props;
  console.log("User in ChatInput: ", user);
  console.log("Channel in ChatInput: ", channel);
  const send = () => {
    const userID = user.id;
    const channelID = channel.id;
    const messageData = {
      userID,
      channelID,
      message,
    };

    sendMessage(userID, messageData);
  };

  return (
    <form
      // action=""
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
