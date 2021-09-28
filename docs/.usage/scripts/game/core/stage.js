import Element from './element/element.js'
import Canvas from "./canvas.js";
import { Scene, scenes } from "./scene.js";

/**
 * 舞台元素
 * @extends ElementAdd
 * @constructor
 */
let canvas = new Canvas(),
    defaultScene = new Scene(), // 默认场景
    currentSceneID = defaultScene.id,
    currentScene = id => id ? scenes[id] : scenes[currentSceneID]

export default class Stage extends Element {
    constructor(canvas, width, height, options) {
        super('STAGE', 0, 'CLASS_STAGE')

        canvas.setData(canvas, width, height)        
    }
    addScene(scene) {        
        if (scene instanceof Element && scene.type === 'SCENE') {
            scene.parent = this
            this.children.push(scene) 
        } else {
            console.error('舞台只能添加场景元素')
        }
    }
    update(){
        const arr = []
        Array.from(currentScene).forEach(scene => scene.update(arr))
        console.log('scene0',this.#scenes[0]);
        console.log('arr',arr);
        arr.forEach(e => {
            this.#canvas.draw(e)
        })
    }
}