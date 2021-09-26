import Element from './element/element.js'

/**
 * 舞台元素
 * @extends ElementAdd
 * @constructor
 */
 export default class Stage extends Element {
    constructor(x, y, width, height, options) {
        super('STAGE', 0, 'CLASS_STAGE')
    }
    addScene(scene) {        
        if (scene instanceof Element && scene.type === 'SCENE') {
            scene.parent = this
            this.children.push(scene) 
        } else {
            console.error('舞台只能添加场景元素')
        }
    }
}