import ElementAppend from './element/element-append.js'

/**
 * 多边形
 * @extends ElementAppend
 * @constructor
 * @param {Array} points 点集合
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Polygon extends ElementAppend {
    constructor(points, options, config) {
        super('Polygon', 5, 'CLASS_SHAPE')
        //this.data = { points, options, config }
        this.config = config
    }
}