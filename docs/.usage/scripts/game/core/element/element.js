import {canvasEvent} from "../canvas/event.js"

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
const computedProperty = (e, p, t) => {
    let res
    if (t === 'ADD') {
        res = e[p] || 0
        e.parent && (res += computedProperty(e.parent, p, t))
    } else {
        res = e[p] || 1
        e.parent && (res *= computedProperty(e.parent, p))
    }
    return res
}

/**
 * 元素基类
 * @constructor
 * @param <String> type 元素类型 
 * @param <Number> level 元素层级
 * @param <String> classType 元素分类
 * @param [Object] data 绘制属性
 * @param [Object] assignment 绘制环境
 * @param [Object] config 绘制策略
 * @param [Object] transform 变换
 * @method setData 添加到容器
 * @method appendTo 添加到容器
 * @method update 更新绘制
 */    
export default class Element {
    constructor(type, level, classType, options, data, assignment, config = {}, transform = {}) {
        // 元素信息
        this.parent = null           // 数据链、单一容器、
        this.type = type             // 元素类型识别
        this.level = level           // 层级包含关系        
        this.classType = classType,  // 被父容器审查的添加依据
        this.state = 0               // 存储(激活、删除、隐藏等)状态
        this.id = classType + '_' + type + '_' + elementsLen

        // 事件
        options.event && this.addEvent(options.event) 

        // 静态基础属性
        this.x = data.x || options.x || 0
        this.y = data.y || options.y || 0
        this.width = data.width || options.width || 0
        this.height = data.height || options.width || 0
        this.origin = options.origin || [0, 0]

        // 动态绘制属性(x, y, width, height)
        this.data = data 
        // 动态绘图环境(fillStyle, strokeStyle, globalAlpha)
        this.assignment = assignment
        // 策略配置(save, restore, clip, unclip, closePath, showRange)
        this.config = config
        // 变换
        this.transform = parseTransform(transform) // [1, 0, 0, 1, 0, 0]

        elementsLen++
        
        //todo: let locked = false // 锁定时不作输出(透明度为零/已输出为静态图片/已超出画布边界)
    }
    setData() {
        this.data.x = computedProperty(this, 'x', 'ADD')
        this.data.y = computedProperty(this, 'y', 'ADD')
        this.assignment.globalAlpha = computedProperty(this, 'opacity')
    }
    // 添加事件
    addEvent(type, handler) {
        let {x, y, width, height} = this
        if (typeof type === 'string') {
            this.event = {type, handler: handler || function() {}, state: 0, target: this, x, y, width, height}
            canvasEvent.addEvent(this.event)
        } else if(Object.prototype.toString.call(type) === '[object Object]') {
            console.log(22222);
            const {type = 'CLICK', handler = function() {}} = type
            this.event = {type, handler, state: 0, target: this, x, y, width, height}
            canvasEvent.addEvent(this.event)
        }
    }
    appendTo(parent, forced) {
        if (!(parent instanceof Element)) return {state: 2, type: 1, message: '目标元素非 Element 实例'}   
        if (parent.level >= this.level) return {state: 2, type: 2, message: '越权添加'}
        if (parent.children.includes(this)) return {state: 1, type: 3, message: '已经存在'}        
        if (parent.includeChild && !parent.includeChild.includes(this.classType)) return {state: 2, type: 4, message: `目标元素允许添加 classType 属性为 ${parent.includeChild.join('、')} 的元素`}
        if (parent.excludeChild && parent.excludeChild.includes(this.classType)) return {state: 2, type: 5, message: `目标元素禁止添加 classType 属性为 ${parent.excludeChild.join('、')} 的元素`}
        // 已存在于其它容器 是否强制添加到现有容器
        if (this.parent) {
            if (forced) {
                this.parent.delChild(this)
            } else {
                return {state: 1, type: 6, message: '不能添加到第二个容器'}
            }
        } 
        this.parent = parent
        parent.children.push(this) 
        return {state: 0, type: 0, message: null}      
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
        this.assignment.globalAlpha = computedProperty(this, 'opacity')
    }
    update(draw) {
        const {type, data, assignment, transform, config} = this
        draw({type, data, assignment, transform, config}, this.id)
    }
}