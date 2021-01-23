import UserContext from "../../context/UserContext"
import React, { useContext } from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function AuthNav() {

  const { userData } = useContext(UserContext)

  return (
    <>
      {userData.user ? (
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" navbar>
            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/config">Config</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/setting">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/dash">DashBoard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      ) : (<Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" navbar>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>)}

    </>
  )
}
