[上一级](../)

# 时间线

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
