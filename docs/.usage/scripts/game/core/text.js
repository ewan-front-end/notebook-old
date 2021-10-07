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
        const assignment = {}

        options.maxWidth && (data.maxWidth = options.maxWidth)

        !isNaN(options.opacity) && (assignment.globalAlpha = options.opacity)
        !isNaN(options.globalAlpha) && (assignment.globalAlpha = options.globalAlpha)

        options.fill && (assignment.fillStyle = options.fill)
        options.fillStyle && (assignment.fillStyle = options.fillStyle)

        options.stroke && (assignment.strokeStyle = options.stroke)
        options.strokeStyle && (assignment.strokeStyle = options.strokeStyle)
        options.lineWidth && (assignment.lineWidth = options.lineWidth)
        options.lineCap && (assignment.lineCap = options.lineCap)
        options.lineJoin && (assignment.lineJoin = options.lineJoin)
        options.miterLimit && (assignment.miterLimit = options.miterLimit)

        options.shadowBlur && (assignment.shadowBlur = options.shadowBlur)
        options.shadowColor && (assignment.shadowColor = options.shadowColor)
        options.shadowOffsetX && (assignment.shadowOffsetX = options.shadowOffsetX)
        options.shadowOffsetY && (assignment.shadowOffsetY = options.shadowOffsetY)

        options.font && (assignment.font = options.font.length < 5 ? options.font + ' sans-serif' : options.font)
        options.textBaseline && (assignment.textBaseline = options.textBaseline)
        options.textAlign && (assignment.textAlign = options.textAlign)
        options.direction && (assignment.direction = options.direction)

        super('Text', data, assignment, config, transform)
    }
}