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

        super('Polygon', data, assignment, config, transform)
    }
}