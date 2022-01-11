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
            <span>N 2022.01.11 14:32</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>CSS变量</h1><strong>CSS变量</strong>
</div>
<div class="static-content">

js操作变量
```html
<style>
    :root {
        --blue: #1e90ff;
        --size: 12px;
    }
</style>
<div style="color: var(--blue)"></div>
<button onclick="document.documentElement.style.setProperty('--blue', '#f00')">字体颜色</button>
<button onclick="document.documentElement.style.setProperty('--blue', '#f00')">增加字号</button>
```

</div>