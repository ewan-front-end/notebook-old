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
hello/
[####] Hello Vue3.0   
    xxxx> npm uninstall -g vue-cli // 卸载旧版本
    xxxx> npm install -g @vue/cli  // 安装新版本  卸载 npm uninstall -g @vue/cli 版本 vue -V

    hello> vue create demo
        Default ([Vue 2] babel, eslint)      
      > Default ([Vue 3] babel, eslint) 
      > Manually select features  // 推荐
            (*)Choose V V  (*)Babel  ( )TS  ( )PWA  ( )Router  ( )Vuex  ( )CSS P  ( )Linter/Formatter  ( )Unit Testing  ( )E2E Testing
                2.x
                3.x  // 选择此项 
                    In dedicated config files  // 推荐 使用专用配置文件
                    In package.json 
                        Save this as a preset for future projects? (y/N)  // 保存为未来项目的预设? 推荐N      
    hello> cd vue3
    demo> npm run serve
    demo> npm run build

[#] 路由部署
    demo/package.json ▾
        ↧{ 
            "dependencies": { "vue-router": "^4.0.0-0" }, 
            "devDependencies": { "@vue/cli-plugin-router": "~4.5.0" } 
        }↥
    demo/src/main.js ▾
        ↧import router from './router'
        // createApp(App).mount('#app')
        createApp(App).use(router).mount('#app')↥
    demo/src/router/index.js ▾
        ↧import { 
            createRouter, 
            // createWebHashHistory,
            createWebHistory } from 'vue-router'
        import { TOKEN, USER_INFO } from '@/config/namespace.js'
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
        export default router↥
    demo/src/config/namespace.js ▾
        ↧export const name = { TOKEN: 'Token', USER_INFO: 'UserInfo' }↥
    demo/src/router/routes.js ▾
        ↧import Home from '../views/Home.vue'
        const routes = [
            { path: '/', redirect: '/login' },
            { path: '/home', name: 'Home', component: Home },
            { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') },
            { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { index: 1 } }
        ]
        export default routes↥
    demo/src/views/Home.vue ▾
        ↧<template><div class="home"><h1>首页</h1></div></template>↥
    demo/src/views/About.vue ▾
        ↧<template><div class="about"><h1>关于我们</h1></div></template>↥
    demo/src/views/Login.vue ▾
        ↧<template><div class="login"><h1>登录</h1><button @click="login">登录</button></div></template>
        <script>
            import { TOKEN } from '@/config/namespace.js'
            export default {
                setup() {
                    const login = () => { localStorage.setItem(TOKEN, '123456789') }
                    return { login }
                }
            }
        </script>↥
    demo/src/App.vue ▾
        ↧<template>
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
            import { TOKEN } from '@/config/namespace.js'
            export default {
                setup() {
                    const logout = () => { localStorage.setItem(TOKEN, '') }
                    return { logout }
                }
            }
        </script>
        <style>
            .app-container{}
        </style>↥
[#] 状态管理
    demo/package.json ▾
        ↧{ 
            "dependencies": { "vuex": "^4.0.0" }, 
            "devDependencies": { "@vue/cli-plugin-vuex": "~4.5.0" } 
        }↥
    demo/src/main.js ▾
        ↧import store from './store'
        app.use(store)↥
    demo/src/store/index.js ▾
        ↧import { createStore } from 'vuex'
        import { GetUserInfo } from '@/api/user.js'
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
        })↥
    demo/src/api/user.js ▾
        ↧export const GetUserInfo = () => {
            return {data: {}}
        }↥
    demo/src/App.vue ▾
        ↧<script>
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
        </script>↥
[#] ICONFont
    创建图标项目 ▾
        ↧https://www.iconfont.cn/ > 资源管理 > 我的项目 新建项目 名称【demo】 FontClass/Symbol前缀【ewan-】 Font Family【ewanfont】
        上传图标至项目↥ 
    下载图标项目 ▾
        ↧demo.css
        demo_index.html
        iconfont.css
        iconfont.js
        iconfont.json
        iconfont.ttf
        iconfont.woff
        iconfont.woff2↥
    部署到demo/src/assets/font/
    demo/src/main.js ▾
        ↧import '@/assets/font/iconfont.css'↥
    demo/src/views/Home.vue ▾
        ↧<template>
            <div class="home">
                <h1>ICON Font</h1>
                <p>
                    [{color:#b845ff}(bd)<span class="iconfont">&amp;#xe601;</span>]
                    [{color:#4589ff}(bd)<span class="iconfont ewan-xiugaimima"></span>]
                </p>
            </div>
        </template>↥
[#] UI Vant
    demo/package.json ▾ 
        ↧{ "dependencies": { "vant": "^3.0.12" } }↥
    demo/src/main.js ▾
        ↧import Vant from 'vant'
        import 'vant/lib/index.css'
        app.use(Vant)↥
    demo/src/views/About.vue ▾
        ↧<template>
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
        </style>↥
    demo/src/App.vue ▾
        ↧<script>
            import { Dialog } from 'vant'
            export default {
                created() {
                    Dialog.alert({ title: '标题', message: '弹窗内容' })
                }
            }
        </script>↥
[#] CORDOVA项目
    环境部署 ▾
        ↧修改VUE3打包(vue-cli-service build)位置 demo/dist/ 到 demo/www/
            方法一：demo/vue.config.js                   方法二：demo/package.json 中的 vue
            module.exports = { outputDir: 'www' }       { "vue": { "outputDir": "www" } }
        添加[Cordova](http://cordova.axuer.com/#getstarted)
            创建一个空项目 xxx> cordova create demo // 依赖全局安装：npm install -g cordova  命令选项：cordova help create
            拷贝 xxx/www 到 demo/www; 拷贝 xxx/config.xml 到 demo/config.xml↥
    Android ▾
        ↧添加平台 demo> cordova platform add android                   // 查看已添加平台 cordova platform
        开发流程
            1. 构建项目 demo> npm run build
            2. 构建平台 demo> cordova build android
            3. 运行平台 demo> cordova run android  // 依赖[安卓环境](ANDROID:EnvironmentSetup)
        发布流程↥
    IOS ▾
        ↧添加平台 demo> cordova platform add ios                       // 查看已添加平台 cordova platform
        开发流程
            1. 构建代码 demo> npm run build                           // src > demo/www/ 
            2. 修改代码 demo/www/index.html 插入 <script src=“cordova.js”></script>
            3. 构建平台
                WINDOWS demo> cordova build ios // 依赖[Xcodebuild](#)
                MAC 
                    依赖：百度云/Mac/cordova-ios-shell.zip
                    1 demo/
                    2 demo/iOS
                    3 demo/www
                    4 解压 cordova-ios-shell.zip 到 demo/ios/ 
                    5 把h5项目打包人代码放置 demo/www/
                    6 vscode 打开 demo
                    7 demo/www/index.html 插入 <script src=“cordova.js”></script>
                    8 demo/ios> cordova build ios            
            4. 运行平台 Xcode IDE > open a project > 
                demo/platforms/ios
                选择设备
                run >↥
    发布流程
[#] 项目规范
    ✿ codingSpecification:代码编写规范
    团队代码需要统一，有了规则不执行或忘记执行
    代码格式统一
    提交检测
    ❀
    ✿ gitCommitSpecification:Git提交规范
    团队需要一个统一的提交规范，以更准确描述提交说明；有了规范不执行或忘记执行
    提交流程 提交检测
    ❀
    demo/package.json ▾
    ↧{
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
    }↥

[######] 开发
    【demo/src/components/Component.vue
    <template>
        <div>
            {{message}}
            <slot></slot>
        </div>
    </template>
    <script>
    export default {
        import { reactive, toRefs } from 'vue'
        setup(props) {
            const state = reactive({ message: 'Child Component' })
            const run = () => {console.log('子组件方法')}
            return {...toRefs(state), run}
        }
    }
    </script>
    <style lang="scss" scoped></style>】{color:#48cb80}

    demo/src/Page.vue
    <template>
        <div>
            【<Component ref="childRef"></Component>】{color:#48cb80}
            <button @click="【runChildFn】{color:#48cb80}">运行子组件方法</button>
        </div>     
    </template>
    <script>
    import { reactive, toRefs } from 'vue'
    【import Component from '@/components/Component.vue'】{color:#48cb80}
    export default {        
        components: { 【Component】{color:#48cb80} },
        setup() {
            const state = reactive({ count: 0 })
            【const childRef = ref(null)】{color:#48cb80}
            const runChildFn = () => {
                【childRef.value.run()】{color:#48cb80}
            }
            return {
                ...toRefs(state),
                【childRef】{color:#48cb80},
                runChildFn
            }
        }
    }
    <style lang="scss" scoped>
    </style>



[######] 环境管理
模式：mode(development/production) VUE3概念
环境变量：只有以VUE_APP_开头的变量会被webpack.DefinePlugin静态嵌入到客户端侧的包中 从而在 Vue 的项目中使用
.env                // 在所有的环境中被载入
.env.local          // 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         // 只在指定的模式中被载入
.env.[mode].local   // 只在指定的模式中被载入，但会被 git 忽略

.env.development    // 开发环境 响应vue-cli-service serve 
.env.production     // 生产环境 响应vue-cli-service build 和 vue-cli-service test:e2e 
.env.test           // 测试环境 响应vue-cli-service test:unit

demo/.env.development
    NODE_ENV = 'development'
    BASE_URL = ''

    VUE_APP_H5 = 'true'
    VUE_APP_APP = ''
.env.production 
    NODE_ENV = 'production'

自定义模式
    定义 demo/package.json 
        "scripts": {"dev": "vue-cli-service serve --mode dev"}
    创建 .env.dev 
        VUE_APP_ENV = dev //自定义的环境变量
    使用：const a = process.env.VUE_APP_ENV  // 因运行了dev模式 会从.env.dev中读取VUE_APP_ENV变量

[######] 多端
    API 




===-




- 项目配置
===+
    Demo ▾
        ↧const path = require('path')
        module.exports = {
            publicPath: './', // 部署应用包时的基本URL,和webpack本身的output.publicPath一致; 也可设为空字符串('')或是相对路径('./')，这样打出来的包可以被部署在任意路径
            outputDir: 'www', // 输出文件目录(vue-cli-service build时)
            assetsDir: '',    // 静态资源打包路径
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
        }↥
    demo/vue.config.js ▾
        ↧const path = require("path")
        const resolve = dir => path.join(__dirname, dir)        
        const PurgecssPlugin = require("purgecss-webpack-plugin")  // 用于生产环境去除多余的css        
        const glob = require("glob-all")  //全局文件路径        
        const UglifyJsPlugin = require("uglifyjs-webpack-plugin")  // 压缩代码并去掉console        
        const CompressionWebpackPlugin = require("compression-webpack-plugin")  // 代码打包zip
        const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
        module.exports = {  
            publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 部署生产环境和开发环境下的URL       
            outputDir: "www",              // 构建输出目录(npm run build时) 默认dist
            assetsDir: 'static',           // 项目打包之后 静态资源(js、css、img、fonts)会放在这个文件夹下
            indexPath: "congfigtest.html", // 打包后的启动文件
            lintOnSave: true,              // 是否开启eslint保存检测 有效值：ture | false | 'error'
            runtimeCompiler: false,        // 是否使用包含运行时编译器的Vue核心的构建
            transpileDependencies: [],     // 默认情况下babel-loader忽略其中的所有文件node_modules,这里可增加例外的依赖包名
            productionSourceMap: false,    // 是否在构建生产包时生成sourceMap文件 默认false
            filenameHashing: false,        // 生成的静态资源是否添加hash 默认true
            
            // 支持webPack-dev-server的所有选项
            devServer: {
                port: 3000,
                host: '0.0.0.0',
                https: false,
                hot: true,
                hotOnly: false,
                open: true,             // 是否自动启动浏览器
                openPage: "about",
                disableHostCheck: true,
                proxy: {                // 可配置多个代理 关闭 proxy: null
                    "/api": {
                        target: "https://cdn.awenliang.cn",
                        ws: true,
                        changeOrigin: true
                    },
                    "/foo": {
                        target: "https://cdn.awenliang.cn",
                        ws: true,
                        changeOrigin: true
                    }
                },
                before: app => {}
            },
            
            parallel: require('os').cpus().length > 1,  // 构建时开启多进程处理 babel或TypeScript 编译
            pwa: {},                                    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

            // 第三方插件配置
            pluginOptions: {
                'style-resources-loader': {
                    preProcessor: 'scss',
                    patterns: [path.resolve(__dirname, 'src/assets/css/common.scss')]
                }
            }

            // 如果文件等设置   
            pages: {  
                index: {
                    entry: "src/main.js",
                    template: "public/index.html",
                    filename: "index.html"
                }
            },
            
            /**
                * 打包的CSS路径及命名
                * 优先级高于chainWebpack中关于css loader的配置
                */
            【css: { 
                modules: false,         // 是否开启支持foo.module.css样式
                extract: true,          // 是否使用css分离插件ExtractTextPlugin 采用独立样式文件载入 不采用&lt;style&gt;方式内联至html文件中
                extract: {              // VUE文件中修改CSS不生效
                    filename: "style/[name].[hash:8].css",
                    chunkFilename: "style/[name].[hash:8].css"
                },
                sourceMap: false,       // 是否构建样式地图 false将提高构建速度
                // CSS预设器配置项
                loaderOptions: {        
                    sass: {data: ''},   // @import "@/assets/scss/mixin.scss"
                    css: {},            // options here will be passed to css-loader
                    less: {
                        // 向全局less样式传入共享的全局变量
                        // data: `@import "~assets/less/variables.less";$src: "${process.env.VUE_APP_SRC}";`
                    },
                    // 此选项将被传递给postcss-loader
                    postcss: {
                        plugins: [
                            require("postcss-px-to-viewport")({
                                viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                                viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                                unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
                                viewportUnit: "vw",   // 指定需要转换成的视窗单位，建议使用vw
                                selectorBlackList: [".ignore", ".hairlines"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                                minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                                mediaQuery: false     // 允许在媒体查询中转换`px`
                            })
                        ]
                    }
                }
            },】{color:#19ca64} 
            
            /**
                * Webpack配置 
                * configureWebpack 
                会合并到webpack.config.js
                1 静态配置
                2 动态配置 基于环境有条件地配置行为 或者想要直接修改配置
                    可直接返回成静态配置
                    可无返回值 直接操作原配置config
                * chainWebpack
                VueCLI内部的webpack配置是通过webpack-chain维护的 这个库提供了一个webpack原始配置的上层抽象 使其可以定义具名的loader规则和具名插件 并有机会在后期进入这些规则并对它们的选项进行修改                   
                */            
            【configureWebpack: {
                plugins: [new MyAwesomeWebpackPlugin()]
            },
            configureWebpack: config => {
                // 返回成静态配置
                const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
                if (process.env.NODE_ENV === 'production') return {plugins: [new BundleAnalyzerPlugin()]}
                
                const plugins = []
                //去掉不用的css 多余的css
                plugins.push(
                    new PurgecssPlugin({
                        paths: glob.sync([path.join(__dirname, "./**/*.vue")]),
                        extractors: [{
                            extractor: class Extractor {
                                static extract(content) {
                                    const validSection = content.replace(/<style([\s\S]*?)<\/style>+/gim, "")
                                    return validSection.match(/[A-Za-z0-9-_:/]+/g) || []
                                }
                            },
                            extensions: ["html", "vue"]
                        }],
                        whitelist: ["html", "body"],
                        whitelistPatterns: [/el-.*/],
                        whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
                    })
                )
                //启用代码压缩
                plugins.push(
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {
                                warnings: false,
                                drop_console: true,
                                drop_debugger: false,
                                pure_funcs: ["console.log"] //移除console
                            }
                        },
                        sourceMap: false,
                        parallel: true
                    })
                ),
                //代码压缩打包
                plugins.push(
                    new CompressionWebpackPlugin({
                        filename: "[path].gz[query]",
                        algorithm: "gzip",
                        test: productionGzipExtensions,
                        threshold: 10240,
                        minRatio: 0.8
                    })
                )
                config.plugins = [...config.plugins, ...plugins]
            },】{color:#8dd5fa}
            【chainWebpack: config => { 
                // 修改选项
                config.module
                    .rule('vue')
                    .use('vue-loader')
                    .loader('vue-loader')
                    .tap(options => {
                        // 修改选项...
                        return options
                    }) 

                // 添加一个新的Loader
                config.module
                    .rule('graphql')
                    .test(/\.graphql$/)
                    .use('graphql-tag/loader')
                    .loader('graphql-tag/loader')
                    .end()

                config.plugin('html')
                    .tap(args => {
                        args[0].title = 'K宝'
                        return args
                    })

                // 修复HMR          
                config.resolve.symlinks(true)  

                // 修复Lazy loading routes  按需加载的问题，如果没有配置按需加载不需要写，会报错
                // config.plugin("html").tap(args => {
                //   args[0].chunksSortMode = "none"
                //   return args
                // }) 

                // 添加别名
                config.resolve.alias  
                    .set("@", resolve("src"))
                    .set("assets", resolve("src/assets"))
                    .set("components", resolve("src/components"))
                    .set("layout", resolve("src/layout"))
                    .set("base", resolve("src/base"))
                    .set("static", resolve("src/static"))

                // 压缩图片
                config.module  
                    .rule("images")
                    .use("image-webpack-loader")
                    .loader("image-webpack-loader")
                    .options({
                        mozjpeg: { progressive: true, quality: 65 },
                        optipng: { enabled: false },
                        pngquant: { quality: "65-90", speed: 4 },
                        gifsicle: { interlaced: false },
                        webp: { quality: 75 }
                    })
            }】{color:#1c79c0}
        }↥
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

# HTML CDN 
===+
<script src="https://unpkg.com/vue@next"></script>
===-