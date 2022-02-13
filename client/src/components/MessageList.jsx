import classNames from "classnames";
import "../styles/MessageList.scss";
import MessageListItem from "./MessageListItem";
// import {addUserToMessage} from '../helpers/selectors'

// TODO: MessageList will render MessageListItem for a channel. MessageListItem will take a single message from the messageList. messageList is an array of objects containing a user_id and message content

// TODO: Message objects will need to attach a user object by user id which provides the user name and avatar

const MessageList = (props) => {
  const { messageList, channel } = props;
  const messageClass = classNames();
  const messages = messageList.map((message) => {
    console.log(message);
    return (
      <MessageListItem
        // key={message.id}
        id={message.id}
        content={message.message}
        time={message.time}
        user={message.user}
      />
    );
  });
  return <li className="message-container">{messages}</li>;
};

export default MessageList;
