import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import "../styles/Header.scss";
// TODO: Header needs actual interactive icons rather than the placeholder text here, register/login/logout needs to be implemented (Probably create a new component that get rendered by the Header and handles that)

const Header = (props) => {
  const { user, logoutUser } = props;
  return (
    <div className="container">
      <div className="user-options user-options--logo">LOGO</div>
      <div className="user-options">
        {user ? (
          <>
            <span className="logout-btn" onClick={logoutUser}>
              Logout
            </span>
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
