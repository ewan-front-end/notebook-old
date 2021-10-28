import Container from './element/container.js'
import {elementLevel} from './config/index.js'

/**
 * 群组元素
 * @extends Container
 * @constructor
 * @param {String} name 群组命名 可作访问群组的key值
 */
 export default class Group extends Container {
    constructor(name) {
        super({
            type: 'GROUP', 
            level: elementLevel.group
        })
        this.name = name
            
    }
}