function getOriginFromBound(bound) {
    let origin = Array(3), {min, max} = bound
        origin[0] = (min[0] + max[0]) * 0.5
        origin[1] = (min[1] + max[1]) * 0.5
        origin[2] = (min[2] + max[2]) * 0.5
    return origin
}
function createBoundByPosition({start, size}, aabb) {
    aabb.min = start
    aabb.max = start
    start.forEach((val, i) => {
        
    })
    if (position.length === 4) {
        let {x, y, w, h} = position
        
        aabb.max = [x + w, y + h]
        aabb.origin = [x + w/2, y + h/2]
        aabb.size = [w, h]
        aabb.veidoo = 2
    }
    if (position.length === 6) {
        let {x, y, z, w, h, d} = position
        
        aabb.max = [x + w, y + h, z + d]
        aabb.origin = [x + w/2, y + h/2, z + d/2]
        aabb.size = [w, h, z]
        aabb.veidoo = 3
    }
}
function getSizeFromBound(bound) {
    let size = Array(3), {min, max} = bound
    size[0] = max[0]-min[0]
    size[1] = max[1]-min[1]
    size[2] = max[2]-min[2]
    return size
}


/**
 * 包围球
 */
export class Sphere {

}

/**
 * 轴对齐包围盒(Axis-Aligned Bounding Box)
 * @nature
 *   origin: [X, Y, Z]
 *   Pmin = [Xmin Ymin Zmin]，Pmax = [ Xmax Ymax Zmax]
 *   Xmin <= X <= Xmax
 *   Ymin <= Y <= Ymax
 *   Zmin <= Z <= Zmax
 * @example
 *   let aabb = new AABB({min: [0,0], max: [0,0]})
 *   let aabb = new AABB({min: [0,0,0], max: [0,0,0]})
 *   let aabb = new AABB({
 *       position: {
 *           start: [0, 0]
 *           size: [100, 100]
 *       }
 *   })
 *   let aabb = new AABB({
 *       position: {
 *           start: [0, 0, 0]
 *           size: [100, 100, 100]
 *       } 
 *   })
 */
export class AABB {
    constructor(options = {}) {
        let {min, max, position} = options
        if (min && max) {
            this.min = min 
            this.max = max
            this.origin = getOriginFromBound({min, max})
            this.size = getSizeFromBound({min, max})
            this.veidoo = min.length
        } else {
            position && createBoundByPosition(position, this)
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