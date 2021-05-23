const {writeFile, editWritCommonFile} = require('./src/tools-fs')
const path = require('path')
const siteMapCollect = require('./src/siteMapCollect')
const handleUsageContent = require('./src/handleUsageContent')

// 从siteMap中收集聚合内容
const usageArr = siteMapCollect('usage')

// 处理聚合内容&写入文件
const usageContent = handleUsageContent(usageArr)
const usagePath = path.resolve(__dirname, '../aggregation.md')
writeFile(usagePath, usageContent)

// 导航菜单写入链接
editWritCommonFile(path.resolve(__dirname, '../.vuepress/config'), fileObj => {
    let nav = fileObj.themeConfig.nav
    let navCreated = false
    nav.forEach(e => { e.link === '/aggregation' && (navCreated = true) })
    if (!navCreated) return true
})



