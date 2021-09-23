import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Login from "./screens/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import VCDashboard from "./screens/VCDashboard";

function App() {
  const [isAuthenticated, getAuthStatus] = useState(
    localStorage.getItem("user") ? true : false
  );

  // For dynamic change in navbar we are getting the auth status from the Login child component
  const setAuthStatus = (value) => {
    getAuthStatus(value);
  };
  return (
    <div className="App">
      <NavBar
        authenticatedStatus={isAuthenticated}
        sendAuthStatus={(value) => setAuthStatus(value)}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login sendAuthStatus={(value) => setAuthStatus(value)} />
        </Route>
        <Route exact path="/dashboard">
          <VCDashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
