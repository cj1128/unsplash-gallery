/*
* @Author: CJ Ting
* @Date: 2016-10-29 16:13:22
* @Email: cj.ting@fugetech.com
*/

var path = require("path")
var webpack = require("webpack")

var env = process.env.NODE_ENV || "dev"

var devPlugins = []
var productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  })
]

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel",
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: "style!css!stylus",
      },
      {
        test: /\.css$/,
        loader: "style!css",
      },
      {
        test: /\.svg$/,
        loader: "url",
      },
    ],
  },
  plugins: env === "dev" ? devPlugins : productionPlugins,
}
