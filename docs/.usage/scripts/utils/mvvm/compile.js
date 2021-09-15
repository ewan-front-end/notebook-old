import { Watcher } from "./watch.js"

// ④模板编译
export default function Compile (el, vm) {
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()
    let child
    while (child = vm.$el.firstChild) {
      fragment.appendChild(child)
    }
    let reg = /\{\{(.*)\}\}/ // 暂时不支持ageage，会得到ageage
    function replace (nodes) {
      Array.from(nodes.childNodes).forEach((node) => {
        let text = node.textContent
        if (node.nodeType === 3 && reg.test(text)) {
          //console.log(RegExp.$1)
          let exp = RegExp.$1
          let arr = exp.split('.')
          let val = vm
          arr.forEach((key) => {
            val = val[key]
          })
          node.textContent = text.replace(reg, val)
          // ⑤单向绑定[M→V]-watcher
          let watcher = new Watcher(vm, exp, function (newVal) {
            node.textContent = text.replace(reg, newVal)
          })
        }
        // ⑥双向绑定
        if (node.nodeType === 1) {
          let nodeAttrs = node.attributes
          Array.from(nodeAttrs).forEach(attr => {
            let name = attr.name
            let exp = attr.value
            if (name.indexOf('v-') == 0) {
              let val = vm
              let arr = exp.split('.')
              arr.forEach(key => {
                val = val[key]
              })
              node.value = val
              // ⑥双向绑定[M→V]
              new Watcher(vm, exp, function (newVal) {
                node.value = newVal
              })
              // ⑥双向绑定[V→M]
              node.addEventListener('input', function (e) {
                let newVal = e.target.value
                var modelTarget = vm
                let arr = exp.split('.')
                let last = arr.length - 1
                arr.forEach((key, index) => {
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