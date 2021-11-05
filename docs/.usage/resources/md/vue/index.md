
::: details Vue 2.0
[文档](https://v3.cn.vuejs.org/guide/introduction.html)
===+
npm install -g vue-cli@2.x
vue init webpack 项目名称
===-
:::

# Vue 3.0
[迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)
===+
npm install -g @vue/cli
npm uninstall -g @vue/cli
vue create 项目名称 1// 选择 vue 3 preset
===-
- 新功能
::: details 组合式 API
===+
使用 (data、computed、methods、watch) 组件选项来组织逻辑通常都很有效。
然而，当我们的组件开始变得更大时，逻辑关注点的列表也会增长。
尤其对于那些一开始没有编写这些组件的人来说，这会导致组件难以阅读和理解
===-
```js
// src/components/UserRepositories.vue
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  // 用于组织逻辑关注点
  setup(props) {
    let repositories = ref([]) // 变量repositories = []是非响应式
    const getUserRepositories = async () => {
        repositories = await fetchUserRepositories(props.user)
    }

    return {
        repositories,
        getUserRepositories // 返回的函数与方法的行为相同
    }
  }
  // 组件的“其余部分”
}
```
:::
::: details Teleport
:::
::: details 片段
:::
::: details 触发组件选项
:::
::: details 来自 @vue/runtime-core 的 createRenderer API，用于创建自定义渲染器
:::
::: details 单文件组件组合式 API 语法糖 script setup
:::
::: details 单文件组件状态驱动的 CSS 变量 style 中的 v-bind
:::
::: details SFC style scoped 现在可以包含全局规则或只针对插槽内容的规则
:::
::: details Suspense 实验性
:::

- 非兼容的变更







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