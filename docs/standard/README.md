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
            <span>M 2021.08.09 14:08</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul></ul></div></div>
</div>
<div class="content-header">
<h1>规范</h1><strong>规范</strong>
</div>
<div class="static-content">

<div class="box-flex"><div class="box-flex-item" style="flex-basis: 400px">

<strong>■ 普通注释</strong>

<pre class="custom-block">
&lt;div&gt;
    &lt;p&gt;第一个&lt;/p&gt;
    &lt;span&gt;other&lt;/span&gt;
    &lt;p&gt;第二个&lt;/p&gt;  &lt;--------------  div p:nth-child(3){color:#f00}        [-, p, span, p, p] [3]
    &lt;p&gt;第三个&lt;/p&gt;  &lt;--------------  div p:nth-of-type(3) {color:#0f0}     [-, p, p, p] [3]
&lt;/div&gt;

x:nth-child(n)         [兄弟节点集][n]        
x:nth-of-type(n)       [同类兄弟节点集][n]  

el:nth-child(2n)       选择父元素列表中的第 2n 个标签, 也就是偶数个元素
el:nth-child(n+n)      选择父元素列表中的第 n 个标签后的标签
el:nth-child(-n+n)     选择父元素列表中的第 n 个标签之前的标签
el:nth-child(odd)      选择父元素列表中的是奇数的标签
el:nth-child(even)     选择父元素列表中的是偶数的标签
el:nth-child(n+3)      未知
el:nth-child(n-3)      未知
</pre>1

</div><div class="box-flex-item" style="flex-basis: 100px">


<pre class="custom-block">

&nbsp;<span class="comment color5"> // 正确的单行注释</span>
&nbsp; 
&nbsp; <span class="comment color5">/*
&nbsp; 正确的多行注释
&nbsp; 注释符星号对齐                           
&nbsp;  */</span>
</pre>

</div><div class="box-flex-item" style="flex-basis: 300px">


<pre class="custom-block">

<span class="comment color1">/* 不要在此书写
                             
   不要在此书写 */</span>
<span class="comment color1">
// 声明变量value(无意义)</span>
</pre>

</div><div class="box-flex-item flex-1">

<strong>■ TODO</strong>

<pre class="custom-block"><span class="comment">
// TODO 未处理IE6-8的兼容性</span>
function setOpacity(node, val) {
    node.style.opacity = val;
}
</pre>

</div></div>

<div class="box-flex"><div class="box-flex-item" style="flex-basis: 400px">

<strong>■ 文档注释</strong>

<pre class="custom-block">
规范：
    1. 星号对齐
    2. 注释内容与星号间留一个空格
    3. 文档注释必须包含一个或多个注释标签
</pre>

</div><div class="box-flex-item flex-1">


<pre class="custom-block">

类型：String/Number/Object/Array/ArrayLike&lt;Element&gt;/Element
多类型：{(string|string[])} {*}

参数有默认值时：[参数名=默认值]
</pre>

</div></div>

<div class="box-flex"><div class="box-flex-item" style="flex-basis: 200px">


<pre class="custom-block">
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

</div><div class="box-flex-item" style="flex-basis: 300px">


<pre class="custom-block">
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

</div><div class="box-flex-item flex-4">


<pre class="custom-block">
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

</div></div>



<div class="box-flex"><div class="box-flex-item flex-1">

<strong>■ 文件注释</strong>

<pre class="custom-block">
'&lt;&lt;'左移位运算符 数学意义：在数字没有溢出的前提下，对于正数和负数，左移一位都相当于乘以2的1次方，左移n位就相当于乘以2的n次方
    5 &lt;&lt; 2    <span class="comment"> // 返回值20</span>
    <img :src="$withBase('/images/左移位运算符.jpg')">

'&gt;&gt;'右移位运算符 数学意义：右移一位相当于除2，右移n位相当于除以2的n次方。这里是取商哈，余数就不要了
    1000 &gt;&gt; 8    <span class="comment"> // 返回值3</span>
    <img :src="$withBase('/images/右移位运算符.jpg')">

'&gt;&gt;&gt;'运算符

'|='按位或
</pre>0

</div></div>



</div>