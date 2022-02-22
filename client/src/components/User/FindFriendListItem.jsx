import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Avatar } from "@mui/material";
import stringAvatar from "../../helpers/helpers";
import "./FindFriendList.scss";

const FindFriendListItem = (props) => {
  const { user, id, name, avatar, sendFriendRequest, clearSearch } = props;

  return (
    <div className="find-friend-list-item">
      {avatar ? (
        <img src={avatar} alt="" className="find-friend-list-icon" />
      ) : (
        <Avatar {...stringAvatar(name)} className="find-friend-list-icon" />
      )}
      <span className="find-friend-list-container">
        <span className="find-friend-list-name">{name}</span>
        <PersonAddAlt1Icon
          className="find-friend-list-add"
          onClick={() => {
            clearSearch();
            sendFriendRequest(user.id, id);
          }}
        />
      </span>
    </div>
  );
};

export default FindFriendListItem;
