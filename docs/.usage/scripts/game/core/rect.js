import Shape from './element/shape.js'
import Interface from './standard/interface.js'

/**
 * 矩形
 * @extends Shape
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} width 图形宽
 * @param {Number} height 图形高
 * @param {Object} options 选项
 * {
     opacity: 0.5, alpha: 0.5, 元素透明度
   }
 */
 export default class Rect extends Shape {
    constructor(x, y, width, height, options) {
        const drawing = {
            data: {x, y, width, height}
        }
        const elementOptions = {
            type: 'Rect',
            drawing 
        }
        if (options) {
            options.config && (drawing.config = config)
            options.transform && (drawing.transform = transform)

            (options.opacity || options.alpha) && !options.globalAlpha && (options.globalAlpha = options.opacity || options.alpha)
            options.fill && !options.fillStyle && (options.fillStyle = options.fill)
            options.stroke && !options.strokeStyle && (options.strokeStyle = options.stroke)
            drawing.context = Interface.min('canvasContextOptions', options)

        }
        super(elementOptions)
        
    }
}