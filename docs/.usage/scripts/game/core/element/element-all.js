import Element from "./element.js"
import { addChild, appendTo } from './methodes.js'

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
    setData(data){
        super.setData(data)
    } 
    addChild = addChild
    appendTo = appendTo
}