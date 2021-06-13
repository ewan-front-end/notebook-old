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
<h1>时间线</h1>
</div>


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
