import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { useState } from "react";
import "./FriendList.scss";

// TODO: Add avatar

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

  const contactOptions =  () => {
    return <div className="friend-request-container">
        <TextsmsIcon
          className="friend-text-chat"
          onClick={() => setPrivateRoom(user,friend)}
        />
        <PhoneIcon
          className="friend-call-chat"
          // onClick={acceptFriendRequest}
        />
      </div>
    ;
  }

  return (
    <div className="friend-list-item">
      <div className="friend-list-user-info">
        <img
          className="friend-list-icon"
          src={avatar}
          alt={(name, " avatar")}
        />
        {name}
      </div>
      {isRequest && requestOptions(requestStatus)}
      {!isRequest && contactOptions()}
    </div>
  );
};

export default FriendListItem;
