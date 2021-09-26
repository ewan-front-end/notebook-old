import Shape from './element/shape.js'

/**
 * 矩形
 * @extends Shape
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} width 图形宽
 * @param {Number} height 图形高
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Rect extends Shape {
    constructor(x, y, width, height, options = {}, assignment, config, transform) {
        super('Rect', assignment, config, transform)
        // 基础属性
        Object.assign(this, {x, y, width, height})
        Object.assign(this, options)
    }
}