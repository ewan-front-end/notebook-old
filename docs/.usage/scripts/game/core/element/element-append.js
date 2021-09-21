import Element from "./element.js"

/**
 * Element元素装饰
 * @extends Element
 * @constructor
 * @method appendTo 添加到容器
 */
export default class ElementAppend extends Element {
    constructor (type, level, classType) {
        super(type, level, classType)
    }
    appendTo(parent) {
        if (!(parent instanceof Element)) return {state: 2, type: 1, message: '目标元素非 Element 实例'}   
        if (parent.level >= this.level) return {state: 2, type: 2, message: '越权添加'}
        if (parent.children.includes(this)) return {state: 1, type: 3, message: '已经存在'}
        if (parent.includeChild && !parent.includeChild.includes(this.classType)) return {state: 2, type: 4, message: `目标元素允许添加 classType 属性为 ${parent.includeChild.join('、')} 的元素`}
        if (parent.excludeChild && parent.excludeChild.includes(this.classType)) return {state: 2, type: 5, message: `目标元素禁止添加 classType 属性为 ${parent.excludeChild.join('、')} 的元素`}
        if (!parent.children) return {state: 2, type: 6, message: '目标元素非有效容器'}
        this.parent = parent
        parent.children.push(this) 
        return {state: 0, type: 0, message: null}      
    }
}