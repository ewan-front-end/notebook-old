import Shape from './element/shape.js'

/**
 * 文本
 * @extends Shape
 * @constructor
 * @param {Number} text 文本
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Object} options 选项
 */
 export default class Text extends Shape {
    constructor(text, x, y, options = {}) {
        const {config, transform} = options
        const data = {text, x, y}
        const context = {}

        options.maxWidth && (data.maxWidth = options.maxWidth)

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

        options.font && (context.font = options.font.length < 5 ? options.font + ' sans-serif' : options.font)
        options.textBaseline && (context.textBaseline = options.textBaseline)
        options.textAlign && (context.textAlign = options.textAlign)
        options.direction && (context.direction = options.direction)

        super({
            type: 'Text', 
            canvas: {
                data, 
                context, 
                config, 
                transform
            }
        })
    }
}