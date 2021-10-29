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
        const context = {}

        !isNaN(options.opacity) && (context.globalAlpha = options.opacity)
        !isNaN(options.globalAlpha) && (context.globalAlpha = options.globalAlpha)

        options.fill && (context.fillStyle = options.fill)
        options.fillStyle && (context.fillStyle = options.fillStyle)

        options.stroke && (context.strokeStyle = options.stroke)
        options.strokeStyle && (context.strokeStyle = options.strokeStyle)
        options.lineWidth && (context.lineWidth = options.lineWidth)
        options.lineCap && (context.lineCap = options.lineCap)
        options.lineJoin && (context.lineJoin = options.lineJoin)
        options.miterLimit && (context.miterLimit = options.miterLimit)

        options.shadowBlur && (context.shadowBlur = options.shadowBlur)
        options.shadowColor && (context.shadowColor = options.shadowColor)
        options.shadowOffsetX && (context.shadowOffsetX = options.shadowOffsetX)
        options.shadowOffsetY && (context.shadowOffsetY = options.shadowOffsetY)

        super({
            type: 'Polygon', 
            canvas: {
                data, 
                context, 
                config, 
                transform
            }
        })
    }
}