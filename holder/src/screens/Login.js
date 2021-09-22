import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { login } from "../services/authService";
import { useHistory } from "react-router";
const Login = ({ sendAuthStatus }) => {
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [showError, getErrorStatus] = useState(false);
  const [errMsg, getErrMsg] = useState("");

  const history = useHistory();

  const loginHandler = (e) => {
    e.preventDefault();
    if (!(email && password)) {
      getErrorStatus(true);
      getErrMsg("Enter the credentials");
      return;
    }
    const res = login(email, password);
    res
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          //store the token to localstorage and redirect to a main page also pass props to navbar to change the links
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data.token);
          sendAuthStatus(true); //Sending the true auth status to the parent app component and then sending it to navbar for rendering dynamically
          history.push("/home");
        }
      })
      .catch((error) => {
        console.log(error.response);
        const err = error.response.data.error[0];
        console.log(err);
        getErrorStatus(true);
        getErrMsg(err["msg"]);
      });
  };
  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "10vh" }}>Login </h3>
      <div className="login-container">
        <Form onSubmit={loginHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => getEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => getPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <ToastContainer position="top-end">
        <Toast
          onClose={() => getErrorStatus(false)}
          className="d-inline-block m-1"
          bg="danger"
          show={showError}
          delay={2500}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto text-black">Signup Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{errMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Login;
