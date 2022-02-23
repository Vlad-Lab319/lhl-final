import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import PhoneIcon from "@mui/icons-material/Phone";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Avatar } from "@mui/material";
import { useState } from "react";
import stringAvatar from "../../helpers/helpers";
import WebRTC from "../WebRTC/WebRTC";
import "./FriendList.scss";

const FriendListItem = (props) => {
  const {
    avatar,
    name,
    isRequest,
    requestStatus,
    cancelFriendRequest,
    acceptFriendRequest,
    user,
    friend,
    setPrivateRoom,
  } = props;

  const [call, setCall] = useState(false);
  const makeCall = () => {
    setCall(!call);
  };

  const [status, setStatus] = useState("Pending");

  const requestOptions = (requestStatus) => {
    return requestStatus ? (
      <div className="friend-request-container">
        <div
          className="friend-request-status"
          onMouseEnter={() => setStatus("Cancel")}
          onMouseLeave={() => setStatus("Pending")}
          onClick={cancelFriendRequest}
        >
          {status}
        </div>
      </div>
    ) : (
      <div className="friend-request-container">
        <DoNotDisturbAltIcon
          className="friend-request-decline"
          onClick={cancelFriendRequest}
        />
        <CheckCircleOutlineIcon
          className="friend-request-accept"
          onClick={acceptFriendRequest}
        />
      </div>
    );
  };

  const contactOptions = () => {
    return (
      <div className="friend-request-container">
        <TextsmsIcon
          className="friend-text-chat"
          onClick={() => setPrivateRoom(user, friend)}
        />
        <PhoneIcon
          className="friend-call-chat"
          onClick={() => makeCall(friend.id)}
        />
        {call && <WebRTC makeCall={makeCall} />}
      </div>
    );
  };

  return (
    <div className="friend-list-item">
      <div className="friend-list-user-info">
        {avatar ? (
          <img src={avatar} alt="" className="friend-list-icon" />
        ) : (
          <Avatar {...stringAvatar(name)} className="friend-list-icon" />
        )}

        {name}
      </div>
      {isRequest && requestOptions(requestStatus)}
      {!isRequest && contactOptions()}
    </div>
  );
};

export default FriendListItem;
