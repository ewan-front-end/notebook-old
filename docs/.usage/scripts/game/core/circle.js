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
        const assignment = {}

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

        super('Circle', data, assignment, config, transform)
    }
}