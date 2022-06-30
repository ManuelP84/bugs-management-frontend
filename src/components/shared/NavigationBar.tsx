import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectActualUser } from "../../state/slice/loginSlice";

type Props = {};

const NavigationBar: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useSelector(selectActualUser());

  return (
    <Navbar bg="secondary sticky-top" variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Nav className="me-auto">
          <>
            {user?.userRol == "Admin" && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/project">
              Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/task-list">
              Tasks
            </Nav.Link>
            <Nav.Link as={Link} to="/bugs">
              Bugs
            </Nav.Link>
          </>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
