import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import { ToastProvider } from 'react-toast-notifications'
import ProtectedRoute from "react-protected-route-component"
import "./App.css"

import Home from './Components/pages/Home'
import Login from './Components/Auth/Login'
import Logout from "./Components/Auth/Logout"
import Register from './Components/Auth/Register'
import Header from './Components/Layout/Header'
import Settings from './Components/pages/Settings'
import Dash from './Components/pages/Dash'
import Config from "./Components/pages/Config"
import NotFound from './Components/pages/NotFound'

import UserContext from './context/UserContext'
import ScannedContext from "./context/ScannedContext"

export default function App() {

  const [userData, setUserData] = useState({
    isLoading: true,
    token: undefined,
    user: undefined
  });

  const [scannedData, setScannedData] = useState({
    data: undefined,
    folderNum: undefined
  });

  let guardFun = () => {
    if (userData.token) {
      return true
    }
    else {
      return false
    }
  }

  let guardFunRev = () => {
    if (!userData.token) {
      return true
    }
    else {
      return false
    }
  }
  // loads everytime the component loads, if dependencies are provided
  // reloads on dependecies changes
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      // check if the token is still valid
      const tokenRes = await axios.post('http://localhost:5000/users/tokenIsValid', null,
        {
          headers: {
            "x-auth-token": token
          }
        })

      // if token was success, get userinfo from that
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/",
          {
            headers: {
              "x-auth-token": token
            }
          })
        setUserData({
          isLoading: false,
          token,
          user: userRes.data
        })
      }
      else {
        setUserData({
          isLoading: false,
          token: undefined,
          user: undefined
        })
      }
    }

    checkLoggedIn();
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>

      <div>
        <Header />
        <ScannedContext.Provider value={{ scannedData, setScannedData }}>
          <ToastProvider placement="bottom-left">
            <Switch>

              <ProtectedRoute path="/dash" redirectRoute="/login" guardFunction={guardFun} component={Dash} />
              <ProtectedRoute path="/config" redirectRoute="/login" guardFunction={guardFun} component={Config} />
              <ProtectedRoute path="/setting" redirectRoute="/login" guardFunction={guardFun} component={Settings} />

              <Route exact path="/" component={Home} />
              <Route path="/logout" component={Logout} />

              <ProtectedRoute path="/login" redirectRoute="/" guardFunction={guardFunRev} component={Login} />
              <ProtectedRoute path="/register" redirectRoute="/" guardFunction={guardFunRev} component={Register} />

              <Route path="*" component={NotFound} />






            </Switch>
          </ToastProvider>
        </ScannedContext.Provider>


      </div>
    </UserContext.Provider >
  )
}
