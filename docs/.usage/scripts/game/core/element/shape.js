import Element from "./element.js"
import {elementLevel} from '../config/index.js'
import Interface from '../standard/interface.js'

/**
 * 形状
 * @extends Element
 * @constructor
 * @param {String} type 类型
 * @param {Object} data 绘制属性
 * @param {Object} contextConfig 绘制环境
 * @param {Object} config 策略配置
 * @param {Object} transform 变换
 */
 export default class Shape extends Element {
    constructor(elementOptions = Interface.ElementOptions) {
        let {type, painter} = elementOptions
        super({
            type, 
            level: elementLevel.shape, 
            classType: 'CLASS_SHAPE', 
            options: {}, 
            painter
        })
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
    // 应用材质
    useTexture(texture) {
        // todo
    }
}








