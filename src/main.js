/*
* @Author: CJ Ting
* @Date: 2016-10-29 16:15:28
* @Email: cj.ting@fugetech.com
*/

require("./main.styl")
var $ = require("jquery")
window.$ = $
require("normalize.css")

var LAYOUT_LIST = 0
var LAYOUT_GRID = 1

var page = 0
var layout = LAYOUT_LIST
var url = "https://api.unsplash.com/photos/curated?client_id=47da73da2b740608b32dd1d201e72606000e8db1df885e6f2c72843cddca23a8&per_page=30"

// $.ajax({
//   url: url,
//   data: {
//     page: page,
//   },
//   success: function(data) {
//     buildImages(data)
//   },
//   error: function() {

//   },
// })

var data = require("./data.js")
buildImages(data)

$(".control svg").on("click", function(evt) {
  var $target = $(evt.target).closest("svg")
  if($target.hasClass("active")) return
  if($target.attr("id") === "btn-list") {
    changeLayout(LAYOUT_LIST)
  } else {
    changeLayout(LAYOUT_GRID)
  }
})

function changeLayout(layout) {
  if(layout === LAYOUT_LIST) {
    $target = $("#btn-list")
  } else {
    $target = $("#btn-grid")
  }
  $target.siblings().removeClass("active")
  $target.addClass("active")

  var klass = layout === LAYOUT_LIST ? "layout-list" : "layout-grid"

  $(".photos")
    .removeClass("layout-list")
    .removeClass("layout-grid")
    .addClass(klass)
}

changeLayout(LAYOUT_LIST)

function buildImages(images) {
  images.forEach(function(image) {
    $("<img/>")
      .attr("src", image.urls.regular)
      .addClass("photo")
      .appendTo(".photos")
  })
}
