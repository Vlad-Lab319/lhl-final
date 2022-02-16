import { useState } from "react";

const Register = (props) => {
  const { registerUser, clickRegister } = props;
  const [name,setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <div className="login">
        <span className="login-message">Enter your information to sign up!</span>
        <form
          className="login-form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser(name,email);
          }}
          >
          <span className="input-item">
            <label className='input-label' htmlFor="name">Name: </label>
            <input
              className="login-input"
              name="name"
              type="text"
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              />

            <label className='input-label' htmlFor="email">Email: </label>
            <input
              className="login-input"
              name="email"
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
              />

            <label className='input-label' htmlFor="password">Password:</label>
            <input
              className="login-input"
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              />
          </span>
          <button type="submit" className="login-btn">SIGN UP</button>
        </form>
        <section className="separator-box">
          <span className="separator"></span>
          or
          <span className="separator"></span>
        </section>
        <button onClick={clickRegister} className="login-btn login-btn--register">BACK</button>
    </div>
  )
}

export default Register