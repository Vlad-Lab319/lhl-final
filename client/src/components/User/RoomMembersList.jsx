// TODO: RoomMembersList needs the users present in the room that the user is currently in
import "./RoomMembersList.scss";
import RoomMembersListItem from "./RoomMembersListItem";

const RoomMembersList = (props) => {
  const { activeUser, memberList, room } = props;

  const members = memberList.map((user) => {
    return (
      <RoomMembersListItem
        key={user.id}
        name={user.name}
        avatar={user.avatar}
        isUser={activeUser.id === user.id}
      />
    );
  });
  return (
    <div className="sidebar sidebar--room-members">
      <div className="member-title">
        {room.name && room.name}
        {room.name && <span className="member-online">{members.length}</span>}
      </div>
      <div className="member-separator"></div>
      {members}
    </div>
  );
};

export default RoomMembersList;
