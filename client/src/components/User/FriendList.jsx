import "./FriendList.scss";
import FriendListItem from "./FriendListItem";

// TODO: FriendList needs to be implemented

const FriendList = (props) => {
  const { friendList, setRecipient, value, user } = props;

  const friends = friendList.map((friend) => {
    return (
      <FriendListItem
        key={friend.id}
        username={friend.username}
        setRecipient={() => setRecipient(friend)}
        selected={friend.id === value}
        avatar={friend.avatar_url}
      />
    );
  });

  return (
    <div className="sidebar sidebar--friends">
      <ul className="friend-list">
        <li className="friend-list-title">{user.name} - Friends</li>
        <li className="friend-list-separator"></li>
        {friends}
      </ul>
    </div>
  );
};

export default FriendList;
