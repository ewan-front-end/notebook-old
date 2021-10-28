import Shape from './element/shape.js'

/**
 * 多边形
 * @extends Shape
 * @constructor
 * @param {Array} points 点集合
 * @param {Object} options 选项
 */
 export default class Polygon extends Shape {
    constructor(x, y, points, options = {}) {
        const {config, transform} = options
        const data = {x, y, points}
        const contextConfig = {}

        !isNaN(options.opacity) && (contextConfig.globalAlpha = options.opacity)
        !isNaN(options.globalAlpha) && (contextConfig.globalAlpha = options.globalAlpha)

        options.fill && (contextConfig.fillStyle = options.fill)
        options.fillStyle && (contextConfig.fillStyle = options.fillStyle)

        options.stroke && (contextConfig.strokeStyle = options.stroke)
        options.strokeStyle && (contextConfig.strokeStyle = options.strokeStyle)
        options.lineWidth && (contextConfig.lineWidth = options.lineWidth)
        options.lineCap && (contextConfig.lineCap = options.lineCap)
        options.lineJoin && (contextConfig.lineJoin = options.lineJoin)
        options.miterLimit && (contextConfig.miterLimit = options.miterLimit)

        options.shadowBlur && (contextConfig.shadowBlur = options.shadowBlur)
        options.shadowColor && (contextConfig.shadowColor = options.shadowColor)
        options.shadowOffsetX && (contextConfig.shadowOffsetX = options.shadowOffsetX)
        options.shadowOffsetY && (contextConfig.shadowOffsetY = options.shadowOffsetY)

        super({
            type: 'Polygon', 
            painter: {
                data, 
                contextConfig, 
                config, 
                transform
            }
        })
    }
}