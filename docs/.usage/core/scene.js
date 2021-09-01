const path = require('path')
const {readFile, writeFile, editWritCommonFile} = require('../utils/fs')
const {dataPath} = require('../config')
const SCENE = require(dataPath['scene'])

let sceneContent = ''
    
SCENE.forEach(({title, scene}) => { 
    const sceneType = Object.prototype.toString.call(scene)
    let html = `<strong>【${title}】 </strong>`
    if (sceneType === '[object Object]') {
        let hash = scene.id ? `.html#${scene.id}` : ''
        html += ` [${scene.title}](${scene.href}${hash})<br>`         
    }
    if (sceneType === '[object Array]') {
        scene.forEach(child => {
            let hash = child.id ? `.html#${child.id}` : ''
            html += ` [${child.title}](${child.href}${hash}) `
        })
        html += `<br>` 
    }
    sceneContent += html
})

// 输出文档
sceneContent += '\n' + readFile(path.resolve(__dirname, '../resources/md/scene.md'))
writeFile(path.resolve(__dirname, '../../scene.md'), sceneContent)

// 导航菜单写入链接
editWritCommonFile(path.resolve(__dirname, '../../.vuepress/config.js'), fileObj => {
    let nav = fileObj.themeConfig.nav
    let navCreated = false
    nav.forEach(e => { e.link === '/scene' && (navCreated = true) })
    if (navCreated) return true
    nav.push({text:'场景', link:'/scene'})
    return true
})



