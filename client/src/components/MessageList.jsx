import classNames from "classnames";
import "../styles/MessageList.scss";
import MessageListItem from "./MessageListItem";
// import {addUserToMessage} from '../helpers/selectors'

// TODO: Message objects will need to attach a user object by user id which provides the user name and avatar

// TODO: Message time needs to be formatted, maybe checkout the timeago library or something similar (format should be something like "Today at 12:00pm")

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
        time={message.created_at}
        user={message.user}
      />
    );
  });
  return <li className="message-container">{messages}</li>;
};

export default MessageList;
