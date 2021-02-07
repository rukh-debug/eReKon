import React, { useState, useContext } from 'react'
import { Container, Row, Form, Alert, Button, Dropdown } from 'react-bootstrap'
import ConfigContext from '../../context/ConfigContext'
import Loading from './Loading';

export default function Config() {

  const { configData, setConfigData } = useContext(ConfigContext);

  let submit = () => {
    console.log('submit clicked')
  }

  const [scanType, setScanType] = useState(configData.scanType);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Loading />
    )
  }
  else {
    return (
      <div>
        <>
          <div className="animate__animated animate__fadeIn d-flex align-items-center min-vh-100 py-3 py-md-0">
            <Container>
              <div className="card register-card">
                <Row className="no-gutters">
                  <div className="col-md-7 register-img-card" />
                  <div className="col-md-3">
                    <Form className="card-body" onSubmit={submit}>
                      <div className="title-holder">
                        <h3>Config</h3>
                      </div>
                      {error ? <Alert variant="warning">{error}</Alert> : null}
                      <Form.Group controlId="email">
                        <Form.Label>Scan Mode</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant={scanType === 'fast' ? 'success' : 'warning'}
                            id="dropdown-basic">
                            {scanType}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>

                            <Dropdown.Item
                              onClick={() => {
                                setScanType('fast')
                              }}
                            >Fast</Dropdown.Item>

                            <Dropdown.Item
                              onClick={() => {
                                setScanType('effective')
                              }}
                            >Effective</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Label>Upload Wordlist (.txt)</Form.Label>
                        <Form.File id="exampleFormControlFile1" />
                      </Form.Group>
                      <Button variant="info" type="submit" >
                        {loading ? "Save" : "Saving..."}
                      </Button>
                    </Form>
                  </div>
                </Row>
              </div>
            </Container>
          </div>
        </>
      </div>
    )
  }
}
