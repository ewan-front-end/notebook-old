import Element from "./element.js";

/**
 * Element元素装饰
 * @extends Element
 * @constructor
 * @method addChild 添加子元素
 * @method appendTo 添加到容器
 */
export default class ElementAll extends Element {
    constructor (type, level, classType, options = {}) {
        super(type, level, classType)
        this.children = []
        if (options.includeChild && options.excludeChild) console.warn('includeChild 和 excludeChild 不要同时配置')
        options.includeChild && (this.includeChild = options.includeChild) // 作为容器接受子类类型 即child.classType
        options.excludeChild && (this.excludeChild = options.excludeChild) // 作为容器排除子类类型 即child.classType
    }
    addChild(child) {
        if (!(child instanceof Element)) {
            console.error(`容器 ${this.type} 添加子元素 [未知]，子元素非 Element 实例`)
            return
        }
        if (this.children.includes(child))  return
        if (this.includeChild && !this.includeChild.includes(child.classType)) {
            console.error(`容器 ${this.type} 只能添加 classType 属性为 ${this.includeChild.join('、')} 的子类`)
            return
        }
        if (this.excludeChild && this.excludeChild.includes(child.classType)) {
            console.error(`容器 ${this.type} 禁止添加 classType 属性为 ${this.excludeChild.join('、')} 的子类`)
            return
        }
        if (child.level <= this.level) {
            console.error(`容器 ${this.type} 添加子元素 ${child.type}，子元素的 level 值为 ${child.level}, 应大于 ${this.level}`)
            return
        }        
        child.parent = this
        this.children.push(child)       
    }
    appendTo(parent) {
        if (!(parent instanceof Element)) {
            console.error(`元素 ${this.type} 添加到容器 [未知]，容器非 Element 实例`)
            return
        }
        if (!parent.children) {
            console.error(`元素 ${this.type} 添加到容器 ${parent.type}，容器无效`)
            return
        }
        if (parent.children.includes(this)) return
        if (parent.includeChild && !parent.includeChild.includes(this.classType)) {
            console.error(`只有 classType 属性为 ${parent.includeChild.join('、')} 的元素可添加到目标容器 ${parent.type}`)
            return
        }
        if (parent.excludeChild && parent.excludeChild.includes(this.classType)) {
            console.error(`禁止 classType 属性为 ${parent.excludeChild.join('、')} 的元素添加到目标容器 ${parent.type}`)
            return
        }
        if (parent.level >= this.level) {
            console.error(`元素 ${this.type} 添加到容器 ${parent.type}，容器的 level 值为 ${parent.level}, 应小于 ${this.level}`)
            return
        }        
        this.parent = parent
        parent.children.push(this)       
    }
}