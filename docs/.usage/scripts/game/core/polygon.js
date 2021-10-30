import Shape from './element/shape.js'
import Canvas from './canvas/canvas.js'

/**
 * 多边形
 * @extends Shape
 * @constructor
 * @param {Array} points 点集合
 * @param {Object} options 选项
 */
 export default class Polygon extends Shape {
    constructor(x, y, points, options) {
        const {config, transform} = options
        const elementOptions = {
            type: 'Polygon', 
            drawing: {
                data: {x, y, points}
            }
        }
        Canvas.createData(elementOptions, options)
        
        super(elementOptions)
    }
}