/**
 * 节流函数
 * @param {function} fn 要执行的方法
 * @param {number} intervals 间隔时间 负值时为前置 正值时为后置
 * @param [function] feedback 溢出反馈
 * @params [any] args 包装参数 执行方法时 累加在执行参数后
 * @params [any] params 执行参数 执行方法时 原生参数
 * @return function
 * @example
 *  const obj = {
        name: '姓名',
        fun(e, params, str) {
            console.log(this.name) 
            console.log('执行参数：', e)
            console.log('包装参数：', params, str)            
        }
    }
    const handler = throttle(obj.fun.bind(obj), 1000, () => { console.log('溢出反馈!') }, '包装参数1', '包装参数2')
    window.addEventListener('resize', handler)
 * @example
 *  const clickHandle = () => {console.log('点击处理函数')}
    document.querySelector('#button').addEventListener('click', throttle(clickHandle, -5000, () => {console.log('5秒钟之内不能重复点击!')}))
 */
export const throttle = (fn, intervals, feedback, ...args) => {
    let throttleTimer, throttleIntervals = Math.abs(intervals)
     
    return intervals > 0 ? 
    (...params) => {
        if (throttleTimer) {
            feedback && feedback(...params)
        } else {
            throttleTimer = setTimeout(() => {
                fn(...params, ...args)
                clearTimeout(throttleTimer)
                throttleTimer = null
            }, throttleIntervals)
        }
    } :
    (...params) => {
        if (throttleTimer) {
            feedback && feedback(...params)
        } else {
            fn(...params, ...args)
            throttleTimer = setTimeout(() => {
                clearTimeout(throttleTimer)
                throttleTimer = null
            }, throttleIntervals)
        }
    }
}

/**
 * 防抖函数
 * @param {function} fn - 要被执行的方法, 相隔多长时间要被执行的方法
 * @param {number} intervals - 间隔时间, 相隔多长时间调用一次对应方法
 * @params {any} args - 剩余参数,剩余参数将会在调用fn时作为参数传给fn
 * @params {any} params - 以下方使用例子看，input事件被触发的时候，会在传个event对象过去，所以同样需要接收
 * @return function
 * @example
 *  const getInputValue = (e, a) => {
        const {target: {value}} = e
        console.log('输入框的值为',value)
        console.log(a)
    }
    const input = document.querySelector('#input')
    input.addEventListener('input', debounce(getInputValue,1000, '包装参数'))
 */
export const debounce = (fn, intervals, ...args) => {
    let debounceTimer
    return (...params) => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            fn(...params, ...args)
            clearTimeout(debounceTimer)
        }, intervals)
    }
}


  
  
  