import React from 'react'
import { Button, Container } from 'react-bootstrap'
import TextLoop from "react-text-loop";

export default function Landing() {
  return (
    <>
      <header className="masthead" id="landing-header">
        <Container>
          <div className="masthead-subheading">Welcome to eReKon</div>
          <div className="masthead-heading text-uppercase">We Make Recon&nbsp;
          <TextLoop children={["Effective", "Easier", "Smooth", "Fast"]} />
          </div>
          <Button variant="info" className="text-uppercase btn-xl" href="https://github.com/rubenkharel/eReKon" > Documentation </Button>
        </Container>
      </header>
      <section id="features-section" className=" mt-3">
        <Container>
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Features</h2>
            <h3 className="section-subheading text-muted mt-2">Only Features You Will Ever Need</h3>
          </div>
          <div className="row text-center pt-2 mt-4">
            <div className="col-md-4">
              <h4 className="my-3">Scan History</h4>
              <p className="text-muted">We keep record of all your scan History so that you don't have to.</p>
            </div>
            <div className="col-md-4">
              <h4 className="my-3">Vulnrablity Finder</h4>
              <p className="text-muted">We Help you find vulnerablity according to the scan results.</p>
            </div>
            <div className="col-md-4">
              <h4 className="my-3">Scan Modes</h4>
              <p className="text-muted">We have two modes for scan, Fast and Effective.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
