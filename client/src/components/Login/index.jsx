import { useState } from "react";
import Login from './Login'
import Register from './Register'
import "../../styles/Login.scss";

const UserForm = (props) => {
  const {  loginUser } = props;
  const [value, setValue] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(true);

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  const clickRegister = () => {
    reset()
    setLogin(!login)
  }

  return (
    <div className="login-page">
      {login
      ?
        <Login
          loginUser={() => loginUser(value)}
          setValue={setValue}
          setLogin={() => setLogin(!login)}
          clickRegister={() => clickRegister()}
          value={value}
          email={email}
          password={password}
        />
      :
        <Register />
      }
    </div>
  );
};

export default UserForm;
