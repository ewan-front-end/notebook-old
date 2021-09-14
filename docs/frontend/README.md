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
            <span>N 2021.09.14 19:27</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul><li><a href="/frontend/layerBusiness/">业务层</a></li><li><a href="/frontend/layerSecurity/">保障层</a></li><li><a href="/frontend/layerInfrastructure/">基础设施层</a></li><li><a href="/frontend/layerOffline/">线下层</a></li></ul></div><div class="custom-block links">
<ul class="desc">
<li><a href="/standard">规范</a></li>
<li><a href="/tools/qiankun">qiankun</a></li>
</ul>
</div></div>
</div>
<div class="content-header">
<h1>前端体系</h1><strong>前端体系</strong>
<summary class="desc">前后端的分离是系统级的分离，前端要有一整套完整的技术体系以更好地支持产品在终端形态上的快速演进，同时实现技术资源的横向复用。技术体系的线下层重点关注开发效率，基础设施层重点关注稳定性，保障层重点关注质量与可用性，业务层重点关注服务的全面性和可复用性。</summary>
</div>
<div class="static-content">







框架(Framework)
> 是一系列预先定义好的数据结构和函数，一般用于作为一个软件的骨架，但程序真正的功能还需要由开发者实现<br>
控制：框架会调用你的代码
例如：Vue

库(Library)
> 是一系列预先定义好的数据结构和函数的集合，程序员通过使用这些数据结构和函数实现功能。例如Moment.js是一个javascript库，提供了处理时间的一些函数<br>
关键词：外部 功能
控制：你调用库中的代码
例如：jQuery.js、Moment.js

插件(Plugin)
> 插件(或扩展)是对已有应用程序或者库的功能补充，一个软件的插件(或扩展)是实现了该软件预定义接口的组件，用来向已有的软件添加功能。插件在目标软件发布时可以不预先包含，而是在运行时被使用者注册，然后再被目标软件调用。另一个很接近的概念是加载项(Add-on)，可以认为加载项是插件(或扩展)的子集，是仅针对应用程序来说的功能补充。一个插件的例子是Flash的浏览器插件，为浏览器实现了运行Flash程序的功能<br>
关键词：内部 功能 


组件(Component)
> 强调结构 软件中可复用的组成部分 承担了特定的职责 可以独立于整个系统进行开发和测试，一个良好设计的组件应该可以在不同的软件系统中被使用(可复用)<br>
关键词：结构拆分 
例如：V8引擎是Chrome浏览器的一部分，负责运行javascript代码，这里V8引擎就可以视为一个组件。V8引擎同时也是Node.js的javascript解释器，这体现了组件的可复用性

控件(Control)
> 一般指可视可交互的组件 如Button、Input<br>
关键词：基础单元 交互


扩展(Extension)
> 针对框架、库、插件、组件、控件 甚至语言进行功能延展<br>
关键词：补充 增强


工具集
    表单验证


监控体系


class命名规范：业务类型-子类型-作用 如：register-info-wrapper




```
利用框架搭建一个访问量很高的大型网站，管理好所有资源
    (1) 遵循自定的一套CSS，JS和图片文件和文件夹命名规范
    (2) 依托采用的前端工程化工具，依照工具脚手架规范（gulp, webpack, grunt, yeoman)
    (3) 依据采用的框架规范（Vue, React, jQuery)

应用原生JS搭建一个MVC架构
(1)基本模块
    common      公共组件，下面的各模块都会用到
    config      配置模块，解决框架的配置问题
    startup     启动模块，解决框架和Servlet如何进行整合的问题
    plugin      插件模块，插件机制的实现，提供IPlugin的抽象实现
    routing     路由模块，解决请求路径的解析问题，提供了 IRoute的抽象实现和基本实现
    controller  控制器模块，解决的是如何产生控制器
    model       视图模型模块，解决的是如何绑定方法的参数
    action      action模块，解决的是如何调用方法以及方法返回的结果，提供了IActionResult的 抽象实现和基本实现
    view        视图模块，解决的是各种视图引擎和框架的适配
    filter      过滤器模块，解决是执行Action,返回IActionResult前后的AOP功能，提供了 IFilter 的抽象实现以及基本实现
(2)扩展模块
    filters     ―些IFilter 的实现
    results     ―些IActionResult 的实现
    routes      ―些IRoute 的实现
    plugins     —些 IPlugin 的实现
```


```
┠ build -------------------------- 构建脚本
┠ dist --------------------------- 构建目标
┠ config ------------------------- 项目配置
┃  ┠ index.js ---------------------- 总配置
┠ src ---------------------------- 项目开发
┃  ┠ assets ------------------------ 资源目录
┃  ┠ components -------------------- 组件目录
┃  ┠ router ------------------------ 路由管理
┃  ┠ store ------------------------- 公共状态
┃  ┠ App.vue ----------------------- 页面级Vue组件
┃  ┖ main.js ----------------------- 页面入口
┠ static ------------------------- 静态文件
┠ bin ---------------------------- 命令脚本
┠ lib ---------------------------- 库文件
┠ test --------------------------- 项目测试
┠ docs --------------------------- 项目文档 
┠ .editorconfig ------------------ 编码规范
┠ README.md ---------------------- 项目介绍
┠ LICENSE ------------------------ 开源协议
┠ package.json ------------------- 包信息
┠ index.html --------------------- 入口模板
┠ .gitignore --------------------- Git忽略表
┠ .eslintrc.js ------------------- ES语法检查配置
┠ .eslintignore
┠ .babelrc
┠ .travis.yml -------------------- 持续集成配置
```

</div>