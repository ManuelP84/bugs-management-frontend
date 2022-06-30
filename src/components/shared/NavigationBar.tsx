import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

type Props = {}

const NavigationBar: React.FC<Props> = (props) => {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [showLoginModal, setShowLoginModal] = useState(false);

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
            </Container>
        </Navbar>
    );
};

export default NavigationBar;

