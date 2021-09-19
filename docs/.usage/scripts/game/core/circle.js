import ElementAppend from './element/element-append.js'

/**
 * 圆形
 * @extends ElementAppend
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} r 半径
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Circle extends ElementAppend {
    constructor(x, y, r, options, config) {
        super('Circle', 5, 'CLASS_SHAPE')
        //this.data = { x, y, r, options }
        this.config = config
    }
}