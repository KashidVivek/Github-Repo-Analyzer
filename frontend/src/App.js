import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./components/Signin/Signin.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import SigninCallback from "./components/SignInCallback/SiginCallback.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user/sigin/callback">
          <SigninCallback />
        </Route>

        <Route path="/dashboard">
          <div>
            <Dashboard />
          </div>
        </Route>

        <Route path="/">
          <div className="App">
            <Signin />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
