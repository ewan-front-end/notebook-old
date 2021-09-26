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
    constructor(x, y, width, height, options = {}) {
        super('LAYER', 2)
        const {opacity = 1, includeChild = null, excludeChild = null, backgroundColor = null, backgroundImage = null} = options

        // 基础属性
        Object.assign(this, {x, y, width, height, opacity})
    }
}