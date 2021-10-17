function getOriginFromBound(bound) {
    let [min, max] = bound
    return min.map((val, i) => (val + max[i]) * 0.5)
}
function createBoundByPosition({position, size}, aabb) {
    aabb.min = position
    aabb.max = position.map((val, i) => val + size[i])
    aabb.origin = position.map((val, i) => val + size[i]/2)
    aabb.size = size
    aabb.veidoo = position.length
}
function getSizeFromBound(bound) {
    let [min, max] = bound
    return min.map((val, i) => max[i] - val)
}

/**
 * 包围球
 */
export class Sphere {

}

/**
 * 轴对齐包围盒(Axis-Aligned Bounding Box)
 * @example
 * let aabb = new AABB([[0,0], [0,0]])
 * let aabb = new AABB([[0,0,0], [0,0,0]])
 * let aabb = new AABB({position: [0, 0], size: [100, 100]})
 * let aabb = new AABB({position: [0, 0, 0], size: [100, 100, 100]})
 */
export class AABB {
    constructor(options) {
        if (Object.prototype.toString.call(options) === '[object Array]') {
            this.min = options[0] 
            this.max = options[1]
            this.origin = getOriginFromBound(options)
            this.size = getSizeFromBound(options)
            this.veidoo = options[0].length
        } else {
            createBoundByPosition(options, this)
        }
    }
    // 通过添加一个有效顶点调整扩张包围盒
    adjustByPoint(point) {
        let {min, max} = this
        point.forEach((val, i) => {
            val < min[i] && (min[i] = val)
            val > max[i] && (max[i] = val)
        })
    }
    // 检测包装盒是否为空
    isEmpty() {
        let {min, max} = this
        return min.some((val, i) => val > max[i])
    }
    // 检测点是否属于AABB范围之内
    isContainsPoint(point) {
        let {min, max} = this
        return point.every((val, i) => val >= min[i] && val <= max[i])
    }
    // 相交检测(碰撞)
    intersect(bound) {
        let {min, max} = this, {min: min2, max: max2} = bound
        for (let i = 0; i < min.length; i++) {
            if (min[i] > max2[i]) return false
            if (max[i] < min2[i]) return false
            if (min2[i] > max[i]) return false
            if (max2[i] < min[i]) return false
        }
        return true
    }
}

/**
 * 方向包围盒(Oriented Bounding Box)
 */
 export class OBB {

}

/**
 * 固定方向凸包(Fixed Directions Hulls或k-DOP)
 */
 export class FDH {

}