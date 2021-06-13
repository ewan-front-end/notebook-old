<div class="extend-header">
<div class="info">
<a class="back" href="./">上一级</a>
<div class="mini">
<span>2021.01.02</span>
</div>
</div>
<div class="content">


</div>
</div>
<div class="content-header">
<h1>数据类型</h1>
</div>





<title>数据类型</title>

<ul class="no-list block-list">
    <li>Lodash</li>
    <li><a href="#">去重</a></li>
    <li>排序</li>
</ul>

```
1. npm i lodash --save
2. 使用
    import _ from 'lodash'

var l = console.log
var arr = [
    { a: "a1", b: [{c: "c1"}, {c: "c2"}] }, 
    { a: "a2", b: [{c: "c3"}, {c: "c4"}] }
]
var objA = {"name": "戈德斯文", "car": "宝马"}
var objB = {"name": "柴硕", "loveEat": true}

[b|原生局限]                                                                    [b|Lodash解决]
-----
for(var i = 0; i < 5; i++){ l(i) }                                         _.[cg b|times](5,function(a){ l(a) })

var a = arr.map(o => o.b[0].c })                                           var a  = _.[cg b|map](arr, 'b[0].c')
[cc|在对象内部没有方法的时候才可行]
var a2 = JSON.parse(JSON.stringify(arr))                                   var a2 = _.[cg b|cloneDeep](arr)
[cc|获取 4-8 范围内随机数]                                                         [cc|可一个参数为最大值 也可以指定返回浮点数(4,8,true)]
Math.floor(Math.random() * (8 - 4)) + 4                                    _.[cg b|random](4, 8)
-----
[cc|继承 ES5需扩展对象方法 ES6assign]
objA.extend(objB)                                                          _.[ch b|assign](objA, objB)
                                                                           _.[ch b|sample](arr)
                                                                           _.[ch b|sampleSize](arr,n)
                                                                           _.[ch b|includes](arr, '杨海月',2)

```
[链接](#)


#### Array
```js
shift [unshift push] pop                增删
splice(s,l,N,N,N...)                    增删改
sort(fn) reverse()                      改
----------------------------------------------------
slice(s,e)                              信息 内容
indexOf(item,s) lastIndexOf(item,s)     信息 位置 
toString() join('*')                    信息 字符
----------------------------------------------------
slice() concat([],arr)                 拷贝

        for(let i=0;i<5;i++){ }                                                      逻辑终止(break)&跳过(continue)
[1,2,3].every(e=>e<3)                     false                                      逻辑与
[1,2,3].some(e=>e>2)                      true                                       逻辑或
---------------------------------------------------------------------------------------------------------------------------
[1,2,3].forEach((e,i,a)=>{a[i]=e*2})      [2,4,6]                                    编辑原数组
---------------------------------------------------------------------------------------------------------------------------
[1,2,3].map(e=>e*e)                       [1,2,3] > [1,4,9]                          遍历数组 返回和原数组同等长度计算值的数组
[{a:1,b:2},{a:3,b:4}].map(i=>({b:i.b}))   [{a:1,b:2},{a:3,b:4}] > [{b:2},{b:4}]
[1,2,3].filter(e=>e%2===0)                [1,2,3] > [2]                              过滤数组 返回的是原数组的子集
---------------------------------------------------------------------------------------------------------------------------
[1,2,7].find(e=>e>2)                      7                                         第一个验证值
[1,2,7].findIndex(e=>e>2)                 2                                         第一个验证索引

new Array(2)                              [,]
new Array(2,3)                            [2,3]

扩展+

```
#### String
```table
------------------------------------------------------------------------------------------------------------
'Hello'.[ci b|slice](1,2))         "e"       'Hello'.slice(-3)           "llo"     截取范围 第一个负数参数为5+-3
'Hello'.[ci b|substring](1,2)      "e"       'Hello'.substring(-3)     "Hello"     截取范围 所有负数参数转为 0
'Hello'.[ci b|substr](2,3))        "llo"     'Hello'.substr(-3, -4))   ""          截取长度 第一个负数参数为5+-3 第二个负数参数转为 0
------------------------------------------------------------------------------------------------------------
'Hello'.[ci b|indexOf]('l',1)       2                                              位置
'Hello'.[ci b|indexOf]('l',3)       3
'Hello'.[ci b|lastIndexOf]('l')     3
'Hello'.[ci b|charAt](2)           "l"                                             子字符
'Hello'.[ci b|charCodeAt](2)        108                                            Unicode编码
------------------------------------------------------------------------------------------------------------
'He l lo'.[ci b|trim]()  "He l lo"                                                 去空格
' Hello '.[ci b|trim]()  "Hello"
------------------------------------------------------------------------------------------------------------
'Hello'.[ci b|toUpperCase]() "HELLO"                                               大小写
'Hello'.[ci b|toLowerCase]() "hello"
'Türkç'.[ci b|toLocaleUpperCase]()) "TÜRKÇ"
'Türkç'.[ci b|toLocaleLowerCase]()) "türkç" 
------------------------------------------------------------------------------------------------------------
'a'.[ci b|localeCompare]('b')  -1                                                  比较
'a'.[ci b|localeCompare]('a')  0
'b'.[ci b|localeCompare]('a')  1
['猫','狗',"鸡"].sort((a, b)=>a.localeCompare(b)) ['猫','狗',"鸡"] > ["狗", "鸡", "猫"]

typeof instanceof toString.call()


split([连接符])  
match(),search(),
replace(),split()
replace(RegExp/字符串,字符串/函数)

String.fromCharCode(65)       "A"
String.fromCharCode(65,66,67) "ABC"

扩展+
```

#### 类型转换
```
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
