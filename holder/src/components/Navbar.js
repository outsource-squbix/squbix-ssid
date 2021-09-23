import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { logout } from "../services/authService";
import { useHistory } from "react-router";
const NavBar = ({ authenticatedStatus, sendAuthStatus }) => {
  const history = useHistory();
  const [authStatus, getAuthStatus] = useState(authenticatedStatus);

  useEffect(() => {
    getAuthStatus(authenticatedStatus);
  }, [authenticatedStatus, authStatus]);

  const handleLogOut = () => {
    logout();
    sendAuthStatus(false);
    history.push("/login");
  };
  return (
    <div>
      {" "}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Holder Portal</Navbar.Brand>
          <Nav className="me-auto">
            {authenticatedStatus ? (
              <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
