/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
let elementsLen = 0
export default class Element {
    constructor(type, level, classType) {
        this.parent = null
        this.type = type
        this.level = level        
        this.classType = classType,  // 被父容器审查的添加依据
        this.id = 'id_' + elementsLen + '_element'
        this.data = {
            opacity: 1, 
            x: 0,
            y: 0,
            scale_x: 1, 
            scale_y: 1,
            rotate: 0
        }
        elementsLen++
    }   
    update() {
        
        this.children && this.children.forEach(child => {
            child.update()
        })
    }
}