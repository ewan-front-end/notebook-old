import Container from './element/container.js'

/**
 * 场景元素
 * @extends Container
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} options
 *   backgroundColor:'#000'   
 * 
 * @method in 入场 
 * @method out 出场
 */
const scenes = {
    length: 0
}
class Scene extends Container {
    constructor(x, y, width, height, {
        opacity = 1, 
        includeChild = null, 
        excludeChild = null, 
        backgroundColor = null, 
        backgroundImage = null
    }) {
        super('SCENE', 1)
        // 基础属性
        Object.assign(this, {x, y, width, height, opacity})
        // 专有属性
        this.children = []
        this.includeChild = includeChild 
        this.excludeChild = excludeChild

        if (backgroundColor) this.children.push(new Rect(x, y, width, height, {fillStyle: backgroundColor}))
        if (backgroundImage) this.children.push(new Imgicon(backgroundImage, 0, 0, img.width, img.height, x, y, width, height))
        
        scenes[scenes.length] = scenes[scenes.id] = this        
        scenes.length ++         
    }
    in() { }
    out() { }
}

export {
    Scene,
    scenes
}



