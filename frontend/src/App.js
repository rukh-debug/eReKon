import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
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
import DashContext from './context/DashContext'
import ProgressContext from './context/ProgressContext'
import ConfigContext from './context/ConfigContext'

export default function App() {

  const [configData, setConfigData] = useState({
    scanType: undefined
  })

  const [userData, setUserData] = useState({
    isLoading: true,
    token: undefined,
    user: undefined
  });

  const [scannedData, setScannedData] = useState({
    data: undefined,
    folderNum: undefined
  });

  const [dashData, setDashData] = useState({
    data: undefined,
    dashIsLoading: true
  })

  const [progressData, setProgressData] = useState({
    start: false,
    per: 100,
    label: "Starting scan..."
  })

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

  let addToLocal = async (token) => {
    return new Promise((res) => {
      res(localStorage.setItem("auth-token", token))
    });
  }

  useEffect(() => {

    const getConfig = async () => {
      setConfigData({...configData})
      let token = localStorage.getItem('auth-token');
      let body = { token }
      await axios.post(`http://localhost:5000/users/getConfig`, body, 
      {
        headers: {
          "x-auth-token": token
        }
      }).then((res) => {
        console.log(res)
        setConfigData({...configData, scanType: res.data.scantype})
      })
    }

    const getDash = async () => {
      setDashData({ ...dashData, dashIsLoading: true })

      let token = localStorage.getItem("auth-token");
      let body = { token }
      await axios.post(`http://localhost:5000/recon/dash`, body,
        {
          headers: {
            "x-auth-token": token
          }
        }
      ).then((res) => {
        setDashData({ data: res.data.data, dashIsLoading: false })
      }).catch((e) => {
        setDashData({ ...dashData, dashIsLoading: false })
      })
    }

    setProgressData({ ...progressData })
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
        await addToLocal(token)
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
        await getDash();
        await getConfig();

      }
      else {
        setUserData({
          isLoading: false,
          token: undefined,
          user: undefined
        })
        await getDash();

      }
    }

    checkLoggedIn();

  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <DashContext.Provider value={{ dashData, setDashData }}>
        <ProgressContext.Provider value={{ progressData, setProgressData }}>
          <ScannedContext.Provider value={{ scannedData, setScannedData }}>
            <ConfigContext.Provider value={{ configData, setConfigData }}>

            <div>
              <Header />
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


            </div>

            </ConfigContext.Provider>
          </ScannedContext.Provider>
        </ProgressContext.Provider>
      </DashContext.Provider>
    </UserContext.Provider >
  )
}
