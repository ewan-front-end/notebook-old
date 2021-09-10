// 依赖 模式对象 Pattern.js

// let tweens = new StrategyPattern()
// tweens.setStrategyObj({
//   linear: (t,b,c,d) => c * t / d + b,
//   easeIn: (t,b,c,d) => c * (t /= d) * t + b,
//   strongEaseIn: (t,b,c,d) => c * (t /= d) * t * t * t * t + b,
//   strongEaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
//   sineaseIn: (t,b,c,d) => c * (t /= d) * t * t + b,
//   sineaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t + 1) + b
// })
// 指针
// tweens.useStrategy('strongEaseIn')
// 策略使用
// tweens.run(t - startTime, startPos, endPos, duration)



let tweens = new StateAndStrategy()
tweens.setData({
  linear: (t,b,c,d) => (c - b) * (t / d) + b, //c * t / d + b,
  easeIn: (t,b,c,d) => c * (t /= d) * t + b,
  strongEaseIn: (t,b,c,d) => c * (t /= d) * t * t * t * t + b,
  strongEaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
  sineaseIn: (t,b,c,d) => c * (t /= d) * t * t + b,
  sineaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t + 1) + b
})

// 应用策略 可作默认
tweens.setDefault('linear')

// 获取数据值(key有值为获取状态 key无值为获取策略(默认))
// get(key)

// 运行数据值(当值为函数时)
// tweens.runDefault(          t - startTime, startPos, endPos, duration) // 策略运行(默认)
// tweens.runState  ('linear', t - startTime, startPos, endPos, duration) // 状态运行
// duration 持续的时间

/**
 * 使用实例
 *  function runTween(startNum, targetNum, duration, cb){
        let startTime = new Date().getTime()
        let timer = setInterval(function(){
            let now = new Date().getTime();
            if(now > startTime + duration){ 
                clearInterval(timer)
                cb(targetNum)
            } else {
                let currentNum = tweens.runState('strongEaseOut', now - startTime, startNum, targetNum, duration)
                if(currentNum > targetNum) currentNum = targetNum
                cb(currentNum)
            }                   
        },20)
    }
    $switchBtn.addEventListener('click', e => {
        let target = Math.min($codeContainer.scrollWidth, maxExpandSize)
        runTween(0, target, 500, num => {
            $wrapper.style.width = num + 'PX'
        })
    })
 */