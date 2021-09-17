import Element from './element.js'

/**
 * 场景元素
 * @extends Element
 * @constructor
 * @param {String} name 场景命名 可作访问场景的key值
 * 
 * @method in 入场 
 * @method out 出场
 */
 export class Scene extends Element {
    constructor(name) {
        super('SCENE')
        this.name = name
        this.data.background_color = '#FFF' 
        this.data.background_image = null
    }
    addChild(child) {
        if (child instanceof Element && child.type !== 'STAGE' && child.type !== 'SCENE') {
            child.parent = this
            this.children.push(child)
        } else {
            console.error(' 添加到场景的元素是不被允许的')
        }
    }
    in() { }
    out() { }
}



