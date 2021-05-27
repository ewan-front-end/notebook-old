// const fs = require('fs')

// console.log(fs.existsSync('.'));

// const {mkdirSync} = require('./docs/.usage/src/tools-fs')

// mkdirSync('./test4/001/002/');

const str = `
## 基础配置

module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {},                    // #默认主题配置
  base: '/bar/',                      // 当站点被部署到一个非根路径
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  },
  // 被注入页面 HTML <head> 额外的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  port: '8080',           // 指定用于dev服务器的端口
  dest: '.vuepress/dist', // 指定vuepress build的输出目录
}



## 默认主题配置
- docs/.vuepress/config.js

module.exports = {
  themeConfig: {`
console.log(str.match(/#{1,6}\s.{1,100}\n/))