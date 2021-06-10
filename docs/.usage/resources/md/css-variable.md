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