// import RoomMembersListItem from './RoomMembersListItem'
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
