import Element from './element.js'

/**
 * 群组元素
 * @extends Element
 * @constructor
 * @param {String} name 群组命名 可作访问群组的key值
 */
 export default class Group extends Element {
    constructor(name) {
        super('GROUP', 3)
        this.name = name
        this.data = {
            alpha: 1, // 作用于层结构 如背景
            opacity: 1, // 作用于所有
        }
    }
    
}