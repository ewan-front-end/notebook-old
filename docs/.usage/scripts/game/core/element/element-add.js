import Element from "./element.js";

/**
 * Element元素装饰
 * @extends Element
 * @constructor
 * @method addChild 添加子元素
 */
export default class ElementAdd extends Element {
    constructor (type, level, classType, options = {}) {
        super(type, level, classType)
        this.children = []
        if (options.includeChild && options.excludeChild) console.warn('includeChild 和 excludeChild 不要同时配置')
        options.includeChild && (this.includeChild = options.includeChild) // 作为容器接受子类类型 即child.classType
        options.excludeChild && (this.excludeChild = options.excludeChild) // 作为容器排除子类类型 即child.classType
    }
    addChild(child) {
        if (!(child instanceof Element)) return {state: 2, type: 1, message: '子元素非 Element 实例'}
        if (child.level <= this.level) return {state: 2, type: 2, message: '越权添加'}
        if (this.children.includes(child))  return {state: 1, type: 3, message: '重复添加'}        
        if (this.includeChild && !this.includeChild.includes(child.classType)) return {state: 2, type: 4, message: `允许添加 classType 属性为 ${this.includeChild.join('、')} 的元素`}
        if (this.excludeChild && this.excludeChild.includes(child.classType)) return {state: 2, type: 5, message: `禁止添加 classType 属性为 ${this.excludeChild.join('、')} 的元素`}        
        child.parent = this
        this.children.push(child)      
        return {state: 0, type: 0, message: null}
    }
}