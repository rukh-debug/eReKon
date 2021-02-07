import React, { useContext, useEffect } from 'react'
import UserContext from "../../context/UserContext"
import ScannedContext from "../../context/ScannedContext"
import DashContext from '../../context/DashContext'
import { useHistory } from 'react-router-dom'

export default function Logout() {

  const { setDashData } = useContext(DashContext)
  const { setUserData } = useContext(UserContext);
  const { setScannedData } = useContext(ScannedContext);

  let history = useHistory()
  useEffect(() => {
    setUserData({
      token: undefined,
      user: undefined
    })
    setScannedData({
      data: undefined
    })
    setDashData({
      data: undefined
    })
    localStorage.setItem("auth-token", "");
    history.push('/')
  })
  
  return (
    <>

    </>
  )
}
