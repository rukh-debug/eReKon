import React, { useContext } from 'react'
import Loading from './Loading'
import UserContext from '../../context/UserContext'

export default function Dash() {

  const { userData } = useContext(UserContext)

  if (userData.isLoading) {
    return (
      <>
      <Loading />
      </>
    )
  }

  else{
  return (
    <div>
      Dashboard
    </div>
  )
  }
}
