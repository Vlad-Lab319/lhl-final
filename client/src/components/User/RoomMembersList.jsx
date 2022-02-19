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
    <>
      <h3 className="members-title">
        {room.name && room.name}
        {room.name && <span className="members-online">{members.length}</span>}
      </h3>
      {members}
    </>
  );
};

export default RoomMembersList;
