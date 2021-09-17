import Element from './element.js'

/**
 * 圆形
 * @extends Element
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} r 半径
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Circle extends Element {
    constructor(x, y, r, options, config) {
        super('Circle')
        delete this.children
        delete this.addChild
        this.data = { x, y, r, options }
        this.config = config
    }
}