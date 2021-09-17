/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
 export default class Element {
    constructor(type, parent) {
        this.type = type        
        this.parent = parent || null
        this.data = {
            opacity: 1, 
            x: 0,
            y: 0,
            scale_x: 1, 
            scale_y: 1,
            rotate: 0
        }
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
    update() {
        this.children.forEach(child => {
            child.update()
        })
    }
}













