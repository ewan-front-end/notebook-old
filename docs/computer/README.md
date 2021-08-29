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
            <span>M 2021.08.12 20:56</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul><li><a href="undefined">undefined</a></li><li><a href="undefined">undefined</a></li><li><a href="undefined">undefined</a></li></ul></div></div>
</div>
<div class="content-header">
<h1>计算机</h1><strong>计算机</strong>
</div>
<div class="static-content">


ACHOR[1628599921387|字符集]
::: details 字符集

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



</pre>1
:::

::: details 字符集JS操作
'123' => [3355185] [12849]
:::
::: details 二进制文件格式设计
base64: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=
:::

## 数据结构
- 哈希表    存储键值对          // 学生信息
- 数组      列表               // 班级学员
- 链式存储  哈希表加入next属性  // 数组是顺序插入 需求是插入到中间
// 链表解决了插入问题 但是顺序不直观
- 队列
- 栈
- 树
- 图

## 计算机网络

## 算法

</div>