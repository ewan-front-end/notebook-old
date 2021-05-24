const {writeFile, editWritCommonFile} = require('./src/tools-fs')
const path = require('path')
const siteMapCollect = require('./src/siteMapCollect')
const handleSceneContent = require('./src/handleSceneContent')

// 从siteMap中收集内容
const sceneArr = siteMapCollect('scene')

// 处理聚合内容&写入文件
const sceneContent = handleSceneContent(sceneArr)
const scenePath = path.resolve(__dirname, '../scene.md')
writeFile(scenePath, sceneContent)

// 导航菜单写入链接
editWritCommonFile(path.resolve(__dirname, '../.vuepress/config.js'), fileObj => {
    let nav = fileObj.themeConfig.nav
    let navCreated = false
    nav.forEach(e => { e.link === '/scene' && (navCreated = true) })
    if (navCreated) return true
    nav.push({text:'场景', link:'/scene'})
    return true
})