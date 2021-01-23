import React, { useState, useEffect, useContext } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthNav from "../Auth/AuthNav"
import logo from '../../Assets/img/logo.png'
import UserContext from '../../context/UserContext'

export default function Header() {

  const { userData } = useContext(UserContext)
  const [scroll, setScroll] = useState(0)  

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    });
  }, []); 


  return (
    <Container fluid>
      <Navbar expand='lg' variant="dark" className={scroll? "fixed-top black-nav" : "fixed-top"}>
          <Navbar.Brand className="ml-200" as={Link} to="/"><img src={logo} alt="logo" width="120" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          { userData.isLoading ? null : <AuthNav /> }
      </Navbar>
    </Container>
  )
}


