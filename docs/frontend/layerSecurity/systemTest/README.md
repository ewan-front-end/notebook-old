---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>N 2021.09.04 13:07</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul><li><a href="/frontend/layerSecurity/systemTest/static">静态检查</a></li><li><a href="/frontend/layerSecurity/systemTest/unit">单元测试</a></li><li><a href="/frontend/layerSecurity/systemTest/e2e">端到端测试</a></li><li><a href="/frontend/layerSecurity/systemTest/ci">持续集成(Continuous integration 简称CI)</a></li></ul></div></div>
</div>
<div class="content-header">
<h1>测试系统</h1><strong>测试系统</strong>
<summary class="desc">自动化测试是是一个锥形体系</summary>
</div>
<div class="static-content">


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

</div>