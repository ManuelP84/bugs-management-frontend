import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store";
import profile from "../../assets/profile.png";

type Props = {}

const NavigationBar: React.FC<Props> = (props) => {

    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.login.actualUser);
    console.log(user.userImage)

    return (
        <Navbar bg="secondary sticky-top" variant="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <>
                        <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/project">Projects</Nav.Link>
                        <Nav.Link as={Link} to="/addbug">Task</Nav.Link>
                        <Nav.Link as={Link} to="/task-list">Bugs</Nav.Link>
                    </>
                </Nav>
                <span>{user?.userEmail} ({user?.userRol ? user?.userRol : "Reader"})</span>
                <Nav.Link as={Link} to="/project">
                    {user.userImage ? (
                    <img
                        src={user.userImage}
                        height="35"
                        className="d-inline-block align-top rounded-circle"
                    />
                    ) : (
                    <img
                        src={profile}
                        height="35"
                        className="d-inline-block align-top rounded-circle"
                    />
                    )}
          </Nav.Link>

            </Container>
        </Navbar>
    );
};

export default NavigationBar;

