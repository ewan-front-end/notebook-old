
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
 