
import Canvas from "./canvas.js"
import {canvasEvent} from "./event.js"

/**
 * 舞台类
 * @extends Canvas
 * @constructor
 * @param {Element String} canvas
 * @param {Number} width
 * @param {height} height
 */
export default class Stage extends Canvas {
    constructor(canvas, width, height, options = {}) {
        super({canvas, width, height})

        const {event} = options
        event && canvasEvent.init(canvas, {startBound : {x: 0, y: 0, width, height} }) 
    }
    showRuler() {
        let ctx = this.context, w = this.width, h = this.height
        ctx.save()
        ctx.strokeStyle = '#ccc'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.translate(0.5, 0)
        for (let i = 10; i < w; i += 10) { ctx.moveTo(i, 3); ctx.lineTo(i, 5) }
        for (let i = 100; i < w; i += 100) { ctx.moveTo(i, 0); ctx.lineTo(i, 5) }
        ctx.translate(-0.5, 0.5)
        for (let i = 10; i < h; i += 10) { ctx.moveTo(3, i); ctx.lineTo(5, i) }
        for (let i = 100; i < h; i += 100) { ctx.moveTo(0, i); ctx.lineTo(5, i) }
        ctx.stroke()
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.translate(0, -0.5)
        ctx.moveTo(0, h)
        ctx.lineTo(0, 0)
        ctx.lineTo(w, 0)
        ctx.stroke()
        ctx.beginPath()
        ctx.restore()
        ctx.beginPath()
    }
    // config{cellSize: 10}
    showGrid(config) {
        let ctx = this.context, w = this.width, h = this.height, size = 20, color = '#eee', lineWidth = 1
        if (config) {
            config.cellSize && (size = config.cellSize)
            config.strokeStyle && (color = config.strokeStyle)
            config.lineWidth && (lineWidth = config.lineWidth)
        }
        ctx.save()
        ctx.translate(0.5,0.5)
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        for (let i = 0; i < w; i += size) { ctx.moveTo(i, 0); ctx.lineTo(i, h) }
        for (let i = 0; i < h; i += size) { ctx.moveTo(0, i); ctx.lineTo(w, i) }
        ctx.stroke()
        ctx.beginPath()
        ctx.translate(-0.5,-0.5)
        ctx.moveTo(w, 0)
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.stroke()
        ctx.restore()
        ctx.beginPath()
    } 
}