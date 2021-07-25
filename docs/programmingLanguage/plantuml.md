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
            <span>M 2021.07.23 14:41</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>PlantUML</h1><strong>PlantUML</strong>
</div>
<div class="static-content">
```js
var plantuml = require('C:/Program Files/nodejs/node_modules/node-plantuml/lib/node-plantuml');
var fs = require('fs');
 
var str =`
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
`
var gen = plantuml.generate(str);
gen.out.pipe(fs.createWriteStream("output-file.png"))
```

::: details 流程图&活动图
<pre class="plantuml-demo">
一个代码：开始<strong class="start">@startuml</strong> <strong class="end">@enduml</strong>结束 
一个图示: 开始<strong class="start">start</strong> <strong class="end">stop</strong>结束
一个活动：开始<strong class="start">:</strong><strong style="color:#ccc;font-size:12px">活动内容**可以回车**</strong><strong class="end">;</strong>结束

分支：if (分支一) then (标注文字)

<strong class="start">@startuml</strong> 
<strong class="start">start</strong> 
<strong class="start">:</strong><strong style="color:#ccc;font-size:12px">活动内容**可以回车**</strong><strong class="end">;</strong>
if (分支一) then (标注文字)
<strong class="end">stop</strong>
<strong class="end">@enduml</strong>结束
   
</pre>
:::

## 活动图

</div>