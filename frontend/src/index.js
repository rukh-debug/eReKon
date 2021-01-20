import React from 'react';
import ReactDom from "react-dom"
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import "./style.css"
//import 'antd/dist/antd.css'
//import 'bootstrap/dist/css/bootstrap.min.css';


ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
)