
::: details 按ECMAScript规范写一门语言
基于ChromeV8引擎的JavaScript运行环境   NODE事件循环(event loop)架构
<pre>
V8使用C++开发
</pre>
:::

## ECMAScript基础知识

## ECMAScript运算符

## ECMAScript语句

## ECMAScript函数

## ECMAScript对象

## ECMAScript 继承



为宿主环境提供编程实现，Flash-ActionScript、浏览器-Javascript

```
弹出新的浏览器窗口；
移动、关闭浏览器窗口以及调整窗口大小；
提供 Web 浏览器详细信息的定位对象；　
提供用户屏幕分辨率详细信息的屏幕对象；
跳转到另一个页面、前进、后退

DOM(W3C标准)
HTMLDocument
HTMLElement
鼠标事件：click、dbclick、mousedown、mouseup、mouseover、mouseout、mousemove
键盘事件：keydown、keypress、keyup
HTML事件：load、unload、abort、error、select、change、submit、reset、resize、scroll、focus、blur

1、DOMReady
2、DOM操作。增删改查遍历
3、DOM继承层级
5、DOM类型与相应的API
6、事件与事件流
7、浏览器兼容性

原型与原型链
执行上下文与执行上下文栈
作用域与作用域链
闭包
高阶函数
```

- 语法、类型、语句、关键字、保留字、运算符、对象
- JavaScript中的类型转换
- 作用域、作用域链和闭包
- 函数与函数表达式
- arguments对象
- call与apply的应用
- callee与caller的应用
- 原型和原型链
- 面向对象与继承
- this的理解
- 引用/深浅拷贝/JavaScript中的参数传递规则
- Object原型中的函数及应用
- Object静态方法的应用
- Array相关API的应用
- Date相关API的应用
- 异步编程

#### 窗口管理
　　方档规范 | 当前URL信息 | 浏览器信息 | 显示屏信息 | 用户访问信息 | 窗口集
```tree
[Window](pages/javascript/bom?id=Window) [BOM规范](pages/javascript/bom?id=浏览器对象模型)
  event: 
    非标准：依赖DOM触发 参考document事件，非DOM类事件无法监听
    标准：事件提升为window全局管理 非DOM类事件也可以监听 如：window.addEventListener("hashchange", urlReroute)
  document: [Document](pages/javascript/bom?id=document) [DOM规范](pages/javascript/bom?id=文档对象模型) [浏览器静默与激活](pages/solution/scene?id=浏览器静默与激活)
    element:[Element](pages/javascript/bom?id=element)
    title
    cookie
    charset
    referrer
    querySelector [深度优先和先序遍历](pages/common/algorithm.md?id=Depth-First-Search) [querySelectorAll]()
  　  '#container'    返回id为container的dom
      'div#container' 返回id为container的首个div
      '.foo,.bar'     返回带有foo或者bar样式类的首个元素
      'a[target]'     查找文档中共包含 "target" 属性的 a 标签
    ...
  location: [Location](pages/javascript/bom?id=location)  【[编码&解码](pages/javascript/bom?id=location) [解析search](pages/javascript/bom?id=location)】
    protocol
    hostname
    port
    pathname
    hash
    search
    host
    origin
    href
    ...
  navigator: [Navigator](pages/javascript/bom?id=navigator)
    appCodeName
    appName
    appVersion 
    appMinorVersion
    cookieEnabled
    platform
    ...
  screen: [Screen](pages/javascript/bom?id=screen)
    width: 1680
    height: 1050
    availWidth: 1680
    availHeight: 977
    availLeft: 0
    availTop: 23
    ...
  history: [History](pages/javascript/bom?id=history)
  frames

  open 
```

#### ES6
const 和 let  {}块级作用域
模板字符串：`hello ${name}`
class
class Human extends Animal{
constructor(age){
super()
this._age = age
}
get age (){ return this._age }
set name (value){this._name = value}
static 静态方法
}
promise & async&await

常量    作用域    箭头函数   默认参数    对象代理
解构赋值   模板文本  多行字符串   正则扩展   
数字扩展   Iterator    Set和Map   Generator
函数扩展   Class   Module   Symbol
对象扩展
增强对象文本
Promises对象

