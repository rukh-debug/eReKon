import React from 'react'
import { Carousel, Container } from 'react-bootstrap'

export default function ImageCarousel(props) {

  let scanResponse = props.data.scanResponse
  let currentIndex = props.index  
  let uuid = props.uuid
  let folderNum = props.folderNum

  let urlIndex = []
  let pageTitle = []

  for (let i=0; i<scanResponse.length; i++){
    urlIndex.push(scanResponse[i][`url`])
    pageTitle.push(scanResponse[i][`pageTitle`])
  }

  let imgSrc = (uuid, folderNum, index) => {
    return `http://localhost:5000/img/${uuid}/${folderNum}/${index}.png`
  }

  return (
    <div>
      <Container fluid>
        <div className="cOpen animate__animated animate__bounceInRight">
          <Container>
            
            <Carousel defaultActiveIndex={currentIndex} indicators>

              {urlIndex.map((url, index) => {
                return (
                  <Carousel.Item
                    key={index}
                    interval={10000}>
                    <img
                      className="d-block w-100"
                      src={imgSrc(uuid, folderNum, index)}
                      alt={pageTitle[index]}
                    />
                    <Carousel.Caption
                      key={index}
                      className="darkTransparent">
                      <h3><a rel="noopener noreferrer" target='_blank' href={url}>{url}</a></h3>
                      <p>{pageTitle[index]}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}


            </Carousel>
          </Container>
        </div>
      </Container>
    </div>
  )
}
