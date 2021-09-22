import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { signUp } from "../services/authService";

const SignUp = () => {
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [confirmPass, getConfirmPass] = useState("");
  const [first_name, getFirstName] = useState("");
  const [last_name, getLastName] = useState("");
  const [showError, getErrorStatus] = useState(false);
  const [showSuccess, getSuccessStatus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const signUpHandler = (e) => {
    e.preventDefault();
    if (!(first_name && last_name && password && confirmPass && email)) {
      getErrorStatus(true);
      setErrMsg("All fields are required!");
      return;
    }
    if (password !== confirmPass) {
      getErrorStatus(true);
      setErrMsg("Password do not match");

      return;
    }
    console.log(first_name);
    console.log(password);
    console.log(confirmPass);
    console.log(last_name);
    console.log(email);

    const res = signUp(email, password, first_name, last_name);
    res
      .then((response) => {
        console.log(response);
        getSuccessStatus(true);
        setSuccessMsg("SignUp successful");
        getEmail("");
        getPassword("");
        getConfirmPass("");
        getFirstName("");
        getLastName("");
      })
      .catch((err) => {
        const errors = err.response.data.errors[0];
        console.log(err.response.data);
        getErrorStatus(true);
        setErrMsg(errors["msg"]);
      });
  };
  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "10vh" }}>SignUp </h3>
      <div className="signup-container">
        <Form onSubmit={signUpHandler}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => {
                getFirstName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={last_name}
              onChange={(e) => {
                getLastName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                getEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                getPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirmPass}
              onChange={(e) => {
                getConfirmPass(e.target.value);
              }}
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

      <ToastContainer position="top-end">
        <Toast
          onClose={() => getSuccessStatus(false)}
          className="d-inline-block m-1"
          bg="success"
          show={showSuccess}
          delay={2500}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto text-black">Success !</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body className="text-white">{successMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default SignUp;
