
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

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

class BinaryTree {
    constructor() {
        this.keys = []
        this.root = null
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
        let halfArr = parseInt(keys.length/2)
        keys.splice(0, keys.length/2)

    }
}

function BinaryTree(keys){
    //Node构造函数
    let Node = function (key){
       this.key = key
       this.left = null
       this.right = null
    }
    let root = null
    
    
    keys.forEach((key)=>{
     this.insert(key)
    })
    return root
  }
  const keys = [8,3,10,1,6,14,4,7,13]
  BinaryTree(keys)