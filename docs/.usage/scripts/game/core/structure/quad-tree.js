/**
 * 四叉树
 * @param {*} boundBox 边界盒
 * @param {Number} lvl 层级
 */
export default class QuadTree {
    constructor(boundBox, lvl) {
        this.maxObjects = 2  // 子类数量阈值
        this.maxLevels = 5    // 层级深度阈值         
        this.level = lvl || 0 // 层级        
        this.objects = []     // 跨项限或未分裂
        this.nodes = []       // 项限 
        this.bounds = boundBox || {x: 0, y: 0, width: 0, height: 0} // 当前节点区域范围
    }
    insert(obj) {
        if (typeof obj === "undefined") return
        if (obj instanceof Array) {
            for (var i = 0, len = obj.length; i < len; i++) { this.insert(obj[i]) }
            return
        }
        if (this.nodes.length) {
            var index = this.getIndex(obj)
            if (index != -1) {
                this.nodes[index].insert(obj)
                return
            }
        }

        const {objects, maxObjects, level, maxLevels} = this
        objects.push(obj)

        // 超过容量阈值时 分裂并添加(防止无限分裂)
        if (objects.length > maxObjects && level < maxLevels) {
            if (this.nodes[0] == null) this.split()
            let i = 0
            while (i < objects.length) {
                let index = this.getIndex(objects[i])
                index === -1 ? i++ : this.nodes[index].insert((objects.splice(i,1))[0])
            }
        }
    }
    pointCollision(x, y) {
        console.log(x, y);
        for (let i = 0, l = this.objects.length; i < l; i++) {
            let data = this.objects[i]
            if (x > data.x && x < data.x + data.width && y > data.y && y < data.y + data.height) return true
        }
        
        return false
    }
    clear() {
        this.objects = []
        this.nodes.forEach(node => {node.clear()})
        this.nodes = []
    }
    getAllObjects(returnedObjects) {
        this.nodes.forEach(node => {node.getAllObjects(returnedObjects)})
        this.objects.forEach(node => {returnedObjects.push(node)})
        return returnedObjects
    }
    // 返回该对象可能碰撞的所有对象
    findObjects(returnedObjects, obj) {
        if (typeof obj === "undefined") {
            console.log("UNDEFINED OBJECT")
            return
        }
        let index = this.getIndex(obj) 
        if (index != -1 && this.nodes.length) this.nodes[index].findObjects(returnedObjects, obj)
        this.objects.forEach(node => { returnedObjects.push(node) })
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
        this.nodes[0] = new QuadTree({x: x + subWidth, y, width: subWidth, height: subHeight}, level + 1)
        this.nodes[1] = new QuadTree({x, y, width: subWidth, height: subHeight}, level + 1)
        this.nodes[2] = new QuadTree({x, y: y + subHeight, width: subWidth, height: subHeight}, level + 1)
        this.nodes[3] = new QuadTree({x: x + subWidth, y: y + subHeight, width: subWidth, height: subHeight}, level + 1)
    }
    draw(draw) {
        console.log(11111);
        draw({type: 'Rect', data:this.bounds, assignment:{strokeStyle: '#ccc', lineWidth:1}})
        this.objects.forEach(data => {
            draw({type: 'Rect', data, assignment:{strokeStyle: '#f00'}})
        })
        this.nodes.forEach(node => {
            draw({type: 'Rect', data:node.bounds, assignment:{strokeStyle: '#ccc', lineWidth:1}})
            node.draw(draw)
        })
    }
}