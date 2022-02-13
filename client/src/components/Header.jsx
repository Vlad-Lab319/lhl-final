import "../styles/Header.scss";
// TODO: Header needs actual interactive icons rather than the placeholder text here, register/login/logout needs to be implemented (Probably create a new component that get rendered by the Header and handles that)

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
