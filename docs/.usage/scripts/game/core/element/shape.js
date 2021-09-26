import Element from "./element.js"

/**
 * 矩形
 * @extends Element
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} width 图形宽
 * @param {Number} height 图形高
 * @param {Object} options 选项
 * @param {Object} config 配置
 */
 export default class Shape extends Element {
    constructor(type, assignment, config, transform) {
        super(type, 5, 'CLASS_SHAPE', assignment, config, transform)
    }
    appendTo(parent, forced) {
        if (!(parent instanceof Element)) return {state: 2, type: 1, message: '目标元素非 Element 实例'}   
        if (parent.level >= this.level) return {state: 2, type: 2, message: '越权添加'}
        if (parent.children.includes(this)) return {state: 1, type: 3, message: '已经存在'}        
        if (parent.includeChild && !parent.includeChild.includes(this.classType)) return {state: 2, type: 4, message: `目标元素允许添加 classType 属性为 ${parent.includeChild.join('、')} 的元素`}
        if (parent.excludeChild && parent.excludeChild.includes(this.classType)) return {state: 2, type: 5, message: `目标元素禁止添加 classType 属性为 ${parent.excludeChild.join('、')} 的元素`}
        if (this.parent) {
            if (forced) {
                this.parent.delChild(this.id)
            } else {
                return {state: 1, type: 6, message: '不能添加到第二个容器'}
            }
        } 
        this.parent = parent
        parent.children.push(this) 
        this.setData()
        return {state: 0, type: 0, message: null}      
    }
    update(arr) {
        super.update(arr)
    }
}








