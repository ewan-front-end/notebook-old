import Element from "./element.js"
import Interface from '../standard/interface.js'

/**
 * Element元素装饰
 * @extends Element
 * @constructor
 * @method addChild 添加子元素
 */
const deepAddChild = (children, child) => {
    children.sort((a, b) => a.level - b.level)    
    for(let i = 0; i < children.length; i++) {
        let container = children[i]
        if (container.classType !== 'CLASS_CONTAINER') continue
        let res = container.addChild(child)
        if (res.state === 0) break
    }
}
export default class Container extends Element {
    constructor (elementOptions = Interface.ElementOptions) {
        const {type, level, painter} = elementOptions
        super({
            type, 
            level, 
            classType: 'CLASS_CONTAINER', 
            options: {}, 
            painter
        })
        this.children = []
    }
    setData(data){
        super.setData(data)
    } 
    /**
     * 添加子元素
     * @param {Element} child 
     * @param {Boolean} forced 子元素已有所属容器时是否强制添加到当前容器
     * @param {Boolean} deep 子元被限制添加时是否允许容器的子容器继续添加子无素 
     * @returns 
     */
    addChild(child, forced, deep) {        
        if (!(child instanceof Element)) return {state: 2, type: 1, message: '子元素非 Element 实例'}
        if (child.level <= this.level) return {state: 2, type: 2, message: '越权添加'}
        if (this.children.includes(child))  return {state: 1, type: 3, message: '重复添加'}
        if (this.includeChild && !this.includeChild.includes(child.classType)) {
            if (this.children.length > 0 && deep && child.level - this.level > 1) {
                deepAddChild(this.children, child)
            } else {
                return {state: 2, type: 4, message: `允许添加 classType 属性为 ${this.includeChild.join('、')} 的元素`}
            }
        } 
        if (this.excludeChild && this.excludeChild.includes(child.classType)) {
            if (this.children.length > 0 && deep && child.level - this.level > 1) {
                deepAddChild(this.children, child)
            } else {
                return {state: 2, type: 5, message: `禁止添加 classType 属性为 ${this.excludeChild.join('、')} 的元素`}
            }
        }        
        // 子元素已有所属容器 是否强制添加它
        if (child.parent) {
            if (forced) {
                child.parent.delChild(child)
            } else {
                return {state: 1, type: 6, message: '子元素已添加过其它容器'}
            }
        }  
        child.parent = this
        this.children.push(child) 
        child.classType === 'CLASS_SHAPE' && child.setData()
        return {state: 0, type: 0, message: null}
    }
    delChild(child){
        let id = typeof child === 'string' ? child : child.id
        this.children = this.children.filter(child => child.id !== id)
    }
    update(draw) {
        //super.update(arr)
        this.children.forEach(child => {child.update(draw)})
    }
}