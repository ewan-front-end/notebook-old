
// 数据是以节点的形式存储
class Node {
    constructor(data) {
        this.data = data
        this.parent = null
        this.children = []
    }
}

// 多叉树
export class MultiwayTree {
    constructor() {
        this._root = null;
    }
    add(data, toData, traversal) {
        let node = new Node(data)
        // 第一次添加到根节点 返回值为this，便于链式添加节点
        if (this._root === null) {
            this._root = node;
            return this;
        }
        let parent = null,
            callback = function(node) {
                if (node.data === toData) {
                    parent = node;
                    return true;
                }
            };
        // 根据遍历方法查找父节点，然后把节点添加到父节点的children数组里
        this.contains(callback, traversal);  
        if (parent) {
            parent.children.push(node);
            node.parent = parent;
            return this;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    }
    // 深度优先遍历
    traverseDF(callback) {
        let stack = [], 
            found = false
        stack.unshift(this._root)
        let currentNode = stack.shift();
        while(!found && currentNode) {
            // 根据回调函数返回值决定是否在找到第一个后继续查找
            found = callback(currentNode) === true ? true : false;
            if (!found) {
                // 每次把子节点置于堆栈最前头，下次查找就会先查找子节点
                stack.unshift(...currentNode.children);
                currentNode = stack.shift();
            }
        }
    
    }
    // 广度优先遍历
    traverseBF(callback) {
        let queue = [], 
            found = false;
        queue.push(this._root);
        let currentNode = queue.shift();
        while(!found && currentNode) {
            // 根据回调函数返回值决定是否在找到第一个后继续查找
            found = callback(currentNode) === true ? true : false;
            if (!found) {
                // 每次把子节点置于队列最后，下次查找就会先查找兄弟节点
                queue.push(...currentNode.children)
                currentNode = queue.shift();
            }
        }
    }
    /**
     * 包含节点
     * @param {*} callback 
     * @param {*} traversal 
     */
    contains(callback, traversal) {
        traversal.call(this, callback);
    }
    /**
     * 移除节点
     * @param {*} data
     * @param {*} fromData
     * @param {*} traversal
     * @return 被移除的节点
     */
    remove(data, fromData, traversal) {
        let parent = null,
            childToRemove = null,
            callback = function(node) {
                if (node.data === fromData) {
                    parent = node;
                    return true;
                }
            };
    
        this.contains(callback, traversal);    
        if (parent) {
            let index = this._findIndex(parent.children, data);
            if (index < 0) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error('Parent does not exist.');
        }
        return childToRemove;
    }
    _findIndex(arr, data) {
        let index = -1;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].data === data) {
                index = i;
                break;
            }
        }
        return index;
    }
}



