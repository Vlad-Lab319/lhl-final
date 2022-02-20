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
      <div className="friend-list">
        <div className="friend-list-title">{user.name} - Friends</div>
        <div className="friend-list-separator"></div>
        {friends}
      </div>
    </div>
  );
};

export default FriendList;
