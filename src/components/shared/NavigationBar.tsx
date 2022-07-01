import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectActualUser } from "../../state/slice/loginSlice";
import { logOut } from "../../state/slice/loginSlice";

type Props = {};

const NavigationBar: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useSelector(selectActualUser());

  return (
    <Navbar  bg="secondary sticky-top" variant="dark" expand="lg">
      <Container>
        <Nav className="me-auto">
          <>
            {user?.userRol == "Admin" && (
              <Nav.Link as={Link} to="/admin">
                Administrador
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/project">
              Proyectos
            </Nav.Link>
          </>
        </Nav>
        <Nav className="justify-content-right">
          <Nav.Link>
            <span>
              {user?.userEmail} ({user?.userRol ? user?.userRol : "Reader"})
            </span>
          </Nav.Link>
          <Nav.Link>
            {user?.userImage ? (
              <img
                src={user?.userImage}
                height="35"
                className="d-inline-block align-top rounded-circle"
              />
            ) : (
              <img
                src={"https://i.ibb.co/0MjtbfF/profile.png"}
                height="35"
                className="d-inline-block align-top rounded-circle"
              />
            )}
          </Nav.Link>
          <Nav.Link>
            <span onClick={handleLogOut}> Log out </span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
