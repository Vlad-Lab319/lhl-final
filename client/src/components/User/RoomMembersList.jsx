// TODO: RoomMembersList needs the users present in the room that the user is currently in
import "./RoomMembersList.scss";
import RoomMembersListItem from "./RoomMembersListItem";

const RoomMembersList = (props) => {
  const { memberList } = props;

  const members = memberList.map((user) => {
    <RoomMembersListItem />;
  });
  return (
    <>
      <h3 className="members-title">Online -- {members.length}</h3>
      {members}
    </>
  );
};

export default RoomMembersList;
