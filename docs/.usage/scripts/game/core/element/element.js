/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
let elementsLen = 0 // 元素创建计数(id)
export default class Element {
    constructor(type, level, classType) {
        this.parent = null
        this.type = type
        this.level = level        
        this.classType = classType,  // 被父容器审查的添加依据
        this.id = 'id_' + elementsLen + '_element'
        this.data = {
            x: 0, 
            y: 0,
            opacity: 1,
            transform: {a: 1, d: 1, b: 0, c: 0, e: 0, f: 0},
            config: {save: false, restore: false, clip: false, unclip: false}
        }
        //this.transform = {opacity: 1, translate:[0, 0], scale: [1, 1], rotate: 0, skew: [0, 0], origin:[0, 0]}
        let locked = false // 锁定时不作输出(透明度为零/已输出为静态图片/已超出画布边界)
        elementsLen++
    }
    rotate(v) {Object.assign(this.data.transform, {a: Math.cos(0.01745 * v), d: Math.cos(0.01745 * v), b: Math.sin(0.01745 * v), c: -Math.sin(0.01745 * v)})}    
    translate(x, y) {
        x && (this.data.transform.e = x)
        y && (this.data.transform.f = y)
    }
    scale(x, y) {
        if (x) {
            this.data.transform.a *= x
            this.data.transform.c *= x
        } 
        if (y) {
            this.data.transform.d *= y
            this.data.transform.b *= y
        }
    }
    skew(x, y) {
        x && (this.data.transform.c = x)
        y && (this.data.transform.b = y)
    }
    alpha(opacity) {this.data.opacity = opacity}
    update(arr) {
        const {opacity, x, y, scale, rotate} = this.data
        if (opacity <= 0) return {state: 1, type: 1, message: '透明度为0'}

        arr.push({type: this.type, data: this.data})
        this.children && this.children.forEach(child => {child.update(arr)})
    }
}