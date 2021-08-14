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
    <div class="content"><div class="children"><ul></ul></div></div>
</div>
<div class="content-header">
<h1>规范</h1><strong>规范</strong>
</div>
<div class="static-content">

<div class="box-flex"><div class="box-flex-item" style="flex-basis: 400px">

<strong>■ 普通注释</strong>

<pre class="normal-block">
<span>● 自定义ICON</span>
    1. 准务svg图标 xiugaimima.svg https://www.iconfont.cn
    2. 放入相关文件夹@/icons/svg/xiugaimima.svg 之后就会自动导入
    3. 使用方式：&lt;svg-icon icon-class="xiugaimima" /&gt;<span class="comment"> // icon-class 为 icon 的名字</span>
</pre>3

</div><div class="box-flex-item" style="flex-basis: 100px">


<pre class="normal-block">

&nbsp;<span class="comment color5"> // 正确的单行注释</span>
&nbsp; 
&nbsp; <span class="comment color5">/*
&nbsp; 正确的多行注释
&nbsp; 注释符星号对齐                           
&nbsp;  */</span>
</pre>

</div><div class="box-flex-item" style="flex-basis: 300px">


<pre class="normal-block">

<span class="comment color1">/* 不要在此书写
                             
   不要在此书写 */</span>
<span class="comment color1">
// 声明变量value(无意义)</span>
</pre>

</div><div class="box-flex-item flex-1">

<strong>■ TODO</strong>

<pre class="normal-block"><span class="comment">
// TODO 未处理IE6-8的兼容性</span>
function setOpacity(node, val) {
    node.style.opacity = val;
}
</pre>

</div></div>

<div class="box-flex"><div class="box-flex-item" style="flex-basis: 400px">

<strong>■ 文档注释</strong>

<pre class="normal-block">
规范：
    1. 星号对齐
    2. 注释内容与星号间留一个空格
    3. 文档注释必须包含一个或多个注释标签
</pre>

</div><div class="box-flex-item flex-1">


<pre class="normal-block">

类型：String/Number/Object/Array/ArrayLike&lt;Element&gt;/Element
多类型：{(string|string[])} {*}

参数有默认值时：[参数名=默认值]
</pre>

</div></div>

<div class="box-flex"><div class="box-flex-item" style="flex-basis: 200px">


<pre class="normal-block">
<span class="comment color1">/**
 <strong>模块说明</strong>
 <strong>@module 模块名</strong>
 */</span>

<span class="comment color2">/**
 <strong>类说明</strong>
 <strong>@class 类名</strong>
 <strong>@constructor</strong>
 <strong>@param {参数类型} 参数名 参数说明</strong>
 */</span>

<span class="comment color3">/**
 <strong>类方法说明</strong>
 <strong>@method 方法名</strong>
 <strong>@for 所属类名                     </strong>
 <strong>@param {参数类型} 参数名 参数说明  </strong>
 <strong>@return {返回值类型} 返回值说明    </strong>
 <strong>@static                          </strong>
 */</span>
</pre>

</div><div class="box-flex-item" style="flex-basis: 300px">


<pre class="normal-block">
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
</pre>0

</div><div class="box-flex-item flex-4">


<pre class="normal-block">
<span class="comment color4">/**
 <strong>属性说明</strong>
 <strong>@property {属性类型} 属性名</strong>
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

<pre class="normal-block">
规范：
    1. 文件注释位于文件的最前面
    2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中

<span class="comment color3">/*!
 <strong>jRaiser 2 Javascript Library</strong>
 <strong>kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)     <span class="comment"> // 概要说明及版本(必须) 修改时间(必须)以ISO格式表示</strong></span>
 <strong>http://jraiser.org/ | Released under MIT license   <span class="comment"> // 项目地址(开源组件必须) 开源协议(开源组件必须)</strong></span>
 <strong>Copyright 2005-2013 56.com                         <span class="comment"> // 版权声明(必须)</strong></span>
 *
 <strong>Include sizzle (http://sizzlejs.com/)              <span class="comment"> // 如果文件内包含开源组件 则必须在文件注释中进行说明</strong></span>
 */</span>
</pre>

</div></div>



</div>