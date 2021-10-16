const {BinaryTree} = require('./main')
const {QuadTree} = require('./main')

let quadTree = new QuadTree()

console.log(quadTree)





const keys = [8,3,10,1,6,14,4,7,13]
let binTree = new BinaryTree(keys, true)

binTree.traverseDF(node => {
    console.log(node.key);
})
console.log('----');
binTree.traverseBF(node => {
    console.log(node.key);
    if (node.key === 6) return true
})

console.log(binTree)