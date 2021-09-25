/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
let elementsLen = 0 // 元素创建计数(id)
const rate = Math.PI / 180
const parseTransform = ({translateX = 0, translateY = 0, scaleX = 1, scaleY = 1, rotate = 0}) => [
    1 * scaleX * Math.cos(rotate * rate) + 0 * scaleY * Math.sin(rotate * rate), 
    0 * scaleX * Math.cos(rotate * rate) + 1 * scaleY * Math.sin(rotate * rate),  
    0 * scaleY * Math.cos(rotate * rate) - (1 * scaleX * Math.cos(rotate * rate) + 0 * scaleY * Math.sin(rotate * rate)) * Math.sin(rotate * rate), 
    1 * scaleY * Math.cos(rotate * rate) - (0 * scaleX * Math.cos(rotate * rate) + 1 * scaleY * Math.sin(rotate * rate)) * Math.sin(rotate * rate), 
    0 + 1 * translateX + 0 * translateY,
    0 + 0 * translateX + 1 * translateY
]
const computed = (e, p, t) => {
    let res
    if (t === 'ADD') {
        res = 0
        e.parent && (res += computed(e.parent, p, t))
    } else {
        res = 1
        e.parent && (res *= computed(e.parent, p))
    }
    return res
}
    
export default class Element {
    constructor(type, level, classType, assignment, config, transform) {
        // 元素信息
        this.parent = null           // 数据链、单一容器、
        this.type = type             // 元素类型识别
        this.level = level           // 层级包含关系        
        this.classType = classType,  // 被父容器审查的添加依据
        this.id = classType + '_' + type + '_' + elementsLen

        // 基础属性:x, y, width, height, opacity

        // 输出:
        // data = {x, y, width, height}
        assignment && (this.assignment = assignment) // {fillStyle, strokeStyle, globalAlpha}
        config && (this.config = config) // {save, restore, clip, unclip, closePath, showRange}
        transform && (this.transform = parseTransform(transform)) // [1, 0, 0, 1, 0, 0]

        elementsLen++
        
        //todo: let locked = false // 锁定时不作输出(透明度为零/已输出为静态图片/已超出画布边界)
    }
    rotate(deg = 0) {
        const t = this.transform, cos = Math.cos(deg), sin = Math.sin(deg)        
        t[0] = t[0] * cos + t[2] * sin
        t[1] = t[1] * cos + t[3] * sin
        t[2] = t[2] * cos - t[0] * sin
        t[3] = t[3] * cos - t[1] * sin        
    }    
    translate(x = 0, y = 0) {
        const t = this.transform
        t[4] += t[0] * x + t[2] * y
        t[5] += t[1] * x + t[3] * y
    }
    scale(x = 1, y = 1) {
        const t = this.transform
        t[0] *= x
        t[1] *= x
        t[2] *= y
        t[3] *= y
    }
    skew(x = 0, y = 0) {
        const t = this.transform
        t[2] = x
        t[1] = y
    }
    alpha(opacity) {
        this.opacity = opacity
        this.data.opacity = opacity * computed(this, 'opacity')
    }
}