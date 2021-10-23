import Stage from "./canvas/stage.js"
import { Scene, scenes } from "./scene.js"
import {resouceReady} from "./resouce.js" 
import Timeline from './timer/timeline.js'
import Interface from './standard/interface.js'


/**
 * 游戏类
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */
export default class Game{    
    constructor(options = {}) {
        const {canvas, width, height, showGrid, showRuler, allowEvent, defaultSceneConfig = {}} = options
       
        // 舞台        
        this.stage = new Stage(Interface.match('StageOptions', options))

        // 默认场景
        this.defaultScene = new Scene('SceneOptions', options)

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