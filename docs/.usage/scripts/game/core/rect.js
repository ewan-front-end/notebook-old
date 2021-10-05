import Shape from './element/shape.js'

/**
 * 矩形
 * @extends Shape
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} width 图形宽
 * @param {Number} height 图形高
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Rect extends Shape {
    constructor(x, y, width, height, options = {}) {
        const {config, transform} = options
        const data = {x, y, width, height}
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

        options.globalCompositeOperation && (assignment.globalCompositeOperation = options.globalCompositeOperation)
        options.filter && (assignment.filter = options.filter)
        options.imageSmoothingEnabled && (assignment.imageSmoothingEnabled = options.imageSmoothingEnabled)
        options.imageSmoothingQuality && (assignment.imageSmoothingQuality = options.imageSmoothingQuality)
        options.lineDashOffset && (assignment.lineDashOffset = options.lineDashOffset)

        super('Rect', data, assignment, config, transform)
        
    }
}