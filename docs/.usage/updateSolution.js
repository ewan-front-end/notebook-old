const {writeFile, editWritCommonFile, readFile} = require('./src/tools-fs')
const Path = require('path')
const {LIST_SOLUTION} = require('./data/listSolution')
const STATIC_SOLUTION = readFile(Path.resolve(__dirname, './resources/md/solution.md'))

// 处理聚合内容&写入文件
writeFile(Path.resolve(__dirname, '../solution.md'), STATIC_SOLUTION)
// 导航菜单写入链接
editWritCommonFile(Path.resolve(__dirname, '../.vuepress/config.js'), fileObj => {
    let nav = fileObj.themeConfig.nav
    let navCreated = false
    nav.forEach(e => { e.link === '/solution' && (navCreated = true) })
    if (navCreated) return true
    nav.push({text:'方案', link:'/solution'})
    return true
})