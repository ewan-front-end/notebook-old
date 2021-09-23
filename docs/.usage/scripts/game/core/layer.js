import Container from './element/container.js'

/**
 * 层元素
 * @extends Container
 * @constructor
 * @param {String} name 层命名 可作访问层的key值
 * 
 * @method in 入场 
 * @method out 出场
 */
 export default class Layer extends Container {
    constructor(name, x, y, width, height, options, config, transform) {
        super('LAYER', 2, 'CLASS_LAYER')
        this.name = name
    }
}