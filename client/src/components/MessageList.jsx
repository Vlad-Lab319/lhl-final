import classNames from "classnames";
import "../styles/MessageList.scss";
import MessageListItem from "./MessageListItem";

// TODO: MessageList will render MessageListItem for a channel. MessageListItem will take a single message from the messageList. messageList is an array of objects containing a user_id and message content

// TODO: Message objects will need to attach a user object by user id which provides the user name and avatar

const MessageList = (props) => {
  const { messageList } = props;
  const messageClass = classNames();
  const messages = messageList.map((message) => {
    return (
      <MessageListItem
        key={message.id}
        id={message.id}
        content={message.content}
        time={message.time}
        user={message.user}
      />
    );
  });
  return { messages };
};

export default MessageList;
