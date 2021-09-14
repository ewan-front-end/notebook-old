---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>N 2021.09.14 19:27</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>MVVM模式</h1><strong>MVVM模式</strong>
</div>
<div class="static-content">



<pre class="code-block">
①通过添加访问器实现数据劫持
②把vm._data代理到vm
③初始化计算属性
④模板编译
⑤单向绑定[M→V]-watcher
⑤get[M→V]-订阅
⑤set[M→V]-通知
⑥双向绑定[M→V]
⑥双向绑定[V→M]

function Mvvm (options) {
  this.$options = options
  var data = this._data = this.$options.data
 <span class="comment"><span class="comment"> // </span>①通过添加访问器实现数据劫持</span>
  observe(data)
 <span class="comment"> // ②把vm._data代理到vm</span>
  for (let i in data) {
    Object.defineProperty(this, i, {
      enumerable: true,
      get () { return this._data[i] },
      set (newVal) {
        this._data[i] = newVal
      }
    })
  }
 <span class="comment"> //③初始化计算属性</span>
  initComputed.call(this)

 <span class="comment"> // ④模板编译</span>
  new Compile(options.el, this)
}
function initComputed () {
  let vm = this
  let computed = this.$options.computed
  Object.keys(computed).forEach(function (key) {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set () {

      }
    })
  })
}<span class="comment">
// ④模板编译</span>
function Compile (el, vm) {
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }
  let reg = /\{\{(.*)\}\}/<span class="comment"> // 暂时不支持<img :src="$withBase('/images/db-brace-left.png')">age<img :src="$withBase('/images/db-brace-right.png')"><img :src="$withBase('/images/db-brace-left.png')">age<img :src="$withBase('/images/db-brace-right.png')">，会得到age<img :src="$withBase('/images/db-brace-right.png')"><img :src="$withBase('/images/db-brace-left.png')">age</span>
  function replace (nodes) {
    Array.from(nodes.childNodes).forEach((node) =&gt; {
      let text = node.textContent
      if (node.nodeType === 3 && reg.test(text)) {
       <span class="comment"> //console.log(RegExp.$1)</span>
        let exp = RegExp.$1
        let arr = exp.split('.')
        let val = vm
        arr.forEach((key) =&gt; {
          val = val[key]
        })
        node.textContent = text.replace(reg, val)
       <span class="comment"> // ⑤单向绑定[M→V]-watcher</span>
        let watcher = new Watcher(vm, exp, function (newVal) {
          node.textContent = text.replace(reg, newVal)
        })
      }
     <span class="comment"> // ⑥双向绑定</span>
      if (node.nodeType === 1) {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr =&gt; {
          let name = attr.name
          let exp = attr.value
          if (name.indexOf('v-') == 0) {
            let val = vm
            let arr = exp.split('.')
            arr.forEach(key =&gt; {
              val = val[key]
            })
            node.value = val
           <span class="comment"> // ⑥双向绑定[M→V]</span>
            new Watcher(vm, exp, function (newVal) {
              node.value = newVal
            })
           <span class="comment"> // ⑥双向绑定[V→M]</span>
            node.addEventListener('input', function (e) {
              let newVal = e.target.value
              var modelTarget = vm
              let arr = exp.split('.')
              let last = arr.length - 1
              arr.forEach((key, index) =&gt; {
                if (last === index) {
                  modelTarget[key] = newVal
                } else {
                  modelTarget = modelTarget[key]
                }
              })

            })
          }
        })
      }
      if (node.childNodes) {
        replace(node)
      }
    })
  }
  replace(fragment)
  vm.$el.appendChild(fragment)
}

function Observe (data) {

  for (let i in data) {
    let val = data[i]
   <span class="comment"> // 递归观察成员子值</span>
    observe(val)
    let dep = new Dep()
    Object.defineProperty(data, i, {
      enumerable: true,
      get: function () {
       <span class="comment"> // ⑤单向绑定[M→V]-订阅</span>
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set (newVal) {
        if (newVal === val) return
        val = newVal
       <span class="comment"> // ⑤单向绑定[M→V]-通知</span>
        dep.notify()
      }
    })
  }
}<span class="comment">
// ①通过添加访问器实现数据劫持</span>
function observe (data) {
 <span class="comment"> // 递归观察成员子值 无子值则忽略</span>
  if (typeof data !== 'object') return
  return new Observe(data)

}

<span class="comment">
// 发布订阅模式，用于耦合get订阅 set通知 compile模板watcher</span>
function Dep () { this.subs = [] }
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}
Dep.prototype.notify = function () {
  this.subs.forEach(sub =&gt; sub.update())
}

function Watcher (vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp
  Dep.target = this
  let val = vm\
  let arr = exp.split('.')
  arr.forEach(function (key) {
    val = val[key]
  })
  Dep.target = null
}
Watcher.prototype.update = function () {
  let newVal = this.vm
  let arr = this.exp.split('.')
  arr.forEach(key =&gt; {
    newVal = newVal[key]
  })
  console.log(this.exp)
  this.fn(newVal)
}


封装一个全局组件
1 添加全局方法或属性，如:  vue-custom-element
2 添加全局资源：指令/过滤器/过渡等，如 vue-touch
3 添加全局 mixin方法，如: vuex
4 添加实例方法，通过把它们添加到 Vue.prototype 上实现

export default {
install(Vue, options) {
<span class="comment">
// 1. 添加全局方法或属性，如:  vue-custom-element</span>
Vue.$author = 'wanyuaning'
Vue.myGlobalMethod = function () {  // <span class="comment"><span class="comment">
// 逻辑...</span></span>
}
<span class="comment">
// 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch</span><span class="comment">
// 注册一个全局自定义指令 `v-focus`，使用：&lt;input v-focus&gt;</span>
Vue.directive('focus', {<span class="comment">
// 当被绑定的元素插入到 DOM 中时……</span>
inserted: function (el) {
el.focus()<span class="comment"> // 聚焦元素</span>
},<span class="comment">
// 其它勾子函数,详：https://cn.vuejs.org/v2/guide/custom-directive.html</span>
bind: function() {},
unbind: function() {}
update: function() {},
componentUpdated: function() {}
})
<span class="comment">
// 3. 通过全局 mixin方法添加一些组件选项，如: vuex</span><span class="comment">
// 定义一个混入对象https://cn.vuejs.org/v2/guide/mixins.html</span>
Vue.mixin({
created: function () {
this.hello()
},
methods: {
hello: function () {
console.log('hello from mixin!')
}
}
})
<span class="comment">
// 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现    </span>
Vue.prototype.$myMethod = function (options) {  
// 逻辑...
}
}
}
</pre>


</div>