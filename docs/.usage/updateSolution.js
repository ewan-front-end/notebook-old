const {writeFile, editWritCommonFile, readFile} = require('./src/tools-fs')
const Path = require('path')
const {LIST_SOLUTION} = require('./data/listSolution')
let STATIC_SOLUTION = readFile(Path.resolve(__dirname, './resources/md/solution.md'))
const handleUML = require('./src/handleUML')

// PlantUML图形
let matchUML        
while ((matchUML = /```plantuml[\w\W]+?```/.exec(STATIC_SOLUTION)) !== null) {     
    const {name} = handleUML(matchUML[0])
    STATIC_SOLUTION = STATIC_SOLUTION.replace(matchUML[0], `<img :src="$withBase('/uml/${name}.png')">`)         
}

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