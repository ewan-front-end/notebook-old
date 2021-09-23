/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
let elementsLen = 0 // 元素创建计数(id)
export default class Element {
    constructor(type, level, classType, x, y, width, height, options, config, transform) {
        // 元素信息
        this.parent = null           // 数据链、单一容器、
        this.type = type             // 元素类型识别
        this.level = level           // 层级包含关系        
        this.classType = classType,  // 被父容器审查的添加依据
        this.id = classType + '_' + type + '_' + elementsLen
        // 基础属性
        this.x = x || 0
        this.y = y || 0
        this.width = width || 0
        this.height = height || 0
        // 输出
        this.data = null    // {x, y, width, height}
        this.options = options || null // {fillStyle, strokeStyle}
        this.config = config || null  // {save, restore, clip, unclip, closePath, showRange}
        this.transform = {a: 1, d: 1, b: 0, c: 0, e: 0, f: 0}

        elementsLen++
        //todo: let locked = false // 锁定时不作输出(透明度为零/已输出为静态图片/已超出画布边界)
    }    
    
    rotate(v) {Object.assign(this.data.transform, {a: Math.cos(0.01745 * v), d: Math.cos(0.01745 * v), b: Math.sin(0.01745 * v), c: -Math.sin(0.01745 * v)})}    
    translate(x, y) {
        x && (this.transform.e = x)
        y && (this.transform.f = y)
    }
    scale(x, y) {
        if (x) {
            this.transform.a *= x
            this.transform.c *= x
        } 
        if (y) {
            this.transform.d *= y
            this.transform.b *= y
        }
    }
    skew(x, y) {
        x && (this.transform.c = x)
        y && (this.transform.b = y)
    }
    alpha(opacity) {this.data.opacity = opacity}
    update(arr) {
        const {type, data, options, transform, config} = this
        // todo 输出过滤
        this.backgroundColor && arr.push(backgroundColor)
        this.backgroundImage && arr.push(this.backgroundImage)
        this.classType === 'CLASS_SHAPE' && arr.push({type, data, options, transform, config})
        this.children && this.children.forEach(child => {child.update(arr)})
    }
}