import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, IconButton } from "@mui/material";
import stringAvatar from "../../helpers/helpers";
import ClarionLogo from "../ClarionLogo";
import "./Header.scss";

const Header = (props) => {
  const { user, logoutUser, takeMeHome } = props;
  return (
    <div className="container">
      <div className="nav-options">
        <IconButton onClick={takeMeHome} disableRipple={true}>
          <ClarionLogo className="clarion-small" />
        </IconButton>
      </div>
      <div className="user-options">
        {user ? (
          <>
            <span className="logout-btn" onClick={logoutUser}>
              Logout
            </span>

            {user.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="user-options user-options--avatar"
              />
            ) : (
              <Avatar
                {...stringAvatar(user.name)}
                className="user-options user-options--avatar"
              />
            )}
          </>
        ) : (
          <AccountCircleIcon className="user-options user-options--avatar" />
        )}
      </div>
    </div>
  );
};

export default Header;
