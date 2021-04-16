import React, { useContext, useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap'
import ProgressContext from '../../../context/ProgressContext'
import sockerIOClient from 'socket.io-client'

const Progress = () => {
  const { progressData, setProgressData } = useContext(ProgressContext)

  let endpoint = `http://localhost:5001`;
  const socket = sockerIOClient(endpoint);
  let roomName = 'eReKon'
  socket.emit('login', roomName, error => {
    if (error){
      console.log('cannot connect to room for some reason')
    }
    console.log(`Connected to ${roomName}`)
  })

  useEffect(() => {
    socket.on('progress', fetchedData => {
      setProgressData({...progressData, ...fetchedData})
    })
  })

  return (
    <div>
      <ProgressBar
        className="shadow-scan animate__animated animate__zoomIn"
        animated
        now={progressData.per ? progressData.per : 100}
        label={progressData.what? progressData.what : "Starting"} />
    </div>
  );
}

export default Progress;
