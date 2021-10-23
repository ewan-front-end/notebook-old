import {AABB} from './bound.js'
import Interface from '../standard/interface.js'

/**
 * 四叉树
 * @param {*} boundBox 边界盒
 * @param {Number} lvl 层级
 */
class Cell {
    constructor(range = Interface.bound, level, root) {
        this.level = level || 0
        this.root = root
        this.range = range      // 范围
        this.children = []      // 跨项限或未分裂
        this.cells = null       // 细分项限
    }
    insertBound(bound = Interface.bound) {
        if (this.cells) {
            const index = this.checkQuadrantIndex(bound)
            if (index != -1) {
                this.cells[index].insertBound(bound)
                return
            }
        }
        this.children.push(bound)

        // 超过容量阈值时 分裂并添加(防止无限分裂)
        const {children, level, cells} = this
        const {maxChildrenNum, maxLevels} = this.root
        if (children.length > maxChildrenNum && level < maxLevels) {
            if (cells === null) this.subdivide()
            let i = 0
            while (i < children.length) {
                const bound = children[i]
                const index = this.checkQuadrantIndex(bound)
                const cell = cells[index]
                index === -1 ? i++ : cell.insertBound((children.splice(i,1))[0])
            }
        }
    }
    // 检测元素在当前单元所属的细分项限
    checkQuadrantIndex(bound) {
        let index = -1
        let {x: x1, y: y1, width: width1, height: height1} = this.range, 
            {x: x2, y: y2, width: width2, height: height2} = bound
        let midH = x1 + width1 / 2, 
            midV = y1 + height1 / 2 
        let withinTopQuadrant = (y2 < midV && y2 + height2 < midH), 
            withinBomQuadrant = (y2 > midV) 
        // 左右细分
        if (x2 < midH && x2 + width2 < midH) {
            withinTopQuadrant && (index = 1)
            withinBomQuadrant && (index = 2)
        }
        if (x2 > midH) {
            withinTopQuadrant && (index = 0)
            withinBomQuadrant && (index = 3)
        }
        return index
    }
    // 细分为四项限
    subdivide() {
        const {level, root} = this
        const {x, y, width, height} = this.range
        
        const subWidth = width / 2 | 0, subHeight = height / 2 | 0
        this.cells = Array(4)
        this.cells[0] = new Cell({x: x + subWidth, y, width: subWidth, height: subHeight}, level + 1, root)
        this.cells[1] = new Cell({x, y, width: subWidth, height: subHeight}, level + 1, root)
        this.cells[2] = new Cell({x, y: y + subHeight, width: subWidth, height: subHeight}, level + 1, root)
        this.cells[3] = new Cell({x: x + subWidth, y: y + subHeight, width: subWidth, height: subHeight}, level + 1, root)
    }
    intersectByPoint(x, y, intersect, isolate) {
        let res = this.children.filter(e => x > e.x && x < e.x + e.width && y > e.y && y < e.y + e.height)
        // todo 细分查找
        if (res.length) {
            res.sort((a, b) => b - a)
            intersect(res[0].target)
        } else {
            isolate()
        }
    }
}

export default class QuadTree {
    constructor(options) {
        if (options) {
            Object.assign(this, options)
            this.root = new Cell(option.startBound, 0, this)
        }
        this.childrenBeforeCreateRoot = []
    }
    init(options = Interface.QuadTreeOptions) {
        Object.assign(this, options)
        this.root = new Cell(options.startBound, 0, this)
        this.childrenBeforeCreateRoot.forEach(bound => {
            this.root.insertBound(bound)
        })
    }
    insertBound(bound = Interface.bound) {
        if (!this.root) {
            this.childrenBeforeCreateRoot.push(bound)
        } else {
            this.root.insertBound(bound)
        }
    }
    intersectByPoint(x, y, intersect, isolate) {
        this.root.intersectByPoint(x, y, intersect, isolate)
    }
    isIntersectByPoint(x, y) {
        for (let i = 0, l = this.children.length; i < l; i++) {
            let data = this.children[i]
            if (x > data.x && x < data.x + data.width && y > data.y && y < data.y + data.height) return true
        }
        return false
    }
    clear() {
        this.children = []
        this.cells.forEach(node => {node.clear()})
        this.cells = []
    }
    getAllObjects(returnedObjects) {
        this.cells.forEach(node => {node.getAllObjects(returnedObjects)})
        this.children.forEach(node => {returnedObjects.push(node)})
        return returnedObjects
    }
    // 返回该对象可能碰撞的所有对象
    findObjects(returnedObjects, obj) {
        if (typeof obj === "undefined") {
            console.log("UNDEFINED OBJECT")
            return
        }
        let index = this.getIndex(obj) 
        if (index != -1 && this.cells.length) this.cells[index].findObjects(returnedObjects, obj)
        this.children.forEach(node => { returnedObjects.push(node) })
        return returnedObjects;
    }
    // 确定对象属于哪个节点 -1表示对象不完全属于一个项限 只是当前项限的一部分
    getIndex(obj) {
        var index = -1
        var midpointHorizontal = this.bounds.x + this.bounds.width / 2 // 水平中点
        var midpointVertical = this.bounds.y + this.bounds.height / 2  // 垂直中点        
        var withinTopQuadrant = (obj.y < midpointVertical && obj.y + obj.height < midpointVertical) // 属于上项限
        var withinBomQuadrant = (obj.y > midpointVertical) // 属于下项限
        // 匹配左项限
        if (obj.x < midpointHorizontal && obj.x + obj.width < midpointHorizontal) {
            withinTopQuadrant && (index = 1)
            withinBomQuadrant && (index = 2)
        }
        // 匹配右项限
        if (obj.x > midpointHorizontal) {
            withinTopQuadrant && (index = 0)
            withinBomQuadrant && (index = 3)
        }
        return index;
    }
    // 切割区域为四项限
    subdivide() {
        const {level} = this
        const {x, y, width, height} = this.bounds
        
        let subWidth = width / 2 | 0, subHeight = height / 2 | 0
        this.cells[0] = new QuadTree({x: x + subWidth, y, width: subWidth, height: subHeight}, level + 1)
        this.cells[1] = new QuadTree({x, y, width: subWidth, height: subHeight}, level + 1)
        this.cells[2] = new QuadTree({x, y: y + subHeight, width: subWidth, height: subHeight}, level + 1)
        this.cells[3] = new QuadTree({x: x + subWidth, y: y + subHeight, width: subWidth, height: subHeight}, level + 1)
    }
    draw(draw) {
        console.log(11111);
        draw({type: 'Rect', data:this.bounds, assignment:{strokeStyle: '#00f', lineWidth:1}})
        this.children.forEach(data => {
            draw({type: 'Rect', data, assignment:{strokeStyle: '#f00'}})
        })
        this.cells.forEach(node => {
            draw({type: 'Rect', data:node.bounds, assignment:{strokeStyle: '#ccc', lineWidth:1}})
            node.draw(draw)
        })
    }
}

