import { useState } from "react";
import "../styles/Login.scss";

const Login = (props) => {
  const { user, loginUser } = props;
  const [value, setValue] = useState(props.user || "");

  return (
    <div className="login">
      <span className="login-message">Looks like you're not logged in...</span>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target[0].value);
          loginUser(e.target[0].value);
        }}
      >
        <input
          className="login-input"
          name="name"
          type="text"
          value={value}
          placeholder="Enter user id to login"
          onChange={(e) => setValue(e.target.value)}
          onSubmit={(e) => {
            console.log(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Login;
