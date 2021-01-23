import { faCircleNotch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function Loading() {
  return (
    <>
      <Container>
        <div className='go-center'><h1><FontAwesomeIcon className="fa-spin orange loading-container" icon={faCircleNotch} /> </h1></div>
      </Container>
    </>
  )
}
