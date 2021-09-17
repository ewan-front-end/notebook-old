import Element from './element.js'

/**
 * 群组元素
 * @extends Element
 * @constructor
 * @param {String} name 群组命名 可作访问群组的key值
 */
 export class Group extends Element {
    constructor(name) {
        super('GROUP')
        this.name = name
        this.data = {
            alpha: 1, // 作用于层结构 如背景
            opacity: 1, // 作用于所有
        }
    }
    addChild(child) {
        if (child instanceof Element && child.type !== 'STAGE' && child.type !== 'SCENE' && child.type !== 'LAYER') {
            child.parent = this
            this.children.push(child)
        } else {
            console.error(' 添加到群组的元素是不被允许的')
        }
    }
}