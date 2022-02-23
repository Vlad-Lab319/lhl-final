import { useState } from "react";

const Register = (props) => {
  const { registerUser, toggleView, errors, clearErrors } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <span className="login-message">
        {errors ? errors : "Enter your information to sign up!"}
      </span>
      <form
        className="login-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(name, email, password);
        }}
      >
        <span className="input-item">
          <label className="input-label" htmlFor="name">
            Name:
          </label>
          <input
            className="login-input"
            name="name"
            type="text"
            minlength="5"
            value={name}
            placeholder="Username"
            onChange={(e) => {
              clearErrors();
              setName(e.target.value);
            }}
            required
          />

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
              clearErrors();
              setEmail(e.target.value);
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
              clearErrors();
              setPassword(e.target.value);
            }}
            required
          />
        </span>
        <button type="submit" className="login-btn">
          SIGN UP
        </button>
      </form>
      <section className="separator-box">
        <span className="separator"></span>
        or
        <span className="separator"></span>
      </section>
      <button onClick={toggleView} className="login-btn login-btn--register">
        BACK
      </button>
    </div>
  );
};

export default Register;
