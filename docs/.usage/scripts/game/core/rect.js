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

        options.globalCompositeOperation && (contextConfig.globalCompositeOperation = options.globalCompositeOperation)
        options.filter && (contextConfig.filter = options.filter)
        options.imageSmoothingEnabled && (contextConfig.imageSmoothingEnabled = options.imageSmoothingEnabled)
        options.imageSmoothingQuality && (contextConfig.imageSmoothingQuality = options.imageSmoothingQuality)
        options.lineDashOffset && (contextConfig.lineDashOffset = options.lineDashOffset)

        const painter = {
            data, 
            contextConfig, 
            config, 
            transform
        }
        super({
            type: 'Rect', 
            painter
        })
        
    }
}