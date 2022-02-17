import { useState } from "react";
import "./Login.scss";
const Login = (props) => {
  const { loginUser, toggleView, errors, clearErrors } = props;
  const [value, setValue] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <span className="login-message">
        {errors ? errors : "Looks like you're not logged in..."}
      </span>
      <form
        className="login-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          // loginUser(email, password);
          loginUser(value);
        }}
      >
        <span className="input-item">
          <label className="input-label" htmlFor="id">
            User ID:
          </label>
          <input
            className="login-input"
            name="id"
            type="text"
            value={value}
            placeholder="USER ID"
            onChange={(e) => setValue(e.target.value)}
          />
        </span>

        {/* <span className="input-item">
          <label className="input-label" htmlFor="email">
            Email:
          </label>
          <input
            className="login-input"
            name="email"
            type="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
              clearErrors();
            }}
            required
          />
          <label className="input-label" htmlFor="password">
            Password:
          </label>
          <input
            className="login-input"
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              clearErrors();
            }}
            required
          />
        </span> */}
        <button type="submit" className="login-btn">
          LOGIN
        </button>
      </form>
      <section className="separator-box">
        <span className="separator"></span>
        or
        <span className="separator"></span>
      </section>
      <button onClick={toggleView} className="login-btn login-btn--register">
        REGISTER
      </button>
    </div>
  );
};

export default Login;
