import React, { useContext, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap'
import ScannedContext from "../../../context/ScannedContext"
import UserContext from '../../../context/UserContext'
import ProgressContext from '../../../context/ProgressContext'
import DashContext from '../../../context/DashContext'
import axios from 'axios'
import sockerIOClient from 'socket.io-client'

const Progress = () => {

  const { userData } = useContext(UserContext);
  const { progressData, setProgressData } = useContext(ProgressContext)
  const { dashData } = useContext(DashContext)


  useEffect(() => {
    let endpoint = `http://localhost:5001`;
    const socket = sockerIOClient(endpoint);

    let emitData = () => {
      socket.emit("UUIDnDirNum", { uuid: userData.user.uuid, folderNum: dashData.data ? dashData.data.length ? dashData.data.length : 0 : 0 })
    }
    const interval = setTimeout(emitData, 3000)
    socket.on('FromAPI', data => {
      setProgressData({...progressData, per: data.progressP, label: data.progressL})
    })
    return () => {
      socket.disconnect()
      clearInterval(interval)
    }
  })

  return (
    <div>
      <ProgressBar
        className="shadow-scan animate__animated animate__zoomIn"
        animated
        now={progressData.per}
        label={progressData.label} />
    </div>
  );
}

export default Progress;
