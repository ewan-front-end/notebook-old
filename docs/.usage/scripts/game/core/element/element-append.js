import Element from "./element.js"
import { appendTo } from './methodes.js'

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
        if (!(parent instanceof Element)) {
            console.error(`元素 ${this.type} 添加到容器 [未知]，容器非 Element 实例`)
            return false
        }
        if (!parent.children) {
            console.error(`元素 ${this.type} 添加到容器 ${parent.type}，容器无效`)
            return false
        }
        if (parent.children.includes(this)) return false
        if (parent.includeChild && !parent.includeChild.includes(this.classType)) {
            console.error(`只有 classType 属性为 ${parent.includeChild.join('、')} 的元素可添加到目标容器 ${parent.type}`)
            return false
        }
        if (parent.excludeChild && parent.excludeChild.includes(this.classType)) {
            console.error(`禁止 classType 属性为 ${parent.excludeChild.join('、')} 的元素添加到目标容器 ${parent.type}`)
            return false
        }
        if (parent.level >= this.level) {
            console.error(`元素 ${this.type} 添加到容器 ${parent.type}，容器的 level 值为 ${parent.level}, 应小于 ${this.level}`)
            return false
        }        
        this.parent = parent
        parent.children.push(this) 
        return true      
    }
}