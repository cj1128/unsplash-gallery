/*
* @Author: CJ Ting
* @Date: 2016-10-29 16:13:22
* @Email: cj.ting@fugetech.com
*/

var path = require("path")

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: "style!css!stylus",
      },
      {
        test: /\.css$/,
        loader: "style!css",
      },
    ],
  },
}
