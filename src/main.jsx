/*
* @Author: CJ Ting
* @Date: 2016-11-01 20:15:42
* @Email: cj.ting@fugetech.com
*/

import React from "react"
import DOM from "react-dom"

var $ = require("jquery")

require("normalize.css")
require("./main.styl")

const LAYOUT_LIST = 0
const LAYOUT_GRID = 1

const url = "https://api.unsplash.com/photos/curated?client_id=47da73da2b740608b32dd1d201e72606000e8db1df885e6f2c72843cddca23a8&per_page=30"

const App = React.createClass({
  componentDidMount() {
    // return
    console.log(this)
    $.ajax({
      url: url,
      data: {
        page: 0,
      },
      success: data => {
        this.setState({
          photos: data,
        })
      },
    })
  },

  getInitialState() {
    return {
      layout: LAYOUT_LIST,
      photos: require("./data.js"),
    }
  },

  changeLayout(layout) {
    this.setState({
      layout: layout,
    })
  },

  render() {
    const klass = this.state.layout === LAYOUT_LIST ?
      "layout-list"
      :
      "layout-grid"
    return (
      <div className="gallery">
        <h1>My Unsplash Gallery</h1>
        <div className="control">
          <ListSVG
            className={ this.state.layout === LAYOUT_LIST ? "active" : "" }
            onClick={ this.changeLayout }
          />
          <GridSVG
            className={ this.state.layout === LAYOUT_GRID ? "active" : "" }
            onClick={ this.changeLayout }
          />
        </div>

        <div className={ "photos " + klass }>
          {
            this.state.photos.map(photo => {
              return (
                <img
                  className="photo"
                  key={ photo.id }
                  src={ photo.urls.regular }
                />
              )
            })
          }
        </div>
      </div>
    )
  },
})

const ListSVG = React.createClass({
  render() {
    return (
      <svg onClick={ () => this.props.onClick(LAYOUT_LIST) } className={ this.props.className } version="1.1" viewBox="0 0 32 32" width="32" height="32" aria-labelledby="icon-title-4721 icon-desc-4722" aria-hidden="false" data-reactid=".rwftimv01s.0.4.0.3.0.1.$single.0"><path d="M30 14c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2h-28c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2m0 18c-1.1 0-2-.9-2-2v-10c0-1.1.9-2 2-2h28c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2" data-reactid=".rwftimv01s.0.4.0.3.0.1.$single.0.1"></path></svg>
    )
  }
})

const GridSVG = React.createClass({
  render() {
    return (
      <svg onClick={ () => this.props.onClick(LAYOUT_GRID) } className={ this.props.className } id="btn-grid" version="1.1" viewBox="0 0 32 32" width="32" height="32" aria-labelledby="icon-title-4723 icon-desc-4724" aria-hidden="false" data-reactid=".rwftimv01s.0.4.0.3.0.1.$multi.0"><path d="M0 2v10c0 1.106 0.896 2 2 2h10c1.104 0 2-0.894 2-2v-10c0-1.106-0.896-2-2-2h-10c-1.104 0-2 0.894-2 2zM2 18c-1.104 0-2 0.894-2 2v10c0 1.106 0.896 2 2 2h10c1.104 0 2-0.894 2-2v-10c0-1.106-0.896-2-2-2h-10zM20 18c-1.106 0-2 0.894-2 2v10c0 1.106 0.894 2 2 2h10c1.106 0 2-0.894 2-2v-10c0-1.106-0.894-2-2-2h-10zM20 0c-1.106 0-2 0.894-2 2v10c0 1.106 0.894 2 2 2h10c1.106 0 2-0.894 2-2v-10c0-1.106-0.894-2-2-2h-10z" data-reactid=".rwftimv01s.0.4.0.3.0.1.$multi.0.1"></path></svg>
    )
  },
})

DOM.render(<App />, document.getElementById("app-container"))
