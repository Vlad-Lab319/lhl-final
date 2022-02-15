import axios from "axios";
import { useState } from "react";
import "../styles/Login.scss";

const Login = (props) => {
  const { user, setUser } = props;
  const [value, setValue] = useState(props.user || "");
  const validateUser = (id) => {
    axios.get(`/api/users/${id}`).then((user) => {
      // console.log(user.data[0]);
      if (user.data) {
        setUser(user.data[0]);
      }
    });
  };
  return (
    <div className="login">
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          validateUser(e.target[0].value);
        }}
      >
        <input
          className="appointment__create-input text--semi-bold"
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
