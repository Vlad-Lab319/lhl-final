import Avatar from "@mui/material/Avatar";
import classNames from "classnames";
import ReactTimeAgo from "react-time-ago";
import stringAvatar from "../helpers/helpers";
import "../styles/MessageListItem.scss";

const MessageListItem = (props) => {
  const { content, time, name, avatar } = props;
  const messageClass = classNames("message-item");

  return (
    <ul className={messageClass}>
      {avatar ? (
        <img src={avatar} alt="" className="message-icon" />
      ) : (
        <Avatar {...stringAvatar(name)} />
      )}
      <div className="message-content">
        <div className="message-header">
          <span className="message-user">{name}</span>
          <ReactTimeAgo
            className="message-time"
            date={new Date(time.replace(" ", "T"))}
            locale="en-US"
          />
        </div>

        <article className="message">{content}</article>
      </div>
    </ul>
  );
};

export default MessageListItem;
