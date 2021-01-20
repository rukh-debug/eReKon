import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import AuthNav from "../Auth/AuthNav"

export default function Header() {

  return (
    <Container fluid>
      <Navbar bg="dark" expand='lg' variant="dark" className="sticky-top pr-5 pl-5 m-6 navbar-dark border border-right-0 border-left-0 rounded my-nav">
        <Navbar.Brand as={Link} to="/">eReKon</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <AuthNav />
      </Navbar>
      </Container>
  )
}


