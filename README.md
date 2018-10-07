## 小程序原生和mpvue代码共存

**问题描述**

> mpvue和wepy等框架是在小程序出来一段时间之后才开始有的，所以会出现的问题有：

1. 兼容已有的项目
2. 平滑的迁移旧的项目
3. 有些场景对小程序的兼容要求特别高的时候需要用原生的方式开发

**解决思路**
1. mpvue的入口文件导入旧版路由配置文件

2. 公共样式 字体图标迁移 app.wxss -> app.vue中less（mpvue的公共样式）

3. 旧项目导入 旧项目old-project拷贝到dist打包的根目录

> 这个要注意的就是拷贝的旧项目不能覆盖mpvue打包文件，只要避免文件夹名字冲突即可


## 使用

```
yarn dev xiejun // 本地启动
yarn build xiejun // 打包
```
开发者工具指向目录
`/dist/xiejun`

## mpvue-native目录结构

```bash
|----build
|----config
|----dist 打包后项目目录
    |----<projetc1>
    |----<projetc2>
|----src 源码
    |----assets 通用资源目录
    |----components 组件
    |----pages 公共页面页面
    |----utils 常用库
    |----<project> 对应单个项目的文件
        |----home mpvue页面
            |----assets
            |----App.vue
            |----main.js
        |----native 原生目录
            |----test 小程序原生页面
                |---web.js
                |---web.wxml
                |---web.wxss
                |---web.json
        |----app.json 路径、分包
        |----App.vue
        |----main.js mpvue项目入口文件
|----static 静态文件
|----package.json
```

**拷贝旧项目到根目录下**

```
 new CopyWebpackPlugin([
    {
    from: path.resolve(__dirname, `../src/${config.projectName}/native`),
    to: "",
    ignore: [".*"]
    }
]),
```

## 多项目共用页面

参考web中一个项目可以有多个spa，我们也可以一个项目里包含多个小程序，多个小程序之间可以共用组件和公用页面，在某些场景下可以节省很多开发时间和维护时间。

打包的时候跟进项目入口打包 （npm run dev <project>）


## 分包

旧项目作为主包
其他根据文件夹 pages xiejun 分包作为两个包加载
具体根据实际情况来分

```js
// app.json文件配置 pages 为主包
  "pages": [
    "test/web"
  ],
  "subPackages": [
    {
      "root": "pages",
      "pages": [
        "about/main"
      ]
    },
    { 
      "root": "xiejun", 
      "pages": [
          "home/main"
        ]
    }
  ],
```


# 其他有关小程序开发坑和技巧

## 字体图标的使用

> 网页我们直接引用css就好`//at.alicdn.com/t/font_263892_1oe6c1cnjiofxbt9.css`

小程序只需要新建一个css文件把在线的css代码拷贝过来放置全局即可

![image](https://shanhs.oss-cn-shenzhen.aliyuncs.com/newboss/2018-10-07/cd21dc5d-2b2d-46a0-9239-56975539e3d7.png)

## 关于小程序和mpvue生命周期

[点此查看mpvue的生命周期](http://mpvue.com/mpvue/#_5)

从官方文档上生命周期的图示上可以看到created是在onLaunch之前，也就是说每个页面的created 出发时机都是整个应用开启的时机，所以一般页面里面都是用`mouted` 来请求数据的。


## 如何判断小程序当前环境

**问题描述**

发布小程序的时候经常担心配置错误的服务器环境
而小程序官方没有提供任何关于判断小程序是体验版还是开发版本的api

**解决方案**

熟悉小程序开发的不难发现小程序https请求的时候的referer是有规律的：`https://servicewechat.com/${appId}/${env}/page-frame.html`

即链接中包含了当前小程序的appId 

- 开发工具中 appId紧接着的dev是 `devtools`

- 设备上 **开发或者体验版** appId紧接着的env是 `0` 

- 设备上 **正式发布版本** appId紧接着的env是数字 如： `20` 发现是小程序的发布版本次数，20代表发布了20次

由此我们可以通过env 这个参数来判断当前是什么环境，

前端是无法获取到referer的，所以需要后端提供一个接口,返回得到referer

**代码**

```
// https://servicewechat.com/${appId}/${env}/page-frame.html
// 默认是正式环境，微信官方并没有说referer规则一定如此，保险起见 try catch
async getEnv() {
    try {
        let referer = await userService.getReferer() // 接口获取referer
        let flag = referer.match(/wx2312312312\/(\S*)\/page-frame/)[1]
        if (flag === 'devtools') { // 开发工具
            // setHostDev()
        } else if (parseInt(flag) > 0) { // 正式版本
            // setHostPro()
        } else { // 开发版本和体验版本
            // setHostTest()
        }
    } catch (e) {
        console.log(e)
    }
}
```
## Promise

官方文档上说Promise 都支持

实际测试发现其实在ios8上是有问题的

所以request.js
```
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
```

## wx.navigateto返回层级问题

官方文档是说目前可以返回10层

实际情况是在某些机型上只能返回5层 和原来一样

所以最好使用wx.navigateto跳转不超过5层

## 压缩兼容问题

在微信开发者工具上传代码的时候 

务必把项目ES6转ES5否则会出现兼问题