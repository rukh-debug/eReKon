import React, { useState, useContext } from 'react'
import { Form, Button, Alert, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

export default function Register() {

  const history = useHistory()
  const { addToast } = useToasts()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setdisplayName] = useState();
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    let newUser;
    if (!displayName) {
      newUser = { email, password, passwordCheck };
    }
    else {
      newUser = { email, password, passwordCheck, displayName };
    }
    await axios.post("http://localhost:5000/users/register", newUser)
      .then((res) => {
        addToast("Success", {
          appearance: 'success',
          autoDismiss: true,
        })
        history.push('/login')
      })
      .catch((err) => {
        console.log(err.response)
        addToast(err.response.data.msg, {
          appearance: 'warning',
          autoDismiss: true,
        })

        if (err.response.status === 401 || 500) {
          setError(err.response.data.msg)
        }
        else {
          addToast("Unexpected Error, Is backend server UP?", {
            appearance: 'error',
            autoDismiss: true,
          })

          setError('Unexpected Error, Is backend server UP?')
        }
      })
  }

  return (
    <Container fluid>
      <Row lg={3} className="justify-content-md-center ">
        <Form className="register-box" onSubmit={submit}>
          {error ? <Alert variant="warning">{error}</Alert> : null}

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
          </Form.Group>
          <Form.Group controlId="displayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Display Name"
              onChange={(e) => setdisplayName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="passwordCheck">
            <Form.Label>VerifyPassword</Form.Label>
            <Form.Control
              type="password"
              placeholder="Verify Password"
              onChange={(e) => setPasswordCheck(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
      </Row>
    </Container>
  )
}
