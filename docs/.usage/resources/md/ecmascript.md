


## 数据类型
::: details Array
```js
a=['a','b'] b=a.shift()            // a=['b']         b='a'        从a首端删除元素'a'成为['b']         返回被删元素'a'
a=['b','c'] b=a.unshift('a')       // a=['a','b','c'] b=3          向a首端添加元素'a'成为['a','b','c'] 返回a新长度3
a=['a','b'] b=a.push('c')          // a=['a','b','c'] b=3          向a末端添加元素'c'成为['a','b','c'] 返回a新长度3
a=['a','b'] b=a.pop()              // a=['a']         b='b'        从a末端删除元素'b'成为['a']         返回被删元素'b'

a=[1,2]     b=a.splice(2, 0, 3)    // a=[1,2,3]       b=[]      增 从第3位开始删除0位 从第3位开始插入1位'3'  
a=[1,2,3]   b=a.splice(1, 2)       // a=[1]           b=[2,3]   删 从第2位开始删除2位                       
a=[1,2,3]   b=a.splice(2, 1, 4)    // a=[1,2,4]       b=[3]     改 从第3位开始删除1位 从第3位开始插入1位'4'
a=[1,2,3]   b=a.splice(-2, 1, 4)   // a=[1,4,3]       b=[2]        从第2位开始删除1位 从第2位开始插入1位'4'  1=3+-2 即第2位

 

sort(fn) reverse()                        // 改

slice(s,e)                                // 信息 内容
indexOf(item,s) lastIndexOf(item,s)       // 信息 位置 
toString() join('*')                      // 信息 字符

slice() concat([],arr)                    // 拷贝

for(let i=0;i<5;i++){ }                                                                // 功能循环 可终止(break)&跳过(continue)
[1,2,3].forEach((e,i,a)=>{a[i]=e*2})                                                   // 功能循环

[1,2,3].every(e=>e<3)                     false                                        // 逻辑与
[1,2,3].some(e=>e>2)                      true                                         // 逻辑或

[1,2,3].map(e=>e*e)                       [1,2,3] > [1,4,9]                            // 同长度 返回和原数组同等长度计算值的数组
[{a:1,b:2},{a:3}].map(i=>({b:i.b}))       [{a:1,b:2},{a:3}] > [{b:2},{b: undefined}]
[1,2,3].filter(e=>e%2===0)                [1,2,3] > [2]                                // 子集   返回的是原数组的子集

[1,2,7].find(e=>e>2)                      7                                            // 第一个验证值
[1,2,7].findIndex(e=>e>2)                 2                                            // 第一个验证索引

new Array(2)                              [,]
new Array(2,3)                            [2,3]

//////////// lodash工具 ////////////
/** demo> npm i lodash --save **/
/** import _ from 'lodash'
    var l = console.log
    var arr = [{ a:"1", b:[{c:"3"}, {c:"33"}]},  {a:"11", b:[{c:"3"}, {c:"33"}] }]
    var objA = {"name": "戈德斯文", "car": "宝马"}
    var objB = {"name": "柴硕", "loveEat": true}*/

// Native                                    // Lodash                            // 功能:结果 注释 
for(var i = 0; i < 5; i++){ l(i) }           _.times(5, a => { l(a) })            // 循环5资：0 1 2 3 4
var a = arr.map(o => o.b[0].c)               var a = _.map(arr, 'b[0].c')         // 摘取:a=["3","3"]
var a = JSON.parse(JSON.stringify(arr))      var a = _.cloneDeep(arr)             // 深度克隆            N:在对象内部没有方法的时候才可行 L:不限
Math.floor(Math.random() * (8 - 4)) + 4      _.random(4, 8)                       // 获取4-8范围内随机数  L:可只一个参数(最大值) 可指定是否返回浮点数(4,8,true)
                                             _.assign(objA, objB)                 // 合并&继承           N:ES5 需扩展对象方法 ES6 assign
                                             _.sample(arr)                        // 从arr中获得1个随机元素
                                             _.sampleSize(arr,n)                  // 从arr中获得n个随机元素的新数组
                                             _.includes(arr, 'demostr', 2)        // 从arr的第2个无素开始检索'demostr'的存在 -1则从尾部开始

////////// ES6扩展 //////////
Object.assign(target, objA, objB)            // {"name": "柴硕", "car": "宝马", "loveEat": true}      浅拷贝
```
::: 

