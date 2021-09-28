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
        super(type, level, 'CLASS_CONTAINER')
        this.children = []
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
        child.classType === 'CLASS_SHAPE' && child.setData()
        return {state: 0, type: 0, message: null}
    }    
    delChild(id){
        this.children = this.children.filter(child => child.id !== id)
    }
    update(arr) {
        //super.update(arr)
        this.children.forEach(child => {child.update(arr)})
    }
}