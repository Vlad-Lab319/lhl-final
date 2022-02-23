import classnames from "classnames";
import { useState } from "react";
import "./Login.scss";

// TODO: IMPORTANT - REMOVE ENV BEFORE DEPLOY
const Login = (props) => {
  const { loginUser, toggleView, errors, clearErrors } = props;
  const [email, setEmail] = useState(process.env.REACT_APP_ADMIN_EMAIL || "");
  const [password, setPassword] = useState(
    process.env.REACT_APP_ADMIN_PASSWORD || ""
  );

  const messageClass = classnames(
    "login-message",
    errors && "login-message--error"
  );
  return (
    <div className="login">
      <span className={messageClass}>
        {errors ? errors : "Looks like you're not logged in..."}
      </span>
      <form
        className="login-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser(email, password);
        }}
      >
        <span className="input-item">
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
        </span>
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
