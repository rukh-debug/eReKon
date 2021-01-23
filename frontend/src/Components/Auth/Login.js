import React, { useState, useContext } from 'react'
import { Container, Form, Row, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import UserContext from "../../context/UserContext"
import logo from '../../Assets/img/logo.png'
import Loading from "../pages/Loading"


export default function Login() {

  const history = useHistory()
  const { addToast } = useToasts()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState();

  const { setUserData, userData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    let user;
    setLoading(true)
    user = { email, password }
    await axios.post("http://localhost:5000/users/login", user)
      .then((res) => {
        addToast("Successfully Logged In", {
          appearance: 'success',
          autoDismiss: true,
        })
        setUserData({
          token: res.data.token,
          user: res.data.user
        })
        localStorage.setItem('auth-token', res.data.token)
        setLoading(false)
        history.push('/')
      })
      .catch((err) => {
        setLoading(false)
        try {
          addToast(err.response.data.msg, {
            appearance: 'warning',
            autoDismiss: true,
          })
          setError(err.response.data.msg)
        }
        catch (e) {
          addToast(`Error: ${e}`, {
            appearance: 'warning',
            autoDismiss: true,
          })
        }
      })

  }

  if (userData.isLoading) {
    return (<Loading />)
  }
  else {
    return (
      <>
        <div className="animate__animated animate__fadeIn d-flex align-items-center min-vh-100 py-3 py-md-0">
          <Container>
            <div className="card register-card">
              <Row className="no-gutters">
                <div className="col-md-7 register-img-card" />
                <div className="col-md-3">
                  <Form className="card-body" onSubmit={submit}>
                    <div className="title-holder">
                      <h3>Login</h3>
                    </div>
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
                    <Button variant="info" type="submit" >
                      {!isLoading ? "Login" : "Logging in..."}
                    </Button>
                  </Form>
                </div>
              </Row>
            </div>
          </Container>
        </div>
      </>
    )
  }
}
