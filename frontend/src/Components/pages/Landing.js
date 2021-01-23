import React from 'react'
import { Button, Container } from 'react-bootstrap'
import TextLoop from "react-text-loop";

export default function Landing() {
  return (
    <>
      <header class="masthead" id="landing-header">
        <Container>
          <div class="masthead-subheading">Welcome to eReKon</div>
          <div class="masthead-heading text-uppercase">We Make Recon&nbsp;
          <TextLoop children={["Effective", "Easier", "Smooth", "Fast"]} />
          </div>
          <Button variant="info" className="text-uppercase btn-xl" href="https://github.com/rubenkharel/eReKon" > Documentation </Button>
        </Container>
      </header>
      <section id="features-section" className=" mt-3">
        <Container>
          <div class="text-center">
            <h2 class="section-heading text-uppercase">Features</h2>
            <h3 class="section-subheading text-muted mt-2">Only Features You Will Ever Need</h3>
          </div>
          <div class="row text-center pt-2 mt-4">
            <div class="col-md-4">
              <h4 class="my-3">Scan History</h4>
              <p class="text-muted">We keep record of all your scan History so that you don't have to.</p>
            </div>
            <div class="col-md-4">
              <h4 class="my-3">Vulnrablity Finder</h4>
              <p class="text-muted">We Help you find vulnerablity according to the scan results.</p>
            </div>
            <div class="col-md-4">
              <h4 class="my-3">Scan Modes</h4>
              <p class="text-muted">We have two modes for scan, Fast and Effective.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
