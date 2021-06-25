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
            <span>M 0000.00.00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>uml</h1>
</div>


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
```plantuml
@startuml
skinparam titleFontSize 14
title
Example of Tree
|_ First line
|_ **Bom(Model)**
|_ prop1
|_ prop2
|_ prop3
|_ Last line
end title
[*] --> State1
@enduml
```
```plantuml
@startuml
skinparam titleFontSize 14
title
Example of simple table
|= |= table |= header |
| a | table | row |
| b | table | row |
end title
[*] --> State1
@enduml
```
```plantuml
@startuml
listopeniconic
@enduml
```
```plantuml
@startsalt
{
{T
+ World
++ America
+++ Canada
+++ USA
++++ New York
++++ Boston
+++ Mexico
++ Europe
+++ Italy
+++ Germany
++++ Berlin
++ Africa
}
}
@endsalt

```

```plantuml
@startuml
salt
{
Just plain text
[This is my button]
() Unchecked radio
(X) Checked radio
[] Unchecked box
[X] Checked box
"Enter text here "
^This is a droplist^
}
@enduml
```
```plantuml
@startsalt
{
Login | "MyName "
Password | "**** "
[Cancel] | [ OK ]
}
@endsalt

```

#### 数学
```plantuml
@startmath
f(t)=(a_0)/2 + sum_(n=1)^ooa_ncos((npit)/L)+sum_(n=1)^oo b_n\ sin((npit)/L)
@endmath
```

#### 工作分解结构
```plantuml
@startwbs
* Business Process Modelling WBS
** Launch the project
*** Complete Stakeholder Research
*** Initial Implementation Plan
** Design phase
*** Model of AsIs Processes Completed
**** Model of AsIs Processes Completed1
**** Model of AsIs Processes Completed2
*** Measure AsIs performance metrics
*** Identify Quick Wins
** Complete innovate phase
@endwbs
```

#### 思维导图
```plantuml
@startmindmap
+ OS
++ Ubuntu
+++ Linux Mint
+++ Kubuntu
+++ Lubuntu
+++ KDE Neon
++ LMDE
++ SolydXK
++ SteamOS
++ Raspbian
-- Windows 95
-- Windows 98
-- Windows NT
--- Windows 8
--- Windows 10
@endmindmap
```
```plantuml
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
```plantuml
@startgantt
[Prototype design] lasts 14 days
[Build prototype] lasts 4 days
[Prepare test] lasts 6 days
[Prototype design] -> [Build prototype]
[Prototype design] -> [Prepare test]
[Build prototype] is colored in Fuchsia/FireBrick
@endgantt
```
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
```plantuml
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
```plantuml
@startuml
title 时序图
== 鉴权阶段 ==
Alice -> Bob: 请求
Bob -> Alice: 应答
== 数据上传 ==
Alice -> Bob: 上传数据
note left: 这是显示在左边的备注
Bob --> Canny: 转交数据
... 不超过 5 秒钟 ...
Canny --> Bob: 状态返回
note right: 这是显示在右边的备注
Bob -> Alice: 状态返回
== 状态显示 ==
Alice -> Alice: 给自己发消息
@enduml
```
#### 用例图
```plantuml
@startuml
left to right direction
actor 消费者
actor 销售员
rectangle 买单 {
消费者 -- (买单)
(买单) .> (付款) : include
(帮助) .> (买单) : extends
(买单) -- 销售员
}
@enduml
```

#### 组件图
```plantuml
@startuml

package "组件1" {
    ["组件1.1"] - ["组件1.2"]
    ["组件1.2"] -> ["组件2.1"]
}

node "组件2" {
    ["组件2.1"] - ["组件2.2"]
    ["组件2.2"] --> [负载均衡服务器]
}

cloud {
    [负载均衡服务器] -> [逻辑服务器1]
    [负载均衡服务器] -> [逻辑服务器2]
    [负载均衡服务器] -> [逻辑服务器3]
}

database "MySql" {
    folder "This is my folder" {
        [Folder 3]
    }

    frame "Foo" {
        [Frame 4]
    }
}

[逻辑服务器1] --> [Folder 3]
[逻辑服务器2] --> [Frame 4]
[逻辑服务器3] --> [Frame 4]

@enduml
```

#### 状态图
```plantuml
@startuml

scale 640 width

[*] --> NotShooting

state NotShooting {
    [*] --> Idle
    Idle --> Processing: SignalEvent
    Processing --> Idle: Finish
    Idle --> Configuring : EvConfig
    Configuring --> Idle : EvConfig
}

state Configuring {
    [*] --> NewValueSelection
    NewValueSelection --> NewValuePreview : EvNewValue
    NewValuePreview --> NewValueSelection : EvNewValueRejected
    NewValuePreview --> NewValueSelection : EvNewValueSaved
    state NewValuePreview {
        State1 -> State2
    }
}

@enduml
```
