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
            <span>M 2021.08.23 20:22</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul></ul></div></div>
</div>
<div class="content-header">
<h1>规范</h1><strong>规范</strong>
</div>
<div class="static-content">


## 文档vuepress

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
    <span class="h1">^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))|((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))|((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?]))[A-Za-z\d@!%&\$\*\?]</span>{8,}$
    (?=.*[a-z])(?=.*[A-Z])(?=.*\d))|            <span class="comment"> // 包含 小字母、大字母、数字 三种</span>
    ((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))| <span class="comment"> // 包含 小字母、大字母、特殊字符 三种</span>
    ((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|    <span class="comment"> // 包含 小字母、数字、特殊字符 三种</span>
    ((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?])      <span class="comment"> // 包含 大字母、数字、特殊字符 三种</span>

    
    
</pre>0


::: details Javascript注释
<div class="box-flex">
<div class="box-flex-item  flex-1">


<pre class="code-block">
<span class="h1 bg3 cf"> 普通注释 </span>
目的：帮助开发者和阅读者更好地理解程序+
规范：
    1. 总是在单行注释符后留一个空格
    2. 总是在多行注释的结束符前留一个空格（使星号对齐）
    3. 不要把注释写在多行注释的开始符、结束符所在行
    4. 不要编写无意义的注释
</pre>

</div>
<div class="box-flex-item " style="flex-basis:100px">


<pre class="code-block">

&nbsp;<span class="comment color5"> // 正确的单行注释</span>
&nbsp; 
&nbsp; <span class="comment color5">/*
&nbsp; 正确的多行注释
&nbsp; 注释符星号对齐                           
&nbsp;  */</span>
</pre>

</div>
<div class="box-flex-item " style="flex-basis:300px">


<pre class="code-block">

<span class="comment color1">/* 不要在此书写
                             
   不要在此书写 */</span>
<span class="comment color1">
// 声明变量value(无意义)</span>
</pre>

</div>
<div class="box-flex-item  flex-1">

<strong>■ TODO</strong>

<pre class="code-block"><span class="comment">
// TODO 未处理IE6-8的兼容性</span>
function setOpacity(node, val) {
    node.style.opacity = val;
}
</pre>

</div>
</div>

<div class="box-flex">
<div class="box-flex-item " style="flex-basis:400px">


<pre class="code-block">
<span class="h1 bg3 cf"> 文档注释 </span>
规范：
    1. 星号对齐
    2. 注释内容与星号间留一个空格
    3. 文档注释必须包含一个或多个注释标签
</pre>

</div>
<div class="box-flex-item  flex-1">


<pre class="code-block">

类型：String/Number/Object/Array/ArrayLike&lt;Element&gt;/Element
多类型：{(string|string[])} {*}

参数有默认值时：[参数名=默认值]
</pre>

</div>
</div>

<div class="box-flex">
<div class="box-flex-item " style="flex-basis:200px">


<pre class="code-block">
<span class="comment color1">/**
 * 模块说明
 * @module 模块名
 */</span>

<span class="comment color2">/**
 * 类说明
 * @class 类名
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */</span>

<span class="comment color3">/**
 * 类方法说明
 * @method 方法名
 * @for 所属类名                     
 * @param {参数类型} 参数名 参数说明  
 * @return {返回值类型} 返回值说明    
 * @static                          
 */</span>
</pre>

</div>
<div class="box-flex-item " style="flex-basis:300px">


<pre class="code-block">
<span class="comment color1">/**
 * 提供最基础、最核心的接口
 * @module Core
 */</span>

<span class="comment color2">/**
 * 节点集合类
 * @class NodeList
 * @constructor                     
 * @param {ArrayLike&lt;Element&gt;} nodes 初始化节点
 */</span>

<span class="comment color3">/**
 * 返回当前集合中指定位置的元素
 * @method
 * @for NodeList                                         
 * @param {Number} [i=0] 位置下标
 * @return {Element} 指定元素   
 */</span>
</pre>

</div>
<div class="box-flex-item  flex-4">


<pre class="code-block">
<span class="comment color4">/**
 * 属性说明
 * @property {属性类型} 属性名
 */</span>




&nbsp;<span class="comment"> // 必须搭配@constructor或@static使用，分别标记非静态类与静态类</span>
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;<span class="comment"> // 没有指定@for时，表示此函数为全局或模块顶层函数</span>
&nbsp;<span class="comment"> // 当函数有参数时</span>
&nbsp;<span class="comment"> // 当函数有返回值时</span>
&nbsp;<span class="comment"> // 当函数为静态函数时</span>

</pre>

</div>
</div>

<div class="box-flex">
<div class="box-flex-item  flex-1">


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



</pre>0

</div>
</div>
:::



</div>