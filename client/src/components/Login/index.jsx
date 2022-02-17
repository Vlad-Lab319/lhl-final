import { useState } from "react";
import ClarionLogo from "../ClarionLogo";
import Login from "./Login";
import "./Login.scss";
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
        <ClarionLogo className="clarion" />
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
