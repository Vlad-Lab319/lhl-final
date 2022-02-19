// TODO: RoomMembersListItem needs to be implemented
import PhoneIcon from "@mui/icons-material/Phone";
import { IconButton } from "@mui/material";
import { useState } from "react";
import WebRTC from "../WebRTC/WebRTC";
import "./RoomMembersListItem.scss";

const RoomMembersListItem = (props) => {
  const { id, name, avatar, isUser } = props;

  const [call, setCall] = useState(false);

  const makeCall = () => {
    setCall(!call);
  };
  return (
    <div className="member-item">
      <img src={avatar} alt="" className="member-icon" />
      <span className="member-name">{name}</span>
      {!isUser && (
        <PhoneIcon className="member-phone" onClick={() => makeCall(id)} />
      )}
      {call && <WebRTC />}
    </div>
  );
};

export default RoomMembersListItem;
