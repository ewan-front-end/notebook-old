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
            <span>M 2021.11.08 14:55</span>
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

https://www.bilibili.com/video/av76485104



::: details Vue 2.0
[文档](https://v3.cn.vuejs.org/guide/introduction.html)

<pre class="code-block">
npm install -g vue-cli@2.x
vue init webpack 项目名称
</pre>
:::

# Vue 3.0
[迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)


<pre class="code-block">
hello&gt; 
<span class="bd fs20">vue create demo</span>     
    npm uninstall -g vue-cli 卸载旧版本
    npm install -g @vue/cli 安装新版本  卸载新版本 npm uninstall -g @vue/cli

    按向导 选取 
        Default (Vue 3) ([Vue 3] babel, eslint) 
        Manually select features<span class="comment"> // 推荐</span>
            (*) Choose V V  (*) Babel  ( ) TS  ( ) PWA  ( ) Router  ( ) Vuex  ( ) CSS P  ( ) Linter/Formatter  ( ) Unit Testing  ( ) E2E Testing
                  2.x
                &gt; 3.x
            
    hello&gt; cd vue3
    demo&gt; npm run serve
</pre>
::: details 路由部署

<pre class="code-block">
<span class="h1">demo/package.json </span>
    { "dependencies": { "vue-router": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-router": "~4.5.0" } }
<span class="h1">demo/src/main.js</span>
    import router from './router'
   <span class="comment"> // createApp(App).mount('#app')</span>
    createApp(App).use(router).mount('#app')
<span class="h1">demo/src/router/index.js</span>
    import { createRouter, createWebHistory } from 'vue-router'
    import { TOKEN, USER_INFO } from '@/config/global-naming.js'
    import routes from './routes.js'
    const noLoginWhiteList = ['/login', '/register']
    const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })
    router.beforeEach((to, from, next) =&gt; {
        const isLogin = localStorage.getItem(TOKEN) ? true : false,
            toPath = to.path.toLocaleLowerCase()        
        if (isLogin) {
            toPath === '/login' ? next('/home') : next()
        } else {
            noLoginWhiteList.includes(toPath) ? next() : next('/login')
        }
    })
    export default router
<span class="h1">demo/src/config/global-naming.js</span>
    export const name = { TOKEN: 'Token', USER_INFO: 'UserInfo' }
<span class="h1">demo/src/router/routes.js</span>
    import Home from '../views/Home.vue'
    const routes = [
        { path: '/', redirect: '/login' },
        { path: '/home', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: () =&gt; import(<span class="comment">/* webpackChunkName: "about" */</span> '../views/About.vue') },
        { path: '/login', name: 'Login', component: () =&gt; import('@/views/Login.vue'), meta: { index: 1 } }
    ]
    export default routes
<span class="h1">demo/src/views/Home.vue</span>
    &lt;template&gt;&lt;div class="home"&gt;&lt;h1&gt;首页&lt;/h1&gt;&lt;/div&gt;&lt;/template&gt;
<span class="h1">demo/src/views/About.vue</span>
    &lt;template&gt;&lt;div class="about"&gt;&lt;h1&gt;关于我们&lt;/h1&gt;&lt;/div&gt;&lt;/template&gt;
<span class="h1">demo/src/views/Login.vue</span>
    &lt;template&gt;&lt;div class="login"&gt;&lt;h1&gt;登录&lt;/h1&gt;&lt;button @click="login"&gt;登录&lt;/button&gt;&lt;/div&gt;&lt;/template&gt;
    &lt;script&gt;
    import { TOKEN } from '@/config/global-naming.js'
    export default {
        setup() {
            const login = () =&gt; { localStorage.setItem(TOKEN, '123456789') }
            return { login }
        }
    }
    &lt;/script&gt;
<span class="h1">demo/src/App.vue</span>
    &lt;template&gt;
        &lt;div&gt;
            &lt;router-link to="/"&gt;Home&lt;/router-link&gt; | &lt;router-link to="/about"&gt;About&lt;/router-link&gt; | &lt;router-link to="/login"&gt;Login&lt;/router-link&gt; &lt;button @click="logout"&gt;logout&lt;/button&gt;
        &lt;/div&gt;
        &lt;router-view/&gt;
    &lt;/template&gt;
    &lt;script&gt;
    import { TOKEN } from '@/config/global-naming.js'
    export default {
        setup() {
            const logout = () =&gt; { localStorage.setItem(TOKEN, '') }
            return { logout }
        }
    }
    &lt;/script&gt;
</pre>
import { 
    createRouter, 
    createWebHistory, 
    createWebHashHistory 
} from 'vue-router'
:::

::: details 状态管理

<pre class="code-block">
<span class="h1">demo/package.json </span>
    { "dependencies": { "vuex": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-vuex": "~4.5.0" } }
<span class="h1">demo/src/main.js</span>
    import store from './store'
    app.use(store)
<span class="h1">demo/src/store/index.js</span>
    import { createStore } from 'vuex'
    import { GetUserInfo } from '@/api'
    const USERINFO = 'UserInfo'<span class="comment"> // 入库到Config</span>

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
<span class="h1">demo/src/App.vue</span>
    &lt;script&gt;
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    export default {
        setup() {
            const store = useStore()
            return { userInfo: computed(() =&gt; store.state.userInfo) }
        },
        created() {
            setTimeout(() =&gt; { console.log(this.userInfo) }, 1000)        
        }
    }
    &lt;/script&gt;
</pre>
:::
::: details 使用Vant

<pre class="code-block">
<span class="h1">demo/package.json </span>
    { "dependencies": { "vant": "^3.0.12" } }
<span class="h1">demo/src/main.js</span>
    import Vant from 'vant'
    import 'vant/lib/index.css'
    app.use(Vant)
<span class="h1">demo/src/App.vue</span>
    &lt;script&gt;
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
    &lt;/script&gt;

</pre>
:::
::: details Lint规范

<pre class="code-block">
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
</pre>
:::


- 新功能
::: details 组合式 API

<pre class="code-block">
使用 (data、computed、methods、watch) 组件选项来组织逻辑通常都很有效。
然而，当我们的组件开始变得更大时，逻辑关注点的列表也会增长。
尤其对于那些一开始没有编写这些组件的人来说，这会导致组件难以阅读和理解
</pre>
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

</div>