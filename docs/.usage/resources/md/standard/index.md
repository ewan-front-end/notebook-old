::: details vuepress
===+
[##]  自定义格式 
普通区域
- Flex
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 8             // 小于等于10 flex-grow: 8
    col 01
    &#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61; 100classname  // 大于10 flex-basis: n  可注入自定义classname
    col 02
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

自定义代码块 
&#61;&#61;&#61;&#43; 
    ANCHOR&#91;1627821297227|node-inspect&#93;
    LINK&#91;1627821297227|自命名&#93;  LINK&#91;1627821297227&#93;
    TITLE2&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;    

    &#45; Markdown点列表
    &#42;&#42;局部加粗&#42;&#42;

    &#35; 标题文本                                // #个数(1-6)代表尺寸
    &#91;&#35;&#93; 反相标题                              // 可增加空格为标题作内边距

    &#47;&#47; 单行注释
    &#47;&#42; 多行注释 &#42;&#47;

    &#91;img:$withBase('/images/插入图片.jpg')&#93;   // 插入图片

    行样式：[2,17&#123;color:#f00&#125;&#40;bd&#41;  19,13&#123;color:#0f0&#125;&#40;bd&#41;]  // start,length{}()
    盒样式：[&#123;color:#f00&#125;&#40;bd&#41;CONTENT]
    盒子：&#9632;⇤&#123;&#125;&#40;bd&#41;CONTENT&#9632;  // ⇤为是否顶格

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

[##]  场景 
[##]  攻略 
[##]  方案 
[##]  规范 
[##]  PlantUML 
===-
:::

::: details Javascript注释
-------------------------------------- 1
===+
[#]  普通注释 
目的：帮助开发者和阅读者更好地理解程序+
规范：
    1. 总是在单行注释符后留一个空格
    2. 总是在多行注释的结束符前留一个空格(使星号对齐)
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

===+
[#]  块标签 
===-
-------------------------------------- 2
===+
# 对文件进行描述
@author       指定项目作者
@copyright    描述版权信息
@see          描述可以参考外部资源
@version      描述版本信息
@tutorial     插入一个指向教程的链接，作为文档的一部分
@since        描述该功能哪个版本哪个时间添加进来的
@summary      描述一个简写版本
@file         文件说明，在文件开头使用
@license      描述代码才有那种软件许可协议

# 标注js使用方法
@returns      描述一个函数的返回值
@param        描述传递给函数的参数
@description  描述
@example      举例
@throws       描述可能会被抛出什么样的错误

# 开发者备注
@deprecated   标注关联代码已经被弃用
@todo         描述一个将要完成的任务
===-
====================================== 3
===+
# 文件详细结构
@abstract     标注该成员必须在子类中实现或重写
@access       标注该成员的访问级别
@access private > @private
@access protected > @protected
@access public > @public
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
===-
====================================== 3
===+

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
===-
--------------------------------------

:::

