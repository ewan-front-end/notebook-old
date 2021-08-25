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
data = {
    stack: {},<span class="comment"> // 条状图 多个legend 且某些legend要堆叠在一起</span>
    legend: [],
    dataAxis: []
}

const seriesArr = []
legend.forEach(e =&gt; {
    seriesArr.push({
        name: e.title,
        data: e.data,
        type: 'bar',
        stack: 'area',
        label: { show: true, position: 'insideTop' },
        itemStyle: { normal: { color: e.color, lineStyle: { color: e.color, width: 2 <img :src="$withBase('/images/db-brace-right.jpg')">}
       <span class="comment"> // itemStyle: {</span>
       <span class="comment"> //   color: new echarts.graphic.LinearGradient(</span>
       <span class="comment"> //     0, 0, 0, 1,</span>
       <span class="comment"> //     [</span>
       <span class="comment"> //       { offset: 0, color: '#bf88f2' },</span>
       <span class="comment"> //       { offset: 1, color: '#3f39de' }</span>
       <span class="comment"> //     ]</span>
       <span class="comment"> //   )</span>
       <span class="comment"> // }</span>
    })
})
var options = {
    tooltip: { trigger: 'axis' },
    grid: { left: 10, right: 10, bottom: 20, top: 10, containLabel: true },
    xAxis: { type: 'category', data: dataAxis, axisLabel: { interval: 0 <img :src="$withBase('/images/db-brace-right.jpg')">,
    yAxis: { type: 'value' },
   <span class="comment"> // legend: { data: legendData, right: 'center', bottom: 0 },</span>
    series: seriesArr
}<span class="comment">
// if (dataVal.length &gt; 10) options.xAxis.axisLabel.rotate = -45</span>
this.chart.setOption(options)
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

    
    
</pre>0

</div>
</div>
:::



</div>