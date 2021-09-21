/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
let elementsLen = 0
export default class Element {
    constructor(type, level, classType) {
        this.parent = null
        this.type = type
        this.level = level        
        this.classType = classType,  // 被父容器审查的添加依据
        this.id = 'id_' + elementsLen + '_element'
        this.data = {opacity: 1, x: 0, y: 0, scale: [1, 1], rotate: 0}
        elementsLen++
    }
    translate(x, y) {
        x && (this.data.x += x)
        y && (this.data.y += y)
    }
    translateTo(x, y) {
        x && (this.data.x = x)
        y && (this.data.y = y)
    }
    scale(x, y) {
        x && (this.data.scale[0] += x)
        y && (this.data.scale[1] += y)
    }
    scaleTo() {
        x && (this.data.scale[0] = x)
        y && (this.data.scale[1] = y)
    }
    rotate(deg) {this.data.rotate += deg}
    rotateTo(deg) {this.data.rotate = deg}
    alpha(opacity) {this.data.opacity += opacity}
    alphaTo(opacity) {this.data.opacity = opacity}
    update(arr) {
        const {opacity, x, y, scale, rotate} = this.data
        if (opacity <= 0) return {state: 1, type: 1, message: '透明度为0'}

        arr.push({type: this.type, data: this.data, config: {}})
        this.children && this.children.forEach(child => child.update(arr))
        return {state: 0, type: 0}
    }
}