/**
 * 函数防抖
 * @param {Function} fn
 * @param {Number} delay 
 */
var debounceTimer
module.exports.debounce = (fn, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function(){
        fn()
    }, delay)
}

/**
 * 函数节流
 * @param {Function} fn 
 * @param {Number} delay 
 * @returns 
 */
module.exports.throttle = (fn, delay) => {
    var timer
    return function () {
        var _this = this, args = arguments
        if (timer) return
        timer = setTimeout(function () {
            fn.apply(_this, args)
            timer = null 
        }, delay)
    }
}