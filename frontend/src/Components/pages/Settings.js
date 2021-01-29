import React from 'react'
import { Row, Col, Card, Container } from 'react-bootstrap'

export default function Profile() {
  return (
    <Container>
    <div className=' setting-container'>
    <h3 className='text-muted'>User Settings</h3>

      <Row>

        <Col className='col-4'>
          <Card bg="dark" className='card-container'>
            Hello world
          </Card>
        </Col>

        <Col className='col-8'>
        <Card bg='dark' className='card-container'>
          Hello
        </Card>
        </Col>

      </Row>
    </div>
    </Container>
  )
}
