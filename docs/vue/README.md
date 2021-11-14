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
            <span>M 2021.11.14 20:58</span>
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
<span class="h1 bg3 cf">demo/package.json</span>
    { "dependencies": { "vue-router": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-router": "~4.5.0" } }
<span class="h1 bg3 cf">demo/src/main.js</span>
    import router from './router'
   <span class="comment"> // createApp(App).mount('#app')</span>
    createApp(App).use(router).mount('#app')
<span class="h1 bg3 cf">demo/src/router/index.js</span>
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
<span class="h1 bg3 cf">demo/src/config/global-naming.js</span>
    export const name = { TOKEN: 'Token', USER_INFO: 'UserInfo' }
<span class="h1 bg3 cf">demo/src/router/routes.js</span>
    import Home from '../views/Home.vue'
    const routes = [
        { path: '/', redirect: '/login' },
        { path: '/home', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: () =&gt; import(<span class="comment">/* webpackChunkName: "about" */</span> '../views/About.vue') },
        { path: '/login', name: 'Login', component: () =&gt; import('@/views/Login.vue'), meta: { index: 1 } }
    ]
    export default routes
<span class="h1 bg3 cf">demo/src/views/Home.vue</span>
    &lt;template&gt;&lt;div class="home"&gt;&lt;h1&gt;首页&lt;/h1&gt;&lt;/div&gt;&lt;/template&gt;
<span class="h1 bg3 cf">demo/src/views/About.vue</span>
    &lt;template&gt;&lt;div class="about"&gt;&lt;h1&gt;关于我们&lt;/h1&gt;&lt;/div&gt;&lt;/template&gt;
<span class="h1 bg3 cf">demo/src/views/Login.vue</span>
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
<span class="h1 bg3 cf">demo/src/App.vue</span>
    &lt;template&gt;
        &lt;div class="app-container"&gt;
            &lt;div&gt;
                &lt;router-link to="/"&gt;Home&lt;/router-link&gt; | 
                &lt;router-link to="/about"&gt;About&lt;/router-link&gt; | 
                &lt;router-link to="/login"&gt;Login&lt;/router-link&gt; 
                &lt;button @click="logout"&gt;logout&lt;/button&gt;
            &lt;/div&gt;
            &lt;router-view/&gt;
        &lt;/div&gt;
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
    &lt;style&gt;
    .app-container{}
    &lt;/style&gt;
</pre>
import { 
    createRouter, 
    createWebHistory, 
    createWebHashHistory 
} from 'vue-router'
:::

::: details 状态管理

<pre class="code-block">
<span class="h1 bg3 cf">demo/package.json</span>
    { "dependencies": { "vuex": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-vuex": "~4.5.0" } }
<span class="h1 bg3 cf">demo/src/main.js</span>
    import store from './store'
    app.use(store)
<span class="h1 bg3 cf">demo/src/store/index.js</span>
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
<span class="h1 bg3 cf">demo/src/App.vue</span>
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

::: details ICONFont

<pre class="code-block">
<span class="h1 bg3 cf">https://www.iconfont.cn/</span>
资源管理 &gt; 我的项目 
新建项目 名称【demo】 FontClass/Symbol前缀【ewan-】 Font Family【ewanfont】
上传图标至项目 
下载至本地
    demo.css
    demo_index.html
    iconfont.css
    iconfont.js
    iconfont.json
    iconfont.ttf
    iconfont.woff
    iconfont.woff2
部署到demo/src/assets/font/

<span class="h1 bg3 cf">demo/src/main.js</span>
import '@/assets/font/iconfont.css'
<span class="h1 bg3 cf">demo/src/views/Home.vue</span>
&lt;template&gt;
    &lt;div class="home"&gt;
        &lt;h1&gt;ICON Font&lt;/h1&gt;
        &lt;p&gt;
            <span style="color:#b845ff" class="bd">&lt;span class="iconfont"&gt;&amp;#xe601;&lt;/span&gt;</span>
            <span style="color:#4589ff" class="bd">&lt;span class="iconfont ewan-xiugaimima"&gt;&lt;/span&gt;</span>
        &lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;
</pre>
:::

::: details UI Vant

<pre class="code-block">
<span class="h1 bg3 cf">demo/package.json </span>
    { "dependencies": { "vant": "^3.0.12" } }
<span class="h1 bg3 cf">demo/src/main.js</span>
    import Vant from 'vant'
    import 'vant/lib/index.css'
    app.use(Vant)
<span class="h1 bg3 cf">demo/src/views/About.vue</span>
    &lt;template&gt;
        &lt;div class="about"&gt;
            &lt;h1&gt;关于我们&lt;/h1&gt;
            &lt;ul class="features"&gt;
                &lt;li&gt;
                    &lt;van-icon name="like" size="18px" /&gt;
                    &lt;span&gt;我的最爱&lt;/span&gt;
                    &lt;van-icon name="arrow" size="16px" /&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/template&gt;
    &lt;style&gt;
        .features{border-top:#eee 1px solid}
        .features li{padding:10px 10px; border-bottom:#eee 1px solid}
        .features li span{display:inline-block; padding:10px 10px}
    &lt;/style&gt;
<span class="h1 bg3 cf">demo/src/App.vue</span>
    &lt;script&gt;
        import { Dialog } from 'vant'
        export default {
            created() {
                Dialog.alert({ title: '标题', message: '弹窗内容' })
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

::: details cordova
[Cordova](http://cordova.axuer.com/#getstarted)

<pre class="code-block">
demo/package.json
{
    "scripts": {
       <span class="comment"> // vue3项目打包到demo/www</span>
       <span class="comment"> // cordova打包代码到demo/platforms\android\app\src\main\assets\www</span>
       <span class="comment"> // 运行App</span>
        "build:cordova": "vue-cli-service build && cordova build android && cordova run android" 
    },
    "dependencies": {
        "cordova-lib": "^10.0.0"
    },
    "devDependencies": {
        "cordova-android": "^9.0.0",
        "cordova-plugin-customurlscheme": "^5.0.2",<span class="comment"> // 获取url参数</span>
        "cordova-plugin-battery-status": "^2.0.3",<span class="comment"> // 监视设备的电池状态</span>
        "cordova-plugin-camera": "^5.0.1",<span class="comment"> // 提供照相机API与设备相机进行交互</span>
        "cordova-plugin-geolocation": "^4.1.0",<span class="comment"> // GPS地理定位，经度、纬度、海拔等</span>
        "cordova-plugin-globalization": "^1.11.0",
        "cordova-plugin-inappbrowser": "^5.0.0",
        "cordova-plugin-network-information": "^2.0.2",
        "cordova-plugin-qrscanner": "^3.0.1",
        "cordova-plugin-splashscreen": "^6.0.0",
        "cordova-plugin-statusbar": "^2.4.3",
        "cordova-plugin-whitelist": "^1.3.3"
    },
    "cordova": {
        "platforms": [
            "android"
        ],
        "plugins": {
            "cordova-plugin-whitelist": {},
            "cordova-plugin-geolocation": {
                "GPS_REQUIRED": "true"
            },
            "cordova-plugin-camera": {
                "ANDROID_SUPPORT_V4_VERSION": "27.+"
            },
            "cordova-plugin-qrscanner": {},
            "cordova-plugin-splashscreen": {},
            "cordova-plugin-globalization": {},
            "cordova-plugin-inappbrowser": {},
            "cordova-plugin-network-information": {},
            "cordova-plugin-battery-status": {},
            "cordova-plugin-statusbar": {},
            "cordova-plugin-customurlscheme": {
                "URL_SCHEME": "kpay",
                "ANDROID_SCHEME": " ",
                "ANDROID_HOST": " ",
                "ANDROID_PATHPREFIX": "/"
            }
        }
    },
    "vuePlugins": {
        "service": [
            "cdva.js"
        ]
    }
}

<span class="h1 bg3 cf">添加cordova</span>
    1. 创建一个空项目 xxx&gt; cordova create demo<span class="comment"> // 依赖全局安装：npm install -g cordova  命令选项：cordova help create</span>
    2. 拷贝 xxx/www 到 demo/www; 拷贝 xxx/config.xml 到 demo/config.xml
    3. 添加一个平台 demo&gt; cordova platform add android<span class="comment"> // 可以添加平台查看：cordova platform  4. 运行App demo&gt; cordova run android</span>

<span class="h1 bg3 cf">修改VUE3打包(vue-cli-service build)位置 demo/dist/ 到 demo/www/</span>
    方法一：demo/vue.config.js                 方法二：demo/package.json 中的 vue
    module.exports = { outputDir: 'www' }     { "vue": { "outputDir": "www" } }

<span class="h1 bg3 cf">demo&gt; npm run build:cordova</span>
    error: No emulator specified

<span class="h1 bg3 cf">Android Studio打开项目</span><div class="form-elements">Android Studio &gt; File &gt; Open &gt; ...\Hello\demo\platforms\android\app
<span class="button">Add Configuration...</span>
<span class="drop-down"><i>app</i></span> <span class="drop-down"><i class="Edited">Nexus 6 </i></span>  ▶
</div></pre>
:::

- 项目配置

<pre class="code-block">
<span class="h1 bg3 cf">vue.config.js</span>
const path = require('path')
module.exports = {
    publicPath: './',<span class="comment"><span class="comment"> // </span>部署应用包时的基本URL,和webpack本身的output.publicPath一致; 也可设为空字符串('')或是相对路径('./')，这样打出来的包可以被部署在任意路径</span>
    outputDir: 'www',<span class="comment"> // 输出文件目录(vue-cli-service build时)</span>
    assetsDir: '', // 
    productionSourceMap: true,
    lintOnSave: false,
    chainWebpack: config =&gt; {
        config.plugin('html').tap(args =&gt; {
            args[0].title = 'K宝'
            return args
        })
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [path.resolve(__dirname, 'src/assets/css/common.scss')]
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://kpay-api-pre.n-b-e-t.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        public: '10.10.115.154:4014'
    }
}
</pre>

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