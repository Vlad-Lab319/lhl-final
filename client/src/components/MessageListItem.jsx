import classNames from "classnames";
import "../styles/MessageListItem.scss";

// TODO: MessageListItem needs the proper user object

const MessageListItem = (props) => {
  const { id, content, time, user } = props;
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
