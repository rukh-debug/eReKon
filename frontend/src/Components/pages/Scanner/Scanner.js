import { faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext } from 'react'
import { Container, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import ScannedData from '../../../context/ScannedContext'
import UserContext from "../../../context/UserContext"
import DashContext from "../../../context/DashContext"
import ConfigContext from '../../../context/ConfigContext'
import axios from 'axios'
import Tables from "./Tables"
import Progress from './Progress'

export default function Scanner() {

  const { addToast } = useToasts()

  const [scanning, setScanning] = useState(false)
  const [domain, setDomain] = useState(null)

  const { scannedData, setScannedData } = useContext(ScannedData)
  const { dashData, setDashData } = useContext(DashContext)
  const { userData } = useContext(UserContext)
  const { configData, setConfigData } = useContext(ConfigContext)

  const submit = async (e) => {

    const getConfig = async () => {
      setConfigData({ ...configData })
      let token = localStorage.getItem('auth-token');
      let body = { token }
      await axios.post(`http://localhost:5000/users/getConfig`, body,
        {
          headers: {
            "x-auth-token": token
          }
        }).then((res) => {
          setConfigData({ ...configData, scanType: res.data.type })
        })
    }

    const getDash = async () => {
      setDashData({ ...dashData, dashIsLoading: true })
      let token = userData.token
      let body = { token }
      await axios.post(`http://localhost:5000/recon/dash`, body,
        {
          headers: {
            "x-auth-token": userData.token
          }
        }
      ).then((res) => {
        setDashData({ data: res.data.data, dashIsLoading: false })
      }).catch((e) => {
        // addToast(e.response.data.error, {
        //   appearance: "warning",
        //   autoDismiss: true,
        // })
        setDashData({ ...dashData, dashIsLoading: false })
      })
    }
    setScanning(true)
    setScannedData({ data: undefined })
    e.preventDefault();
    let token = userData.token
    let url = domain
    let socketRoom = 'eReKon'
    let body = { token, url, socketRoom }
    try {
      const { data } = await axios.post("http://localhost:5000/recon/fullscan",
        body,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          }
        })
      setScanning(false)
      setScannedData({ data: data })
      addToast(`Scan Success for ${url}`, {
        appearance: "success",
        autoDismiss: true,
      })


    }
    catch (e) {
      console.log(e)
      setScanning(false)
      try {
        addToast(`Sorry bad url`, {
          appearance: "warning",
          autoDismiss: true,
        })
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

    getDash();
    getConfig();

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
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />

            <InputGroup.Append>
              <Button
                type="submit"
                variant="info"
                onClick={submit}
                disabled={scanning ? true : false}
              >
                {scanning ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} /> : <FontAwesomeIcon icon={faSearch} />}
              </Button>
            </InputGroup.Append>

          </InputGroup>
        </Form>
        {scanning ? <Progress /> : null}

      </Container >
      {scannedData.data ? (<Tables data={scannedData.data} uuid={userData.user.uuid} />) : null}


    </>
  )
}
