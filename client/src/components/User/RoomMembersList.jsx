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
    <section className="sidebar sidebar--room-members">
      <ul className="member-list">
        <h3 className="member-list-title">
          {room.name && room.name}&ensp;&raquo;
          {room.name && (
            <span className="member-list-online">&ensp;{members.length}</span>
          )}
        </h3>
        {room.name && <span className="member-list-separator" />}
        {room.name && members}
      </ul>
    </section>
  );
};

export default RoomMembersList;
