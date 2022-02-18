// TODO: RoomMembersListItem needs to be implemented

import "./RoomMembersListItem.scss";

const RoomMembersListItem = (props) => {
  const { name, avatar } = props;
  return (
    <div className="member-item">
      <img src={avatar} alt="" className="member-icon" />
      <span className="member-user">{name}</span>
    </div>
  );
};

export default RoomMembersListItem;
