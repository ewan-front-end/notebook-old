import Shape from './element/shape.js'

/**
 * 圆形
 * @extends Shape
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} r 半径
 * @param {Object} options 选项
 */
 export default class Circle extends Shape {
    constructor(x, y, r, options) {
        const {config, transform} = options
        const data = {x, y, r}
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
            type: 'Circle', 
            drawing: {
                data, 
                context, 
                config, 
                transform
            }
        })
    }
}