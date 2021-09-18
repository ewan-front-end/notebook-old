import Element from './element.js'

/**
 * 舞台元素
 * @extends Element
 * @constructor
 */
 export default class Stage extends Element {
    constructor() {
        super('STAGE', 0, {
            beforeAdd: function(child) {console.log('111222333',child.type)},
            addFnName: 'addScene', 
            appendFnName: null
        })
        this.scenes = []
        this.name = 'STAGE'
        this.data = {
            // todo
        }
    }
}