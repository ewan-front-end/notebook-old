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
        const contextConfig = {}

        options.maxWidth && (data.maxWidth = options.maxWidth)

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

        options.font && (contextConfig.font = options.font.length < 5 ? options.font + ' sans-serif' : options.font)
        options.textBaseline && (contextConfig.textBaseline = options.textBaseline)
        options.textAlign && (contextConfig.textAlign = options.textAlign)
        options.direction && (contextConfig.direction = options.direction)

        super({
            type: 'Text', 
            painter: {
                data, 
                contextConfig, 
                config, 
                transform
            }
        })
    }
}