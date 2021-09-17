import Element from './element.js'

/**
 * 层元素
 * @extends Element
 * @constructor
 * @param {String} name 层命名 可作访问层的key值
 * 
 * @method in 入场 
 * @method out 出场
 */
 export class Layer extends Element {
    constructor(name) {
        super('LAYER')
        this.name = name
    }
    addChild(child) {
        if (child instanceof Element && child.type !== 'STAGE' && child.type !== 'SCENE' && child.type !== 'LAYER') {
            child.parent = this
            this.children.push(child)
        } else {
            console.error(' 添加到层的元素是不被允许的')
        }
    }
}