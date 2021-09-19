import ElementAdd from './element/element-add.js'

/**
 * 舞台元素
 * @extends ElementAdd
 * @constructor
 */
 export default class Stage extends ElementAdd {
    constructor() {
        super('STAGE', 0, 'CLASS_STAGE', {
            includeChild: ['CLASS_SCENE']
        })
        this.name = 'STAGE'
    }
}