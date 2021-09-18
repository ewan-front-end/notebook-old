import Element from './element.js'

/**
 * 场景元素
 * @extends Element
 * @constructor
 * @param {String} name 场景命名 可作访问场景的key值
 * 
 * @method in 入场 
 * @method out 出场
 */
const scenes = {
    length: 0
}
class Scene extends Element {
    constructor(name) {
        super('SCENE', 1)
        this.data.background_color = '#FFF' 
        this.data.background_image = null
        if (name) {
            this.name = name
            scenes[name] ? console.error(`命名为 ${name} 的场景已经存在`) : scenes[name] = this
        }        
        scenes[scenes.length] = this
        scenes.length ++        
    }
    in() { }
    out() { }
}

export {
    Scene,
    scenes
}



