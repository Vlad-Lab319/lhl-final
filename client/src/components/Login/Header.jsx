import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import ClarionLogo from "../ClarionLogo";
import "./Header.scss";
// TODO: Header needs actual interactive icons rather than the placeholder text here, register/login/logout needs to be implemented (Probably create a new component that get rendered by the Header and handles that)

const Header = (props) => {
  const { user, logoutUser, toggle, theme } = props;
  return (
    <div className="container">
      <ClarionLogo className="clarion-small" />
      <div className="user-options">
        {user ? (
          <>
            <span className="logout-btn" onClick={logoutUser}>
              Logout
            </span>
            <IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <SettingsIcon className="user-options user-options--gear" />
            <img
              className="user-options user-options--avatar"
              src={user.avatar}
              alt={`Logged in as ${user.name}`}
            />
          </>
        ) : (
          <AccountCircleIcon className="user-options user-options--avatar" />
        )}
      </div>
    </div>
  );
};

export default Header;
