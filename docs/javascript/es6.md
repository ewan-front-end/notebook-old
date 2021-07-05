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
            <span>M 2021.07.05 14:00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>es6</h1><strong>es6</strong>
</div>
<div class="static-content">


## 模块化
export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'

import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

与module.exports/require的区别：
值的拷贝 运行时同步加载 模块内部的变化不再影响这个值
```js
// lib.js
var counter = 3;
function incCounter() { counter++ }
module.exports = { counter: counter, incCounter: incCounter }

// main.js
var mod = require('./lib');
console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3 没有反应
```
值的引用 编译时异步输出 模块内部的变化不再影响这个值
```js
// lib.js
export let counter = 3;
export function incCounter() { counter++ }

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4 已经改变
```


## 类
```js
class Demo {
    constructor(opts) { 
        this.opts = opts
        this.test = this.test.bind(this) // 当test方法赋值给外部变量时(如在类外部var a = demo.test)，this会丢失
    }    
    // 实现私有方法
    [render](opts) {}
    // 实例方法 demo.test()
    test() {
        console.log(Object.keys(this)) // ["opts", "test"] 
        console.log(Object.keys(this.__proto__)) // []
        console.log(Object.getOwnPropertyNames(this.__proto_)) // ["constructor", "test"] 
        console.log(Object.getOwnPropertySymbols(this.__proto__)) // [Symbol(render)]
    }
    // 静态方法 Demo.test2()
    static test2() {}
}
const demo = new Demo()
demo[Object.getOwnPropertySymbols(demo.__proto__)[0]]()
demo[Object.getOwnPropertySymbols(demo.__proto__)[0]] = function(){} // 还是可以重写，不是绝对安全的私有方法
```


# 模块化
```js
export var firstName = 'Michael'
export var lastName = 'Jackson'
import {firstName, lastName} from './profile'

var firstName = 'Michael'
var lastName = 'Jackson'
export {firstName, lastName}
import {firstName, lastName} from './profile';

export function multiply(x, y) { return x * y }

function v1() { ... }
function v2() { ... }
export {
  v1 as streamV1, // 重命名
  v2 as streamV2,
  v2 as streamLatestVersion
};


// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};


// 报错
export 1 // 1没有提供对外的接口 2必须与模块内部变量建立一一对应的关系

// 无法解构值 报错
var m = 1
export m

function f() {}
export f

// 正确
export function f() {};

function f() {}
export {f};


// 必须是在模块顶层 报错。

function foo() { export default 'bar' }
foo()


import { lastName as surname } from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}



3.module的整体加载
除了指定加载某个输出值，还可以用（*）指定一个对象，所有的变量都会加载在这个对象上。



export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}
import { area, circumference } from './circle'
import * as circle from './circle'; // 整体加载
// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};


//////////////////////////////////////////////////////////////////////////////////////////////////////////

## 模块指定输出
export default function () { console.log('foo') }
import customName from './export-default' // 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字


下面比较一下默认输出和正常输出
// 第一组
export default function crc32() { }
import crc32 from 'crc32'; // 输入
// 第二组
export function crc32() { }
import {crc32} from 'crc32'; // 输入




所以引入了import() 完成动态加载 返回一个Promise对象


import(`./section-modules/${someVariable}.js`).then(module => { }).catch(err => { })

button.addEventListener('click', event => {
  import('./dialogBox.js').then(dialogBox => { }).catch(error => { })
})

if (condition) { import('moduleA').then(...) } else { import('moduleB').then(...) } // 条件加载
```

# Promise/then
```
[b b5 cf| 回调地狱解脱 ] 横向赋值 链式调用 传参1个
```

# async/await
```
[b b5 cf| 同一作用域 自动 异步方案 ] 顺序执行 同步习惯 无传参限制 基于Promise的优化

```

# generator/yield/next
```
[b b5 cf| 同一作用域 手动 异步方案 ]
function [green b|*]main(){   // [object Generator]
  [green b|yield] 1
  [green b|yield] 2
  return 3
}

let m = main()      // {<suspended>}
m.[green b|next]()            // {value: 1, done: false}
m.[green b|next]()            // {value: 2, done: false}
m.[green b|next]()            // {value: 3, done: true }

```
 

</div>