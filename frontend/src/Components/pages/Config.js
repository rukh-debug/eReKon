import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Form,
  Alert,
  Button,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import ConfigContext from "../../context/ConfigContext";

import { useToasts } from 'react-toast-notifications'

export default function Config() {
  const [words, setWords] = useState(null);
  const { addToast } = useToasts()
  const { configData } = useContext(ConfigContext);

  let convertToB64 = async (strinn) => {
    return new Promise((resolve, reject) => {
      try {
        console.log(strinn)
        let converted = btoa(strinn);
        resolve(converted);
      } catch (e) {
        reject(` here is err: ${e}`);
      }
    });
  };

  let submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let b64Encode = await convertToB64(words)
    console.log(b64Encode)
    var data = JSON.stringify({
      b64Enc: b64Encode,
    });

    let token = localStorage.getItem("auth-token");

    var config = {
      method: "post",
      url: "http://localhost:5000/users/saveConfig",
      headers: {
        "x-auth-token": token,
        "scan-type": scanType,
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log(config);

    axios(config)
      .then(function (response) {
        addToast(response.data.message, {
          appearance: 'success',
          autoDismiss: true,
        })
        setLoading(false)
      })
      .catch(function (error) {
        addToast(error.response.data.error, {
          appearance: 'warning',
          autoDismiss: true,
        })
        setLoading(false)
      });
  };

  const [scanType, setScanType] = useState(configData.scanType);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);


  return (
    <div>
      <>
        <div className="animate__animated animate__fadeIn d-flex align-items-center min-vh-100 py-3 py-md-0">
          <Container>
            <div className="card register-card">
              <Row className="no-gutters">
                <div className="col-md-7 config-img-card" />
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
                          variant={
                            scanType === "fast" ? "success" : "warning"
                          }
                          id="dropdown-basic"
                        >
                          {scanType ? scanType : "Choose"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              setScanType("fast");
                            }}
                          >
                            Fast
                            </Dropdown.Item>

                          <Dropdown.Item
                            onClick={() => {
                              setScanType("effective");
                            }}
                          >
                            Effective
                            </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>
                        Paste WordList(line break after each word)
                        </Form.Label>
                      <InputGroup>
                        <FormControl
                          as="textarea"
                          aria-label="With textarea"
                          placeholder="www\n
                          api\n
                          app\n
                          admin\n
                          staging\n
                          etc...\n
                          "
                          onChange={(e) => setWords(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button variant="info" type="submit">
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </Form>
                </div>
              </Row>
            </div>
          </Container>
        </div>
      </>
    </div>
  );

}
