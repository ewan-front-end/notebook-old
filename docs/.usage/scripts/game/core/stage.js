import Element from './element.js'

/**
 * 舞台元素
 * @extends Element
 * @constructor
 */
 export default class Stage extends Element {
    constructor() {
        super('STAGE')
        delete this.appendTo // 舞台为最顶层元素
        this.name = 'STAGE'
        this.data = {
            // todo
        }
    }
    addChild(child) {
        if (child instanceof Element && child.type === 'SCENE') {
            child.parent = this
            this.children.push(child)
        } else {
            console.error(' 舞台仅开放添加场景元素')
        }
    }
}