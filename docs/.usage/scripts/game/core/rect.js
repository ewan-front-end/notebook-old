import ElementAppend from './element/element-append.js'

/**
 * 矩形
 * @extends ElementAppend
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} width 图形宽
 * @param {Number} height 图形高
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Rect extends ElementAppend {
    constructor(x, y, width, height, options, config) {
        super('Rect', 5, 'CLASS_SHAPE')
        Object.assign(this.data, { x, y, width, height, options })
        this.config = config
    }
}