Symbol

Object.assign
Array.from

class, extends, super, 
arrow functions, 
template string, destructuring, default, rest arguments

let, const, var

 class, extends, super

async/await

非数组转数组／参数剩余整理
[a,b] = [b,a] 数组顺序交换
解构{x:{b}} = {x:{b:1}}

 (...m) => {}                      rest参数
:let [x, y, z] = [1, 2, 3]      数组解构 x: 1 .  y: 2 .  z:3
let [x, ...y] = [1,2,3,4,5]    x: 1 .  y:[2,3,4,5]
:[...[1,2,3], ...[4,5,6]]        数组的扩展 [1,2,3,4,5,6]
 ...[1,2,3]                           函数的扩展

Symbol: 用相同的字符串对对象属性名或方法进行命名时会发生命名冲突,而使用symbol产生的名字是不同的
应用场景1：使用Symbol来作为对象属性名(key),不怕被覆盖
const NAME = Symbol(), AGE = Symbol()
let obj = {[NAME]: "ewan"}
obj[AGE] = 18
obj.AGE = 20
obj[NAME] // 'ewan'
obj[AGE] // 18
应用场景2：使用Symbol来替代常量
const TYPE_AUDIO = 'AUDIO'     const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = 'VIDEO'     const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = 'IMAGE'     const TYPE_IMAGE = Symbol()
应用场景3：使用Symbol定义类的私有属性/方法
const PASSWORD = Symbol()
class Login {
  constructor(username, password) { this.username = username; this[PASSWORD] = password }
  checkPassword(pwd) { return this[PASSWORD] === pwd }
}
export default Login

import Login from './a'
const login = new Login('admin', '123456')
login.checkPassword('123456')  // true
login.PASSWORD  // oh!no!
login[PASSWORD] // oh!no!
login["PASSWORD"] // oh!no!
注册和获取全局Symbol
const TYPE_AUDIO = 'AUDIO'     const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = 'VIDEO'     const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = 'IMAGE'     const TYPE_IMAGE = Symbol()

Map: 类似于对象。
由于普通对象的key只能是字符串，如果用对象作为键值会被toString转化为字符串"[object Object]，
let obj1={key:1}, obj2={key:2}, obj={}
obj[obj1]='a'    // 将对象obj1作为obj的键值
obj[obj2]='b'    // 由于转化为相同的键值字符串，obj2会覆盖obj1
console.log(obj) // {[object Object]: "b"}
因而新增Map数据类型，它的key可以是任何数据类型  
var m0 = new Map() // 空Map
var obj = {a: 1}
var m = new Map([['a', 100], [obj, 50]]) // 二维数组作为参数
属性 
m.size // 2
方法
m.set('b', 2)    // Map(3) {"a" => 100, {a: 1} => 50, "b" => 2}                              添加新的key-value
m.set({},"obj1") // Map(4) {"a" => 100, {a: 1} => 50, "b" => 2, {} => "obj1"}
m.set({},"obj2") // Map(5) {"a" => 100, {a: 1} => 50, "b" => 2, {} => "obj1", {} => "obj2"}
m.has('b')       // true 
m.get('a')       // 100
m.get(obj)       // 50
m.delete('a')    // true                
m.get('a')       // undefined
m.clear()        // undefined 清除map中所有键值

Set: 类似于数组。数组允许元素重复，Set不允许
var s0 = new Set(); // 空Set
var s = new Set([1, 2, 3, 3]) // Array作为参数，会自动去重
属性  
s.size      // 3
方法
s.add(4)    // Set(4) {1, 2, 3, 4}          添加元素
s.keys()    // SetIterator {1, 2, 3, 4}     返回集合所有的键值
s.values()  // SetIterator {1, 2, 3, 4}     返回集合所有值
s.delete(4) // true                         删除元素
s.values()  // SetIterator {1, 2, 3}
s.clear()   // undefined                    清除集合所有元素
s.values()  // SetIterator {}

Service Worker