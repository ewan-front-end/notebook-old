<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>M 2021.06.22</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul><li><a href="/javascript/es6">es6</a></li><li><a href="/javascript/ecmascript">ECMAScript</a></li></ul></div></div>
</div>
<div class="content-header">
<h1>Javascript</h1>
</div>



## 数据类型
::: details Array
```js
  new Array(2)  [,]
  new Array(2,3)  [2,3]

  a=['a','b'] b=a.shift()                        // a=['b']         b='a'                      从a首端删除元素'a'成为['b']                         返回被删元素'a'
  a=['b','c'] b=a.unshift('a')                   // a=['a','b','c'] b=3                        向a首端添加元素'a'成为['a','b','c']                 返回a新长度3
  a=['a','b'] b=a.push('c')                      // a=['a','b','c'] b=3                        向a末端添加元素'c'成为['a','b','c']                 返回a新长度3
  a=['a','b'] b=a.pop()                          // a=['a']         b='b'                      从a末端删除元素'b'成为['a']                         返回被删元素'b'

      a=[1,2] b=a.splice(2, 0, 3)                // a=[1,2,3]       b=[]                       从第3位开始删除0位 从第3位开始插入1位'3'             返回被删元素集合
    a=[1,2,3] b=a.splice(1, 2)                   // a=[1]           b=[2,3]                    从第2位开始删除2位                                 返回被删元素集合      
    a=[1,2,3] b=a.splice(2, 1, 4)                // a=[1,2,4]       b=[3]                      从第3位开始删除1位 从第3位开始插入1位'4'             返回被删元素集合
    a=[1,2,3] b=a.splice(-2, 1, 4)               // a=[1,4,3]       b=[2]                      从第2位开始删除1位 从第2位开始插入1位'4'             返回被删元素集合  
 
    a=[1,3,2] b=a.sort((x,y)=>x-y)               // a=b=[1,2,3]                                排序 正序                                          返回a的引用
    a=[1,2,3] b=a.sort((x,y)=>y-x)               // a=b=[3,2,1]                                排序 倒序                                          返回a的引用

    a=[1,2,3] b=a.reverse()                      // a=b=[3,2,1]                                排序 颠倒                                          返回a的引用
    a=[1,3,2] b=a.reverse()                      // a=b=[2,3,1]                                排序 颠倒                                          返回a的引用

    a=[1,2,3] b=a.slice(1)                       // a=[1,2,3]       b=[2,3]                    截取 a中第2位以后所有                               返回新数组
    a=[1,2,3] b=a.slice(0,2)                     // a=[1,2,3]       b=[1,2]                    截取 a中第1位开始到第3位前结束                       返回新数组
    a=[1,2,3] b=a.slice(-2)                      // a=[1,2,3]       b=[2, 3]                   截取 a中第2位以后所有                               返回新数组
    a=[1,2,3] b=a.slice(-2,-1)                   // a=[1,2,3]       b=[2]                      截取 a中第2位开始到第3位前结束                       返回新数组

      a=[1,2] b=a.concat([3,4])                  // a=[1,2]  b=[1,2,3,4]                       拷贝
      a=[1,2] b=a.concat(a,[3,4])                // a=[1,2]  b[1,2,1,2,3,4]                    拷贝
      a=[1,2] a=a.concat(a,[3,4])                // a=[1,2,1,2,3,4]                            拷贝                   

    ['a','b','c'].indexOf('c')                   //  2                                         搜索 位置 从数组第0位开始'c' 的首次出现位置
   ['a','b','cc'].indexOf('c')                   // -1                                         搜索 位置 从数组第0位开始'cc'的首次出现位置
    ['a','b','c'].indexOf('b',1)                 //  1                                         搜索 位置 从数组第0位开始'cc'的首次出现位置
    ['a','b','c'].indexOf('b',2)                 // -1
    ['a','b','c'].indexOf('b',-1)                // -1
    ['a','b','c'].indexOf('b',-2)                //  1

    ['a','b','c'].lastIndexOf('b',0)             // -1                                         搜索 位置 从数组尾端第1位开始'b'的首次出现位置
    ['a','b','c'].lastIndexOf('b',1)             //  1                                         搜索 位置 从数组尾端第2位开始'b'的首次出现位置
    ['a','b','c'].lastIndexOf('b',-3)            //  1                                         搜索 位置 从数组首端第1位开始'b'的首次出现位置
    ['a','b','c'].lastIndexOf('a',-4)            // -1                                         搜索 位置 从数组首端第-1位开始'b'的首次出现位置
 
    ['a','b','c'].toString()                     // "a,b,c"                                    转换
    ['a','b','c'].join()                         // "a,b,c"                                    转换
    ['a','b','c'].join('')                       // "abc"                                      转换
    ['a','b','c'].join('*')                      // "a*b*c"                                    转换
          [1,2,3].join()                         // "1,2,3"                                    转换
          [1,2,3].join('')                       // "123"                                      转换
          [1,2,3].join('*')                      // "1*2*3"                                    转换

          [1,2,3].forEach((e,i,a)=>{a[i]=e*2})   // for(let i=0;i<5;i++){ }                    功能循环 for可终止(break)&跳过(continue) forEach不可

          [1,2,3].every(e=>e<3)                  // false                                      逻辑与
          [1,2,3].some(e=>e>2)                   // true                                       逻辑或

          [1,2,3].map(e=>e*e)                    // [1,2,3] > [1,4,9]                          同长度 返回和原数组同等长度计算值的数组
[{a:1,b:2},{a:3}].map(i=>({b:i.b}))              // [{a:1,b:2},{a:3}] > [{b:2},{b: undefined}]
          [1,2,3].filter(e=>e%2===0)             // [1,2,3] > [2]                              子集   返回的是原数组的子集

          [1,2,7].find(e=>e>2)                   // 7                                          第一个验证值
          [1,2,7].findIndex(e=>e>2)              // 2                                          第一个验证索引


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
[中文首字母及排序](/solution#中文获取拼音首字母及排序) - [正则匹配](/tools/regularExpression#字符串匹配方法)
```js
        'Hello'.slice(1,2))          "e"             // 截取范围
        'Hello'.slice(-3)            "llo"           // 截取范围 第一个负数参数为5+-3
        'Hello'.substring(1,2)       "e"             // 截取范围
        'Hello'.substring(-3)        "Hello"         // 截取范围 所有负数参数转为 0
        'Hello'.substr(2,3))         "llo"           // 截取长度
        'Hello'.substr(-3, -4))      ""              // 截取长度 第一个负数参数为5+-3 第二个负数参数转为 0

        'Hello'.search('a')          -1              // 搜索 位置 检索字符串中指定的子字符串(或正则匹配)的起始位置
        'Hello'.search('ll')          2              // 搜索 位置

        'Hello'.indexOf('l')          2              // 搜索 位置 从'Hello'第0位开始'l'的首次出现位置
        'Hello'.indexOf('l',0)        2              // 搜索 位置 从'Hello'第0位开始'l'的首次出现位置
        'Hello'.indexOf('l',1)        2              // 搜索 位置 从'Hello'第1位开始'l'的首次出现位置
        'Hello'.indexOf('l',3)        3              // 搜索 位置 从'Hello'第3位开始'l'的首次出现位置
        'Hello'.indexOf('l',-1)       2              // 搜索 位置 负参转为0
        'Hello'.indexOf('l',-2)       2              // 搜索 位置 负参转为0
        'Hello'.indexOf('l',-3)       2              // 位置 位置 负参转为0
        'Hello'.lastIndexOf('l')      3              // 搜索 位置 从'Hello'第尾位开始'l'的首次出现位置

        'Hello'.charAt(2)            "l"             // 搜索 值   子字符
        'Hello'.charCodeAt(2)        108             // 搜索 值   子字符Unicode编码

   'HelloHello'.match(/gg/)                          // 搜索 匹配 null
   'HelloHello'.match(/ll/)                          // 搜索 匹配 {0:"ll", index:2, input:"HelloHello", groups:undefined}
   'HelloHello'.match(/ll/g)                         // 搜索 匹配 ["ll", "ll"]
