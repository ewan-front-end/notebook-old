
import {quadTreeManager} from "../structure/quad-tree.js"

function addEvent(type, element, fun) {
    if (element.addEventListener) {
        addEvent = function (type, element, fun) {
            element.addEventListener(type, fun, false)
        }
    } else if(element.attachEvent){
        addEvent = function (type, element, fun) {
            element.attachEvent('on' + type, fun)
        }
    } else{
        addEvent = function (type, element, fun) {
            element['on' + type] = fun
        }
    }
    return addEvent(type, element, fun)
}
function delEvent(type, element, fun) {
    if (element.addEventListener) {
        delEvent = function (type, element, fun) {
            element.removeEventListener(type, fun, false)
        }
    } else if(element.detachEvent){
        delEvent = function (type, element, fun) {
            element.detachEvent('on' + type, fun)
        }
    } else{
        delEvent = function (type, element, fun) {
            element['on' + type] = null
        }
    }
    return delEvent(type, element, fun)
}





// const elementArea = [[100,700,460,475]]
// function checkAreaX(x, y, arr, i) {
//     if (arr.length === 0) return
//     checkAreaX(x, y, arr.filter(e => e[i] <= x), i + 1) 
// }
// checkAreaX(0, 0, elementArea, 0)


export default class Event {
    constructor({canvas, draw}) {
        const eventData = quadTreeManager.create('EVENT_DATA', {x: 0, y:0,  width:800, height:500})
        eventData.insert({x: 100, y:460, width:600, height:15, event:{type: 'MOVE'}})
        // eventData.insert({x: 100, y:50, width:20, height:20})
        // eventData.insert({x: 500, y:300, width:40, height:20})
        // eventData.insert({x: 470, y:330, width:20, height:20})
        // eventData.insert({x: 550, y:350, width:50, height:50})
        // eventData.insert({x: 600, y:320, width:10, height:10})
        eventData.insert({x: 640, y:390, width:20, height:20, event:{type: 'MOVE_X'}})
        eventData.insert({x: 680, y:370, width:10, height:10, event:{type: 'INPUT'}})
        eventData.insert({x: 690, y:385, width:10, height:10, event:{type: 'MOVE', state:'busyness'}})
        setTimeout(()=>{
            eventData.draw(draw)
        }, 2000)
        
        //canvas.style.cursor = 'pointer'
        function handleMouseover() {}
        function handleMousedown() {}
        function handleMousemove(e) {
            let res = eventData.intersectByPoint(e.offsetX, e.offsetY)
            if (res.length) {
                res.sort((a, b) => b - a)
                let currentTarget = res[0], {type, state} = currentTarget.event
                switch(type) {
                    case 'MOVE': canvas.style.cursor = 'move'; break;
                    case 'MOVE_X': canvas.style.cursor = 'col-resize'; break;
                    case 'MOVE_Y': canvas.style.cursor = 'row-resize'; break;
                    case 'INPUT': canvas.style.cursor = 'text'; break;
                    default: canvas.style.cursor = 'pointer'
                }
                state === 'busyness' && (canvas.style.cursor = 'wait')
            } else {
                canvas.style.cursor = 'default'
            }
        }
        function handleMouseup() {}
        function handleTouchstart() {}
        function handleTouchmove() {}
        function handleTouchend() {}
        addEvent('mouseover', canvas, handleMouseover)
        addEvent('mousedown', canvas, handleMousedown)
        addEvent('mousemove', canvas, handleMousemove)
        addEvent('mouseup', canvas, handleMouseup)
        addEvent('touchstart', canvas, handleTouchstart)
        addEvent('touchmove', canvas, handleTouchmove)
        addEvent('touchend', canvas, handleTouchend)
        
        
    }
    
    
}


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