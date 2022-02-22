// TODO: RoomMembersListItem needs to be implemented
import PhoneIcon from "@mui/icons-material/Phone";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { useState } from "react";
import WebRTC from "../WebRTC/WebRTC";
import "./RoomMembersList.scss";

const RoomMembersListItem = (props) => {
  const { id, name, avatar, isUser, isFriend } = props;
  const [call, setCall] = useState(false);

  const makeCall = () => {
    setCall(!call);
  };

  const friendOptions = (isFriend) => {
    return (
      <div className="member-list-user-options">
        <TextsmsIcon className="member-text-chat" />
        <PhoneIcon className="member-call-chat" onClick={() => makeCall(id)} />
        {call && <WebRTC />}
      </div>
    );
  };

  return (
    <div className="member-list-item">
      <div className="member-list-user-info">
        <img className="member-list-icon" src={avatar} alt="" />
        {name}
      </div>
      {!isUser && friendOptions(isFriend)}
    </div>
  );
};

export default RoomMembersListItem;