'Hello1Hello2H'.match(/H(\w+)H/)                     // 搜索 匹配 {0:"Hello1Hello2H", 1:"ello1Hello2", index:0, input:"Hello1Hello2H", groups:undefined} 默认贪婪模式
'Hello1Hello2H'.match(/H(\w+?)H/)                    // 搜索 匹配 {0:"Hello1H", 1:"ello1", index:0, input:"Hello1Hello2H", groups:undefined]

            'a'.localeCompare('b')   -1              // 判断 靠前 字符串排序先后对比 返回值：-1、0、1
            'a'.localeCompare('a')    0              // 判断 同位
            'b'.localeCompare('a')    1              // 判断 靠后
    ['猫','狗'].sort((a, b)=>a.localeCompare(b))     // 判断 ['猫','狗'] > ["狗", "猫"]

      'He l lo'.trim()  "He l lo"                    // 转换 去空格 只去左右
      ' Hello '.trim()  "Hello"                      // 转换 去空格 只去左右

        'Hello'.toUpperCase() "HELLO"                // 转换 大小写
        'Hello'.toLowerCase() "hello"                // 转换 大小写
        'Türkç'.toLocaleUpperCase() "TÜRKÇ"          // 转换 本地语种大小写
        'Türkç'.toLocaleLowerCase() "türkç"          // 转换 本地语种大小写

        'Hello'.split('')                            // 转换 Hello > ["H", "e", "l", "l", "o"] 把一个字符串分割成字符串数组
        'Hello'.replace('e','o')                     // 转换 Hello > Hollo

         String.fromCharCode(65)       "A"           // 转换 Unicode转字符
         String.fromCharCode(65,66,67) "ABC"         // 转换 Unicode转字符
