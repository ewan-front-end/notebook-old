


function insertNode(node, newNode) {
    if(newNode.key < node.key){
      if(node.left === null){
        node.left = newNode
      }else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      }else {
        insertNode(node.right, newNode)
      }
    }
    newNode.parent = node
}
function arrayAllot(arr) {
    if (arr.length > 2) return [
        arr.splice(0, arr.length/2),
        arr.shift(),
        arr
    ]
}

class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
        this.parent = null
        this.deep = 0
    }
}

export default class BinaryTree {
    constructor(keys = [], isBalance) {
        this.keys = keys
        this.root = null
        if (isBalance) {
            this.balance()
        } else {
            keys.forEach(key => {
                this.insert(key)
            })
        }
    }
    add(key) {
        this.keys.push(key)
        this.insert(key)
    }
    insert(key) {
        let node = new Node(key)
        if (this.root) {
            insertNode(this.root, node)
        } else {
            this.root = node
        }
    }
    // 深度优先遍历
    traverseDF(callback) {
        let stack = [], stop = false        
        stack.unshift(this.root)
        let currentNode = stack.shift();
        while(!stop && currentNode) {
            // 根据回调函数返回值决定是否在找到第一个后继续查找
            stop = callback(currentNode) === true ? true : false
            if (!stop) {
                // 每次把子节点置于堆栈最前头，下次查找就会先查找子节点
                currentNode.right && stack.unshift(currentNode.right)
                currentNode.left && stack.unshift(currentNode.left)
                currentNode = stack.shift();
            }
        }
    }
    // 广度优先遍历
    traverseBF(callback) {
        let queue = [], stop = false;
        queue.push(this.root)
        let currentNode = queue.shift()
        while(!stop && currentNode) {
            // 根据回调函数返回值决定是否在找到第一个后继续查找
            stop = callback(currentNode) === true ? true : false
            if (!stop) {
                // 每次把子节点置于队列最后，下次查找就会先查找兄弟节点
                currentNode.left && queue.push(currentNode.left)
                currentNode.right && queue.push(currentNode.right)
                currentNode = queue.shift()
            }
        }
    }
    balance() {
        this.root = null
        let keys = this.keys
        keys.sort((a, b) => a - b)
        const balanceCreate = (left, center, right) => {
            this.insert(center)
            if (left.length > 2) {
                let [l, c, r] = arrayAllot(left)
                balanceCreate(l, c, r)
            } else {
                left.forEach(key => {
                    this.insert(key)
                })
            }
            if (right.length > 2) {
                let [l, c, r] = arrayAllot(right)
                balanceCreate(l, c, r)
            } else {
                right.forEach(key => {
                    this.insert(key)
                })
            }
        }
        let [l, c, r] = arrayAllot(keys)
        balanceCreate(l, c, r)
    }
}
