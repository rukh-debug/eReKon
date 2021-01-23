import React, { useContext } from 'react';
import { ProgressBar } from 'react-bootstrap'
import ScannedContext from "../../../context/ScannedContext"


const Progress = (props) => {

  const { scannedData } = useContext(ScannedContext)

  return (
    <div>
      <ProgressBar 
      className="shadow-scan animate__animated animate__zoomIn" 
      animated 
      now={props.data.progressPer} 
      label={props.data.progressTex} />
    </div>
  );
}

export default Progress;
