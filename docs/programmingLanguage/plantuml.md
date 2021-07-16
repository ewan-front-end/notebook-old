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
    <div class="content"></div>
</div>
<div class="content-header">
<h1>PlantUML</h1><strong>PlantUML</strong>
</div>
<div class="static-content">

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