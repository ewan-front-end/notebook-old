import Shape from './element/shape.js'
import Interface from './standard/interface.js'
import Canvas from './canvas/canvas.js'

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
        const elementOptions = {
            type: 'Rect',
            drawing: {
                data: {x, y, width, height}
            } 
        }
        Canvas.createData(elementOptions, options)

        super(elementOptions)
        
    }
}