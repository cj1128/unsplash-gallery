/*
* @Author: CJ Ting
* @Date: 2016-11-21 15:28:46
* @Email: cj.ting@fugetech.com
*/

import "normalize.css"
import "font-awesome/css/font-awesome.min.css"
import "font/nanumpenscript.css"
import React from "react"
import DOM from "react-dom"
import App from "app.jsx"

const Entry = () =>
  <App />

DOM.render(<Entry />, document.getElementById("app-container"))

if(__DEV__) {
  module.hot.accept()
}
