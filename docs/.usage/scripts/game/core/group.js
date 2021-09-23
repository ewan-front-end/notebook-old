import Container from './element/container.js'

/**
 * 群组元素
 * @extends Container
 * @constructor
 * @param {String} name 群组命名 可作访问群组的key值
 */
 export default class Group extends Container {
    constructor(name) {
        super('GROUP', 3, 'CLASS_GROUP')
        this.name = name
            
    }
}