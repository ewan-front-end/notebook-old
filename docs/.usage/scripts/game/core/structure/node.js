class Node {
    constructor(data, dimension) {
        this.data = data
        // [5]
        // [0, 0, 100, 200]
        // [10, 20, 30]
        this.parent = null
        this.dimension = dimension
        this.children = Array(dimension)
        this.deep = 0
    }
    addChild(child) {
        if (!(child instanceof Node)) return

        if(child.data < this.data){

        }

        if(child.data[0] < this.data[0]){

        }

    }
}