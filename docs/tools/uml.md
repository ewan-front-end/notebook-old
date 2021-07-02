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
            <span>M 0000:00:00 00:00</span>
        </div>
    </div>
    <div class="content"><div class="custom-block links">
<ul class="desc">
<li><a href="/programmingLanguage/plantuml">PlantUML语言</a></li>
</ul>
</div></div>
</div>
<div class="content-header">
<h1>uml</h1><strong>uml</strong>
</div>
<div class="static-content">

## 用例图 
- 定义<br>
用例图主要用来描述角色以及角色与用例之间的连接关系。说明的是谁要使用系统，以及他们使用该系统可以做些什么。一个用例图包含了多个模型元素，如系统、参与者和用例，并且显示这些元素之间的各种关系，如泛化、关联和依赖。它展示了一个外部用户能够观察到的系统功能模型图。<br>
- 用途<br>
帮助开发团队以一种可视化的方式理解系统的功能需求<br>
- 元素&关系<br>
<img :src="$withBase('/images/uml-usecase.png')"><br>
- 举例<br>
<img :src="$withBase('/images/uml-usecase-demo.png')">



[官网](http://plantuml.com/en/guide)


### 1. 配置
```js
window.$docsify = {
    plantuml: {
        skin: 'classic', // default/classic
        renderSvgAsObject: true, // 使用交互式svg,呈现<img src=''/>变为<object type='image/svg+xml' data=''/>
        //serverPath: '', // 配置自己的PlantUML服务器
    },
}
```

### 2. 引入处理脚本

`<script src="//unpkg.com/docsify-plantuml/dist/docsify-plantuml.min.js"></script>`

### 3. 使用

#### Salt (wireframe)
<img :src="$withBase('/uml/未命名.png')">
<img :src="$withBase('/uml/未命名.png')">
<img :src="$withBase('/uml/未命名.png')">
<img :src="$withBase('/uml/未命名.png')">

<img :src="$withBase('/uml/未命名.png')">
<img :src="$withBase('/uml/未命名.png')">

#### 数学
<img :src="$withBase('/uml/未命名.png')">

#### 工作分解结构
<img :src="$withBase('/uml/未命名.png')">

#### 思维导图
<img :src="$withBase('/uml/未命名.png')">
<img :src="$withBase('/uml/未命名.png')">
```
@startmindmap
* Debian
** Ubuntu
***_ Linux Mint
***_ Kubuntu
*** Lubuntu
*** KDE Neon
** LMDE
** SolydXK
** SteamOS
** Raspbian with a very long name
*** <s>Raspmbc</s> => OSMC
*** <s>Raspyfi</s> => Volumio
@endmindmap
```

#### 甘特图
<img :src="$withBase('/uml/未命名.png')">
```
@startgantt
[Prototype design] lasts 14 days
[Build prototype] lasts 4 days
[Prepare test] lasts 6 days
[Prototype design] -> [Build prototype]
[Prototype design] -> [Prepare test]
[Build prototype] is colored in Fuchsia/FireBrick
@endgantt
```

#### 流程图
<img :src="$withBase('/uml/未命名.png')">
```
@startuml
start
:"步骤1处理";
:"步骤2处理";
if ("条件1判断") then (true)
    :条件1成立时执行的动作;
    if ("分支条件2判断") then (no)
        :"条件2不成立时执行的动作";
    else
        if ("条件3判断") then (yes)
            :"条件3成立时的动作";
        else (no)
            :"条件3不成立时的动作";
        endif
    endif
    :"顺序步骤3处理";
endif
if ("条件4判断") then (yes)
:"条件4成立的动作";
else
    if ("条件5判断") then (yes)
        :"条件5成立时的动作";
    else (no)
        :"条件5不成立时的动作";
    endif
endif
stop
@enduml
```


#### 时序图
<img :src="$withBase('/uml/未命名.png')">
#### 用例图
<img :src="$withBase('/uml/未命名.png')">

#### 组件图
<img :src="$withBase('/uml/未命名.png')">

#### 状态图
<img :src="$withBase('/uml/未命名.png')">

</div>