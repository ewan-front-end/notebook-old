import {tweens} from '../../utils/tweens.js'

/**
 * ▇元素基类▇
 * 属性：type/children/parent/data
 * 方法：addChild/appendTo
 */
 class Element {
    constructor(type) {
        this.type = type
        this.data = {}
        this.parent = null
        this.children = []
    }
    addChild(child) {
        if (!(child instanceof Element)) {
            console.error(' Unknown parameter: child')
            return
        }
        child.parent = this
        this.children.push(child)
    }
    appendTo(parent) {
        this.parent = parent
        parent.children.push(this)
    }
}

/**
 * ▇场景元素▇
 * 属性：type/children/name
 * 方法：addChild
 *       update/in/out
 */
export class Scene extends Element {
    constructor(name) {
        super('SCENE')
        delete this.parent
        delete this.data
        delete this.appendTo
        this.name = name
    }
    in() { }
    out() { }
    update() {
        this.children.forEach(e => {
        })
    }
}

/**
 * ▇精灵元素▇
 * 属性：type/children/parent/data
 * 方法：addChild/appendTo
 *      translate/translateTo/rotate/rotateTo/scale/scaleTo/update
 */
export class Sprite extends Element {
    constructor(x, y, width, height, options, transform, config) {
        super('Sprite')
        transform = Object.assign({ x, y, translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotate: 0, alpha: 1, origin: 1 }, transform || {})
        console.log('transform', transform);

        this.data = { x, y, width, height, options, transform, config }
        this.data.children = this.children
        this.TRANSFORM = {
            transform,
            _transform: JSON.parse(JSON.stringify(transform)),
            tween: JSON.parse(JSON.stringify(transform)),
            timerX: 0,
            timerY: 0,
            timerR: 0,
            timerSX: 0,
            timerSY: 0,
            timerA: 0
        }
    }
    translate(x, y) {
        let T = this.TRANSFORM, { transform, _transform, tween } = T;
        if (x) { tween.translateX += x; T.timerX = new Date().getTime(); _transform.translateX = transform.translateX }
        if (y) { tween.translateY += y; T.timerY = new Date().getTime(); _transform.translateY = transform.translateY }
    }
    translateX(x) { let T = this.TRANSFORM, { transform, _transform, tween } = T; if (x) { tween.translateX += x; T.timerX = new Date().getTime(); _transform.translateX = transform.translateX } }
    translateY(y) { let T = this.TRANSFORM, { transform, _transform, tween } = T; if (y) { tween.translateY += y; T.timerY = new Date().getTime(); _transform.translateY = transform.translateY } }
    translateTo(x, y) { let { transform, _transform, tween } = this.TRANSFORM; x && (_transform.translateX = transform.translateX = tween.translateX = x); y && (_transform.translateY = transform.translateY = tween.translateY = y) }


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

    update() {
        let T = this.TRANSFORM, { transform, _transform, tween, timerX, timerY, timerR, timerSX, timerSY, timerA } = T, now = new Date().getTime();
        // 缩放
        if (transform.scaleX < tween.scaleX) {
            transform.scaleX = tweens.run(now - timerSX, _transform.scaleX, tween.scaleX, 2000)
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
            transform.alpha = tweens.run(now - timerA, _transform.alpha, tween.alpha, 2000)
            transform.alpha > tween.alpha && (_transform.alpha = transform.alpha = tween.alpha)
        }
        if (transform.alpha > tween.alpha) {
            transform.alpha = tweens.run(now - timerA, _transform.alpha, tween.alpha, 2000)
            transform.alpha < tween.alpha && (_transform.alpha = transform.alpha = tween.alpha)
        }
    }
}

/**
 * ▇精灵列表▇
 */
export class SpriteSheet extends Sprite {
    constructor(x, y, width, height, image, transform, config) {
        super(x, y, width, height, {}, transform)
        let { matrix, duration, children, defaultName } = config || {}
        let img = new Imagee(image, 0, 0, width, height, 0, 0, width, height)
        img.parent = this

        this.children.push(img)
        this._data = img.data
        this.duration = duration || 100
        this.startTime = new Date().getTime()
        this.frames = []
        this.group = {
            'MAIN': [],
            'righter': [0, 1, 2],
            'lefter': [3, 4, 5]
        }
        this.index = 0
        this.defaultName = defaultName || 'MAIN'

        if (matrix) {
            let count = 0
            for (let y = 0; y < matrix.length; y++) {
                let col = matrix[y]
                for (let x = 0; x < col.length; x++) {
                    let cell = col[x];
                    if (cell) {
                        this.frames.push([x * width, y * height]),
                            this.group['MAIN'].push(count)
                        count++
                    }
                }
            }
        }
    }
    changeName(name) {
        this.defaultName = name || 'MAIN'
    }
    update() {
        super.update()
        let now = new Date().getTime()

        if (now - this.startTime > this.duration) {
            this.startTime = now
            this.index++
            let currentFrames = this.group[this.defaultName]
            this.index >= currentFrames.length && (this.index = 0)
            let index = currentFrames[this.index], frame = this.frames[index]
            this._data.sx = frame[0]
            this._data.sy = frame[1]
        }
    }
}

/**
 * ▇Shape元素▇
 * 属性：type/parent/data/config
 * 方法：appendTo
 */
export class Rect extends Element {
    constructor(x, y, width, height, options, config) {
        super('Rect')
        delete this.children
        delete this.addChild
        this.data = { x, y, width, height, options }
        this.config = config
    }
}
class Circle extends Element {
    constructor(x, y, r, options, config) {
        super('Circle')
        delete this.children
        delete this.addChild
        this.data = { x, y, r, options }
        this.config = config
    }
}
class Polygon extends Element {
    constructor(points, options, config) {
        super('Polygon')
        delete this.children
        delete this.addChild
        this.data = { points, options, config }
        this.config = config
    }
}
class Imagee extends Element {
    constructor(img, sx, sy, swidth, sheight, x, y, width, height) {
        super('Imagee')
        delete this.children
        delete this.addChild
        this.data = { img, sx, sy, swidth, sheight, x, y, width, height }
    }
}





