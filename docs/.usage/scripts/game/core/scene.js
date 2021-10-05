import Container from './element/container.js'
import Background from './background.js'

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
    constructor(x = 0, y = 0, width = 500, height = 200, options = {}) {
        const data = {x, y, width, height}
        const assignment = {}
        
        super('Scene', 1, data, assignment)
        const {opacity = 1, includeChild = null, excludeChild = null, background = null} = options

        // 基础属性
        Object.assign(this, {x, y, width, height, opacity})
        
        // 专有属性
        this.includeChild = includeChild 
        this.excludeChild = excludeChild

        if (background) new Background(background, this)
        
        scenes[scenes.length] = scenes[this.id] = this  
        scenes.length ++         
    }
    in() { }
    out() { }
}

export {
    Scene,
    scenes
}



