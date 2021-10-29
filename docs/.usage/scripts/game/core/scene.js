import Container from './element/container.js'
import Background from './background.js'
import {elementLevel} from './config/index.js'
import Interface from './standard/interface.js'

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
    constructor(options = Interface.SceneOptions) {
        const {x, y, width, height} = options

        super({
            type: 'Scene', 
            level: elementLevel.scene, 
            canvas: {
                data: {x, y, width, height}, 
                context: {}
            }
        })
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



