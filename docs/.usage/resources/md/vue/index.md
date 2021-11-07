
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
hello> 
[(bd fs20)vue create demo]     
    npm uninstall -g vue-cli 卸载旧版本
    npm install -g @vue/cli 安装新版本  卸载新版本 npm uninstall -g @vue/cli

    按向导 选取 
        Default (Vue 3) ([Vue 3] babel, eslint) 
        Manually select features // 推荐
            (*) Choose Vue version
                  2.x
                > 3.x
            (*) Babel
            ( ) TypeScript
            ( ) Progressive Web App (PWA) Support
            ( ) Router
            ( ) Vuex
            ( ) CSS Pre-processors
            ( ) Linter / Formatter
            ( ) Unit Testing
            ( ) E2E Testing
    hello> cd vue3
    demo> npm run serve
===-
::: details 路由部署
===+
# demo/package.json 
    { "dependencies": { "vue-router": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-router": "~4.5.0" } }
# demo/src/main.js
    import router from './router'
    // createApp(App).mount('#app')
    createApp(App).use(router).mount('#app')
# demo/src/router/index.js
    import { createRouter, createWebHistory } from 'vue-router'
    import Home from '../views/Home.vue'
    const routes = [
        { path: '/', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') }
    ]
    const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })
    export default router
# demo/src/views/Home.vue
    <template><div class="home"><h1>首页</h1></div></template>
# demo/src/views/About.vue
    <template><div class="about"><h1>关于我们</h1></div></template>
# demo/src/App.vue
    <template>
        <div id="nav"><router-link to="/">Home</router-link> | <router-link to="/about">About</router-link></div>
        <router-view/>
    </template>
===-
:::

::: details 状态管理
===+
# demo/package.json 
    { "dependencies": { "vuex": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-vuex": "~4.5.0" } }
# demo/src/main.js
    import store from './store'
    app.use(store)
# demo/src/store/index.js
    import { createStore } from 'vuex'
    import { GetUserInfo } from '@/api'
    const USERINFO = 'UserInfo' // 入库到Config

    export default createStore({
        state: {
            userInfo: localStorage.getItem(USERINFO) ? JSON.parse(localStorage.getItem(USERINFO)) : {}
        },
        mutations: {
            setUserInfo(state, info) { state.userInfo = info }
        },
        actions: {
            async getUserInfo(ctx) {
                const local_userInfo = localStorage.getItem(USERINFO)
                if (local_userInfo) {
                    ctx.commit('setUserInfo', local_userInfo)
                } else {
                    const { data } = await GetUserInfo()
                    ctx.commit('setUserInfo', data)
                    localStorage.setItem(USERINFO, JSON.stringify(data))
                }
            }
        }
    })
# demo/src/App.vue
    <script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    export default {
        setup() {
            const store = useStore()
            return { userInfo: computed(() => store.state.userInfo) }
        },
        created() {
            setTimeout(() => { console.log(this.userInfo) }, 1000)        
        }
    }
    </script>
===-
:::
::: details 使用Vant
===+
# demo/package.json 
    { "dependencies": { "vant": "^3.0.12" } }
# demo/src/main.js
    import Vant from 'vant'
    import 'vant/lib/index.css'
    app.use(Vant)
# demo/src/App.vue
    <script>
        import { Dialog } from 'vant'
        export default {
            created() {
                Dialog.alert({
                    title: '1',
                    message: '2',
                    showConfirmButton: '3',
                    showCancelButton: '4',
                    confirmButtonText: '5',
                    cancelButtonText: '6'
                })
            }
        }
    </script>

===-
:::
::: details Lint规范
===+
demo/package.json
{
    "scripts": { "lint": "vue-cli-service lint" },
    "devDependencies": {
        "@vue/cli-plugin-eslint": "~4.5.0",
        "babel-eslint": "^10.1.0",
        "eslint": "^6.7.2",
        "eslint-plugin-vue": "^7.0.0"
    },
    "eslintConfig": {
        "root": true,
        "env": { "node": true },
        "extends": [
            "plugin:vue/vue3-essential",
            "eslint:recommended"
        ],
        "parserOptions": { "parser": "babel-eslint" },
        "rules": {}
    }
}
===-
:::


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