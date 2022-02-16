import { useState } from "react";
import Login from './Login'
import Register from './Register'
import "../../styles/Login.scss";

const UserForm = (props) => {
  const {  loginUser } = props;

  const [login, setLogin] = useState(true);

  const clickRegister = () => {
    setLogin(!login)
  }

  return (
    <div className="login-page">
      {login
      ?
        <Login
          loginUser={loginUser}
          setLogin={() => setLogin(!login)}
          clickRegister={() => clickRegister()}
        />
      :
        <Register clickRegister={() => clickRegister()} />
      }
    </div>
  );
};

export default UserForm;
