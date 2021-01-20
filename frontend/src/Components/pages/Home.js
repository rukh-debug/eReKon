import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import Scanner from "./Scanner/Scanner"
import Landing from "./Landing"

export default function Home() {

  const { userData } = useContext(UserContext)

  return (
    <div>
      {
        userData.user
          ? (<Scanner />)
          : (<Landing />)
    }
    </div>
  )
}
