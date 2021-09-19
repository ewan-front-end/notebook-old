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
    appendTo = appendTo
}