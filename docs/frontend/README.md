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
            <span>M 2021.07.20 14:30</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul><li><a href="/frontend/layerBusiness">业务层</a></li><li><a href="/frontend/layerSecurity">保障层</a></li><li><a href="/frontend/layerInfrastructure">基础设施层</a></li><li><a href="/frontend/layerOffline">线下层</a></li></ul></div><div class="custom-block links">
<ul class="desc">
<li><a href="/tools/qiankun">qiankun</a></li>
</ul>
</div></div>
</div>
<div class="content-header">
<h1>前端体系</h1><strong>前端体系</strong>
<summary class="desc">前后端的分离是系统级的分离，前端要有一整套完整的技术体系以更好地支持产品在终端形态上的快速演进，同时实现技术资源的横向复用。技术体系的线下层重点关注开发效率，基础设施层重点关注稳定性，保障层重点关注质量与可用性，业务层重点关注服务的全面性和可复用性。</summary>
</div>
<div class="static-content">

监控体系




```
利用框架搭建一个访问量很高的大型网站，管理好所有资源
(1)   遵循自定的一套CSS，JS和图片文件和文件夹命名规范
(2)   依托采用的前端工程化工具，依照工具脚手架规范（gulp, webpack, grunt, yeoman)
(3)   依据采用的框架规范（Vue, React, jQuery)

应用原生JS搭建一个MVC架构
(1)基本模块
common   公共组件，下面的各模块都会用到
config       配置模块，解决框架的配置问题
startup      启动模块，解决框架和Servlet如何进行整合的问题
plugin       插件模块，插件机制的实现，提供IPlugin的抽象实现
routing      路由模块，解决请求路径的解析问题，提供了 IRoute的抽象实现和基本实现
controller  控制器模块，解决的是如何产生控制器
model        视图模型模块，解决的是如何绑定方法的参数
action        action模块，解决的是如何调用方法以及方法返回的结果，提供了IActionResult的 抽象实现和基本实现
view          视图模块，解决的是各种视图引擎和框架的适配
filter          过滤器模块，解决是执行Action,返回IActionResult前后的AOP功能，提供了 IFilter 的抽象实现以及基本实现
(2)扩展模块
filters        ―些IFilter 的实现
results       ―些IActionResult 的实现
routes        ―些IRoute 的实现
plugins      —些 IPlugin 的实现
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