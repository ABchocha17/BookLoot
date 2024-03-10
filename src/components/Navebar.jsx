import React from 'react';
import {Container,Nav,Navbar} from 'react-bootstrap';


export default function Navebar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="/" >Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/bookloot">Home</Nav.Link>
            <Nav.Link href="/bookloot/list">Add Listing</Nav.Link>
            <Nav.Link href="/bookloot/register">Register</Nav.Link>
            <Nav.Link href="/bookloot/login">Login</Nav.Link>
            <Nav.Link href="/bookloot/books/Orders">orders</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                Separated link
                </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}