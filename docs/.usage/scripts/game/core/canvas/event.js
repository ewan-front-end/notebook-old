
function addEvent(type, element, fun) {
    if (element.addEventListener) {
        addEvent = function (type, element, fun) {
            element.addEventListener(type, fun, false)
        }
    }
    else if(element.attachEvent){
        addEvent = function (type, element, fun) {
            element.attachEvent('on' + type, fun)
        }
    }
    else{
        addEvent = function (type, element, fun) {
            element['on' + type] = fun
        }
    }
    return addEvent(type, element, fun)
}


// const elementArea = [[100,700,460,475]]
// function checkAreaX(x, y, arr, i) {
//     if (arr.length === 0) return
//     checkAreaX(x, y, arr.filter(e => e[i] <= x), i + 1) 
// }
// checkAreaX(0, 0, elementArea, 0)


export default class Event {
    constructor(canvas) {
        canvas.style.cursor = 'pointer'
        addEvent('mouseover', canvas, e => {
            console.log('-----', e)
            this.style.cursor = 'hand'
        })
        addEvent('mousedown', canvas, e => {
            console.log('-----', e.offsetX, e.offsetY)
        })
        addEvent('mousemove', canvas, e => {
            console.log('-----', e.offsetX, e.offsetY)
        })
        addEvent('mouseup', canvas, e => {
            console.log('-----', e)
        })

        addEvent('touchstart', canvas, e => {
            console.log('-----', e)
        })
        addEvent('touchmove', canvas, e => {
            console.log('-----')
        })
        addEvent('touchend', canvas, e => {
            console.log('-----', e)
        })
        
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
    }
}