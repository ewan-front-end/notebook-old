[上一级](../)

# Vue




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