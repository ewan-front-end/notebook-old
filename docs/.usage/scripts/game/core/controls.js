import Container from './element/container.js'
import Background from './background.js'
import Timer from './timer/timer.js'
import Text from './text.js'
import {elementLevel} from './config/index.js'
import Rect from './rect.js'
import Polygon from './polygon.js'

export class timerController extends Container {
    constructor(x = 0, y = 0, width = 600, height = 15, options = {}) {
        const context = {}
        const infoWidth = 50
        const infoHeight = 3
        const sliderWidth = 10
        const btnsWidth = 50
        const startBtnLeft = 10
        const startBtnWidth = 8
        const startBtnHeight = 10
        const pauseLeft = 10
        const pauseWidth = 8
        const pauseHeight = 9

        !isNaN(options.opacity) && (context.globalAlpha = options.opacity)
        !isNaN(options.globalAlpha) && (context.globalAlpha = options.globalAlpha)

        super({
            type: 'Controller', 
            level: elementLevel.controller,
            canvas: {
                data: {x, y, width, height}, 
                context
            }
        })
        const {opacity = 1, includeChild = null, excludeChild = null, background = null} = options
        // 背景
        new Background({color: '#333'}, this)
        // 数据统计
        this.addChild(new Text('100/0', 10, 12, {fill: '#ccc', font: '12px', maxWidth: infoWidth}))
        // 进度背景条
        this.addChild(new Rect(infoWidth, (height-infoHeight)/2, width - infoWidth - btnsWidth, infoHeight, {fill: '#000'}))
        // 进度滑块阴影
        this.addChild(new Polygon(infoWidth, 0, [[sliderWidth,0], [sliderWidth/2,height/2], [sliderWidth,height]], {stroke: '#000', lineWidth: 1, origin:[sliderWidth, 0]}))
        // 进度滑块
        this.addChild(new Polygon(infoWidth, 0, [[0,0], [sliderWidth,0], [sliderWidth/2,height/2], [sliderWidth,height], [0,height], [sliderWidth/2,height/2]], {fill: '#999', closePath: true, origin:[sliderWidth, 0]}))
        // 开始、停止         
        this.addChild(new Polygon(width - btnsWidth + startBtnLeft, (height - startBtnHeight)/2, [[0,0], [startBtnWidth,startBtnHeight/2], [0,startBtnHeight]], {fill: '#999', closePath: true}))
        // 暂停
        const left = width - btnsWidth + startBtnLeft + startBtnWidth + pauseLeft
        const top = (height - pauseHeight)/2
        this.addChild(new Rect(left, top, 3, pauseHeight, {fill: '#999'}))
        this.addChild(new Rect(left + pauseWidth -3, top, 3, pauseHeight, {fill: '#999'}))
        
              
    }
}