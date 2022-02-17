import "./FriendList.scss";
import FriendListItem from "./FriendListItem";

// TODO: FriendList needs to be implemented

const FriendList = (props) => {
  const { friendList, setRecipient, value } = props;

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
      <h3>Friends</h3>
      {friends}
    </div>
  );
};

export default FriendList;
