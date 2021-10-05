import Container from './element/container.js'
import {tweens} from '../../utils/tweens.js'

/**
 * 精灵元素
 * @extends Container
 * @constructor
 * @param {Number} x 座标X
 * @param {Number} y 座标Y
 * @param {Number} width 元素宽
 * @param {Number} height 元素高
 * @param {Number} options 选项
 */
function getTransformProperty(options, property, defaultValue, index1, index2) {
    let res = options[property] || defaultValue
    index1 && options[index1] && (res[0] = options[index1])
    index2 && options[index2] && (res[1] = options[index1])
    return res
}
export default class Sprite extends Container {
    constructor(x, y, width, height, options) {
        const {config, transform} = options
        const data = {x, y, width, height}
        const assignment = {}

        !isNaN(options.opacity) && (assignment.globalAlpha = options.opacity)
        !isNaN(options.globalAlpha) && (assignment.globalAlpha = options.globalAlpha)

        super('Sprite', 4, data, assignment, config, transform)
         
        this.scale = getTransformProperty(options, 'scale', [1, 1], 'scaleX', 'scaleY')
        this.rotate = options.rotate || 0
        this.skew = getTransformProperty(options, 'skew', [0, 0], 'skewX', 'skewY')

        this.tween = {
            translate: {value: [x, y], timeX: 0, timeY: 0},
            scale: {value: this.scale, timeX: 0, timeY: 0},
            rotate: {value: this.rotate, time: 0},
            alpha: {value: this.opacity, time: 0},
            skew: {value: this.skew, timeX: 0, timeY: 0}
        }
    }
    translate(x, y) {
        let {translate} = this.tween
        if (x) {translate.value[0] += x; translate.timeX = new Date().getTime()}
        if (y) {translate.value[1] += y; translate.timeY = new Date().getTime()}
    }
    translateX(x) {  
        if (x) {this.tween.translate.value[0] += x; this.tween.translate.timeX = new Date().getTime()} 
    }
    translateY(y) { 
        if (y) {this.tween.translate.value[1] += y; this.tween.translate.timeY = new Date().getTime()} 
    }
    


    scale(x, y) {
        let T = this.TRANSFORM, { transform, _transform, tween } = T
        console.log(transform.scaleX, transform.scaleX, tween.scaleX);
        if (x) { tween.scaleX += x; T.timerSX = new Date().getTime(); _transform.scaleX = transform.scaleX }
        if (y) { tween.scaleY += y; T.timerSY = new Date().getTime(); _transform.scaleY = transform.scaleY }
        console.log(transform.scaleX, transform.scaleX, tween.scaleX);
    }
    scaleX(x) { let T = this.TRANSFORM, { transform, _transform, tween } = T; if (x) { tween.scaleX += x; T.timerSX = new Date().getTime(); _transform.scaleX = transform.scaleX } }
    scaleY(y) { let T = this.TRANSFORM, { transform, _transform, tween } = T; if (y) { tween.scaleY += y; T.timerSY = new Date().getTime(); _transform.scaleY = transform.scaleY } }
    scaleTo(x, y) { let { transform, _transform, tween } = this.TRANSFORM; x && (_transform.scaleX = transform.scaleX = tween.scaleX = x); y && (_transform.scaleY = transform.scaleY = tween.scaleY = y) }

    alpha(a) { let T = this.TRANSFORM, { transform, _transform, tween, timerA } = T; tween.alpha += a; T.timerA = new Date().getTime(); _transform.alpha = transform.alpha }
    rotate(deg) { let T = this.TRANSFORM, { transform, _transform, tween, timerR } = T; tween.rotate += deg; T.timerR = new Date().getTime(); _transform.rotate = transform.rotate }
    rotateTo(deg) { let { transform, _transform, tween } = this.TRANSFORM; deg && (_transform.rotate = transform.rotate = tween.rotate = deg) }

    update(draw) {
        let {translate, scale, rotate, alpha, skew} = this.tween, now = new Date().getTime()
        // 缩放
        if (this.scale[0] < scale.value[0]) {
            this.scale[0] = tweens.run(now - timerSX, _transform.scaleX, tween.scaleX, 2000)
            transform.scaleX > tween.scaleX && (_transform.scaleX = transform.scaleX = tween.scaleX)
        }
        if (transform.scaleX > tween.scaleX) {
            transform.scaleX = tweens.run(now - timerSX, _transform.scaleX, tween.scaleX, 2000)
            transform.scaleX < tween.scaleX && (_transform.scaleX = transform.scaleX = tween.scaleX)
        }
        if (transform.scaleY < tween.scaleY) {
            transform.scaleY = tweens.run(now - timerSY, _transform.scaleY, tween.scaleY, 2000)
            transform.scaleY > tween.scaleY && (_transform.scaleY = transform.scaleY = tween.scaleY)
        }
        if (transform.scaleY > tween.scaleY) {
            transform.scaleY = tweens.run(now - timerSY, _transform.scaleY, tween.scaleY, 2000)
            transform.scaleY < tween.scaleY && (_transform.scaleY = transform.scaleY = tween.scaleY)
        }
        // 位移
        if (transform.translateX < tween.translateX) {
            transform.translateX = tweens.run(now - timerX, _transform.translateX, tween.translateX, 2000)
            transform.translateX > tween.translateX && (_transform.translateX = transform.translateX = tween.translateX)
        }
        if (transform.translateX > tween.translateX) {
            transform.translateX = tweens.run(now - timerX, _transform.translateX, tween.translateX, 2000)
            transform.translateX < tween.translateX && (_transform.translateX = transform.translateX = tween.translateX)
        }
        if (transform.translateY < tween.translateY) {
            transform.translateY = tweens.run(now - timerY, _transform.translateY, tween.translateY, 2000)
            transform.translateY > tween.translateY && (_transform.translateY = transform.translateY = tween.translateY)
        }
        if (transform.translateY > tween.translateY) {
            transform.translateY = tweens.run(now - timerY, _transform.translateY, tween.translateY, 2000)
            transform.translateY < tween.translateY && (_transform.translateY = transform.translateY = tween.translateY)
        }
        // 旋转
        if (transform.rotate < tween.rotate) {
            transform.rotate = tweens.run(now - timerR, _transform.rotate, tween.rotate, 2000)
            transform.rotate > tween.rotate && (_transform.rotate = transform.rotate = tween.rotate %= 360)
        }
        if (transform.rotate > tween.rotate) {
            transform.rotate = tweens.run(now - timerR, _transform.rotate, tween.rotate, 2000)
            transform.rotate < tween.rotate && (_transform.rotate = transform.rotate = tween.rotate %= 360)
        }
        // 透明度
        if (transform.alpha < tween.alpha) {
            transform.alpha = tweens.run(now - timerA, _transform.alpha, tween.alpha - _transform.alpha, 2000)
            transform.alpha > tween.alpha && (_transform.alpha = transform.alpha = tween.alpha)
        }
        if (transform.alpha > tween.alpha) {
            transform.alpha = tweens.run(now - timerA, _transform.alpha, tween.alpha - _transform.alpha, 2000)
            transform.alpha < tween.alpha && (_transform.alpha = transform.alpha = tween.alpha)
        }

        super.update(arr)
    }
}