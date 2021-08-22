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
            <span>M 2021.08.22 20:04</span>
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
<span class="h2 bgc3 cf"> 普通代码 </span>
<span>● Flex</span>
&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 8            <span class="comment"> // 小于等于10 flex-grow: 8</span>
col 01
&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61; 100classname <span class="comment"> // 大于10 flex-basis: n  可注入自定义classname</span>
col 02
&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
<span class="h2 bgc3 cf"> 自定义代码块 </span>
&#61;&#61;&#61;&#43; 
    &#45; Markdown点列表
    &#42;&#42;局部加粗&#42;&#42;

    &#35; 标题文本                               <span class="comment"> // #个数(1-6)代表尺寸</span>
    &#91;&#35;&#93; 反相标题                             <span class="comment"> // 可增加空格为标题作内边距</span>

    &#47;&#47; 单行注释
    &#47;&#42; 多行注释 &#42;&#47;

    &#91;img:$withBase('/images/插入图片.jpg')&#93;  <span class="comment"> // 插入图片</span>

    &#91;STYLE_START&#93;                           <span class="comment"> // 样式描述开始</span>
    1[2-4](bold red)                        <span class="comment"> // 行1 索引(2-4)   class        行数计算：有效行数，空行忽略</span>
    1/2/3[10-15]{color:#f00}                <span class="comment"> // 行1、2、3 索引(10-15) style  索引计算：有效字符起始，首尾空格忽略</span>
    &#91;STYLE_END&#93;                             <span class="comment"> // 样式描述结束</span>

    <span class="cc">Headers</span>                                 <span class="comment"> // &#8615;Headers</span>
    <strong class="c0">Body</strong>                                    <span class="comment"> // &#8613;Body</span><div class="form-elements">        <span class="list">XX项目API集(*login  upload)</span>
        <span class="drop-down">POST</span> <span class="input"><img :src="$withBase('/images/db-brace-left.jpg')">origin<img :src="$withBase('/images/db-brace-right.jpg')">/api/login/</span>  <span class="button">Send</span> <span class="button">Save</span>
        <span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
        <span class="radio"><i>none</i><i>form-data</i><strong>x-www-form-urlencoded</strong><i>raw</i><i>binary</i><i>GraphQL</i><i></i><i></i><i></i><i></i></span>
        <span class="table"><span class="col"><strong>KEY</strong><i>username</i><i>password</i></span><span class="col"><strong>VALUE</strong><i>ewan</i><i>123456</i></span><span class="col"><strong>DESCRIPTION</strong><i></i><i></i></span></span>
        <span class="button active">Save</span> &gt; <span class="button active">Send</span></div>

&#61;&#61;&#61;&#45;
预设className：
    颜色 c0 c3 c6 c9 cc cf
    背景 bgc0 bgc3 bgc6 bgc9 bgcc bgcf
    标题 h1 h2 h3 h4 h5 h6
    注释 comment



<span class="h2 bgc3 cf"> PlantUML </span>
</pre>


::: details Javascript注释
<div class="box-flex">
<div class="box-flex-item  flex-1">


<pre class="code-block">
<span class="h1 bgc3 cf"> 普通注释 </span>
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
<span class="h1 bgc3 cf"> 文档注释 </span>
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
<span class="h1 bgc3 cf"> 文件注释 </span>
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