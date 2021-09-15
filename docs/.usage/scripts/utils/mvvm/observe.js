import { Dep } from './watch.js'

function Observe (data) {
    for (let i in data) {
        let val = data[i]
        // 递归观察成员子值
        observe(val)
        let dep = new Dep()
        Object.defineProperty(data, i, {
            enumerable: true,
            get: function () {
                // 订阅
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newVal) {
                if (newVal === val) return
                val = newVal
                observe(newVal)
                // 通知订阅者
                dep.notify()
            }
        })
    }
}

// 1.通过添加访问器实现数据劫持
export default function observe (value) {
    // 递归观察成员子值 无子值则忽略
    if (!value || typeof value !== 'object') return
    return new Observe(value)
}
  
  
  