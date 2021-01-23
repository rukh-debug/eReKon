import { faCircleNotch, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext } from 'react'
import { Container, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import ScannedData from '../../../context/ScannedContext'
import UserContext from "../../../context/UserContext"
import axios from 'axios'
import Tables from "./Tables"
import Progress from './Progress'

export default function Scanner() {

  const { addToast } = useToasts()

  const [domain, setDomain] = useState();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false)

  const { scannedData, setScannedData } = useContext(ScannedData)
  const { userData } = useContext(UserContext)

  const submit = async (e) => {
    setScannedData({ data: undefined })
    setLoading(true)
    e.preventDefault();
    let token = userData.token
    let url = domain
    let uuid = userData.user.uuid
    let body = { token, url, uuid }
    try {
      const { data } = await axios.post("http://localhost:5000/recon/fast",
        body,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          }
        })
      setLoading(false)
      setScannedData({ data: data })
      addToast(`Scan Success for ${url}`, {
        appearance: "success",
        autoDismiss: true,
      })
    }
    catch (e) {
      setLoading(false)
      try {
        addToast(e.response.data.msg, {
          appearance: "warning",
          autoDismiss: true,
        })
        setError(e.response.data.msg)
      }
      catch (e) {
        addToast(`Error: ${e}`, {
          appearance: "error",
          autoDismiss: true,
        })
        addToast(`Is backend server running?`, {
          appearance: "info",
          autoDismiss: false,
        })
      }
    }

  }
  return (
    <>
      <Container className={!scannedData.data ? "scan-box" : "scan-box-complete"}>
        <h3 className='text-muted'>Scanner</h3>
        <Form onSubmit={submit}>
        <InputGroup>
          <FormControl
            className=" scan-input shadow-scan"
            placeholder="https://example.com/"
            aria-label="Domain To Scan"
            onChange={(e) => setDomain(e.target.value)}
          />

          <InputGroup.Append>
            <Button
              type="submit"
              variant="info"
              onClick={submit}
              disabled={isLoading ? true : false}
            >
             { isLoading ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} /> : <FontAwesomeIcon icon={faSearch} /> } 
            </Button>
          </InputGroup.Append>

        </InputGroup>
        </Form>
        {isLoading ? <Progress data={{progressPer: 20, progressTex: "20%"}} /> : null }

      </Container >
      {scannedData.data && !isLoading ? (<Tables data={scannedData.data} uuid={userData.user.uuid} />) : null}


    </>
  )
}
