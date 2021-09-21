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
    #currentSceneName = 'SCENE_DEFAULT' 
    constructor(canvas, width, height) {
        this.#canvas = new Canvas(canvas, width, height)
        new Scene(this.#currentSceneName) 
    }
    addChild(child) {
        return scenes[this.#currentSceneName].addChild(child)
    }
    update() {
        const arr = []
        Array.from(this.#scenes).forEach(scene => scene.update(arr))
        arr.forEach(e => {
            this.#canvas.draw(e)
        })
    }
}