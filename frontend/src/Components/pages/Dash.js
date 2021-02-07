import React, { useContext, useState } from 'react'
import Loading from './Loading'
import UserContext from '../../context/UserContext'
import DashContext from '../../context/DashContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Card, Row, Button, Col } from 'react-bootstrap'
import { faSearch, faCircleNotch, faLink, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import ScannedContext from '../../context/ScannedContext'
import { useHistory } from "react-router-dom"

export default function Dash() {

  let history = useHistory()
  const [loading, setLoading] = useState(false)
  const { dashData } = useContext(DashContext)
  const { userData } = useContext(UserContext)
  const { scannedData, setScannedData } = useContext(ScannedContext)

  let totalSubdomains = 9

  let getDomainFromArr = (arr) => {
    let firstItem = arr[0]
    let url = new URL(firstItem.url)
    return url.host
  }

  // let getScanType = (arr) => {
  //   let scanType = 
  // }

  if (userData.isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  //else if (!dashData.data) {
  //  return (
  //    <>
  //      Sorry you have no data
  //    </>
  //  )
  //}

  else {
    return (<>
      <Container className='dash-cont'>
        <div className='d-flex justify-content-between'>
          <h3 className='text-muted'>DashBoard</h3>
          <h3 className='text-muted'>Welcome {userData.user.displayName}</h3>
        </div>
        <Row xs={1} sm={3} xl={3} noGutters='true'>

          <Col className="col-lg-4 ml-auto">
            <Card bg='info'>
              <div className="p-3 media d-flex">
                <h1 className="mr-auto"><FontAwesomeIcon icon={faLink} /></h1>
                <div className="ml-auto">
                  <h3>{totalSubdomains ? totalSubdomains : "0"}</h3>
                  <span>Subdomains</span>
                </div>
              </div>
            </Card>
          </Col>

          <Col className="col-lg-4">
            <Card bg='info'>
              <div className="p-3 media d-flex">
                <h1 className="mr-auto"><FontAwesomeIcon icon={faSearch} /></h1>
                <div className="ml-auto">
                  <h3>{dashData.data ? dashData.data.length ? dashData.data.length : "0" : "0"}</h3>
                  <span>Total Scan</span>
                </div>
              </div>
            </Card>
          </Col>

          <Col className="col-lg-4 ml-auto">
            <Card bg='info'>
              <div className="p-3 media d-flex">
                <h1 className="mr-auto"><FontAwesomeIcon icon={faLink} /></h1>
                <div className="ml-auto">
                  <h3>{totalSubdomains}</h3>
                  <span>Something</span>
                </div>
              </div>
            </Card>
          </Col>

        </Row>
        <h4 className='text-muted mt-5'>Scan History</h4>


        {dashData?.data?.map((item, index) => {
          return (
            <section key={index}>
              <Col className='ml-auto'>
                <Card bg='dark'>
                  <div className="p-3 media d-flex justify-content-between">
                    <div><h1>{index + 1}.</h1></div>
                    <div>{getDomainFromArr(item)}</div>
                    <div>{item[index]?.scanType}</div>
                    <div className="d-flex flex-row"><h4>{item.length}&nbsp;</h4>Subdomains</div>
                    <div>
                      <Button
                        variant="info"
                        onClick={() => {
                          setLoading({ loading: true, index: index })
                          setScannedData({ ...scannedData, data: { scanResponse: dashData.data[index], folderNum: index } })
                          history.push('/')
                        }}>
                        {loading && (loading.index === index) ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} /> : <FontAwesomeIcon icon={faArrowCircleRight} />}
                      </Button></div>
                  </div>
                </Card>
              </Col>
            </section>
          )
        })}




      </Container>
    </>
    )
  }
}
