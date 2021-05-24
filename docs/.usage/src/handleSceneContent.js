
module.exports = function (arr) {
    let content = ``
    
    arr.forEach(item => { 
        const scene = item.scene   
        const sceneType = Object.prototype.toString.call(scene)
        if (sceneType === '[object Object]') {
            content += `- [${scene.title}](${scene.href}` 
            if (scene.id) content += `#${scene.id}` 
            content += `)\n`         
        }
        if (sceneType === '[object Array]') {
            scene.forEach(child => {
                content += `- [${child.title}](${child.href}` 
                if (child.id) content += `.html#${child.id}` 
                content += `)\n`
            })
        }
    })
    return content
}