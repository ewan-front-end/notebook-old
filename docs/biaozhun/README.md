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
            <span>M 2021.11.15 19:07</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul></ul></div></div>
</div>
<div class="content-header">
<h1>规范</h1><strong>规范</strong>
</div>
<div class="static-content">

::: details Ewan

- 全局配置 center.js
- 资源统筹(应对架构变化资源调配) center.js

center.js
```js
const PATH = require('path')
const {readFile} = require('./scripts/utils/fs')

// 系统配置
module.exports.config = { title: '标题文本' }

// 资源中枢
const MAP_DIR =   { ".usage": "../.usage"}
const MAP_FILE =  { "package": "../../package.json" }
const MAP_RES =   { "logo": "resources/images/logo.png" }
const MAP_DATA =  { "main": "data/.MAIN.js" }
const MAP_UTILS = { "ewan": "scripts/utils/ewan.js" }
const MAP_CORE =  { "create": "core/create.js" }
const MAP_PARSE = { "search": "core/parse/search.js" }
const requireFile = relativePath => require(PATH.resolve(__dirname, relativePath))
const readFileFn = relativePath => readFile(PATH.resolve(__dirname, relativePath))
const fetchFileByType = {
    "DATA":  key => requireFile(MAP_DATA[key]),
    "UTILS": key => requireFile(MAP_UTILS[key]),
    "CORE":  key => requireFile(MAP_CORE[key]),
    "PARSE": key => requireFile(MAP_PARSE[key]),
    "FILE":  key => requireFile(MAP_FILE[key]),
    "RES":   key => requireFile(MAP_RES[key])
}
const fetchPathByType = {
    "DATA":  key => PATH.resolve(__dirname, MAP_DATA[key]),
    "UTILS": key => PATH.resolve(__dirname, MAP_UTILS[key]),
    "CORE":  key => PATH.resolve(__dirname, MAP_CORE[key]),
    "PARSE": key => PATH.resolve(__dirname, MAP_PARSE[key]),
    "DIR":   key => PATH.resolve(__dirname, MAP_DIR[key]),
    "FILE":  key => PATH.resolve(__dirname, MAP_FILE[key]),
    "RES":   key => PATH.resolve(__dirname, MAP_RES[key])
}
const readFileByType = {
    "DATA":  key => readFileFn(MAP_DATA[key]),
    "UTILS": key => readFileFn(MAP_UTILS[key]),
    "CORE":  key => readFileFn(MAP_CORE[key]),
    "PARSE": key => readFileFn(MAP_PARSE[key]),
    "FILE":  key => readFileFn(MAP_FILE[key]),
    "RES":   key => readFileFn(MAP_RES[key])
}
module.exports.fetch = identifier => {
    const [type, key] = identifier.split('|')
    return fetchFileByType[type](key)
}
module.exports.fetchPath = identifier => {
    const [type, key] = identifier.split('|')
    return fetchPathByType[type](key)
}
module.exports.read = identifier => {
    const [type, key] = identifier.split('|')
    return readFileByType[type](key)
}
```

<pre class="code-block">
const { config, fetch, fetchPath } = require('../center')
const {writeFileSync} = fetch('UTILS|fs')
const src = fetchPath("DATA|src:updateTime")
read('RES|markdown.scene')
</pre>
:::

::: details vuepress

<pre class="code-block">
<span class="h2 bg3 cf"> 自定义格式 </span>
普通区域
● <strong>Flex</strong>
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 8            <span class="comment"> // 小于等于10 flex-grow: 8</span>
    col 01
    &#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61; 100classname <span class="comment"> // 大于10 flex-basis: n  可注入自定义classname</span>
    col 02
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

