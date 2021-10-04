import Stage from "./stage.js"
import { Scene, scenes } from "./scene.js"
import {resouceReady} from "./resouce.js" 

/**
 * 游戏类
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */
export default class Game{    
    constructor(options = {}) {
        const {canvas, width, height, showGrid, showRuler, scene = {}, sceneBackgroundImage} = options
        // 舞台        
        this.stage = new Stage({canvas, width, height})
        // 默认场景
        sceneBackgroundImage && (scene.backgroundImage = sceneBackgroundImage)
        this.defaultScene = new Scene(0, 0, width, height, scene)
        console.log(this.defaultScene);
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