::: details String
[中文首字母及排序](/solution#中文获取拼音首字母及排序)  [正则匹配](/tools/regularExpression#字符串匹配方法)
```js
'Hello'.slice(1,2))          "e"             // 截取范围
'Hello'.slice(-3)            "llo"           // 截取范围 第一个负数参数为5+-3
'Hello'.substring(1,2)       "e"             // 截取范围
'Hello'.substring(-3)        "Hello"         // 截取范围 所有负数参数转为 0
'Hello'.substr(2,3))         "llo"           // 截取长度
'Hello'.substr(-3, -4))      ""              // 截取长度 第一个负数参数为5+-3 第二个负数参数转为 0

'Hello'.search('a')          -1              // 搜索 位置 检索字符串中指定的子字符串(或正则匹配)的起始位置
'Hello'.search('ll')          2              // 搜索 位置

'Hello'.indexOf('l',0)        2              // 搜索 位置 从'Hello'第0位开始'l'的首次出现位置
'Hello'.indexOf('l',1)        2              // 搜索 位置 从'Hello'第1位开始'l'的首次出现位置
'Hello'.indexOf('l',3)        3              // 搜索 位置 从'Hello'第3位开始'l'的首次出现位置
'Hello'.indexOf('l',-1)       2              // 搜索 位置 负参转为0
'Hello'.indexOf('l',-2)       2              // 搜索 位置 负参转为0
'Hello'.indexOf('l',-3)       2              // 位置 位置 负参转为0
'Hello'.lastIndexOf('l')      3              // 搜索 位置 从'Hello'第尾位开始'l'的首次出现位置

'Hello'.charAt(2)            "l"             // 搜索 值   子字符
'Hello'.charCodeAt](2)       108             // 搜索 值   子字符Unicode编码

'HelloHello'.match(/gg/)                     // 搜索 匹配 null
'HelloHello'.match(/ll/)                     // 搜索 匹配 {0:"ll", index:2, input:"HelloHello", groups:undefined}
'HelloHello'.match(/ll/g)                    // 搜索 匹配 ["ll", "ll"]
'Hello1Hello2H'.match(/H(\w+)H/)             // 搜索 匹配 {0:"Hello1Hello2H", 1:"ello1Hello2", index:0, input:"Hello1Hello2H", groups:undefined} 默认贪婪模式
'Hello1Hello2H'.match(/H(\w+?)H/)            // 搜索 匹配 {0:"Hello1H", 1:"ello1", index:0, input:"Hello1Hello2H", groups:undefined]

'a'.localeCompare('b')  -1                   // 判断 靠前 字符串排序先后对比 返回值：-1、0、1
'a'.localeCompare('a')  0                    // 判断 同位
'b'.localeCompare('a')  1                    // 判断 靠后
['猫','狗'].sort((a, b)=>a.localeCompare(b)) // 判断 ['猫','狗'] > ["狗", "猫"]

'He l lo'.trim()  "He l lo"                  // 转换 去空格 只去左右
' Hello '.trim()  "Hello"                    // 转换 去空格 只去左右

'Hello'.toUpperCase() "HELLO"                // 转换 大小写
'Hello'.toLowerCase() "hello"                // 转换 大小写
'Türkç'.toLocaleUpperCase() "TÜRKÇ"          // 转换 本地语种大小写
'Türkç'.toLocaleLowerCase() "türkç"          // 转换 本地语种大小写

'Hello'.split('')                            // 转换 Hello > ["H", "e", "l", "l", "o"] 把一个字符串分割成字符串数组
'Hello'.replace('e','o')                     // 转换 Hello > Hollo

// 静态方法
String.fromCharCode(65)       "A"            // 转换 Unicode转字符
String.fromCharCode(65,66,67) "ABC"          // 转换 Unicode转字符
```
:::

::: details 类型转换
```js
> Number
    true => 1       
    false => 0        
    '' => 0        
    '4S' => NaN            
    null => 0        
    undefined => NaN        
    {valueOf:()=>1} => 1
> Boolean
    false、""、0、NaN、null、undefined   =>  false         
    " " => true
```
:::

::: details 类型判断
```js
typeof
instanceof
toString.call()
```
:::
