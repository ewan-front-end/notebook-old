
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
===+
规范：
1. 星号对齐
2. 注释内容与星号间留一个空格
3. 文档注释必须包含一个或多个注释标签

类型：String/Number/Object/Array/ArrayLike<Element>/Element
多类型：{(string|string[])} {*}
===-
:::FLEX
/////////////////////////////////////////////////////////////////////////////////////
+++ 1
===+
1/**
 * Core模块说明
 * @module Core
 */

2/**
 * 类说明
 * @class 类名
 * @constructor
 */

3/**
 * 类方法说明
 * @method 方法名
 * @for 所属类名                     
 * @param {参数类型} 参数名 参数说明  
 * @return {返回值类型} 返回值说明    
 * @static                          
 */

4/**
 * 属性说明
 * @property {属性类型} 属性名
 */
===-
+++
/////////////////////////////////////////////////////////////////////////////////////
+++ 4 test
===+
1/**
 * Core模块提供最基础、最核心的接口
 * @module Core
 */

2/**
 * 节点集合类
 * @class NodeList
 * @constructor                      // 必须搭配@constructor或@static使用，分别标记非静态类与静态类
 * @param {ArrayLike<Element>} nodes 初始化节点
 */

3/**
 * 返回当前集合中指定位置的元素
 * @method
 * @for NodeList                                         // 没有指定@for时，表示此函数为全局或模块顶层函数
 * @param {Number} [i=0] 位置下标。如果为负数，则从集合的最后一个元素开始倒数 // 当函数有参数时
 * @return {Element} 指定元素            // 当函数有返回值时
 * @static                          // 当函数为静态函数时
 */
===-
+++
FLEX:::



:::FLEX
+++ 1
<strong>■ 文件注释</strong>
===+
规范：
1. 文件注释位于文件的最前面
2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中

3/*!
 * jRaiser 2 Javascript Library
 * kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)      // 概要说明及版本(必须) 修改时间(必须)以ISO格式表示
 * http://jraiser.org/ | Released under MIT license    // 项目地址(开源组件必须) 开源协议(开源组件必须)
 * Copyright 2005-2013 56.com                          // 版权声明(必须)
 *
 * Include sizzle (http://sizzlejs.com/)               // 如果文件内包含开源组件 则必须在文件注释中进行说明
 */
===-
+++ 
+++ 1
<strong>■ TODO</strong>
===+
// TODO 未处理IE6-8的兼容性
function setOpacity(node, val) {
    node.style.opacity = val;
}
===-
+++ 
FLEX:::

参数有默认值
/**
 * 属性说明
 * @property {属性类型} 属性名
 */