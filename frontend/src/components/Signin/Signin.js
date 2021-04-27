import React from "react";
import "./Sigin.css";

const Signin = () => {
  return (
    <div className="container">
      <div className="main">
        <h1>Please Sign in</h1>
        <div className="target">
          <a
            className="btn btn-block btn-social btn-github"
            href="https://github.com/login/oauth/authorize?client_id=48f664a977f859d68b03&scope=repo"
          >
            <span></span> Sign in with Github
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
