import data from '../pattern/Pattern.js'
const {StrategyAndState} = data

/**
 * 缓动类   
 * @example
   const {Tweens} = require('../utils/Tweens')
   const tweens = new Tweens(...)   
 * @example
   const {tweens} = require('../utils/Tweens')
   tweens.use('easeIn') // 默认'linear'改为'easeIn'
   $Btn.addEventListener('click', e => {
        let start = 0, target = 500, duration = 1000
        tweens.run(start, target, duration, num => { $wrapper.style.width = num + 'PX' })
   })
 */
class Tweens{
    #tweens
    constructor(methodsSet, defaultKey){
        let tweens = new StrategyAndState()
        tweens.set(methodsSet)
        tweens.use(defaultKey)  
        this.#tweens = tweens      
    }
    use(key){this.#tweens.use(key)}
    run(initValue, totalIncrement, duration, callback, state){
        let startTime = new Date().getTime()
        let timer = setInterval(() => {
            let now = new Date().getTime();
            if(now > startTime + duration){ 
                clearInterval(timer)
                callback(initValue + totalIncrement)
            } else {
                let currentValue = state ? 
                this.#tweens.runState(state, now - startTime, initValue, totalIncrement, duration) : 
                this.#tweens.runStrategy(now - startTime, initValue, totalIncrement, duration)
                callback(currentValue)
            }                   
        },20)
    }
    add(key, value){this.#tweens.add(key, value)}
}

/**
 * 参数说明
 * @param {Number} t 已用时长
 * @param {Number} b 初始位置
 * @param {Number} c 目标增量
 * @param {Number} d 执行时长
 */
const tweens = new Tweens({
    linear: (t,b,c,d) => c * t / d + b, // 完成百分比=t/d  已完成目标=目标增量*完成百分比=c*t/d  结果=已完成目标+初始位置
    easeIn: (t,b,c,d) => c * (t /= d) * t + b,
    strongEaseIn: (t,b,c,d) => c * (t /= d) * t * t * t * t + b,
    strongEaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
    sineaseIn: (t,b,c,d) => c * (t /= d) * t * t + b,
    sineaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t + 1) + b
}, 'linear')

export default {
    Tweens,
    tweens
}





