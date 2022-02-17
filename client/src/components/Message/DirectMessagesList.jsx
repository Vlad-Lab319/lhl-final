// import classNames from "classnames";
import MessageListItem from "../MessageListItem";
import "./MessageList.scss";

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
