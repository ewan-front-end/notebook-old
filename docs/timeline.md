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
<h1>时间线</h1><strong>时间线</strong>
</div>
<div class="static-content">

[html+js开发] -> [模块化开发] 

demo/
index.html `<script src="index.js"></script>`
index.js `alert(1)`

demo2/
index.html `<script src="bundle.js"></script>`
index.js `import './m1'  alert(1)`
m1.js `alert('m1')`
webpack.config.js
```js
module.exports = {
    entry:['./index.js'],
    output: {
        filename:'bundle.js'
    },
    module:{
        loaders: []
    },
    plugins:[

    ]
}
```
demo2> webpack

</div>