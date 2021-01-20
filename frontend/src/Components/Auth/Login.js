import React, { useState, useContext } from 'react'
import { Container, Form, Row, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import UserContext from "../../context/UserContext"


export default function Login() {

  const history = useHistory()
  const { addToast } = useToasts()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    let user;

    user = { email, password }
    await axios.post("http://localhost:5000/users/login", user)
      .then((res) => {
        addToast("Successfully Logged In", {
          appearance: 'success',
          autoDismiss: true,
        })
        console.log(res)
        setUserData({
          token: res.data.token,
          user: res.data.user
        })
        localStorage.setItem('auth-token', res.data.token)
        history.push('/')
      })
      .catch((err) => {
        addToast(err.response.data.msg, {
          appearance: 'warning',
          autoDismiss: true,
        })
        setError(err.response.data.msg)
      })

  }

  return (
    <>
      <Container fluid>
        <Row lg={3} className="justify-content-md-center ">
          <Form className="register-box" onSubmit={submit}>
            {error ? <Alert variant="warning">{error}</Alert> : null}

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  )
}
