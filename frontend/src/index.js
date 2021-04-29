import React from 'react';
import ReactDom from "react-dom"
import { BrowserRouter } from 'react-router-dom'
import App from './App'
//import 'antd/dist/antd.css'
import "./style.css"
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
axios.defaults.baseURL = 'http://54.162.239.188:5000'

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
)