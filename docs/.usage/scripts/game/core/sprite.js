import Container from './element/container.js'
import {tweens} from '../../utils/tweens.js'


const getNowTime = () => new Date().getTime()
function getTransformProperty(options, property, defaultValue, index1, index2) {
    let res = options[property] || defaultValue
    index1 && options[index1] && (res[0] = options[index1])
    index2 && options[index2] && (res[1] = options[index1])
    return res
}
function setTransformTarget(transform, value, isProduct) {
    if (!value) return
    transform.target = isProduct ? transform.target * value : transform.target + value
    transform.time = getNowTime()
}
function tweenTransform(t, nowtime) {
    if (t.value < t.target) {
        t.current = tweens.run(nowtime - t.time, t.value, t.target - t.value, 2000)
        t.current > t.target && (t.value = t.current = t.target)
    }
    if (t.value > t.target) {
        t.current = tweens.run(nowtime - t.time, t.value, t.target - t.value, 2000)
        t.current < t.target && (t.value = t.current = t.target)
    }
}

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
export default class Sprite extends Container {
    constructor(x, y, width, height, options) {
        const {config, transform} = options
        const data = {x, y, width, height}
        const context = {}

        !isNaN(options.opacity) && (context.globalAlpha = options.opacity)
        !isNaN(options.globalAlpha) && (context.globalAlpha = options.globalAlpha)

        super({
            type: 'Sprite', 
            level: 4, 
            canvas: {
                data, 
                context, 
                config, 
                transform
            }
        })
         
        let scale = getTransformProperty(options, 'scale', [1, 1], 'scaleX', 'scaleY')
        let rotate = options.rotate || 0
        let opacity = options.globalAlpha || options.opacity || 1
        let skew = getTransformProperty(options, 'skew', [0, 0], 'skewX', 'skewY')
        this.tweenTransform = {
            translateX: {value: x, current: x, target: x, time: 0},
            translateY: {value: y, current: y, target: y, time: 0},
            scaleX: {value: scale[0], current: scale[0], target: scale[0], time: 0},
            scaleY: {value: scale[1], current: scale[1], target: scale[1], time: 0},
            rotate: {value: rotate, current: rotate, target: rotate, time: 0},
            alpha: {value: opacity, current: opacity, target: opacity, time: 0},
            skewX: {value: skew[0], current: skew[0], target: skew[0], time: 0},
            skewY: {value: skew[1], current: skew[1], target: skew[1], time: 0}
        }
        this.canvas.data.children = this.children
    }
    translate(x, y) {
        setTransformTarget(this.tweenTransform.translateX, x)
        setTransformTarget(this.tweenTransform.translateY, y)
    }
    translateX(x) {
        setTransformTarget(this.tweenTransform.translateX, x)
    }
    translateY(y) {
        setTransformTarget(this.tweenTransform.translateY, y)
    }
    scale(x, y) {
        setTransformTarget(this.tweenTransform.scaleX, x) 
        setTransformTarget(this.tweenTransform.scaleY, y)
    }
    scaleX(x) {
        setTransformTarget(this.tweenTransform.scaleX, x)
    }
    scaleY(y) {
        setTransformTarget(this.tweenTransform.scaleY, y)
    }
    alpha(a) {
        setTransformTarget(this.tweenTransform.alpha, a, true)
    }
    rotate(deg) {
        setTransformTarget(this.tweenTransform.rotate, deg)
    }
    update(draw) {
        let {translateX, translateY, scaleX, scaleY, rotate, alpha, skewX, skewY} = this.tweenTransform, nowtime = getNowTime()

        // 位移
        translateX.value !== translateX.target && tweenTransform(translateX, nowtime)
        translateY.value !== translateY.target && tweenTransform(translateY, nowtime)
        // 缩放
        scaleX.value !== scaleX.target && tweenTransform(scaleX, nowtime)
        scaleY.value !== scaleY.target && tweenTransform(scaleY, nowtime)        
        // 旋转
        rotate.value !== rotate.target && tweenTransform(alpha, nowtime)        
        // 透明度
        alpha.value !== alpha.target && tweenTransform(alpha, nowtime)
        // 斜切
        skewX.value !== skewX.target && tweenTransform(skewX, nowtime)        
        skewY.value !== skewY.target && tweenTransform(skewY, nowtime)            

        draw(this.canvas)
    }
}

