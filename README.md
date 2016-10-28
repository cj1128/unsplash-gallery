# Unsplash Gallery

## 说明

构建一个和[Unsplash](https://unsplash.com/)类似的图片画廊。

- 利用Unsplash API抓取图片，构建一个画廊( Gallery )
- 图片支持两种排布方式，行显示和格子显示。如下所示。
  -  行显示
     ![35E35F19-F6FF-4DA5-AD9E-9B35AF2D19D5](http://ww3.sinaimg.cn/large/9b85365dgw1f93gryiminj20dx0igwfp.jpg)
  -  格子显示
         ![C6238483-4386-42CC-B13E-10CC45CA8711](http://ww4.sinaimg.cn/large/9b85365dgw1f93gryqfnkj211b0l8n23.jpg)



- 用户向下滚动页面时，画廊加载新的图片（惰性加载）
- 图片加载过程中，使用占位图（可以是纯的颜色或者任意其他的内容）
- 点击某个图片时实现全屏放大该图片



## 备注

- Unsplash API

```bash
https://api.unsplash.com/photos/curated?client_id=47da73da2b740608b32dd1d201e72606000e8db1df885e6f2c72843cddca23a8&page=<page>&per_page=<per_page>
# `page`代表获取图片列表的第几页
# per_page代表每页多少图片，最大为30
```

- Unsplash的API有请求次数限制，一小时只能请求100次，如果出现请求无法响应的情况，说明超出限制了。

- 图片惰性加载和图片点击放大等，注意搜索现成解决方案。

