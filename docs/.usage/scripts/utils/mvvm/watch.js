// 发布订阅模式，用于耦合get订阅 set通知 compile模板watcher
export function Dep () { this.subs = [] }
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}
Dep.prototype.notify = function () {
  this.subs.forEach(sub => sub.update())
}

export function Watcher (vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp
  Dep.target = this
  let val = vm
  let arr = exp.split('.')
  arr.forEach(function (key) {
    val = val[key]
  })
  Dep.target = null
}
Watcher.prototype.update = function () {
  let newVal = this.vm
  let arr = this.exp.split('.')
  arr.forEach(key => {
    newVal = newVal[key]
  })
  console.log(this.exp)
  this.fn(newVal)
}

const targetStack = []
export function pushTarget (target) {
    if (!target) target = Watcher
    targetStack.push(target)
    Dep.target = target
}  
export function popTarget () {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}