import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../lib/firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <h1>Sign-in</h1>

        <form>
          <h2>E-mail</h2>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='email'
            id='email'
          />

          <h2>Password</h2>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='password'
            id='password'
          />

          <button
            type='submit'
            onClick={signIn}
            className='login__signInButton'
            id='login'
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