自定义代码块 
&#61;&#61;&#61;&#43; 
    ANCHOR&#91;1627821297227|node-inspect&#93;
    LINK&#91;1627821297227|自命名&#93;  LINK&#91;1627821297227&#93;
    TITLE2&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;    

    &#45; Markdown点列表
    &#42;&#42;局部加粗&#42;&#42;

    &#35; 标题文本                               <span class="comment"> // #个数(1-6)代表尺寸</span>
    &#91;&#35;&#93; 反相标题                             <span class="comment"> // 可增加空格为标题作内边距</span>

    &#47;&#47; 单行注释
    &#47;&#42; 多行注释 &#42;&#47;

    &#91;img:$withBase('/images/插入图片.jpg')&#93;  <span class="comment"> // 插入图片</span>

    行样式：[2,17&#123;color:#f00&#125;&#40;bd&#41;  19,13&#123;color:#0f0&#125;&#40;bd&#41;] <span class="comment"> // start,length{}()</span>
    盒样式：[&#123;color:#f00&#125;&#40;bd&#41;CONTENT]
    盒子：&#9632;⇤&#123;&#125;&#40;bd&#41;CONTENT&#9632; <span class="comment"> // ⇤为是否顶格</span>

    &#91;FORM_START&#93;

        <span style="color:#f33">e4fc5eb9-316a-48e5-a970-dc116e7ab897</span>
        <img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">API</span><img :src="$withBase('/images/db-brace-right.png')">
        <img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">RES</span><img :src="$withBase('/images/db-brace-right.png')">

        按钮： 
        [BTNbg6 cf|+ New Collection]
        [BTNbg6 cf|Save to collection-name]
        [BTNbg6 cf|Manage Environments]
        [BTNbg6 cf|Add]
        [BTNbg6 cf|Add] 
        [BTN|Send] 
        [BTN|Save]
        [BTNbg6 cf|Save]
        [BTNbg6 cf|Send]
        [BTN|Send] [BTN|Save]
        [BTNbg6 cf|Select File]
        [BTNbg6 cf|Save]
        [BTNbg6 cf|Send]

        INPUT: 
        ▭说明文本▭
        ▭{color:#ffaa22}collection-name▭
        ▭{color:#20b477}(bd)登录▭
        ▭{color:#8922ff}environment-name▭
        ▭<img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">API</span><img :src="$withBase('/images/db-brace-right.png')">/api/login/▭
        ▭<img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">RES</span><img :src="$withBase('/images/db-brace-right.png')">/api/cdn/UploadFile/▭

        选项卡：
        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        ▥⇤Params  Authorization  [Headers]  Body  Pre-request Script  Tests  Settings▥
        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        单选：
        ◉⇤none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL◉
        ◉⇤none  form-data  x-www-form-urlencoded  raw  [binary]  GraphQL◉

        列表菜单： 
        ▤collection-name[登录(active),上传]▤                       
        ▤(vtop)collection-name{color:#ffaa22}[登录(active),上传]▤
        ▤collection-name{color:#ffaa22}(bd)▤
        ▤Add Request▤
        ▤(vtop)collection-name{color:#ffaa22}[登录(active),上传]▤
        ▤(vtop)collection-name{color:#ffaa22}[登录,上传(active)]▤

        下拉选项：
        ▼POST▼ 
        ▼environment-name{color:#8922ff}▼ 
        ▼collection-name{color:#ffaa22}(bd)▼
        ▼environment-name{color:#8922ff}▼
        ▼environment-name{color:#8922ff}▼

        表格：
        ▦⇤VARIABLE(变量)        INITIAL VALUE(初始值)      CURRENT VALUE(当前值) 
        API{color:#26f}  https://api.com:4432  https://api.com:4432
        RES{color:#26f}  https://res.com:4433  https://res.com:4433
        ▦
        ▦⇤KEY        VALUE      DESCRIPTION  
            username   ewan
            password   123456
        ▦
        ▦⇤KEY        VALUE      DESCRIPTION  
            authenticate  e4fc5eb9-316a-48e5-a970-dc116e7ab897{color:#f33}
        ▦

        连接格式：
        ↴background-color:#eef7f4; vertical-align:top; padding:10px↤ ↦       

        
    &#91;FORM_END&#93;

&#61;&#61;&#61;&#45;
预设className：
    颜色 c0 c3 c6 c9 cc cf
    背景 bg0 bg3 bg6 bg9 bgc bgf
    标题 h1 h2 h3 h4 h5 h6
    注释 comment

<span class="h2 bg3 cf"> 场景 </span>
<span class="h2 bg3 cf"> 攻略 </span>
<span class="h2 bg3 cf"> 方案 </span>
<span class="h2 bg3 cf"> 规范 </span>
<span class="h2 bg3 cf"> PlantUML </span>
</pre>
:::

::: details Javascript注释
<div class="box-flex">
<div class="box-flex-item  flex-1">


<pre class="code-block">
<span class="h1 bg3 cf"> 普通注释 </span>
目的：帮助开发者和阅读者更好地理解程序+
规范：
    1. 总是在单行注释符后留一个空格
    2. 总是在多行注释的结束符前留一个空格(使星号对齐)
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


<pre class="code-block">
<span class="h1 bg3 cf"> 块标签 </span>
</pre>
<div class="box-flex">
<div class="box-flex-item  flex-2">


<pre class="code-block">
<span class="h1">对文件进行描述</span>
@author       指定项目作者
@copyright    描述版权信息
@see          描述可以参考外部资源
@version      描述版本信息
@tutorial     插入一个指向教程的链接，作为文档的一部分
@since        描述该功能哪个版本哪个时间添加进来的
@summary      描述一个简写版本
@file         文件说明，在文件开头使用
@license      描述代码才有那种软件许可协议

<span class="h1">标注js使用方法</span>
@returns      描述一个函数的返回值
@param        描述传递给函数的参数
@description  描述
@example      举例
@throws       描述可能会被抛出什么样的错误

<span class="h1">开发者备注</span>
@deprecated   标注关联代码已经被弃用
@todo         描述一个将要完成的任务
</pre>

</div>
<div class="box-flex-item  flex-3">


<pre class="code-block">
<span class="h1">文件详细结构</span>
@abstract     标注该成员必须在子类中实现或重写
@access       标注该成员的访问级别
@access private &gt; @private
@access protected &gt; @protected
@access public &gt; @public
@augments(@extends)    标注这个子类继承自哪个父类，后面需要加父类名
@class(@constructor)   标注该函数是一个构造函数，需要使用new来实例化
@constant(@const)      标注这个对象是一个常量
@constructs            标注这个函数用来作为类的构造器
@default               标注默认值
@exports               标注javascript模块导出的内容
@function(@func、@method) 标注该对象作为一个函数
@global                   标注为全局变量(对象)
@implements    标注实现一个接口
@inheritdoc    标注继承其父类的文档
@inner         标注为其父类的内部成员
@instance      标注为其父类的实例成员
@interface     标注其为可以实现的接口
@kind          指明标注的类型(@kind class = @class)
@lends         将一个字面量对象的所有成员标记为某个类(或模块)的成员
@memberof      标注成员属于哪个父级
@mixes         标注该对象混入了另一个对象的所有成员
@mixin         标注一个混入对象
@module        将当前文档标注为一个模块
</pre>

</div>
<div class="box-flex-item  flex-3">


<pre class="code-block">

@protected  标注为受保护的
@public     标注为公开的
@readonly   标注为只读的
@requires   标注这个文件需要一个javascript模块
@static     标注为静态的
@type       标注类型
@typeof     标注一个自定义的类型
@this       描述this关键字的指向
@alias      标注成员有一个别名
@borrow     将另一个标识符的描述添加到当前标识符的描述
@name       强制jsdoc使用这个给定的名称，而忽略代码里的实际名称
@namespace  标注一个命名空间对象
@override   标注覆盖其父类同名的方法
@private    标注为私有
@classdesc  与@class结合使用，描述类
@callback   描述一个回调函数
@enum       描述一个静态属性值的全部相同的集合，通常与@readonly结合使用
@event      描述事件
@member     描述一个成员 @member [] []
@property   描述一个对象的属性
@external   标识一个外部的类，命名空间，或模块
@files      标明当一个方法被调用时将触发一个指定类型的事件
@listens    标注监听事件
@variation  区分具有相同名称的不同对象
</pre>

</div>
</div>

:::



</div>