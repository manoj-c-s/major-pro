import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../../lib/firebase";
import Signup from "../Signup/Signup";
import "./styles.css";
import { googleProvider } from "../../lib/firebase";

const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const GoogleSignIn = (e) => {
    e.preventDefault();
    console.log(googleProvider);
    auth.signInWithPopup(googleProvider).catch((e) => {
      alert(e.message);
    });
  };



  return (
    <div className="login">
      {showSignup ? (
        <Signup showSignup={setShowSignup} />
      ) : (
        <div className="login__content">
          {loading && <div className="login__loading" />}

          <div className={`login__wrapper ${loading && "login__fade"}`}>
            <img
              className="login__logo"
              src="/assets/svg/google.svg"
              alt="Google"
            />

            <p className="login__title">Sign in</p>
            <p className="login__subtitle">Continue to Gmail</p>
                <Button
                  className="login__button"
                  color="primary"
                  variant="contained"
                  onClick={GoogleSignIn}
                >
                  Sign in
                </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
