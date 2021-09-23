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
    constructor(name, x, y, width, height, options, config, transform) {
        super({type: 'SCENE', level: 1}, {x, y, width, height, options, config, transform})
        if (name) {
            this.name = name
            if (scenes[name]) {
                console.error(`命名为 ${name} 的场景已经存在`)
            } else {
                scenes[name] = this
                scenes[scenes.length] = this
                scenes.length ++
            }
        } else {
            scenes[scenes.length] = this
            scenes.length ++
        }  
    }
    in() { }
    out() { }
}

export {
    Scene,
    scenes
}



