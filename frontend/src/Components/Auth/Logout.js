import React, { useContext, useEffect } from 'react'
import UserContext from "../../context/UserContext"
import { useHistory } from 'react-router-dom'

export default function Logout() {

  const { setUserData } = useContext(UserContext);
  let history = useHistory()
  useEffect(() => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.setItem("auth-token", "");
    history.push('/')
  })
  
  return (
    <>

    </>
  )
}
