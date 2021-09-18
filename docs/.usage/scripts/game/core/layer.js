import Element from './element.js'

/**
 * 层元素
 * @extends Element
 * @constructor
 * @param {String} name 层命名 可作访问层的key值
 * 
 * @method in 入场 
 * @method out 出场
 */
 export default class Layer extends Element {
    constructor(name) {
        super('LAYER', 2)
        this.name = name
    }
}