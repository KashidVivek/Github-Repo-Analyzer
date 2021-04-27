import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const SiginCallback = () => {
  const [state, setState] = useState();
  useEffect(() => {
    fetch("/user/sigin/callback")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data);
      })
      .catch((err) => console.log(err));
  }, []);
  if (state === undefined) {
    return <h1>State Undefined</h1>;
  }
  if (state.success) {
    return <Redirect to="/dashboard" />;
  }
  return <div> Something went wrong! </div>;
};

export default SiginCallback;
