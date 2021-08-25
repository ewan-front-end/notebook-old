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
            <span>M 2021.08.25 14:36</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>正则表达式</h1><strong>正则表达式</strong>
</div>
<div class="static-content">

::: details 测试用例
```html
<!DOCTYPE html>
<html>
<head><title>正则表达式测试</title></head>
<body></body>
</html>
<script>
    var content = 
    `
    ----------
    0[13-19](bold C1a1 18PX)
    1[13-19](bold C1a1 18PX)
    ----------2
    `

    /* 正则方法: 对整体内容依次处理匹配 */
    let matchBlock
    while ((matchBlock = /^-{10}[\r\n]{1,2}([\s\S]+?)^-{10}(\d{1,2})?[\r\n]{1,2}/m.exec(content)) !== null) {
        content = content.replace(matchBlock[0], 'STYLEBLOCK\n') // 注：匹配项必须及时有效被替换，避免再次被匹配
    }

    /* 正则方法: 更简洁的方法 */
    while (/^\s*(-\s([^\n\r]+))/m.exec(content) !== null) {content = content.replace(RegExp.$1, `<span>● ${RegExp.$2}</span>`)}

    /* 字符串方法: 一次性匹配结果集再遍历, 没有死循环的风险 */
    const arr = content.match(/^-{10}[\r\n]{1,2}([\s\S]+?)^-{10}(\d{1,2})?[\r\n]{1,2}/gm) || [];
    arr.forEach((e) => { console.log(e) })
</script>
```
:::

## 需要转义的字符-元字符
<pre class="fs30 bd">
(   )   [   ]   {   }   /   \   |   ?   *   +   ^   $   . 
</pre>


## 正则匹配方法
```js
/^\/(\w|\/)+\//.test('/tools/npm')  // true
.exec                               // 与字符串匹配方法match类似

let data = '' 
let matchStrong
while ((matchStrong = /█(.+)?█/.exec(data)) !== null) {
    data = data.replace(
        matchStrong[0],
        `<span class="c3 b">${matchStrong[1]}</span>`
    )
    // 确保匹配到的字符串被有效替换，避免无限循环
}

while (/^\s*(-\s([^\n\r]+))/m.exec(block) !== null) {block = block.replace(RegExp.$1, `<span>● ${RegExp.$2}</span>`)}
```

## 字符串匹配方法
```js
'/tools/npm'.match(/^\/(\w|\/)+\//)   // ["/tools/", "s"]
'/scene'.match(/^\/(\w|\/)+\//)       // null
'HelloHello'.match(/gg/)              // null
'HelloHello'.match(/ll/)              // {0:"ll", index:2, input:"HelloHello", groups:undefined}
'HelloHello'.match(/ll/g)             // ["ll", "ll"]
'Hello1Hello2H'.match(/H(\w+)H/)      // {0:"Hello1Hello2H", 1:"ello1Hello2", index:0, input:"Hello1Hello2H", groups:undefined} 默认贪婪模式
'Hello1Hello2H'.match(/H(\w+?)H/)     // {0:"Hello1H", 1:"ello1", index:0, input:"Hello1Hello2H", groups:undefined]

const reg = /\(.+?\)\(.+?\)/g
const arr = data.match(reg) || []
arr.forEach((e) => {
    // 处理匹配字符串
})
```

## 匹配实例

<pre class="code-block">
<span class="h1 bg3 cf"> 匹配IP </span>
    STYLE_BLOCK
    ((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}
    <span>● 2(5[0-5]|[0-4]\d)                         <span class="comment"> // 匹配：200 ~ 255</span></span>
    <span>● [0-1]?\d{1,2}                             <span class="comment"> // 匹配：0 ~ 199</span></span>
    <span>● (\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}<span class="comment"> // 后三段重复3次</span></span>
<span class="h1 bg3 cf"> 密码 </span>
    <span>● ^(?=.*[a-z])              <span class="comment"> // 匹配行头 跟随内容包含小写字母</span></span>
    <span>● ^(?=.*[A-Z])              <span class="comment"> // 匹配行头 跟随内容包含大写字母</span></span>
    <span>● ^(?=.*\d)                 <span class="comment"> // 匹配行头 跟随内容包含数字</span></span>
    <span>● ^(?=.*[@!%&\$\*\?])       <span class="comment"> // 匹配行头 跟随内容包含列举字符</span></span>
    <span>● [a-zA-Z\d@!%&\$\*\?]{8,}  <span class="comment"> // 匹配内容 大小写字母、数字、@!%&$*? 任意组合 8位以上</span></span>

   <span class="comment"> // 大小写字母、数字、@!%&$*?组成8位以上 必须至少包含一个大写字母、一个小写字母、一个数字和一个特殊字符</span>
    ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?])[A-Za-z\d@!%&\$\*\?]{8,}$ 

