// import RoomMembersListItem from './RoomMembersListItem'

// TODO: RoomMembersList needs the users present in the room that the user is currently in

import "../styles/RoomMembersList.scss";
const RoomMembersList = (props) => {
  const { memberList } = props;
  return (
    <>
      <h3 className="members-title">Online -- #ofActive</h3>
      {memberList}
    </>
  );
};

export default RoomMembersList;
