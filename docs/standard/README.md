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
            <span>M 2021.08.09 12:59</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul></ul></div></div>
</div>
<div class="content-header">
<h1>规范</h1><strong>规范</strong>
</div>
<div class="static-content">

<strong>■ 普通注释</strong>

目的：帮助开发者和阅读者更好地理解程序
规范：
1. 总是在单行注释符后留一个空格
2. 总是在多行注释的结束符前留一个空格（使星号对齐）
3. 不要把注释写在多行注释的开始符、结束符所在行
4. 不要编写无意义的注释

5// 正确的单行注释

5/*
正确的多行注释
注释符星号对齐                           
 */

1/* 不要在此书写
                             
 不要在此书写 */

1// 声明变量value(无意义)



<strong>■ 文档注释</strong>

<pre class="custom-block">
规范：
1. 星号对齐
2. 注释内容与星号间留一个空格
3. 文档注释必须包含一个或多个注释标签

类型：String/Number/Object/Array/ArrayLike&lt;Element&gt;/Element
多类型：{(string|string[])} {*}
</pre>
<div class="box-flex"><div class="box-flex-item flex-1">


<pre class="custom-block">
<span class="comment color1">/**
 * Core模块说明
 * @module Core
 */</span>

<span class="comment color2">/**
 * 类说明
 * @class 类名
 * @constructor
 */</span>

<span class="comment color3">/**
 * 类方法说明
 * @method 方法名
 * @for 所属类名                     
 * @param {参数类型} 参数名 参数说明  
 * @return {返回值类型} 返回值说明    
 * @static                          
 */</span>

<span class="comment color4">/**
 * 属性说明
 * @property {属性类型} 属性名
 */</span>
</pre>

</div><div class="box-flex-item flex-4">
 test

<pre class="custom-block">
<span class="comment color1">/**
 * Core模块提供最基础、最核心的接口
 * @module Core
 */</span>

<span class="comment color2">/**
 * 节点集合类
 * @class NodeList
 * @constructor                     <span class="comment"> // 必须搭配@constructor或@static使用，分别标记非静态类与静态类</span>
 * @param {ArrayLike&lt;Element&gt;} nodes 初始化节点
 */</span>

<span class="comment color3">/**
 * 返回当前集合中指定位置的元素
 * @method
 * @for NodeList                                        <span class="comment"> // 没有指定@for时，表示此函数为全局或模块顶层函数</span>
 * @param {Number} [i=0] 位置下标。如果为负数，则从集合的最后一个元素开始倒数<span class="comment"> // 当函数有参数时</span>
 * @return {Element} 指定元素           <span class="comment"> // 当函数有返回值时</span>
 * @static                         <span class="comment"> // 当函数为静态函数时</span>
 */</span>
</pre>

</div></div>



<div class="box-flex"><div class="box-flex-item flex-1">

<strong>■ 文件注释</strong>

<pre class="custom-block">
规范：
1. 文件注释位于文件的最前面
2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中

<span class="comment color3">/*!
 * jRaiser 2 Javascript Library
 * kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)     <span class="comment"> // 概要说明及版本(必须) 修改时间(必须)以ISO格式表示</span>
 * http://jraiser.org/ | Released under MIT license   <span class="comment"> // 项目地址(开源组件必须) 开源协议(开源组件必须)</span>
 * Copyright 2005-2013 56.com                         <span class="comment"> // 版权声明(必须)</span>
 *
 * Include sizzle (http://sizzlejs.com/)              <span class="comment"> // 如果文件内包含开源组件 则必须在文件注释中进行说明</span>
 */</span>
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

参数有默认值
/**
 * 属性说明
 * @property {属性类型} 属性名
 */

</div>