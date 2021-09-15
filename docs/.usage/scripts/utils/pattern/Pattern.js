
/**
 * 策略模式
 * @constructor       
 * @private <Object> #STRATEGIES 策略集
 * @private <String> #STRATEGY 使用策略(键值)             
 * @method setStrategies 设置策略集
 * @method useStrategy 使用策略
 * @method runStrategy 运行策略
 * @method addStrategy 扩展策略
 * @method getStrategy 获取策略 
 * @example
    let tweens = new StrategyPattern()
    tweens.setStrategies({
        linear: (t,b,c,d) => c * t / d + b,
        easeIn: (t,b,c,d) => c * (t /= d) * t + b
    })
    tweens.useStrategy('easeIn')
    tweens.runStrategy(t - startTime, startPos, endPos, duration)
 */
class StrategyPattern{
    #STRATEGIES 
    #STRATEGY
    setStrategies(strategies){this.#STRATEGIES = strategies}
    useStrategy(strategy){this.#STRATEGY = strategy}
    runStrategy(){return this.#STRATEGIES[this.#STRATEGY].apply(null, arguments)}
    addStrategy(strategy, value){this.#STRATEGIES[strategy] = value}
    getStrategy(){return this.#STRATEGIES[this.#STRATEGY]}    
}

class StatePattern{
    #STATES      
    setStates(states){this.#STATES = states}
    runState(state){return this.#STATES[state].apply(null, arguments)}
    addState(state, value){this.#STATES[state] = value}
    getState(state){return this.#STATES[state]}    
}

/**
 * 策略状态混合模式
 * @tutorial utils/tweens.js    
 * @example
    const {StrategyAndState} = require('./Pattern')
    let tweens = new StrategyAndState()
    tweens.set({
        linear: (t,b,c,d) => c * t / d + b,
        easeIn: (t,b,c,d) => c * (t /= d) * t + b
    })
    tweens.use('easeIn')
    tweens.runStrategy(t - startTime, startPos, endPos, duration)
 */
class StrategyAndState{
    #OBJ
    #KEY
    set(obj){this.#OBJ = obj}
    use(key){this.#KEY = key}
    runStrategy(){return this.#OBJ[this.#KEY].apply(null, arguments)}
    runState(state){return this.#OBJ[state].apply(null, Array.prototype.slice.call(arguments, 1))}
    add(key, value){this.#OBJ[key] = value}
    get(key){return this.#OBJ[key || this.#KEY]}    
}

export {
    StrategyPattern,
    StatePattern,
    StrategyAndState
}

