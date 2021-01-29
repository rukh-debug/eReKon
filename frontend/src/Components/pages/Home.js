import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import DashContext from "../../context/DashContext"
import Scanner from "./Scanner/Scanner"
import Landing from "./Landing"
import Loading from './Loading'

export default function Home() {

  const { userData } = useContext(UserContext)
  const { dashData } = useContext(DashContext)

  if (userData.isLoading || dashData.dashIsLoading ) {
    return (
      <>
      <Loading />
      </>
    )
  }


  else {
    return (
      <>
        {
          userData.user
            ? (<Scanner />)
            : (<Landing />)
        }
      </>
    )
  }
}
