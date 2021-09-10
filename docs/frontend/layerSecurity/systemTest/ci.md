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
            <span>N 2021.09.10 20:55</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>持续集成(Continuous integration 简称CI)</h1><strong>持续集成(Continuous integration 简称CI)</strong>
<summary class="desc">一种软件开发实践,基于将代码频繁集成到共享代码仓中,然后通过自动构建验证每个签入</summary>
</div>
<div class="static-content">



目的
    让产品可以快速迭代，同时还能保持高质量
核心措施
    代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成

## 持续交付
> 持续集成的下一步, 交付给质量团队或者用户，以供评审。如果评审通过，代码就进入生产阶段
不管怎么更新，软件是随时随地可以交付的

## 持续部署
> 持续交付的下一步, 自动部署到生产环境
目标: 代码在任何时刻都是可部署的，可以进入生产阶段
前提: 能自动化完成测试、构建、部署等步骤

## 自动化测试
    单元测试：针对函数或模块的测试
    集成测试：针对整体产品的某个功能的测试，又称功能测试
    端对端测试：从用户界面直达数据库的全链路测试

## 回滚
    一旦当前版本发生问题，就要回滚到上一个版本的构建结果。最简单的做法就是修改一下符号链接，指向上一个版本的目录

## 持续集成流程
开发者        代码仓库                  评审员           生产服务器
开发代码提交   commit钩子   自动化测试   构建   全面测试   发布        回滚

</div>