<div class="extend-header">
<div class="info">
<a class="back" href="./">上一级</a>
<div class="mini">
<span>2021.01.02</span>
</div>
</div>
<div class="content">


</div>
</div>
<div class="content-header">
<h1>CSS变量</h1>
</div>


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
