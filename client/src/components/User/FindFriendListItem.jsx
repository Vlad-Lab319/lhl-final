import "./FindFriendList.scss";

const FindFriendListItem = (props) => {
  const { name, avatar } = props;
  return (
    <div className="find-friend-list-item">
      <img src={avatar} alt="" className="find-friend-list-icon" />
      <span className="find-friend-list-name">{name}</span>
    </div>
  );
};

export default FindFriendListItem;
