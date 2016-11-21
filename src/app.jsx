/*
* @Author: CJ Ting
* @Date: 2016-11-01 20:15:42
* @Email: cj.ting@fugetech.com
*/

import "./app.styl"

import React from "react"
import cx from "classnames"
import Loading from "_loading"
import axios from "axios"
import Waypoint from "react-waypoint"
import Fake from "./fake"

const LayoutList = 0
const LayoutGrid = 1
const PerPage = 30
const ClientID = "47da73da2b740608b32dd1d201e72606000e8db1df885e6f2c72843cddca23a8"

const URL = "https://api.unsplash.com/photos"

export default class App extends React.Component {
  constructor() {
    super()
    this.page = 1
    this.state = {
      layout: LayoutList,
      photos: [],
      showLoading: true,
      zoominImage: "",
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    // this.setState({
    //   showLoading: false,
    //   photos: this.state.photos.concat(Fake),
    // })
    // return
    axios.get(URL, {
      params: {
        page: this.page++,
        per_page: PerPage,
        client_id: ClientID,
      },
    }).then(res => {
      this.setState({
        showLoading: false,
        photos: this.state.photos.concat(res.data),
      })
    })
  }

  changeLayout = layout => {
    this.setState({
      layout: layout,
    })
  }

  renderImage = (photo, index) => {
    // make sure we only fetch once, cause WayPoint onEnter will
    // be trigged many times
    let hasFetched = false
    return (
      <div
        key={ photo.id }
        className="gallery__photo-wrapper"
      >
        <div
          className="gallery__photo-container"
          style={ {
            paddingBottom: (photo.height / photo.width * 100) + "%",
          } }
        >
          <img
            className="gallery__photo"
            src={ photo.urls.regular }
          />

          <div
            onClick={ () => this.setState({zoominImage: photo.urls.full}) }
            className="gallery__photo-hover"
          />

          {
            index === this.state.photos.length - 6 ?
              <Waypoint
                onEnter={ () => {
                  if(hasFetched) return
                  hasFetched = true
                  this.setState({showLoading: true})
                  this.fetchData()
                } }
              />
              :
              null
          }
        </div>


        <div className="gallery__photo-info">
          <div className="gallery__photo-info__like">
            <i className="fa fa-heart" />
            <span>{ photo.likes }</span>
          </div>

          <a
            target="_blank"
            href={ photo.user.links.html }
            className="gallery__photo-info__person"
          >
            { photo.user.name }
          </a>

          <a
            href={ photo.urls.raw }
            download={ true }
            className="gallery__photo-info__download"
          >
            <i className="fa fa-arrow-down" />
          </a>
        </div>
      </div>
    )
  }

  renderGrid = () => {
    const data1 = this.state.photos.filter((d, i) => i % 3 === 0)
    const data2 = this.state.photos.filter((d, i) => i % 3 === 1)
    const data3 = this.state.photos.filter((d, i) => i % 3 === 2)
    return (
      <div className="gallery__grid-photos">
        <div
          className="gallery__grid-photos__grid"
        >
          { data1.map((photo, index) => this.renderImage(photo, index*3)) }
        </div>
        <div
          className="gallery__grid-photos__grid"
        >
          { data2.map((photo, index) => this.renderImage(photo, index*3+1)) }
        </div>
        <div
          className="gallery__grid-photos__grid"
        >
          { data3.map((photo, index) => this.renderImage(photo, index*3+2)) }
        </div>
      </div>
    )
  }

  renderList = () => {
    return (
      <div className="gallery__list-photos">
        {
          this.state.photos.map(this.renderImage)
        }
      </div>
    )
  }

  render() {
    return (
      <div className="gallery">
        <div
          className={ cx("gallery__zoomin", {"gallery__zoomin--hide": this.state.zoominImage.length === 0}) }
          style={ {
            backgroundImage: `url(${this.state.zoominImage})`,
          } }
          onClick={ () => this.setState({ zoominImage: ""}) }
        />

        <h1 className="gallery__header">
          My Unsplash Gallery
        </h1>

        <div className="gallery__layout">
          <ListSVG
            className={ cx("gallery__layout__btn", {"gallery__layout__btn--active": this.state.layout === LayoutList})}
            onClick={ this.changeLayout }
          />
          <GridSVG
            className={ cx("gallery__layout__btn", {"gallery__layout__btn--active": this.state.layout === LayoutGrid})}
            onClick={ this.changeLayout }
          />
        </div>

        {
          this.state.layout === LayoutList ?
            this.renderList()
            :
            this.renderGrid()
        }

        {
          this.state.showLoading ?
            <Loading />
            :
            null
        }
      </div>
    )
  }
}

const ListSVG = React.createClass({
  render() {
    return (
      <svg onClick={ () => this.props.onClick(LayoutList) } className={ this.props.className } version="1.1" viewBox="0 0 32 32" width="32" height="32" aria-labelledby="icon-title-4721 icon-desc-4722" aria-hidden="false" data-reactid=".rwftimv01s.0.4.0.3.0.1.$single.0"><path d="M30 14c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2h-28c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2m0 18c-1.1 0-2-.9-2-2v-10c0-1.1.9-2 2-2h28c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2" data-reactid=".rwftimv01s.0.4.0.3.0.1.$single.0.1"></path></svg>
    )
  }
})

const GridSVG = React.createClass({
  render() {
    return (
      <svg onClick={ () => this.props.onClick(LayoutGrid) } className={ this.props.className } version="1.1" viewBox="0 0 32 32" width="32" height="32" aria-labelledby="icon-title-4723 icon-desc-4724" aria-hidden="false" data-reactid=".rwftimv01s.0.4.0.3.0.1.$multi.0"><path d="M0 2v10c0 1.106 0.896 2 2 2h10c1.104 0 2-0.894 2-2v-10c0-1.106-0.896-2-2-2h-10c-1.104 0-2 0.894-2 2zM2 18c-1.104 0-2 0.894-2 2v10c0 1.106 0.896 2 2 2h10c1.104 0 2-0.894 2-2v-10c0-1.106-0.896-2-2-2h-10zM20 18c-1.106 0-2 0.894-2 2v10c0 1.106 0.894 2 2 2h10c1.106 0 2-0.894 2-2v-10c0-1.106-0.894-2-2-2h-10zM20 0c-1.106 0-2 0.894-2 2v10c0 1.106 0.894 2 2 2h10c1.106 0 2-0.894 2-2v-10c0-1.106-0.894-2-2-2h-10z" data-reactid=".rwftimv01s.0.4.0.3.0.1.$multi.0.1"></path></svg>
    )
  },
})
