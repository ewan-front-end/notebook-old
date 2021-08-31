
## 文档vuepress
===+
[##]  普通33代码
- Flex
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 8             // 小于等于10 flex-grow: 8
    col 01
    &#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61; 100classname  // 大于10 flex-basis: n  可注入自定义classname
    col 02
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
[##]  自定义代码块 
&#61;&#61;&#61;&#43; 
    &#45; Markdown点列表
    &#42;&#42;局部加粗&#42;&#42;

    &#35; 标题文本                                // #个数(1-6)代表尺寸
    &#91;&#35;&#93; 反相标题                              // 可增加空格为标题作内边距

    &#47;&#47; 单行注释
    &#47;&#42; 多行注释 &#42;&#47;

    &#91;img:$withBase('/images/插入图片.jpg')&#93;   // 插入图片

    &#91;STYLE_START&#93;                            // 样式描述开始
    1[2-4](bold red)                         // 行1 索引(2-4)   class        行数计算：有效行数，空行忽略
    1/2/3[10-15]{color:#f00}                 // 行1、2、3 索引(10-15) style  索引计算：有效字符起始，首尾空格忽略
    &#91;STYLE_END&#93;                              // 样式描述结束

    &#91;FORM_START&#93;
        [LIST|XX项目API集(*login  upload)] 
        [DROP_DOWN|POST] [INPUT|{{origin}}/api/login/]  [BTN|Send] [BTN|Save]
        [TAB]Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings
        [RADIO]none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL        
        [TABLE]KEY        VALUE      DESCRIPTION  
            username   ewan
            password   123456
        [TABLE_END]
        [BTN&#62;Save] &#62; [BTN&#62;Send]
    &#91;FORM_END&#93;

&#61;&#61;&#61;&#45;
预设className：
    颜色 c0 c3 c6 c9 cc cf
    背景 bg0 bg3 bg6 bg9 bgc bgf
    标题 h1 h2 h3 h4 h5 h6
    注释 comment



[##]  PlantUML 
===-


::: details Javascript注释
-------------------------------------- 1
===+
[#]  普通注释 
目的：帮助开发者和阅读者更好地理解程序+
规范：
    1. 总是在单行注释符后留一个空格
    2. 总是在多行注释的结束符前留一个空格（使星号对齐）
    3. 不要把注释写在多行注释的开始符、结束符所在行
    4. 不要编写无意义的注释
===-
====================================== 100
===+

&nbsp; 5// 正确的单行注释
&nbsp; 
&nbsp; 5/*
&nbsp; 正确的多行注释
&nbsp; 注释符星号对齐                           
&nbsp;  */
===-
====================================== 300
===+

1/* 不要在此书写
                             
   不要在此书写 */

1// 声明变量value(无意义)
===-
====================================== 1
<strong>■ TODO</strong>
===+
// TODO 未处理IE6-8的兼容性
function setOpacity(node, val) {
    node.style.opacity = val;
}
===-
--------------------------------------

-------------------------------------- 400
===+
[#]  文档注释 
规范：
    1. 星号对齐
    2. 注释内容与星号间留一个空格
    3. 文档注释必须包含一个或多个注释标签
===-
====================================== 1
===+

类型：String/Number/Object/Array/ArrayLike<Element>/Element
多类型：{(string|string[])} {*}

参数有默认值时：[参数名=默认值]
===-
--------------------------------------

-------------------------------------- 200
===+
1/**
 * 模块说明
 * @module 模块名
 */

2/**
 * 类说明
 * @class 类名
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */

3/**
 * 类方法说明
 * @method 方法名
 * @for 所属类名                     
 * @param {参数类型} 参数名 参数说明  
 * @return {返回值类型} 返回值说明    
 * @static                          
 */
===-
====================================== 300
===+
1/**
 * 提供最基础、最核心的接口
 * @module Core
 */

2/**
 * 节点集合类
 * @class NodeList
 * @constructor                     
 * @param {ArrayLike<Element>} nodes 初始化节点
 */

3/**
 * 返回当前集合中指定位置的元素
 * @method
 * @for NodeList                                         
 * @param {Number} [i=0] 位置下标
 * @return {Element} 指定元素   
 */
===-
====================================== 4
===+
4/**
 * 属性说明
 * @property {属性类型} 属性名
 */




&nbsp; // 必须搭配@constructor或@static使用，分别标记非静态类与静态类
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp; // 没有指定@for时，表示此函数为全局或模块顶层函数
&nbsp; // 当函数有参数时
&nbsp; // 当函数有返回值时
&nbsp; // 当函数为静态函数时

===-
--------------------------------------

-------------------------------------- 1
===+
[#]  文件注释 
规范：
    1. 文件注释位于文件的最前面
    2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中2222

3/*!
 * jRaiser 2 Javascript Library
 * kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)      // 概要说明及版本(必须) 修改时间(必须)以ISO格式表示
 * http://jraiser.org/ | Released under MIT license    // 项目地址(开源组件必须) 开源协议(开源组件必须)
 * Copyright 2005-2013 56.com                          // 版权声明(必须)
 *
 * Include sizzle (http://sizzlejs.com/)               // 如果文件内包含开源组件 则必须在文件注释中进行说明
 */
===-
--------------------------------------
:::

