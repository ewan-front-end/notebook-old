/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
 export default class Element {
    constructor(type, parent) {
        this.type = type        
        this.parent = parent || null
        this.data = {}
        this.children = []
    }
    addChild(child) {
        if (!(child instanceof Element)) {
            console.error(' In Element, Unknown parameter: child')
            return
        }
        child.parent = this
        this.children.push(child)
    }
    appendTo(parent) {
        this.parent = parent
        parent.children.push(this)
    }
}













