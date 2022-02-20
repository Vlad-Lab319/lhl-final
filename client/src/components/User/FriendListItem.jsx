import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { useState } from "react";
import "./FriendList.scss";

// TODO: Add avatar

const FriendListItem = (props) => {
  const { avatar, name, isRequest, requestStatus } = props;

  const [status, setStatus] = useState("Pending");

  const requestOptions = (requestStatus) => {
    return requestStatus ? (
      <div className="friend-request-container">
        <div
          className="friend-request-status"
          onMouseEnter={() => setStatus("Cancel")}
          onMouseLeave={() => setStatus("Pending")}
        >
          {status}
        </div>
      </div>
    ) : (
      <div className="friend-request-container">
        <DoNotDisturbAltIcon className="friend-request-decline" />
        <CheckCircleOutlineIcon className="friend-request-accept" />
      </div>
    );
  };

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
    </div>
  );
};

export default FriendListItem;
