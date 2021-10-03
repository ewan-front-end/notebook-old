import Element from './element/element.js'
import Canvas from "./canvas.js";
import { Scene, scenes } from "./scene.js";

/**
 * 舞台元素
 * @extends ElementAdd
 * @constructor
 */
let cvs = new Canvas(),
    defaultScene = new Scene(), // 默认场景
    currentSceneID = defaultScene.id,
    currentScene = id => id ? scenes[id] : scenes[currentSceneID]

export default class Stage extends Element {
    constructor(canvas, width, height, options) {
        super('STAGE', 0, 'CLASS_STAGE')

        cvs.setData({canvas, width, height})        
    }
    addChild(child) {        
        if (child.type === 'SCENE') {
            super.addChild(child)
        } else {
            currentScene().addChild(child)
        }
    }    
    update(){
        const arr = []
        currentScene().update(arr)
        console.log('当前场景：',currentScene());
        console.log('arr',arr);
        arr.forEach(e => {
            cvs.draw(e)
        })
    }
}