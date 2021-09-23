import Shape from './element/shape.js'

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
    constructor(x, y, width, height, options, config, transform) {
        super('Rect', 5, 'CLASS_SHAPE')
        this.width = width || 0
        this.height = height || 0
        Object.assign(this.data, { x, y})
        this.config = config
    }
}