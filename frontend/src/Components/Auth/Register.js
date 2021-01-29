import React, { useState, useContext } from 'react'
import { Form, Button, Alert, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Loading from "../pages/Loading"

export default function Register() {

  const { userData } = useContext(UserContext)

  const history = useHistory()
  const { addToast } = useToasts()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setdisplayName] = useState();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);


  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
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
        setLoading(false)
        history.push('/login')
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response)
        addToast(`Error from backend`, {
          appearance: 'warning',
          autoDismiss: true,
        })
        if (err.response) {


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
        }
      })
  }

  if (userData.isLoading) {
    return (<Loading />)
  }
  else {
    return (
      <div className="animate__animated animate__fadeIn d-flex align-items-center min-vh-100 py-3 py-md-0">
        <Container>
          <div className="card register-card">
            <Row className="no-gutters">
              <div className="col-md-7 register-img-card" />
              <div className="col-md-3">
                <Form className="card-body" onSubmit={submit}>
                  <div className="title-holder">
                    <h3>Register</h3>
                  </div>
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
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setPasswordCheck(e.target.value)} />
                  </Form.Group>
                  <Button variant="info" type="submit">
                    {!isLoading ? "Register" : "Registering..."}
                  </Button>
                </Form></div>
            </Row>
          </div>
        </Container>
      </div>
    )
  }
}
