export default {
    bound: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        target: null
    },
    event: {
        type: 'click', 
        state: 0,               // 事件状态0初始1触发2完成 
        target: null,           // 元素 
        bound: null,            // 元素包围盒
        CLICK_FN: [],
        MOUSEMOVE_FN: [],
        MOUSEDOWN_FN: []
    },
    QuadTreeOptions: {
        maxChildrenNum: 5,         // 子类数量阈值
        maxLevels: 5,              // 最大细分层级
        startBound : {x: 0, y: 0, width: 0, height: 0, target: null}
    },
    match(data, target) {
        target = this[target]
        if (Object.prototype.toString.call(target) === '[object Object]') {
            const obj = {}
            for(let i in target) {obj[i] = data[i] || target[i]}
            return obj
        }
        if (Object.prototype.toString.call(target) === '[object Array]') {
            const arr = target.slice()
            arr.forEach((e,i) => {
                if (data.length > i) arr[i] = data[i]
            })
            return arr
        }
    }
}
