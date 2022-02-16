// import classNames from "classnames";
import "../styles/MessageList.scss";
import MessageListItem from "./MessageListItem";


const DirectMessagesList = (props) => {
  const { messageList } = props;
  const messages = messageList.map((message) => {
    return (
      <MessageListItem
        key={message.id}
        id={message.id}
        content={message.message}
        time={message.created_at}
        user={message.user}
      />
    );
  });
  return (
    <section>
      <li className="message-container">{messages}</li>
    </section>
  );
};

export default DirectMessagesList;
