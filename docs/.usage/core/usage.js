const PATH = require('path')
const {fetch} = require('../config')
const {writeFile, editWritCommonFile} = fetch('UTILS|fs')
const siteMapCollect = require('./data/siteMapCollect')
const handleUsageContent = require('./src/handleUsageContent')

// 从siteMap中收集聚合内容
const usageArr = siteMapCollect('usage')

// 处理聚合内容&写入文件
const usageContent = handleUsageContent(usageArr)
const usagePath = PATH.resolve(__dirname, '../aggregation.md')
writeFile(usagePath, usageContent)

// 导航菜单写入链接
editWritCommonFile(PATH.resolve(__dirname, '../.vuepress/config.js'), fileObj => {
    let nav = fileObj.themeConfig.nav
    let navCreated = false
    nav.forEach(e => { e.link === '/aggregation' && (navCreated = true) })
    if (navCreated) return true
    nav.push({text:'聚合', link:'/aggregation'})
    return true
})



