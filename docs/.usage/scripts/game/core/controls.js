import Container from './element/container.js'
import Timer from './timer/timer.js'
import {elementLevel} from './config/index.js'

export class timerController extends Container {
    constructor(x = 0, y = 0, width = 500, height = 200, options = {}) {
        const data = {x, y, width, height}
        const assignment = {}

        super('Controller', elementLevel.controller, data, assignment)
        const {opacity = 1, includeChild = null, excludeChild = null, background = null} = options

        // 基础属性
        Object.assign(this, {x, y, width, height, opacity})
        
        // 专有属性
        this.includeChild = includeChild 
        this.excludeChild = excludeChild

        if (background) new Background(background, this)
        
        scenes[scenes.length] = scenes[this.id] = this  
        scenes.length ++         
    }
}