

===+
#### 实例(mocha+chai)
    [#] demo/src/calculate.js
        var calculate = {
            add: (a, b) => a + b,
            divide: (a, b) => a / b
        }
        module.exports = calculate
    [#] demo/test/calculate.test.js
        var calculate = require('../src/calculate')        
        // 测试驱动开发(TDD:Test-Driven Development)风格(assert) assert.typeOf(foo, 'string')
        // 行为驱动开发(BDD)风格(should) foo.should.be.a('string')
        // 行为驱动开发(BDD)风格(expect) expect(foo).to.be.a('string')
        var expect = require('C:/Users/new/AppData/Roaming/npm/node_modules/chai').expect // 使用chai的expect断言风格
        describe('[(cc)测试套件可嵌套]', function() {
            describe('[(cc)测试套件名称]', function() {
                it('[(cc)测试用例名称]', function() {
                    expect(calculate.add(1, 2)).to.be.equal(3) // 更多：断言库(chai)API
                })
                it('2/2=1', function() {
                    expect(calculate.divide(2, 2)).equal(1)
                })
            })
        })
    
    // npm install mocha chai -g
    demo> mocha  
    // mocha --recursive 递归的运行test目录的所有子目录
    // mocha test/calculate.js 指定目录运行测试脚本
    // mocha test/unit/{file1,file2}.js
    // mocha test/unit/*.js

    其它单元测试场景
===-

::: details 断言库(chai)API
===+
// 相等或不相等(equal)
expect(4 + 5)      .to.be.equal(9) 期望4+5等于9
expect(foo)        .to.be.deep.equal({bar: 'baz'})
expect(4 + 5)      .to.be.not.equal(10) 期望4+5不等于10
expect('hello')    .to.equal('hello')
expect(42)         .to.equal(42)
expect(1)          .to.not.equal(true)
expect({foo:'bar'}).to.not.equal({foo:'bar'});
expect({foo:'bar'}).to.deep.equal({foo:'bar'});

// 数值比较(等于equal 大于above 大于等于least 小于below 小于等于most)
expect(10)         .to.be.above(5)
expect('foo')      .to.have.length.above(2)
expect([1,2,3])    .to.have.length.above(2)

// 判断目标是否为布尔值true(隐式转换)
expect('everthing').to.be.ok
expect(1).to.be.ok
expect(false).to.not.be.ok
expect(undefined).to.not.be.ok
expect(null).to.not.be.ok

// 断言目标是否为true或false
expect(true).to.be.true
expect(1).to.not.be.true
expect(false).to.be.false
expect(0).to.not.be.false

// 断言目标是否为null/undefined
expect(null).to.be.null
expect(undefined).not.to.be.null
expect(undefined).to.be.undefined
expect(null).to.not.be.undefined;

// 断言目标值不是数值
expect('foo').to.be.NaN
expect(4).not.to.be.NaN

// 断言类型
expect('test').to.be.a('string')
expect({foo:'bar'}).to.be.an('object')
expect(null).to.be.a('null')
expect(undefined).to.be.an('undefined')
expect(new Error).to.be.an('error')
expect(new Promise).to.be.a('promise')

// 包含关系
expect([1,2,3]).to.include(2)
expect('foobar').to.contain('foo')
expect({foo:'bar'}).to.include.keys('foo')

// 判断空值
expect([]).to.be.empty
expect('').to.be.empty
expect({}).to.be.empty

// 匹配
expect('foobar').to.match(/^foo/)

// 断言目标存在(既不是null也不是undefined)
expect(foo).to.exist
expect(bar).to.not.exist
expect(baz).to.not.exist

// 断言目标值在某个区间范围内
expect(7).to.be.within(5,10)
expect('foo').to.have.length.within(2,4)  // 可以与length连用
expect([ 1, 2, 3 ]).to.have.length.within(2,4)

// 断言目标是某个构造器产生的事例
expect(Chai).to.be.an.instanceof(Tea)
expect([ 1, 2, 3 ]).to.be.instanceof(Array)

// property(name, [value]) 断言目标有以name为key的属性,并且可以指定value断言属性值是严格相等的,此[value]参数为可选,如果使用deep链式调用,可以在name中指定对象或数组的引用表示方法 // simple referencing var obj = { foo: 'bar' };

expect(obj).to.have.property('foo')
expect(obj).to.have.property('foo', 'bar') // 类似于expect(obj).to.contains.keys('foo')
expect(deepObj).to.have.deep.property('green.tea', 'matcha') // var deepObj={green:{tea:'matcha'}, teas:['matcha',{tea:'konacha'}]}
expect(deepObj).to.have.deep.property('teas[0]', 'matcha')
expect(deepObj).to.have.deep.property('teas[1].tea', 'konacha')

// 断言目标拥有自己的属性(非原型链继承)
expect('test').to.have.ownProperty('length')

// 断言目标抛出特定的异常 
expect(fn).to.throw(ReferenceError) // var err=new ReferenceError('错误文本'), fn=function(){throw err}
expect(fn).to.throw(Error)
expect(fn).to.throw(/误文/)
expect(fn).to.not.throw('正确')
expect(fn).to.throw(ReferenceError, /误文/)
expect(fn).to.throw(err)
expect(fn).to.not.throw(new RangeError('Out of range'))

// 断言目标通过一个真值测试 
expect(1).to.satisfy(function(num){return num > 0}) 
===-
:::

::: details 场景一：game项目做单元测试  
===+  
1. game> npm init -y
2. game> npm i chai --save-dev
3. game/test/container.test.js
    import Element from '../core/element/element.js'
    import Stage from '../core/stage.js'
    let stage = new Stage()

    var expect = require('chai').expect 
    describe('容器类', function() {
        describe('stage', function() {
            it('Element实例', function() {
                expect(stage).to.be.an.instanceof(Element) // 更多：断言库(chai)API
            })
        })
    })
4. game> mocha // 遇到问题：ES6开发的源代码，mocha只支持commonjs引入

- game> npm i babel-register babel-env --save-dev
- game/test/main.js
    require('babel-register') ({ presets: [ 'env' ] })
    const Element = require('../core/element/element').default
    const Stage = require('../core/stage.js').default
    module.exports = {
        Element,
        Stage
    }
- game/test/container.test.js
    const {Element, Stage} = require('./main')
    let stage = new Stage()     
            
    var expect = require('C:/Users/new/AppData/Roaming/npm/node_modules/chai').expect 
    describe('容器类', function() {
        describe('stage', function() {
            it('Element实例', function() {
                expect(stage).to.be.an.instanceof(Element) // 更多：断言库(chai)API
            })
        })
    })
- game> mocha
===-
:::





- /package.json
    `"scripts": {"test": "mocha test/*.js"}`
- /test/index.js
```js
'use strict';

var path = require('path');
var generate = require('markdown-it-testgen');
var md = require('markdown-it');
var plantuml = require('../');

/*eslint-env mocha*/

describe('markdown-it-plantuml', function () {
  var defaultParser = md().use(plantuml);

  generate(
    path.join(__dirname, 'fixtures/default.txt'),
    { header: true },
    defaultParser
  );

  var ditaaParser = md().use(
    plantuml,
    {
      openMarker: '@startditaa',
      closeMarker: '@endditaa',
      diagramName: 'ditaa'
    }
  );

  generate(
    path.join(__dirname, 'fixtures/ditaa.txt'),
    { header: true },
    ditaaParser
  );

  var pngParser = md().use(plantuml, { imageFormat: 'png' });

  generate(
    path.join(__dirname, 'fixtures/png.txt'),
    { header: true },
    pngParser
  );

  var parserWithCustomServer = md().use(plantuml, { server: 'http://example.com/plantuml' });

  generate(
    path.join(__dirname, 'fixtures/server.txt'),
    { header: true },
    parserWithCustomServer
  );
});
```
- npm test
```
  markdown-it-plantuml

      √ Simple diagram
      √ Diagram with alt text
      √ Anything inside diagrams will not be parsed
      √ Marker could be indented up to 3 spaces
      √ But that's a code block
      √ Diagrams self-close at the end of the document
      √ They should terminate paragraphs
      √ They could be nested in lists
      √ List indentation quirks
      √ Timing diagram is supported
      √ UML including non-english character is rendered correctly

      √ Ditaa diagram is supported

      √ Outputs png format if specified

      √ Outputs svg format with custom server


  14 passing (31ms)
```


