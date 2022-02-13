import classNames from "classnames";
import "../styles/MessageListItem.scss";

// TODO: MessageListItem will render individual messages showing a user avatar, user name, message content and the time the message was posted. Messages can be edited or deleted by the user, or deleted by the room owner.

const MessageListItem = (props) => {
  const { id, content, time, user } = props;
  console.log("Content: ", content);
  const messageClass = classNames("message-item");

  return (
    <ul className={messageClass}>
      <section>
        {/* <img src={user.avatar} alt={(user.name, " avatar")} /> */}
        <h2>{user}</h2>
        <span>{time}</span>
      </section>
      <article>{content}</article>
    </ul>
  );
};

export default MessageListItem;
