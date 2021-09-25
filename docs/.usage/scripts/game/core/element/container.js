import Element from "./element.js"
import Rect from "../rect.js"

/**
 * Element元素装饰
 * @extends Element
 * @constructor
 * @method addChild 添加子元素
 * @method appendTo 添加到容器
 */
export default class Container extends Element {
    constructor (type, level) {        
        super(type, level, 'CLASS_CONTAINER', null, null, null)
        // 输出:
        this.data =  this.assignment = this.config = this.transform = null
    }
    setData(data){
        super.setData(data)
    } 
    addChild(child, forced) {        
        if (!(child instanceof Element)) return {state: 2, type: 1, message: '子元素非 Element 实例'}
        if (child.level <= this.level) return {state: 2, type: 2, message: '越权添加'}
        if (this.children.includes(child))  return {state: 1, type: 3, message: '重复添加'}
        if (this.includeChild && !this.includeChild.includes(child.classType)) return {state: 2, type: 4, message: `允许添加 classType 属性为 ${this.includeChild.join('、')} 的元素`}
        if (this.excludeChild && this.excludeChild.includes(child.classType)) return {state: 2, type: 5, message: `禁止添加 classType 属性为 ${this.excludeChild.join('、')} 的元素`}        
        if (child.parent) {
            if (forced) {
                child.parent.delChild(child.id)
            } else {
                return {state: 1, type: 6, message: '子元素已添加过其它容器'}
            }
        }  
        child.parent = this
        this.children.push(child) 
        return {state: 0, type: 0, message: null}
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
        return {state: 0, type: 0, message: null}      
    }
    delChild(id){
        this.children = this.children.filter(child => child.id !== id)
    }
    update(arr) {
        this.backgroundColor && arr.push(backgroundColor)
        this.backgroundImage && arr.push(this.backgroundImage)
        this.children.forEach(child => {child.update(arr)})
    }
}