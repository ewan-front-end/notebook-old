import Stage from "./stage.js";
import { scenes } from "./scene.js";

const currentScene = id => id ? scenes[id] : scenes[stageCurrentSceneID]


/**
 * 游戏类
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */
export default class Game{
    #currentAddElement
    constructor(canvas, width, height) {
        // 舞台
        this.stage = new Stage(canvas, width, height)
        
    }
    add(element) { 
        this.#currentAddElement = element
        return this 
    }
    to(parent) {this.#currentAddElement.appendTo(parent)}
    update() {
        this.stage.update()
    }
}