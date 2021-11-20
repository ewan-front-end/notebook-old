const PATH = require('path')
const {fetch, read, fetchPath} = require('../config')
const {readFile, writeFile, editWritCommonFile} = fetch('UTILS|fs')
const SCENE = fetch('DATA|scene')

let sceneContent = ''
    
SCENE.forEach(({title, scene}) => { 
    console.log('title:', title);
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
sceneContent += '\n' + read('RES|markdown.scene')
writeFile(fetchPath('FILE|doc.scene'), sceneContent)

// 导航菜单写入链接
editWritCommonFile(fetchPath('FILE|.vuepress/config'), fileObj => {
    let nav = fileObj.themeConfig.nav
    let navCreated = false
    nav.forEach(e => { e.link === '/scene' && (navCreated = true) })
    if (navCreated) return true
    nav.push({text:'场景', link:'/scene'})
    return true
})