<span class="h1 bg3 cf"> 密码2 </span>
   <span class="comment"> // 大小写字母、数字、@!%&$*?组成8位以上 必须至少包含大写字母、小写字母、数字、特殊字符中三种类型</span>
    <span class="h1">^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))|((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))|((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?]))[A-Za-z\d@!%&\$\*\?]{8,}$</span>
    (?=.*[a-z])(?=.*[A-Z])(?=.*\d))|            <span class="comment"> // 包含 小字母、大字母、数字 三种</span>
    ((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))| <span class="comment"> // 包含 小字母、大字母、特殊字符 三种</span>
    ((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|    <span class="comment"> // 包含 小字母、数字、特殊字符 三种</span>
    ((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?])      <span class="comment"> // 包含 大字母、数字、特殊字符 三种</span>

    
    
</pre>


<pre class="code-block">
<span class="h1">匹配位置</span>
    ^、$、\b、\B
    每一行的开头: (?:^|\n)#{1,6}.+    
    每一行的结尾: $ <span class="comment"> // 前提是开启多行模式</span>

<span class="h1">字符范围</span>
    任意字符 包括（换行符、回车符、行分隔符和段分隔符）    [\s\S]*    [\d\D]*    [\w\W]*
    任意字符 排除（换行符、回车符、行分隔符和段分隔符）    .    [^\n\r\u2028\u2029]
    缩进符   \t      <span class="comment"> // tab键</span>
    换行符   \n      <span class="comment"> // Windows Linux</span>
    回车符   \r      <span class="comment"> // Windows Mac</span>
    行分隔符 \u2028
    段分隔符 \u2029
            \d  [0-9]              \D  [^0-9]                        匹配任意非数字的字符
            \w  [0-9a-zA-Z_]       \W  [^0-9a-zA-Z_]                 匹配任意不是字母，数字，下划线，汉字的字符
            \s  [ \t\v\n\r\f]      \S  [^ \t\v\n\r\f]                匹配任意不是空白符的字符
                \x20                                                     匹配一个空格
                \t                                                       匹配一个制表符。等价于 \x09 和 \cI。
                \v                                                       匹配一个垂直制表符。等价于 \x0b 和 \cK
                \f                                                       匹配一个换页符。等价于 \x0c 和 \cL。
            \b  a\b \bnice         \B                                匹配不是单词开头或结束的位置(隐式位置)
    中文     [0-9a-zA-Z\u4e00-\u9fa5_-]    [\w\u4e00-\u9fa5-]

<span class="h1">长度范围</span>
    ?  {0,1}            +  {1,}           *  {0,}

<span class="h1">全局范围</span>
    /i  忽略大小写     /g  全局匹配       /m  多行匹配 

<span class="h1">惰性匹配</span>
    量词 + ?  
    {m,n}?　　{m,}?　　??　　+?　　*?

<span class="h1">取反   </span>
    \W \S \D [^x]匹配除了x以外的任意字符 !(else|\s) [^aeiou]匹配除了aeiou这几个字母以外的任意字符

<span class="h1">分组</span>
顺序： ((A)(B(C))) 从左至右'('的顺序 ❶((A)(B(C))) ❷(A) ❸(B(C)) ❹(C)
意议：
    1. 向后引用 第i个分组匹配的字符串，可以在后续通过'\i'再次引用 例 (hello)\s(world)\s\1\2 匹配 hello world helloworld
    2. 分组取值 可以matcher.group(i)等方式取值

<span class="h1">复杂</span>
(exp) 正常分组
    目标/匹配/结果: exp 
    保存：自命名组$1 引用：\i 访问：RegExp.$1

(?:exp) 
    目标/匹配/结果: exp              
    保存：无分组不保存      <span class="comment"> // 与(exp)区别在于无分组保存</span>
    实例：industr(?:y|ies) <span class="comment"> // 相当于 industry|industries</span>

(?=exp) 预查跟随
    目标：跟随  匹配：预查  结果：预查
    保存：无分组不保存
    'Windows3.1'.match(/Windows(?=95|98|NT|2000)/)   <span class="comment"><span class="comment"> // 预查'Windows' 跟随'95|98|NT|2000'  null</span></span>
    'Windows2000'.match(/Windows(?=95|98|NT|2000)/)  <span class="comment"><span class="comment"> // 预查'Windows' 跟随'95|98|NT|2000'  ["Windows"...]</span></span>
    'hello regular expression'.match(/^(?=hello)/)   <span class="comment"> // 预查行头 跟随'hello'               [""...]</span>
    'hello regular expression'.match(/^(?=regular)/) <span class="comment"> // 预查行头 跟随'regular'              null</span>

(?!exp) 预查跟随否定
    目标：跟随非  匹配：预查  结果：预查
    保存：无分组不保存
    'Windows3.1'.match(/Windows(?!95|98|NT|2000)/)    // 预查'Windows' 跟随'95|98|NT|2000'  ["Windows"...]
    'Windows2000'.match(/Windows(?!95|98|NT|2000)/)   // 预查'Windows' 跟随'95|98|NT|2000'  null

(?&lt;=exp) 预查前置
    目标：前置  匹配：预查  结果：预查
    保存：无分组不保存
    '3.1Windows'.match(/(?&lt;=95|98|NT|2000)Windows/)   <span class="comment"><span class="comment"> // 预查'Windows' 前置'95|98|NT|2000'  null</span></span>
    '2000Windows'.match(/(?&lt;=95|98|NT|2000)Windows/)  <span class="comment"><span class="comment"> // 预查'Windows' 前置'95|98|NT|2000'  ["Windows"...] </span> </span>

(?&lt;!exp) 预查前置否定
    目标：前置非  匹配：预查  结果：预查
    保存：无分组不保存
    '3.1Windows'.match(/(?&lt;!95|98|NT|2000)Windows/)    // 预查'Windows' 前置'95|98|NT|2000'  ["Windows"...] 
    '2000Windows'.match(/(?&lt;!95|98|NT|2000)Windows/)   // 预查'Windows' 前置'95|98|NT|2000'  null

(?&lt;name&gt;exp) 或 (?'name'exp)
    目标: exp 
    保存：自命名组$1 / 用户变量xxx.groups['name']
        let hre = 'hello regular expression'.match(/(?&lt;custom_name&gt;expres)/)
        console.log(hre, RegExp.$1, hre.groups.custom_name)



</pre>


::: details RegExp对象
```js
/* 实例的创建 */
    // 字面量形式： var expression = / pattern / flags 
    var pattern1 = /[bc]at/i           // 匹配第一个"bat"或"cat"，不区分大小写，这里的元字符是有特殊含义，表示其中可以匹配其中任意的字符
    var pattern2 = /\[bc\]at/i         // 匹配第一个" [bc]at"，不区分大小写
    var pattern3 = /.at/gi             // 匹配所有以"at"结尾的 3 个字符的组合，不区分大小写
    var pattern4 = /\.at/gi            // 匹配所有".at"，不区分大小写

    // 构造函数： var expression = new RegExp("pattern ", "flags")
    var pattern2 = new RegExp("[bc]at", "i")
    
    // 字面量模式与等价的字符串
    var pattern1 = /\[bc\]at/          // 等价于 var pattern1 = new RegExp("\\[bc\\]at", "i")
    var pattern2 = /\.at/i             // 等价于 var pattern2 = new RegExp("\\.at", "i")
    var pattern3 = /name\/age/         // 等价于 var pattern3 = new RegExp("name\\/age", "i")
    var pattern4 = /\d.\d{1,2}/        // 等价于 var pattern4 = new RegExp("\\d.\\d{1,2}", "i")
    var pattern5= /\w\\hello\\123/     // 等价于 var pattern5 = new RegExp("\\w\\\\hello\\\\123", "i")

/* 实例的属性 */
     global      返回布尔值，是否设置了 g 标志
     ignoreCase  返回布尔值，是否设置了 i 标志
     lastIndex   返回整数，开始搜索下一个匹配项的字符位置，从 0 算起
     multiline   返回布尔值，是否设置了 m 标志
     source      返回正则表达式的字符串，按照字面量形式而非传入构造函数中的字符串模式返回

    var pattern1 = /\[bc\]at/i
    var pattern2 = new RegExp("\\[bc\\]at", "i")       
    pattern1.global            // false，表示没有设置 g 标志
    pattern1.ignoreCase        // true，表示没有设置 i 标志
    pattern1.multiline         // false，表示没有设置 m 标志
    pattern1.lastIndex         // 0，表示开始搜索下一个匹配项的字符位置
    pattern1.source            // "\[bc\]at"，表示正则表达式的字符串表示

/* 实例方法 */
   1. exec() 方法： pattern.exec(string) 入参：一个字符串 返回：返回数组，将字符串中匹配正则表达式的结果放到数组中

    var text = "mom and dad and baby"
    var pattern = /mom( and dad( and baby)?)?/gi
    var matches = pattern.exec(text)  // matches为 ["mom and dad and baby", " and dad and baby", " and baby", index: 0, input: "mom and dad and baby", groups: undefined]
    alert(matches.index)              // 0
    alert(matches.input)              // "mom and dad and baby"
    alert(matches[0])                 // "mom and dad and baby"
    alert(matches[1])                 // " and dad and baby"
    alert(matches[2])                 // " and baby"
    

    规则：对于 exec() 方法而言，

         在模式中设置了全局标志（ g ），它每次也只会返回一个匹配项，多次调用exec() ，每次调用则都会在字符串中继续查找新匹配项；

    var text = "cat, bat, sat, fat"
    var pattern2 = /.at/g
    var matches = pattern2.exec(text) // 返回数组 ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]
    alert(matches.index)              // 0
    alert(matches[0])                 // cat
    alert(pattern2.lastIndex)         // 3
    
    matches = pattern2.exec(text)     // 返回数组 ["bat", index: 5, input: "cat, bat, sat, fat", groups: undefined]
    alert(matches.index)              // 5
    alert(matches[0])                 // bat
    alert(pattern2.lastIndex)         // 8
    

         在不设置全局标志的情况下，在同一个字符串上多次调用 exec() 将始终返回第一个匹配项的信息

    var text = "cat, bat, sat, fat"
    var pattern1 = /.at/
    var matches = pattern1.exec(text) // 返回数组 ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined] 
    alert(matches.index)              // 0
    alert(matches[0])                 // cat
    alert(pattern1.lastIndex)         // 0
    
    matches = pattern1.exec(text)
    alert(matches.index)              // 0
    alert(matches[0])                 // cat
    alert(pattern1.lastIndex)         // 0
    

   2. test() 方法

                                                             pattern.test(string)

    入参：一个字符串

    返回：布尔值，检测字符串是否匹配正则表达式

    var text = "000-00-0000"
    var pattern = /\d{3}-\d{2}-\d{4}/
    if (pattern.test(text)){
        alert("The pattern was matched.")
    }
    

    注意：

    /* 实例属性不会重置，所以在循环中再次调用 test() 方法会失败
    * 第一次调用 test() 找到了 "cat" ，第二次调用是从索引为 3 的字符（上一次匹配的末尾）开始的，所以就找不到它
    * 测试到字符串末尾，下一次再调用 test() 就又从开头开始
    */ 
    // 字面量实例
    var re1 = /cat/g
    for (var i=0; i < 10; i++){
        console.log(re1.test("catastrophe"))  // 结果为 true false true false...
    }
    
    var re2 = null
    for (var i=0; i < 10; i++){
        re2 = /cat/g
        console.log(re2.test("catastrophe"))  // 结果为 true true true true...
    }
 
    // 构造函数实例同理
    3.  toLocaleString() 和 toString()：

                                        pattern.toLocaleString() / pattern.toString()

        返回：返回正则表达式的字面量，与创建正则表达式的方式无关

    var pattern = new RegExp("\\[bc\\]at", "gi")
    alert(pattern.toString())                 // 返回 /\[bc\]at/gi
    alert(pattern.toLocaleString())           // 返回 /\[bc\]at/gi
    

    RegExp构造函数属性（类似于静态属性）
    长属性：

    var text = "this has been a short summer"
    var pattern = /(.)hort/g
    
    /*
    * 注意：Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
    * Internet Explorer 不支持 multiline 属性
    */
    
    if (pattern.test(text)) {
        alert(RegExp.input)             // this has been a short summer，返回了原始字符串
        alert(RegExp.leftContext)       // this has been a，返回了单词 short 之前的字符串
        alert(RegExp.rightContext)      // summer，而 rightContext 属性则返回了 short
    之后的字符串
        alert(RegExp.lastMatch)         // short，返回最近一次与整个正则表达式匹配的字符串，即 short ；
        alert(RegExp.lastParen)         // s，返回最近一次匹配的捕获组
        alert(RegExp.multiline)         // false
    }
    长属性简写方式——短属性

    var text = "this has been a short summer"
    var pattern = /(.)hort/g
    
    /*
    * 注意：Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
    * Internet Explorer 不支持 multiline 属性
    */
    
    if (pattern.test(text)) {
        alert(RegExp.$_)             // this has been a short summer
        alert(RegExp["$`"])          // this has been a
        alert(RegExp["$'"])          // summer
        alert(RegExp["$&"])          // short
        alert(RegExp["$+"])          // s
        alert(RegExp["$*"])          // false
    }
    其他属性：RegExp.$1 、 RegExp.$2 … RegExp.$9 ，分别用于存储第一、第二……第九个匹配的捕获组，在
    调用 exec() 或 test() 方法时，这些属性会被自动填充

    var text = "this has been a short summer"
    var pattern = /(..)or(.)/g
    
    if (pattern.test(text)){
        alert(RegExp.$1)           // sh
        alert(RegExp.$2)           // t
    }
```
::: 

</div>