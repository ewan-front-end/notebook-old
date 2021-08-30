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
            <span>N 2021.08.30 19:05</span>
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



</pre>3


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
<div style="background-color:#fbf4e7"><span class="h4" style="color:#e6b362"> 新建一个目录(收藏)</span>
</div><div style="border:#f5e1c1 1px solid;padding:10px 0"><div class="form-elements">    <span class="button bg6 cf">+ New Collection</span> ➤ <span class="inline" style="background-color:#fcf7ee; vertical-align:top; padding:10px">名称<span class="input " style="color:#ffaa22">collection-name</span> 说明<span class="input ">说明文本</span></span> ➤ <span class="button bg6 cf">Create</span>
</div></div>

<div style="background-color:#e7f4ef"><span class="h4" style="color:#60b491"> 新建一个请求</span>
</div><div style="border:#c1e2d4 1px solid;padding:10px 0"><div class="form-elements">    <span class="list"><div class="list-wrapper"><span class="list-item"><span class="item-title bd" style="color:#ffaa22">collection-name</span></span></div></span>  ➤ <span class="list"><div class="list-wrapper"><span class="list-item"><span class="item-title">Add Request</span></span></div></span> ➤ <span class="inline" style="background-color:#eef7f4; vertical-align:top; padding:10px">请求名称<span class="input bd" style="color:#20b477">登录</span> 请求说明<span class="input ">说明文本</span> 选择所属目录:<span class="drop-down"><i class="bd" style="color:#ffaa22">collection-name</i></span></span> ➤ <span class="button bg6 cf">Save to collection-name</span>
</div></div>

<div style="background-color:#f3ecfc"><span class="h4" style="color:#b180eb"> 新建一个环境</span>
</div><div style="border:#e0cdf7 1px solid;padding:10px 0"><div class="form-elements">    右上角 <span class="button bg6 cf">Manage Environments</span> ➤ 弹窗 <span class="button bg6 cf">Add</span> ➤ <span class="inline" style="background-color:#f7f2fd; vertical-align:top; padding:10px">Environment Name<span class="input " style="color:#8922ff">environment-name</span>    
<span class="table"><span class="col"><strong>VARIABLE(变量)</strong><i style="color:#26f">API</i><i style="color:#26f">RES</i></span><span class="col"><strong>INITIAL VALUE(初始值)</strong><i>https://api.com:4432</i><i>https://res.com:4433</i></span><span class="col"><strong>CURRENT VALUE(当前值)</strong><i>https://api.com:4432</i><i>https://res.com:4433</i></span></span></span> ➤ <span class="button bg6 cf">Add</span>
</div></div>

<span class="h3 bg3 cf"> 需要验证的请求 </span>
<div style="border:#ddd 1px solid; padding: 10px 0">    <span>● 登录 </span><div class="form-elements">        切换环境：<span class="drop-down"><i style="color:#8922ff">environment-name</i></span>
        <span class="list vtop"><div class="list-wrapper"><span class="list-item"><span class="item-title" style="color:#ffaa22">collection-name</span><span class="sub-box"><i class="active">登录</i><i>上传</i></span></span></div></span> ➤ <span class="inline" style="background-color:#f3f3f3; vertical-align:top; padding:10px"><span class="drop-down"><i>POST</i></span> <span class="input "><img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">API</span><img :src="$withBase('/images/db-brace-right.png')">/api/login/</span>  <span class="button">Send</span> <span class="button">Save</span>
        
<span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="radio"><i>none</i><i>form-data</i><strong>x-www-form-urlencoded</strong><i>raw</i><i>binary</i><i>GraphQL</i></span>
<span class="table"><span class="col"><strong>KEY</strong><i>username</i><i>password</i></span><span class="col"><strong>VALUE</strong><i>ewan</i><i>123456</i></span><span class="col"><strong>DESCRIPTION</strong><i></i><i></i></span></span></span> ➤ <span class="button bg6 cf">Save</span> ➤ <span class="button bg6 cf">Send</span> ➤ 得到：<span style="color:#f33">e4fc5eb9-316a-48e5-a970-dc116e7ab897</span>
</div></div><div style="border:#ddd 1px solid; padding: 10px 0">    <span>● 需要验证的请求</span><div class="form-elements">        切换环境：<span class="drop-down"><i style="color:#8922ff">environment-name</i></span>
        <span class="list vtop"><div class="list-wrapper"><span class="list-item"><span class="item-title" style="color:#ffaa22">collection-name</span><span class="sub-box"><i>登录</i><i class="active">上传</i></span></span></div></span> ➤ <span class="inline" style="background-color:#f3f3f3; vertical-align:top; padding:10px"><span class="drop-down"><i>POST</i></span> <span class="input "><img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">RES</span><img :src="$withBase('/images/db-brace-right.png')">/api/cdn/UploadFile/</span>  <span class="button">Send</span> <span class="button">Save</span>

<span class="tab"><i>Params</i><i>Authorization</i><strong>Headers</strong><i>Body</i><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="table"><span class="col"><strong>KEY</strong><i>authenticate</i></span><span class="col"><strong>VALUE</strong><i style="color:#f33">e4fc5eb9-316a-48e5-a970-dc116e7ab897</i></span><span class="col"><strong>DESCRIPTION</strong><i></i></span></span>

<span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="radio"><i>none</i><i>form-data</i><i>x-www-form-urlencoded</i><i>raw</i><strong>binary</strong><i>GraphQL</i></span>
        <span class="button bg6 cf">Select File</span></span> ➤ <span class="button bg6 cf">Save</span> ➤ <span class="button bg6 cf">Send</span>
</div></div>
</pre>0

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
<span class="h1 bg3 cf"> 文件注释 </span>
规范：
    1. 文件注释位于文件的最前面
    2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中2222

<span class="comment color3">/*!
 * jRaiser 2 Javascript Library
 * kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)     <span class="comment"> // 概要说明及版本(必须) 修改时间(必须)以ISO格式表示</span>
 * http://jraiser.org/ | Released under MIT license   <span class="comment"> // 项目地址(开源组件必须) 开源协议(开源组件必须)</span>
 * Copyright 2005-2013 56.com                         <span class="comment"> // 版权声明(必须)</span>
 *
 * Include sizzle (http://sizzlejs.com/)              <span class="comment"> // 如果文件内包含开源组件 则必须在文件注释中进行说明</span>
 */</span>
</pre>

</div>
</div>
:::



</div>