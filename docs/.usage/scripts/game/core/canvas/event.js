import QuadTree from '../structure/quad-tree.js'
import Interface from '../standard/interface.js'

function addEvent(type, element, fun) {
    if (element.addEventListener) {
        addEvent = function (type, element, fun) { element.addEventListener(type, fun, false) }
    } else if(element.attachEvent){
        addEvent = function (type, element, fun) { element.attachEvent('on' + type, fun) }
    } else{
        addEvent = function (type, element, fun) { element['on' + type] = fun }
    }
    return addEvent(type, element, fun)
}
function delEvent(type, element, fun) {
    if (element.addEventListener) {
        delEvent = function (type, element, fun) { element.removeEventListener(type, fun, false) }
    } else if(element.detachEvent){
        delEvent = function (type, element, fun) { element.detachEvent('on' + type, fun) }
    } else{
        delEvent = function (type, element, fun) { element['on' + type] = null }
    }
    return delEvent(type, element, fun)
}



function initEvent(element, data) {
    function handleMouseover() {}
    function handleMousedown() {}
    function handleMousemove(e) {
        data.intersectByPoint(e.offsetX, e.offsetY, e => {
            let {type, state, mousemove} = e.event
            switch(type) {
                case 'MOVE': element.style.cursor = 'move'; break;
                case 'MOVE_X': element.style.cursor = 'col-resize'; break;
                case 'MOVE_Y': element.style.cursor = 'row-resize'; break;
                case 'INPUT': element.style.cursor = 'text'; break;
                default: element.style.cursor = 'pointer'
            }
            state === 'busyness' && (element.style.cursor = 'wait')
            mousemove.forEach(fn => {
                fn()
            });
        }, () => {
            element.style.cursor = 'default'
        })
    }
    function handleMouseup() {}
    function handleTouchstart() {}
    function handleTouchmove() {}
    function handleTouchend() {}
    addEvent('mouseover', element, handleMouseover)
    addEvent('mousedown', element, handleMousedown)
    addEvent('mousemove', element, handleMousemove)
    addEvent('mouseup', element, handleMouseup)
    addEvent('touchstart', element, handleTouchstart)
    addEvent('touchmove', element, handleTouchmove)
    addEvent('touchend', element, handleTouchend)
}

class Event {
    constructor(element) {
        this.data = new QuadTree()
        element && initEvent(element, this.data)
    }
    init(element, options) {
        element && initEvent(element, this.data)
        const quadtreeOptions = Interface.match(options, 'QuadTreeOptions')
        this.data.init(quadtreeOptions)
    }
    addEvent(event = Interface.event) {
        this.data.addBound(event.bound)
    }
}

export const canvasEvent = new Event()


/*
        altKey: false
        bubbles: true
        button: 0
        buttons: 0
        cancelBubble: false
        cancelable: true
        clientX: 795
        clientY: 251
        composed: true
        ctrlKey: false
        currentTarget: null
        defaultPrevented: false
        detail: 0
        eventPhase: 0
        fromElement: body
        isTrusted: true
        layerX: 787
        layerY: 243
        metaKey: false
        movementX: 0
        movementY: 0
        offsetX: 787
        offsetY: 243
        pageX: 795
        pageY: 251
        path: (5) [canvas#myCanvas, body, html, document, Window]
        relatedTarget: body
        returnValue: true
        screenX: 795
        screenY: 354
        shiftKey: false
        sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
        srcElement: canvas#myCanvas
        target: canvas#myCanvas
        timeStamp: 3810.699999988079
        toElement: canvas#myCanvas
        type: "mouseover"
        view: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
        which: 0
        x: 795
        y: 251
        */