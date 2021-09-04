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
            <span>N 2021.09.04 13:07</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul></ul></div><div class="custom-block links">
<ul class="desc">
<li><a href="vue/vue-element-admin/index">vue-element-admin</a></li>
</ul>
</div></div>
</div>
<div class="content-header">
<h1>Vue</h1><strong>Vue</strong>
</div>
<div class="static-content">






npm install -g @vue/cli
npm uninstall -g @vue/cli
vue create 项目名称

npm install -g vue-cli@2.x
vue init webpack 项目名称


# Vue 3.0
- 不再支持filters过滤器
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