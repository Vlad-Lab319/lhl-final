import classNames from "classnames";
import "../styles/MessageListItem.scss";
import ReactTimeAgo from 'react-time-ago'


// TODO: MessageListItem needs the proper user object

const MessageListItem = (props) => {
  const { content, time, user } = props;
  const messageClass = classNames("message-item");

  return (
    <ul className={messageClass}>
        {/* <img src={user.avatar} alt={(user.name, " avatar")} /> */}
        <div className="message-icon"></div>

        <div className="message-content">
        <div className="message-header">

        <span className="message-user">{user} USERNAME </span>
        <ReactTimeAgo className="message-time" date={time} locale="en-US"/>
      </div>

      <article className="message">{content}</article>
        </div>
    </ul>
  );
};

export default MessageListItem;
