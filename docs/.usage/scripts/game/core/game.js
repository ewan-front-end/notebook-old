import Stage from "./canvas/stage.js"
import { Scene, scenes } from "./scene.js"
import {resouceReady} from "./resouce.js" 
import Timeline from './timer/timeline.js'


/**
 * 游戏类
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */
export default class Game{    
    constructor(options = {}) {
        const {canvas, width, height, showGrid, showRuler, defaultScene = {}} = options
        // 舞台        
        this.stage = new Stage(canvas, width, height, {event: true})
        // 默认场景
        this.defaultScene = new Scene(0, 0, width, height, defaultScene)
        // 网格与标尺
        showGrid && this.stage.showGrid()
        showRuler && this.stage.showRuler()

        resouceReady(() => {
            this.readyHandler()
        })
        
    }
    addChild(child) {
        this.defaultScene.addChild(child)
    }
    update() {
        this.defaultScene.update(this.stage.draw)
    }
    ready(fn){
        this.readyHandler = fn
    }
}