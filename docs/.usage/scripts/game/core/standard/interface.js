export default {
    bound: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    quadtree: {
        maxChildrenNum: 5,         // 子类数量阈值
        maxLevels: 5,              // 最大细分层级
        level: 0,                  // 手动设置层级
        startBound : {x: 0, y: 0, width: 0, height: 0} 
    },
    match(data, target) {
        target = this[target]
        if (Object.prototype.toString.call(target) === '[object Object]') {
            const obj = {}
            for(let i in target) {obj[i] = data[i] || target[i]}
            obj._data = data
            return obj
        }
    }
}
