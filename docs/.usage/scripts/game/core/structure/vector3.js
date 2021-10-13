class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x 
        this.y = y 
        this.z = z
    }
    set(x, y, z) { 
        this.x = x
        this.y = y
        this.z = z 
        return this
    }
    setX(x) {
        this.x = x
        return this
    }
    setY(y) {
        this.y = y
        return this
    }
    setZ(z) {
        this.z = z
        return this
    }
    setComponent(index, value) {
        switch (index) {
            case 0: this.x = value; break  
            case 1: this.y = value; break  
            case 2: this.z = value; break  
            default: throw new Error( 'index is out of range: ' + index )
        }
    }
    getComponent(index) {
        switch (index) {
            case 0: return this.x 
            case 1: return this.y  
            case 2: return this.z  
            default: throw new Error( 'index is out of range: ' + index )
        }
    }
    copy(v) { 
        this.x = v.x 
        this.y = v.y 
        this.z = v.z
        return this
    }
    add(v) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
        return this
    }
    addScalar(s) {
        this.x += s
        this.y += s
        this.z += s  
        return this
    }
    addVectors(a, b) {
        this.x = a.x + b.x 
        this.y = a.y + b.y
        this.z = a.z + b.z
        return this
    }
    sub(v, w) { 
        this.x -= v.x
        this.y -= v.y 
        this.z -= v.z   
        return this
    }
    subVectors(a, b) {  
        this.x = a.x - b.x
        this.y = a.y - b.y
        this.z = a.z - b.z
        return this 
    }
    multiply(v, w) { 
        this.x *= v.x
        this.y *= v.y
        this.z *= v.z
        return this
    }
    multiplyScalar(scalar) {
        this.x *= scalar 
        this.y *= scalar
        this.z *= scalar
        return this 
    }
    multiplyVectors(a, b) { 
        this.x = a.x * b.x
        this.y = a.y * b.y
        this.z = a.z * b.z
        return this
    }
}
