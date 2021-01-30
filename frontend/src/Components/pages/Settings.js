import React, { useContext, useState } from 'react'
import { Row, Col, Card, Container, Form, InputGroup, FormControl } from 'react-bootstrap'
import UserContext from '../../context/UserContext'

export default function Profile() {

  const [password, setPasswod] = useState()
  const [password2, setPassword2] = useState()
  const { userData, setUserData } = useContext(UserContext)

  let submit = () => {
    console.log('submit clicked')
  }

  return (
    <Container>
      <div className=' setting-container'>
        <h3 className='text-muted'>User Settings</h3>

        <Row>

          <Col className='col-4 row-input'>
            <Card bg="dark" className='card-container'>
              <img alt='profile pic' className='imageContainer' width="100" src="https://picsum.photos/200" />
              <div className='muted textContInProfile'>{userData.user.displayName}</div>
              <div className='text-muted textContInProfile'>{userData.user.email}</div>
              <div></div>
            </Card>
          </Col>

          <Col className='col-8'>
            <Card bg='dark' className='card-container'>

              <Form onSubmit={submit}>

                <div className='field-item'>
                  <h6 className='text-muted'>Display Name</h6>
                  <FormControl
                    className="setting-input scan-input "
                    placeholder="https://example.com/"
                    value={userData.user.displayName}
                    onChange={(e) => {
                      setUserData({...userData, user : {displayName : e.target.value}})
                    }}
                  />
                </div>

                <div className='field-item'>
                  <h6 className='text-muted'>Email</h6>
                  <FormControl
                    className="setting-input scan-input"
                    placeholder="email"
                    value={userData.user.email}
                    onChange={(e) => {
                      setUserData({...userData, user : {email : e.target.value}})
                    }}
                  />
                </div>

                <div className='field-item'>
                  <h6 className='text-muted'>Email</h6>
                  <FormControl
                    className="setting-input scan-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPasswod(e.target.value)
                    }}
                  />
                </div>

                <div className='field-item'>
                  <h6 className='text-muted'>Email</h6>
                  <FormControl
                    className="setting-input scan-input"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value)
                    }}
                  />
                </div>

              </Form>

            </Card>
          </Col>

        </Row>
      </div>
    </Container>
  )
}
