// TODO: RoomMembersList needs the users present in the room that the user is currently in
import { useEffect } from "react";
import "./RoomMembersList.scss";
import RoomMembersListItem from "./RoomMembersListItem";

const RoomMembersList = (props) => {
  const { activeUser, memberList } = props;

  useEffect(() => {}, [memberList.length]);

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
      <h3 className="members-title">Online -- {members.length}</h3>
      {members}
    </>
  );
};

export default RoomMembersList;
