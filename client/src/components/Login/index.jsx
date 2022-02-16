import { useState } from "react";
import "../../styles/Login.scss";
import Login from "./Login";
import Register from "./Register";

const UserForm = (props) => {
  const { loginUser, registerUser } = props;

  const [view, setView] = useState(true);

  const toggleView = () => {
    setView(!view);
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <div className="logo-text">BIG ASS LOGO</div>
      </div>
      {view ? (
        <Login
          loginUser={loginUser}
          setLogin={() => setView(!view)}
          toggleView={() => toggleView()}
        />
      ) : (
        <Register registerUser={registerUser} toggleView={() => toggleView()} />
      )}
    </div>
  );
};

export default UserForm;
