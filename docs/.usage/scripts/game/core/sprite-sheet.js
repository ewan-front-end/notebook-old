
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