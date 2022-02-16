import classNames from "classnames";
import "../styles/MessageListItem.scss";
import ReactTimeAgo from 'react-time-ago'


// TODO: MessageListItem needs the proper user object

const MessageListItem = (props) => {
  const { content, time, user } = props;
  const messageClass = classNames("message-item");

  return (
    <ul className={messageClass}>
      <section>
        {/* <img src={user.avatar} alt={(user.name, " avatar")} /> */}
        <h2>{user}</h2>
        <ReactTimeAgo date={time} locale="en-US"/>
      </section>
      <article>{content}</article>
    </ul>
  );
};

export default MessageListItem;
