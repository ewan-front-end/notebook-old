
const Resouce = {
    length: 0
}
let resouceTotle = 0
let resouceReadyHandler = function() {}
let resouceReady = function(fn) {
    resouceReadyHandler = fn
}

function asyncImage(src) {
    resouceTotle++
    return new Promise((resolve, reject) => {
        let image = new Image()
        image.onload = function() { 
            Resouce.length++              
            Resouce[src] = this
            resolve(this)
            if (Resouce.length >= resouceTotle) setTimeout(resouceReadyHandler)
        }
        image.onerror = function() {
            resouceTotle--
            reject()
            if (Resouce.length >= resouceTotle) setTimeout(resouceReadyHandler)
        }
        image.src = src
    })   
}
function asyncVideo() {
    // todo
}

export {
    Resouce,
    asyncImage,
    asyncVideo,
    resouceReady
}