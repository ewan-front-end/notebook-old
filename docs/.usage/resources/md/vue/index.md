https://www.bilibili.com/video/av76485104



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
            (*) Choose V V  (*) Babel  ( ) TS  ( ) PWA  ( ) Router  ( ) Vuex  ( ) CSS P  ( ) Linter/Formatter  ( ) Unit Testing  ( ) E2E Testing
                  2.x
                > 3.x
            
    hello> cd vue3
    demo> npm run serve
===-
::: details 路由部署
===+
[#] demo/package.json
    { "dependencies": { "vue-router": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-router": "~4.5.0" } }
[#] demo/src/main.js
    import router from './router'
    // createApp(App).mount('#app')
    createApp(App).use(router).mount('#app')
[#] demo/src/router/index.js
    import { createRouter, createWebHistory } from 'vue-router'
    import { TOKEN, USER_INFO } from '@/config/global-naming.js'
    import routes from './routes.js'
    const noLoginWhiteList = ['/login', '/register']
    const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })
    router.beforeEach((to, from, next) => {
        const isLogin = localStorage.getItem(TOKEN) ? true : false,
            toPath = to.path.toLocaleLowerCase()        
        if (isLogin) {
            toPath === '/login' ? next('/home') : next()
        } else {
            noLoginWhiteList.includes(toPath) ? next() : next('/login')
        }
    })
    export default router
[#] demo/src/config/global-naming.js
    export const name = { TOKEN: 'Token', USER_INFO: 'UserInfo' }
[#] demo/src/router/routes.js
    import Home from '../views/Home.vue'
    const routes = [
        { path: '/', redirect: '/login' },
        { path: '/home', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') },
        { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { index: 1 } }
    ]
    export default routes
[#] demo/src/views/Home.vue
    <template><div class="home"><h1>首页</h1></div></template>
[#] demo/src/views/About.vue
    <template><div class="about"><h1>关于我们</h1></div></template>
[#] demo/src/views/Login.vue
    <template><div class="login"><h1>登录</h1><button @click="login">登录</button></div></template>
    <script>
    import { TOKEN } from '@/config/global-naming.js'
    export default {
        setup() {
            const login = () => { localStorage.setItem(TOKEN, '123456789') }
            return { login }
        }
    }
    </script>
[#] demo/src/App.vue
    <template>
        <div class="app-container">
            <div>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> | 
                <router-link to="/login">Login</router-link> 
                <button @click="logout">logout</button>
            </div>
            <router-view/>
        </div>
    </template>
    <script>
    import { TOKEN } from '@/config/global-naming.js'
    export default {
        setup() {
            const logout = () => { localStorage.setItem(TOKEN, '') }
            return { logout }
        }
    }
    </script>
    <style>
    .app-container{}
    </style>
===-
import { 
    createRouter, 
    createWebHistory, 
    createWebHashHistory 
} from 'vue-router'
:::

::: details 状态管理
===+
[#] demo/package.json
    { "dependencies": { "vuex": "^4.0.0-0" }, "devDependencies": { "@vue/cli-plugin-vuex": "~4.5.0" } }
[#] demo/src/main.js
    import store from './store'
    app.use(store)
[#] demo/src/store/index.js
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
[#] demo/src/App.vue
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

::: details ICONFont
===+
[#] https://www.iconfont.cn/
资源管理 > 我的项目 
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

[#] demo/src/main.js
import '@/assets/font/iconfont.css'
[#] demo/src/views/Home.vue
<template>
    <div class="home">
        <h1>ICON Font</h1>
        <p>
            [{color:#b845ff}(bd)<span class="iconfont">&amp;#xe601;</span>]
            [{color:#4589ff}(bd)<span class="iconfont ewan-xiugaimima"></span>]
        </p>
    </div>
</template>
===-
:::

::: details UI Vant
===+
[#] demo/package.json 
    { "dependencies": { "vant": "^3.0.12" } }
[#] demo/src/main.js
    import Vant from 'vant'
    import 'vant/lib/index.css'
    app.use(Vant)
[#] demo/src/views/About.vue
    <template>
        <div class="about">
            <h1>关于我们</h1>
            <ul class="features">
                <li>
                    <van-icon name="like" size="18px" />
                    <span>我的最爱</span>
                    <van-icon name="arrow" size="16px" />
                </li>
            </ul>
        </div>
    </template>
    <style>
        .features{border-top:#eee 1px solid}
        .features li{padding:10px 10px; border-bottom:#eee 1px solid}
        .features li span{display:inline-block; padding:10px 10px}
    </style>
[#] demo/src/App.vue
    <script>
        import { Dialog } from 'vant'
        export default {
            created() {
                Dialog.alert({ title: '标题', message: '弹窗内容' })
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

::: details cordova
[Cordova](http://cordova.axuer.com/#getstarted)
===+
demo/package.json
{
    "scripts": {
        // vue3项目打包到demo/www
        // cordova打包代码到demo/platforms\android\app\src\main\assets\www
        // 运行App
        "build:cordova": "vue-cli-service build && cordova build android && cordova run android" 
    },
    "dependencies": {
        "cordova-lib": "^10.0.0"
    },
    "devDependencies": {
        "cordova-android": "^9.0.0",
        "cordova-plugin-customurlscheme": "^5.0.2", // 获取url参数
        "cordova-plugin-battery-status": "^2.0.3", // 监视设备的电池状态
        "cordova-plugin-camera": "^5.0.1", // 提供照相机API与设备相机进行交互
        "cordova-plugin-geolocation": "^4.1.0", // GPS地理定位，经度、纬度、海拔等
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

[#] 添加cordova
    1. 创建一个空项目 xxx> cordova create demo // 依赖全局安装：npm install -g cordova  命令选项：cordova help create
    2. 拷贝 xxx/www 到 demo/www; 拷贝 xxx/config.xml 到 demo/config.xml
    3. 添加一个平台 demo> cordova platform add android // 可以添加平台查看：cordova platform  4. 运行App demo> cordova run android

[#] 修改VUE3打包(vue-cli-service build)位置 demo/dist/ 到 demo/www/
    方法一：demo/vue.config.js                 方法二：demo/package.json 中的 vue
    module.exports = { outputDir: 'www' }     { "vue": { "outputDir": "www" } }

[#] demo> npm run build:cordova
    error: No emulator specified

[#] Android Studio打开项目
[FORM_START]
Android Studio > File > Open > ...\Hello\demo\platforms\android\app
[BTN|Add Configuration...]
▼app▼ ▼Nexus 6 (Edited) API 30▼  ▶
[FORM_END]
===-
:::

- 项目配置
===+
[#] vue.config.js
const path = require('path')
module.exports = {
    publicPath: './', // 部署应用包时的基本URL,和webpack本身的output.publicPath一致; 也可设为空字符串('')或是相对路径('./')，这样打出来的包可以被部署在任意路径
    outputDir: 'www', // 输出文件目录(vue-cli-service build时)
    assetsDir: '', // 
    productionSourceMap: true,
    lintOnSave: false,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
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