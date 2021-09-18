import Element from './element.js'

/**
 * 多边形
 * @extends Element
 * @constructor
 * @param {Array} points 点集合
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Polygon extends Element {
    constructor(points, options, config) {
        super('Polygon', 3)
        delete this.children
        delete this.addChild
        this.data = { points, options, config }
        this.config = config
    }
}