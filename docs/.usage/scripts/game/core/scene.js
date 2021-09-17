
/**
 * ▇场景元素▇
 * 属性：type/children/name
 * 方法：addChild
 *       update/in/out
 */
 export class Scene extends Element {
    constructor(name) {
        super('SCENE')
        delete this.parent
        delete this.data
        delete this.appendTo
        this.name = name
    }
    in() { }
    out() { }
    update() {
        this.children.forEach(e => {
        })
    }
}