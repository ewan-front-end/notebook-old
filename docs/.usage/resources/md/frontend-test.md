
## 函数场景
```
demo> npm i mocha chai --save-dev

demo/src/a.js
    module.exports = (a, b) => a + b
demo/src/b.js
    module.exports = {
        pow: x => x * x,
        sqrt: x => Math.sqrt(x)
    }
demo/test/add.js
    const chai = require('chai')
    const should = chai.should()
    const add = require('../src/a')
    const {pow, sqrt} = require('../src/b')


    describe("加法算法",() => {
        it('7 + 5 = 12',() => { add(7,5).should.equal(12) })
    })

    describe("平方算法",() => {
        it('8的平方为64',() => { pow(8).should.equal(64) })
    })

    describe("平方根算法",() => {
        it('49的平方根为7',() => { sqrt(49).should.equal(7) })
    })
demo/package.json
{
    "scripts": {
        "test": "node ./node_modules/mocha/bin/mocha"
    }
}

demo> npm test  或  node ./node_modules/mocha/bin/mocha
```