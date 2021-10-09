


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
}
function arrayAllot(arr) {
    if (arr.length < 3) return arr
    return [
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
    }
}
class BinaryTree {
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

const keys = [8,3,10,1,6,14,4,7,13]
let binTree = new BinaryTree(keys)