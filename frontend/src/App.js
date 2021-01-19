import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './Components/Pages/Home'
import Register from './Components/auth/Register'
import Login from './Components/auth/Login'
import Header from './Components/layout/Header'

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </Router>
    </>
  )
}
