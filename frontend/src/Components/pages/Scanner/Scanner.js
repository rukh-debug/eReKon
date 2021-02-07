import { faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext } from 'react'
import { Container, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import ScannedData from '../../../context/ScannedContext'
import UserContext from "../../../context/UserContext"
import DashContext from "../../../context/DashContext"
import ProgressContext from '../../../context/ProgressContext'
import ConfigContext from '../../../context/ConfigContext'
import axios from 'axios'
import Tables from "./Tables"
import Progress from './Progress'

export default function Scanner() {

  const { addToast } = useToasts()

  const { scannedData, setScannedData } = useContext(ScannedData)
  const { dashData, setDashData } = useContext(DashContext)
  const { userData } = useContext(UserContext)
  const { progressData, setProgressData } = useContext(ProgressContext)
  const { configData, setConfigData } = useContext(ConfigContext)

  const submit = async (e) => {

    const getConfig = async () => {
      setConfigData({...configData})
      let token = localStorage.getItem('auth-token');
      let body = { token }
      await axios.post(`http://localhost:5000/users/getConfig`, body, 
      {
        headers: {
          "x-auth-token": token
        }
      }).then((res) => {
        setConfigData({...configData, scanType: res.data.type})
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

    setScannedData({ data: undefined })
    setProgressData({
      ...progressData,
      start: true
    })
    //setLoading(true)
    e.preventDefault();
    let token = userData.token
    let url = progressData.domain
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
      setProgressData({
        start: false
      })
      //setLoading(false)
      setScannedData({ data: data })
      addToast(`Scan Success for ${url}`, {
        appearance: "success",
        autoDismiss: true,
      })


    }
    catch (e) {
      //setLoading(false)
      setProgressData({
        start: false
      })
      try {
        addToast(`API error from backend`, {
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
              value={progressData.domain}
              onChange={(e) => setProgressData({...progressData, domain: e.target.value})}
            />

            <InputGroup.Append>
              <Button
                type="submit"
                variant="info"
                onClick={submit}
                disabled={progressData.start ? true : false}
              >
                {progressData.start ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} /> : <FontAwesomeIcon icon={faSearch} />}
              </Button>
            </InputGroup.Append>

          </InputGroup>
        </Form>
        {progressData.start ? <Progress /> : null}

      </Container >
      {scannedData.data ? (<Tables data={scannedData.data} uuid={userData.user.uuid} />) : null}


    </>
  )
}
