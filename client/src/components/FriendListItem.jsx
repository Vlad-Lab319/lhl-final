import classNames from "classnames";
import "../styles/FriendListItem.scss";

// TODO: Add avatar

const FriendListItem = (props) => {
  const { avatar, username, setRecipient, selected } = props;

  const friendListClass = classNames(
    "recipient",
    selected && "recipient--selected"
  );

  const avatarClass = classNames(
    "avatar",
  );

  return (
    <div className={friendListClass} onClick={setRecipient}>
    {/* <div className={friendListClass}> */}
      <span >
        <img className={avatarClass} src={avatar} alt={(username, " avatar")} />
        {username}
      </span>
    </div>
  );
};

export default FriendListItem;
