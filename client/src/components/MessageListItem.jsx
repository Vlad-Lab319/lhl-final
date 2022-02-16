import classNames from "classnames";
import "../styles/MessageListItem.scss";
import ReactTimeAgo from 'react-time-ago'
import Avatar from '@mui/material/Avatar';
import stringAvatar from "../helpers/helpers";


// TODO: MessageListItem needs the proper user object

const MessageListItem = (props) => {
  const { content, time, name, avatar } = props;
  // console.log(user);
  const messageClass = classNames("message-item");


  return (
    <ul className={messageClass}>
      {avatar ?
      <img src={avatar} alt="" className="message-icon"/>
    : <Avatar {...stringAvatar(name)} />}
        <div className="message-content">
        <div className="message-header">
        <span className="message-user">{name}</span>
        <ReactTimeAgo className="message-time" date={time} locale="en-US"/>
      </div>

      <article className="message">{content}</article>
        </div>

    </ul>
  );
};

export default MessageListItem;
