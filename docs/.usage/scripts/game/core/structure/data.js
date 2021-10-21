import QuadTree from './quad-tree.js'
import Interface from '../standard/interface.js'


class EventData {
    constructor() {
        this.data = new QuadTree()
    }
    init(options) {
        this.data.init(options)
    }
    insert(options = {
        //type: 'click', 
        //handler: function() {}, 
        //state: 0, 
        //target: Element
    }) {
        //console.log(options);
        const bound = Interface.match(options, 'bound')
        this.data.insert(bound)
    }
    mouseMove(x, y, intersect, isolate) {
        let res = this.data.intersectByPoint(x, y)
        if (res.length) {
            res.sort((a, b) => b - a)
            intersect(res[0]._data)
        } else {
            isolate()
        }
    }
}


export const eventData = new EventData()