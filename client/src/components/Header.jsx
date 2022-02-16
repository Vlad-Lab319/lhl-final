import "../styles/Header.scss";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
// TODO: Header needs actual interactive icons rather than the placeholder text here, register/login/logout needs to be implemented (Probably create a new component that get rendered by the Header and handles that)

const Header = (props) => {
  const { user } = props;
  console.log(user);
  return (
    <div className="container">
      <div className="user-options user-options--logo">LOGO</div>
      <div className="user-options">
        {user
          ? <>
          <SettingsIcon className="user-options user-options--gear"/><img className="user-options user-options--avatar" src={user.avatar} alt={`Logged in as ${user.name}`} />
          </>
          :
          <AccountCircleIcon className="user-options user-options--avatar" />
        }

      </div>
    </div>
  );
};

export default Header;
