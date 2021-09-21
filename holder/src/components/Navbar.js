import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
const NavBar = ({ isAutenticated }) => {
  return (
    <div>
      {" "}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Holder Portal</Navbar.Brand>
          <Nav className="me-auto">
            {isAutenticated ? null : (
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
