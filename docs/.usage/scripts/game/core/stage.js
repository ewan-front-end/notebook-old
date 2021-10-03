
import Canvas from "./canvas.js";

/**
 * 舞台类
 * @extends Canvas
 * @constructor
 */
export default class Stage extends Canvas {
    constructor(options) {
        super(options)
    }
    showRuler() {
        let ctx = this.context
        ctx.save()
        ctx.strokeStyle = '#ccc'
        ctx.lineWidth = '1px'
        ctx.beginPath()
        for (let i = 10; i < W; i += 10) { ctx.moveTo(i + 0.5, 1); ctx.lineTo(i + 0.5, 3) }
        for (let i = 10; i < H; i += 10) { ctx.moveTo(1, i + 0.5); ctx.lineTo(3, i + 0.5) }
        ctx.moveTo(0.5, H)
        ctx.lineTo(0.5, 0.5)
        ctx.lineTo(W, 0.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.lineWidth = 2
        for (let i = 100; i < W; i += 100) { ctx.moveTo(i, 0); ctx.lineTo(i, 6) }
        for (let i = 100; i < H; i += 100) { ctx.moveTo(0, i); ctx.lineTo(6, i) }
        ctx.stroke()
        ctx.restore()
        ctx.beginPath()
    }
    // config{cellSize: 10}
    showGrid(config) {
        let ctx = this.context, size = 20, color = '#eee', lineWidth = '1px'
        if (config) {
            config.cellSize && (size = config.cellSize)
            config.strokeStyle && (color = config.strokeStyle)
            config.lineWidth && (lineWidth = config.lineWidth)
        }
        ctx.save()
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        for (let i = 0; i < W; i += size) { ctx.moveTo(i + 0.5, 0); ctx.lineTo(i + 0.5, H) }
        for (let i = 0; i < H; i += size) { ctx.moveTo(0, i + 0.5); ctx.lineTo(W, i + 0.5) }
        ctx.moveTo(W, 0)
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.stroke()
        ctx.restore()
        ctx.beginPath()
    } 
}