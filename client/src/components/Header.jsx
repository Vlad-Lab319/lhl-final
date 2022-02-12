import "../styles/Header.scss";
// TODO: Header will contain the app logo and user options (login, logout, change name etc...)

const Header = (props) => {
  const {} = props;
  return (
    <div className="container">
      <div className="user-options user-options--logo">LOGO</div>
      <div className="user-options">
        <div className="user-options user-options--avatar">AVATAR</div>
        <div className="user-options user-options--gear">GEAR</div>
        <div className="user-options user-options--hamburger">HAMBURGER</div>
      </div>
    </div>
  );
};

export default Header;
