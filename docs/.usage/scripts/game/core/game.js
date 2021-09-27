import Canvas from "./canvas.js";
import { Scene, scenes } from "./scene.js";
/**
 * 游戏类
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */
export default class Game{
    #canvas = null  
    #scenes = scenes
    #currentSceneId = '' 
    constructor(canvas, width, height) {
        this.#canvas = new Canvas(canvas, width, height)

        // 舞台
        this.stage = new Stage()

        // 默认场景
        const defaultScene = new Scene() 
        this.#currentSceneId = defaultScene.id
    }
    addChild(child) {
        scenes[this.#currentSceneId].addChild(child)
        
    }
    update() {
        const arr = []
        Array.from(this.#scenes).forEach(scene => scene.update(arr))
        console.log('scene0',this.#scenes[0]);
        console.log('arr',arr);
        arr.forEach(e => {
            this.#canvas.draw(e)
        })
    }
}