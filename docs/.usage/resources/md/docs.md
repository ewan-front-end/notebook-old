:::2021.06.23:::

## vuepress docs
<img :src="$withBase('/images/wdygjsy.jpg')">
<pre>
<strong>开发构建</strong>
    demo> node docs/.usage/deploy.js                               最佳实践部署vurpress
    ┌ 往package.json里添加配置的 scripts 命令
    ├ 创建docs/.vuepress目录
    ├ 创建docs/.vuepress/public目录
    ├ 将配置里的config写入到docs/.vuepress/config.js文件
    └ 从结构里拷贝资源到docs/.vuepress/public/

    demo> node docs/.usage/create.js [path]                        依据docs/.usage/siteMap.js创建文档 带path参时 只构建目标文件 如/tools
    ┌ 收集第一层数据入首页目录  
    ├ 建立 SRC资源：数据路径 映射 并写入docs/.usage/.RES_MAP_PATH.json
    ├ 更新修改时间
    ├ 处理主题与描述
    ├ 处理子类数据成链接
    ├ 处理链接数据
    ├ 处理外部静态文件
    └ 添加文件格式

    demo> node docs/.usage/createWatch.js [path]                   监控docs/.usage/resources/md/下的文件修改
    ┌ 添加或重写 :::0000.00.00::: 时间块
    ├ 如果修改的scene.md文件 则触发 node docs/.usage/updateScene.js     构建场景数据
    ├ 如果是普通文件 收集【解决方案】格式 写入docs/.usage/.LIST_SOLUTION.json
    ├ 如果是普通文件 收集【业务场景】格式 写入docs/.usage/.LIST_SCENE.json
    ├ 如果是普通文件 收集【使用攻略】格式 写入docs/.usage/.LIST_USAGE.json
    └ 如果是普通文件 则触发 node docs/.usage/create.js 数据路径         构建目标文件

    demo> node docs/.usage/updateScene.js                          聚合场景数据
    ┌ 将.LIST_SOLUTION列表处理到【解决方案】类别里
    ├ 将.LIST_SCENE   列表处理到【描述】类别里
    ├ 将./resources/md/scene.md写为主内容
    └ 在导航菜单加入【场景】链接

    demo> node docs/.usage/updateSolution.js                       聚合解决方案
    ┌ 将.LIST_SOLUTION列表处理到【聚合】类别里
    ├ 将./resources/md/solution.md写为主内容
    └ 在导航菜单加入【解决方案】链接

    demo> node docs/.usage/updateUsage.js                          聚合使用方法
    ┌ 将.LIST_USAGE列表处理到显示列表
    ├ 将./resources/md/usage.md处理到显示列表
    └ 在导航菜单加入【使用攻略】链接

<strong>预编规范</strong>
    架构
        特点
        要求
        开发
        架构
    解决方案
    业务场景
    使用攻略
</pre>