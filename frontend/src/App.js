import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Components/pages/Home'
import Login from './Components/Auth/Login'
import Logout from "./Components/Auth/Logout"
import Register from './Components/Auth/Register'
import "./App.css"
import Header from './Components/Layout/Header'
import UserContext from './context/UserContext'
import axios from 'axios'
import { ToastProvider } from 'react-toast-notifications'
import Settings from './Components/pages/Settings'
import Dash from './Components/pages/Dash'
import Config from "./Components/pages/Config"

export default function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

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
          token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn();
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>

      <div>
        <Header />
        <ToastProvider placement="bottom-left">
        <Switch>
          <Route path="/dash" component={Dash} />
          <Route path="/config" component={Config} />
          <Route path="/setting" component={Settings} />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
        </Switch>
          </ToastProvider>

        </div>
    </UserContext.Provider >
  )
}
