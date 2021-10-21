import {AABB} from './bound.js'
import Interface from '../standard/interface.js'

/**
 * 四叉树
 * @param {*} boundBox 边界盒
 * @param {Number} lvl 层级
 */
class Node {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.subdivision = null // 细分
        this.bounds = [] // 子元素
    }
}

function initQuadTree(tree, options) {
    tree.maxChildrenNum = options.maxChildrenNum || 5   
    tree.maxLevels = options.maxLevels || 5             
    tree.level = options.level || 0       
    tree.bounds = options.startBound || {x: 0, y: 0, width: 0, height: 0} // 当前节点区域范围
}

export default class QuadTree {
    constructor(options = {
        //maxChildrenNum: 5,         // 子类数量阈值
        //maxLevels: 5,              // 最大细分层级
        //level: 0,                  // 手动设置层级
        //startBound : {x: 0, y: 0, width: 0, height: 0} 
    }) {
        this.root = new Node()
        this.children = []   // 跨项限或未分裂
        this.cells = []      // 项限
        initQuadTree(this, options)
    }
    init(options) {
        initQuadTree(this, options)
    }
    insert(bound = Interface.bound) {
        if (this.cells.length) {
            var index = this.getIndex(bound)
            if (index != -1) {
                this.cells[index].insert(bound)
                return
            }
        }

        const {children, maxChildrenNum, level, maxLevels} = this
        children.push(bound)

        // 超过容量阈值时 分裂并添加(防止无限分裂)
        if (children.length > maxChildrenNum && level < maxLevels) {
            if (this.cells[0] == null) this.split()
            let i = 0
            while (i < children.length) {
                let index = this.getIndex(children[i])
                index === -1 ? i++ : this.cells[index].insert((children.splice(i,1))[0])
            }
        }
    }
    intersectByPoint(x, y) {
        return this.children.filter(e => x > e.x && x < e.x + e.width && y > e.y && y < e.y + e.height)
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
    split() {
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

