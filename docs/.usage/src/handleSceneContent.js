
module.exports = function (arr) {
    let content = ``
    
    arr.forEach(item => { 
        const scene = item.scene   
        const sceneType = Object.prototype.toString.call(scene)
        if (sceneType === '[object Object]') {
            content += `- ${scene.title || item.title}\n`             
        }
        if (sceneType === '[object Array]') {
            scene.forEach(child => {
                content += `- ${child.title}\n` 
            })
        }
    })
    return content
}