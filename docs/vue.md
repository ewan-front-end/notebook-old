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
            <span>M 2021.08.13 21:02</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Vue</h1><strong>Vue</strong>
</div>
<div class="static-content">


## vue-element-admin

<pre class="normal-block">
<span>● 自定义ICON</span>
    1. 准务svg图标 xiugaimima.svg https://www.iconfont.cn
    2. 放入相关文件夹@/icons/svg/xiugaimima.svg 之后就会自动导入
    3. 使用方式：&lt;svg-icon icon-class="xiugaimima" /&gt;<span class="comment"> // icon-class 为 icon 的名字</span>
</pre>


npm install -g @vue/cli
npm uninstall -g @vue/cli
vue create 项目名称

npm install -g vue-cli@2.x
vue init webpack 项目名称


- Vue 3.0不再支持filters过滤器
```vue
<template><p>{{ accountBalance | currencyUSD }}</p> <p>{{ accountInUSD }}</p></template> 
<script>
 export default { 
    props: { accountBalance: { type: Number, required: true } },
    filters: { currencyUSD(value) { return '$' + value } },
    computed: { accountInUSD() { return '$' + this.accountBalance } }
}
</script>
```
> 虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式“只是JavaScript”的原则，这既增加了学习成本，也增加实现逻辑的成本。
> 替代方案：计算属性 方法(有动参时)

</div>