import { useState } from "react";
import "../../styles/Login.scss";
import Login from "./Login";
import Register from "./Register";

const UserForm = (props) => {
  const { loginUser, registerUser, errors, clearErrors } = props;

  const [view, setView] = useState(true);

  const toggleView = () => {
    clearErrors();
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
          errors={errors}
          clearErrors={clearErrors}
        />
      ) : (
        <Register
          registerUser={registerUser}
          toggleView={() => toggleView()}
          errors={errors}
          clearErrors={clearErrors}
        />
      )}
    </div>
  );
};

export default UserForm;
