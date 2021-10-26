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
        Interface.check('GameOptions', options, '初始化游戏的参数错误:')
        typeof options.canvas === 'string' && (options.canvas = document.querySelector(options.canvas))
       
        // 舞台 
        const stageOptions = Interface.match('StageOptions', options)      
        this.stage = new Stage(stageOptions)

        // 默认场景
        const sceneOptions = Interface.match('SceneOptions', options)
        if (sceneOptions.defaultSceneConfig) {
            for(let i in sceneOptions.defaultSceneConfig) {
                sceneOptions[i] = sceneOptions.defaultSceneConfig[i]
            }
        }
        this.defaultScene = new Scene(sceneOptions)

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