import classNames from "classnames";
import "./FriendList.scss";

// TODO: Add avatar

const FriendListItem = (props) => {
  const { avatar, username, setRecipient, selected } = props;

  const friendListClass = classNames(
    "recipient",
    selected && "recipient--selected"
  );

  // const avatarClass = classNames("avatar");

  return (
    <div className="friend-list-item" onClick={setRecipient}>
      <img
        className="friend-list-icon"
        src={avatar}
        alt={(username, " avatar")}
      />
      {username}
    </div>
  );
};

export default FriendListItem;
