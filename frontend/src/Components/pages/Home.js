import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import Scanner from "./Scanner/Scanner"
import Landing from "./Landing"
import { Container } from "react-bootstrap"
import Loading from './Loading'

export default function Home() {

  const { userData } = useContext(UserContext)

  if (userData.isLoading) {
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
