import Stage from "./stage.js";
import { Scene, scenes } from "./scene.js";

/**
 * 游戏类
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */
export default class Game{    
    constructor(options = {}) {
        const {canvas, width, height} = options
        // 舞台        
        this.stage = new Stage({canvas, width, height})
        // 默认场景
        this.defaultScene = new Scene(0, 0, width, height)
        
    }
    addChild(child) {
        this.defaultScene.addChild(child)
    }
    update() {
        const arr = [], stage = this.stage
        this.defaultScene.update(arr)
        console.log('当前场景：', this.defaultScene);
        console.log('arr',arr);
        arr.forEach(e => {
            stage.draw(e)
        })
        
    }
}