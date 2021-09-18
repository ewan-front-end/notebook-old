/**
 * 元素基类
 * @constructor
 * @param {String} 元素类型 参数说明
 */
 export default class Element {
    constructor(type, level, options) {
        const setting = {
            beforeAdd: null,
            addFnName: 'addChild', 
            appendFnName: 'appendTo'
        }
        options && Object.assign(setting, options)
        this.type = type     
        this.level = level   
        this.parent = null
        this.data = {
            opacity: 1, 
            x: 0,
            y: 0,
            scale_x: 1, 
            scale_y: 1,
            rotate: 0
        }        
        if (setting.addFnName) {
            this.children = []
            this[setting.addFnName] = child => {
                if (setting.beforeAdd) {
                    setting.beforeAdd(child)
                }
                if (child instanceof Element && child.level > this.level) {
                    child.parent = this
                    this.children.push(child)
                } else {
                    console.error(`${this.name || this.type} 无法添加子类 ${child.name || child.type}`)
                }        
            }
        }
        setting.appendFnName && (this[setting.appendFnName] = parent => {
            if (parent instanceof Element && parent.level < this.level) {
                this.parent = parent
                parent.children.push(this)
            } else {
                console.error(`${this.name || this.type} 不能添加到目标父类 ${parent.name || parent.type}`)
            }
        })
    }   
    update() {
        this.children.forEach(child => {
            child.update()
        })
    }
}













