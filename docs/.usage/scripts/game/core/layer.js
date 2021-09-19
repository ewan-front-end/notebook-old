import ElementAll from './element/element-all.js'

/**
 * 层元素
 * @extends ElementAll
 * @constructor
 * @param {String} name 层命名 可作访问层的key值
 * 
 * @method in 入场 
 * @method out 出场
 */
 export default class Layer extends ElementAll {
    constructor(name) {
        super('LAYER', 2, 'CLASS_LAYER')
        this.name = name
    }
}