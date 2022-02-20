import "./FriendList.scss";
import FriendListItem from "./FriendListItem";

// TODO: FriendList needs to be implemented

const FriendList = (props) => {
  const { friendList, setRecipient, value, user, friendRequests } = props;

  const friends = friendList.map((friend) => {
    return (
      <FriendListItem
        key={friend.id}
        name={friend.username}
        setRecipient={() => setRecipient(friend)}
        selected={friend.id === value}
        avatar={friend.avatar_url}
      />
    );
  });

  const friendRequestList = friendRequests.map((friendRequest) => {
    const friend =
      friendRequest.to.id === user.id ? friendRequest.from : friendRequest.to;
    return (
      <FriendListItem
        key={friend.id}
        name={friend.name}
        setRecipient={() => setRecipient(friend)}
        selected={friend.id === value}
        avatar={friend.avatar}
        isRequest={true}
        requestStatus={friendRequest.from.id === user.id}
      />
    );
  });

  return (
    <div className="sidebar sidebar--friends">
      <div className="friend-list">
        <div className="friend-list-title">{user.name} - Friends</div>
        <div className="friend-list-separator"></div>
        {friends}
        {friendRequestList.length > 0 && (
          <div className="friend-list-title">Friend Requests</div>
        )}
        <div className="friend-list-separator"></div>
        {friendRequestList}
      </div>
    </div>
  );
};

export default FriendList;
