import Element from "./element.js";
import { addChild } from './methodes.js'

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
        if (!(child instanceof Element)) {
            console.error(`容器 ${this.type} 添加子元素 [未知]，子元素非 Element 实例`)
            return false
        }
        if (this.children.includes(child))  return
        if (this.includeChild && !this.includeChild.includes(child.classType)) {
            console.error(`容器 ${this.type} 只能添加 classType 属性为 ${this.includeChild.join('、')} 的子类`)
            return false
        }
        if (this.excludeChild && this.excludeChild.includes(child.classType)) {
            console.error(`容器 ${this.type} 禁止添加 classType 属性为 ${this.excludeChild.join('、')} 的子类`)
            return false
        }
        if (child.level <= this.level) {
            console.error(`容器 ${this.type} 添加子元素 ${child.type}，子元素的 level 值为 ${child.level}, 应大于 ${this.level}`)
            return false
        }        
        child.parent = this
        this.children.push(child)      
        return true 
    }
}