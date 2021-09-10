/* 策略模式
 * Example:
   let tweens = new StrategyPattern()
   tweens.setStrategy({
     linear: (t,b,c,d) => c * t / d + b,
     easeIn: (t,b,c,d) => c * (t /= d) * t + b,
     strongEaseIn: (t,b,c,d) => c * (t /= d) * t * t * t * t + b,
     strongEaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
     sineaseIn: (t,b,c,d) => c * (t /= d) * t * t + b,
     sineaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t + 1) + b
   })
   应用策略
   tweens.useStrategy('strongEaseIn')
   策略运行
   tweens.run(t - startTime, startPos, endPos, duration)
 */
class StrategyPattern{
  #strategy
  #name
  setStrategy(obj){this.#strategy = obj}
  useStrategy(name){this.#name = name}
  // 触手API
  addStrategy(name, fn){this.#strategy[name] = fn}
  get(){return this.#strategy[this.#name]}
  run(){return this.#strategy[this.#name].apply(null, arguments)}
}

/* 状态模式
 * 
 */
class StatePattern{
  #state      
  setStateObj(obj){this.#state = obj}
  // 触手API
  addState(name, fn){this.#state[name] = fn}
  get(name){return this.#state[name]}
  run(name){return this.#state[name].apply(null, arguments)}
}

/* 状态模式&策略模式
 * Example:
   let tweens = new StateAndStrategy()
   tweens.setData({
     linear: (t,b,c,d) => c * t / d + b,
     easeIn: (t,b,c,d) => c * (t /= d) * t + b,
     strongEaseIn: (t,b,c,d) => c * (t /= d) * t * t * t * t + b,
     strongEaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
     sineaseIn: (t,b,c,d) => c * (t /= d) * t * t + b,
     sineaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t + 1) + b
   })

   应用策略 可作默认
   tweens.setDefault('strongEaseIn')

   获取数据值(key有值为获取状态 key无值为获取策略(默认))
   get(key) 

   运行数据值(当值为函数时)
   tweens.runDefault(          t - startTime, startPos, endPos, duration) // 策略运行(默认)
   tweens.runState  ('linear', t - startTime, startPos, endPos, duration) // 状态运行
 */
class StateAndStrategy{
  #DATA_LIST
  #DEFAULT
  setData(obj){this.#DATA_LIST = obj}
  setDefault(key){this.#DEFAULT = key}
  // 触手API
  addData(key, value){this.#DATA_LIST[key] = value}
  get(key){return key ? this.#DATA_LIST[key] : this.#DATA_LIST[this.#DEFAULT]}
  runDefault(){ return this.#DATA_LIST[this.#DEFAULT].apply(null, arguments) }
  runState(key){ return this.#DATA_LIST[key].apply(null, Array.prototype.slice.call(arguments, 1)) }
}