import observe from './observe.js'
import Compile from './compile.js'
import {callHook} from './lifecycle.js'

export default function MVVM (options) {
    this.$options = options
    var data = this._data = this.$options.data

    // 1.通过添加访问器实现数据劫持
    observe(data)

    // 2.把vm._data代理到vm
    for (let i in data) {
      Object.defineProperty(this, i, {
        enumerable: true,
        get () { return this._data[i] },
        set (newVal) {
          this._data[i] = newVal
        }
      })
    }
    //③初始化计算属性
    initComputed.call(this)
  
    // ④模板编译
    new Compile(options.el, this)
    callHook(this, 'created')
  }
  function initComputed () {
    let vm = this
    let computed = this.$options.computed
  
    computed && Object.keys(computed).forEach(function (key) {
      Object.defineProperty(vm, key, {
        get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
        set () {
  
        }
      })
    })
}