```
:::

::: details 类型转换
```js
> Number
        1 <= true      
        0 <= false      
        0 <= ''       
      NaN <= '4S'            
        0 <= null        
      NaN <= undefined       
        1 <= {valueOf:()=>1}
> Boolean
    false <= false
    false <= ""
    false <= 0
    false <= NaN
    false <= null
    false <= undefined         
     true <= " "
```
:::

::: details 类型判断
```js
typeof
instanceof
toString.call()
```
:::

## 内置对象
::: details Date
```js
  date = new Date()           
   str = date.toString()      // Tue Jun 22 2021 15:52:15 GMT+0800 (中国标准时间)
   str = date.toDateString()  // Tue Jun 22 2021
   str = date.toJSON()        // 2021-06-22T08:25:28.894Z
   num = date.getTime()       // 1624351224879  时间戳：1970年1月1日至今的毫秒数

  year = date.getFullYear()   // 2021   
 month = date.getMonth()      // 5             (0 ~ 11)  [1,2,3,4,5,6,7,8,9,10,11,12]
   day = date.getDate()       // 22            (1 ~ 31)
  hour = date.getHours()      // 15            (0 ~ 23)
minute = date.getMinutes()    // 53            (0 ~ 59)
second = date.getSeconds()    // 32            (0 ~ 59)
  week = date.getDay()        // 2             (0 ~ 6)   ['日','一','二','三','四','五','六']

// 获取当前日期
function getNow() {
    var date = new Date(), yy = date.getFullYear(), mm = date.getMonth() + 1, dd = date.getDate(), h  = date.getHours(), m  = date.getMinutes(), s  = date.getSeconds(), w  = date.getDay()
    mm < 10 && (month = "0" + month)
    dd < 10 && (day ="0" + day)
    h < 10 && (hour = "0" + hour)
    m < 10 && (minute = "0" + minute)
    s < 10 && (second = "0" + second)
    return {year:yy, month:mm, day:dd, hour:h, minute:m, second:s, week:w, yy, mm, dd, h, m, s, w}
}
var {year, month, day, hour, minute, second, week} = getNow()

```
:::

