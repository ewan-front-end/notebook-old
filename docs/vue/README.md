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
            <span>M 2021.11.30 20:51</span>
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
hello/
<span class="h4 bg3 cf"> Hello Vue3.0   </span>
    <span class="block-command">xxxx</span> npm uninstall -g vue-cli <span class="comment">// 卸载旧版本</span>
    <span class="block-command">xxxx</span> npm install -g @vue/cli  <span class="comment">// 安装新版本  卸载 npm uninstall -g @vue/cli 版本 vue -V</span>

    <span class="block-command">hello</span> vue create demo
        Default ([Vue 2] babel, eslint)      
      &gt; Default ([Vue 3] babel, eslint) 
      &gt; Manually select features  <span class="comment">// 推荐</span>
            (*)Choose V V  (*)Babel  ( )TS  ( )PWA  ( )Router  ( )Vuex  ( )CSS P  ( )Linter/Formatter  ( )Unit Testing  ( )E2E Testing
                2.x
                3.x  <span class="comment">// 选择此项</span>
                    In dedicated config files  <span class="comment">// 推荐 使用专用配置文件</span>
                    In package.json 
                        Save this as a preset for future projects? (y/N)  <span class="comment">// 保存为未来项目的预设? 推荐N</span>
    <span class="block-command">hello</span> cd vue3
    <span class="block-command">demo</span> npm run serve
    <span class="block-command">demo</span> npm run build

<span class="h1 bg3 cf"> 路由部署 </span>
<div class="block-detail">    <span class="detail-desc">demo/package.json</span><div class="detail-content">        <span>{ 
            "dependencies": { "vue-router": "^4.0.0-0" }, 
            "devDependencies": { "@vue/cli-plugin-router": "~4.5.0" } 
        }</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/main.js</span><div class="detail-content">        <span>import router from './router'
        <span class="comment">// createApp(App).mount('#app')</span>
        createApp(App).use(router).mount('#app')</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/router/index.js</span><div class="detail-content">        <span>import { 
            createRouter, 
            <span class="comment">// createWebHashHistory,</span>
            createWebHistory } from 'vue-router'
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
        export default router</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/config/global-naming.js</span><div class="detail-content">        <span>export const name = { TOKEN: 'Token', USER_INFO: 'UserInfo' }</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/router/routes.js</span><div class="detail-content">        <span>import Home from '../views/Home.vue'
        const routes = [
            { path: '/', redirect: '/login' },
            { path: '/home', name: 'Home', component: Home },
            { path: '/about', name: 'About', component: () =&gt; import(<span class="comment">/* webpackChunkName: "about" */</span> '../views/About.vue') },
            { path: '/login', name: 'Login', component: () =&gt; import('@/views/Login.vue'), meta: { index: 1 } }
        ]
        export default routes</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/views/Home.vue</span><div class="detail-content">        <span>&lt;template&gt;&lt;div class="home"&gt;&lt;h1&gt;首页&lt;/h1&gt;&lt;/div&gt;&lt;/template&gt;</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/views/About.vue</span><div class="detail-content">        <span>&lt;template&gt;&lt;div class="about"&gt;&lt;h1&gt;关于我们&lt;/h1&gt;&lt;/div&gt;&lt;/template&gt;</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/views/Login.vue</span><div class="detail-content">        <span>&lt;template&gt;&lt;div class="login"&gt;&lt;h1&gt;登录&lt;/h1&gt;&lt;button @click="login"&gt;登录&lt;/button&gt;&lt;/div&gt;&lt;/template&gt;
        &lt;script&gt;
            import { TOKEN } from '@/config/global-naming.js'
            export default {
                setup() {
                    const login = () =&gt; { localStorage.setItem(TOKEN, '123456789') }
                    return { login }
                }
            }
        &lt;/script&gt;</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/App.vue</span><div class="detail-content">        <span>&lt;template&gt;
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
        &lt;/style&gt;</span></div></div>
<span class="h1 bg3 cf"> 状态管理 </span>
<div class="block-detail">    <span class="detail-desc">demo/package.json</span><div class="detail-content">        <span>{ 
            "dependencies": { "vuex": "^4.0.0-0" }, 
            "devDependencies": { "@vue/cli-plugin-vuex": "~4.5.0" } 
        }</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/main.js</span><div class="detail-content">        <span>import store from './store'
        app.use(store)</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/store/index.js</span><div class="detail-content">        <span>import { createStore } from 'vuex'
        import { GetUserInfo } from '@/api'
        const USERINFO = 'UserInfo' <span class="comment">// 入库到Config</span>

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
        })</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/App.vue</span><div class="detail-content">        <span>&lt;script&gt;
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
        &lt;/script&gt;</span></div></div>
<span class="h1 bg3 cf"> ICONFont </span>
<div class="block-detail">    <span class="detail-desc">创建图标项目</span><div class="detail-content">        <span>https://www.iconfont.cn/ &gt; 资源管理 &gt; 我的项目 新建项目 名称【demo】 FontClass/Symbol前缀【ewan-】 Font Family【ewanfont】
        上传图标至项目</span></div></div> 
<div class="block-detail">    <span class="detail-desc">下载图标项目</span><div class="detail-content">        <span>demo.css
        demo_index.html
        iconfont.css
        iconfont.js
        iconfont.json
        iconfont.ttf
        iconfont.woff
        iconfont.woff2</span></div></div>
    部署到demo/src/assets/font/
<div class="block-detail">    <span class="detail-desc">demo/src/main.js</span><div class="detail-content">        <span>import '@/assets/font/iconfont.css'</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/views/Home.vue</span><div class="detail-content">        <span>&lt;template&gt;
            &lt;div class="home"&gt;
                &lt;h1&gt;ICON Font&lt;/h1&gt;
                &lt;p&gt;
                    [{color:#b845ff}(bd)&lt;span class="iconfont"&gt;&amp;#xe601;&lt;/span&gt;]
                    [{color:#4589ff}(bd)&lt;span class="iconfont ewan-xiugaimima"&gt;&lt;/span&gt;]
                &lt;/p&gt;
            &lt;/div&gt;
        &lt;/template&gt;</span></div></div>
<span class="h1 bg3 cf"> UI Vant </span>
<div class="block-detail">    <span class="detail-desc">demo/package.json</span> <div class="detail-content">        <span>{ "dependencies": { "vant": "^3.0.12" } }</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/main.js</span><div class="detail-content">        <span>import Vant from 'vant'
        import 'vant/lib/index.css'
        app.use(Vant)</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/views/About.vue</span><div class="detail-content">        <span>&lt;template&gt;
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
        &lt;/style&gt;</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/src/App.vue</span><div class="detail-content">        <span>&lt;script&gt;
            import { Dialog } from 'vant'
            export default {
                created() {
                    Dialog.alert({ title: '标题', message: '弹窗内容' })
                }
            }
        &lt;/script&gt;</span></div></div>
<span class="h1 bg3 cf"> CORDOVA项目 </span>
<div class="block-detail">    <span class="detail-desc">环境部署</span><div class="detail-content">        <span>修改VUE3打包(vue-cli-service build)位置 demo/dist/ 到 demo/www/
            方法一：demo/vue.config.js                   方法二：demo/package.json 中的 vue
            module.exports = { outputDir: 'www' }       { "vue": { "outputDir": "www" } }
        添加<a href="http://cordova.axuer.com/#getstarted" target="_blank">Cordova</a>
            创建一个空项目 xxx&gt; cordova create demo <span class="comment">// 依赖全局安装：npm install -g cordova  命令选项：cordova help create</span>
            拷贝 xxx/www 到 demo/www; 拷贝 xxx/config.xml 到 demo/config.xml</span></div></div>
<div class="block-detail">    <span class="detail-desc">Android</span><div class="detail-content">        <span>添加平台 demo&gt; cordova platform add android                   <span class="comment">// 查看已添加平台 cordova platform</span>
        开发流程
            1. 构建项目 demo&gt; npm run build
            2. 构建平台 demo&gt; cordova build android
            3. 运行平台 demo&gt; cordova run android  <span class="comment">// 依赖<a href="ANDROID:EnvironmentSetup" target="_blank">安卓环境</a></span>
        发布流程</span></div></div>
<div class="block-detail">    <span class="detail-desc">IOS</span><div class="detail-content">        <span>添加平台 demo&gt; cordova platform add ios                       <span class="comment">// 查看已添加平台 cordova platform</span>
        开发流程
            1. 构建代码 demo&gt; npm run build                           <span class="comment">// src &gt; demo/www/</span>
            2. 修改代码 demo/www/index.html 插入 &lt;script src=“cordova.js”&gt;&lt;/script&gt;
            3. 构建平台
                WINDOWS demo&gt; cordova build ios <span class="comment">// 依赖<a href="#" target="_blank">Xcodebuild</a></span>
                MAC 
                    依赖：百度云/Mac/cordova-ios-shell.zip
                    1 demo/
                    2 demo/iOS
                    3 demo/www
                    4 解压 cordova-ios-shell.zip 到 demo/ios/ 
                    5 把h5项目打包人代码放置 demo/www/
                    6 vscode 打开 demo
                    7 demo/www/index.html 插入 &lt;script src=“cordova.js”&gt;&lt;/script&gt;
                    8 demo/ios&gt; cordova build ios            
            4. 运行平台 Xcode IDE &gt; open a project &gt; 
                demo/platforms/ios
                选择设备
                run &gt;</span></div></div>
    发布流程
<span class="h1 bg3 cf"> Lint规范 </span>
<div class="block-detail">    <span class="detail-desc">demo/package.json</span><div class="detail-content">    <span>{
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
    }</span></div></div>

<span class="h6 bg3 cf"> 环境管理 </span>
模式：mode(development/production) VUE3概念
环境变量：只有以VUE_APP_开头的变量会被webpack.DefinePlugin静态嵌入到客户端侧的包中 从而在 Vue 的项目中使用
.env                <span class="comment">// 在所有的环境中被载入</span>
.env.local          <span class="comment">// 在所有的环境中被载入，但会被 git 忽略</span>
.env.[mode]         <span class="comment">// 只在指定的模式中被载入</span>
.env.[mode].local   <span class="comment">// 只在指定的模式中被载入，但会被 git 忽略</span>

.env.development    <span class="comment">// 开发环境 响应vue-cli-service serve</span>
.env.production     <span class="comment">// 生产环境 响应vue-cli-service build 和 vue-cli-service test:e2e</span>
.env.test           <span class="comment">// 测试环境 响应vue-cli-service test:unit</span>

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
        VUE_APP_ENV = dev <span class="comment">//自定义的环境变量</span>
    使用：const a = process.env.VUE_APP_ENV  <span class="comment">// 因运行了dev模式 会从.env.dev中读取VUE_APP_ENV变量</span>






</pre>




- 项目配置

<pre class="code-block">
<div class="block-detail">    <span class="detail-desc">Demo</span><div class="detail-content">        <span>const path = require('path')
        module.exports = {
            publicPath: './', <span class="comment">// 部署应用包时的基本URL,和webpack本身的output.publicPath一致; 也可设为空字符串('')或是相对路径('./')，这样打出来的包可以被部署在任意路径</span>
            outputDir: 'www', <span class="comment">// 输出文件目录(vue-cli-service build时)</span>
            assetsDir: '',    <span class="comment">// 静态资源打包路径</span>
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
        }</span></div></div>
<div class="block-detail">    <span class="detail-desc">demo/vue.config.js</span><div class="detail-content">        <span>const path = require("path")
        const resolve = dir =&gt; path.join(__dirname, dir)        
        const PurgecssPlugin = require("purgecss-webpack-plugin")  <span class="comment">// 用于生产环境去除多余的css</span>
        const glob = require("glob-all")  <span class="comment">//全局文件路径</span>
        const UglifyJsPlugin = require("uglifyjs-webpack-plugin")  <span class="comment">// 压缩代码并去掉console</span>
        const CompressionWebpackPlugin = require("compression-webpack-plugin")  <span class="comment">// 代码打包zip</span>
        const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
        module.exports = {  
            publicPath: process.env.NODE_ENV === "production" ? "./" : "/", <span class="comment">// 部署生产环境和开发环境下的URL</span>
            outputDir: "www",              <span class="comment">// 构建输出目录(npm run build时) 默认dist</span>
            assetsDir: 'static',           <span class="comment">// 项目打包之后 静态资源(js、css、img、fonts)会放在这个文件夹下</span>
            indexPath: "congfigtest.html", <span class="comment">// 打包后的启动文件</span>
            lintOnSave: true,              <span class="comment">// 是否开启eslint保存检测 有效值：ture | false | 'error'</span>
            runtimeCompiler: false,        <span class="comment">// 是否使用包含运行时编译器的Vue核心的构建</span>
            transpileDependencies: [],     <span class="comment">// 默认情况下babel-loader忽略其中的所有文件node_modules,这里可增加例外的依赖包名</span>
            productionSourceMap: false,    <span class="comment">// 是否在构建生产包时生成sourceMap文件 默认false</span>
            filenameHashing: false,        <span class="comment">// 生成的静态资源是否添加hash 默认true</span>
            
            <span class="comment">// 支持webPack-dev-server的所有选项</span>
            devServer: {
                port: 3000,
                host: '0.0.0.0',
                https: false,
                hot: true,
                hotOnly: false,
                open: true,             <span class="comment">// 是否自动启动浏览器</span>
                openPage: "about",
                disableHostCheck: true,
                proxy: {                <span class="comment">// 可配置多个代理 关闭 proxy: null</span>
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
                before: app =&gt; {}
            },
            
            parallel: require('os').cpus().length &gt; 1,  <span class="comment">// 构建时开启多进程处理 babel或TypeScript 编译</span>
            pwa: {},                                    <span class="comment">// https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa</span>

            <span class="comment">// 第三方插件配置</span>
            pluginOptions: {
                'style-resources-loader': {
                    preProcessor: 'scss',
                    patterns: [path.resolve(__dirname, 'src/assets/css/common.scss')]
                }
            }

            <span class="comment">// 如果文件等设置</span>
            pages: {  
                index: {
                    entry: "src/main.js",
                    template: "public/index.html",
                    filename: "index.html"
                }
            },
            
            <span class="comment">/**
                * 打包的CSS路径及命名
                * 优先级高于chainWebpack中关于css loader的配置
                */</span>
            <span style="color:#19ca64">css: { 
                modules: false,         <span class="comment">// 是否开启支持foo.module.css样式</span>
                extract: true,          <span class="comment">// 是否使用css分离插件ExtractTextPlugin 采用独立样式文件载入 不采用&lt;style&gt;方式内联至html文件中</span>
                extract: {              <span class="comment">// VUE文件中修改CSS不生效</span>
                    filename: "style/[name].[hash:8].css",
                    chunkFilename: "style/[name].[hash:8].css"
                },
                sourceMap: false,       <span class="comment">// 是否构建样式地图 false将提高构建速度</span>
                <span class="comment">// CSS预设器配置项</span>
                loaderOptions: {        
                    sass: {data: ''},   <span class="comment">// @import "@/assets/scss/mixin.scss"</span>
                    css: {},            <span class="comment">// options here will be passed to css-loader</span>
                    less: {
                        <span class="comment">// 向全局less样式传入共享的全局变量</span>
                        <span class="comment">// data: `@import "~assets/less/variables.less";$src: "${process.env.VUE_APP_SRC}";`</span>
                    },
                    <span class="comment">// 此选项将被传递给postcss-loader</span>
                    postcss: {
                        plugins: [
                            require("postcss-px-to-viewport")({
                                viewportWidth: 750,   <span class="comment">// 视窗的宽度，对应的是我们设计稿的宽度，一般是750</span>
                                viewportHeight: 1334, <span class="comment">// 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置</span>
                                unitPrecision: 3,     <span class="comment">// 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）</span>
                                viewportUnit: "vw",   <span class="comment">// 指定需要转换成的视窗单位，建议使用vw</span>
                                selectorBlackList: [".ignore", ".hairlines"], <span class="comment">// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名</span>
                                minPixelValue: 1,     <span class="comment">// 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值</span>
                                mediaQuery: false     <span class="comment">// 允许在媒体查询中转换`px`</span>
                            })
                        ]
                    }
                }
            },</span> 
            
            <span class="comment">/**
                * Webpack配置 
                * configureWebpack 
                会合并到webpack.config.js
                1 静态配置
                2 动态配置 基于环境有条件地配置行为 或者想要直接修改配置
                    可直接返回成静态配置
                    可无返回值 直接操作原配置config
                * chainWebpack
                VueCLI内部的webpack配置是通过webpack-chain维护的 这个库提供了一个webpack原始配置的上层抽象 使其可以定义具名的loader规则和具名插件 并有机会在后期进入这些规则并对它们的选项进行修改                   
                */</span>            
            <span style="color:#8dd5fa">configureWebpack: {
                plugins: [new MyAwesomeWebpackPlugin()]
            },
            configureWebpack: config =&gt; {
                <span class="comment">// 返回成静态配置</span>
                const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
                if (process.env.NODE_ENV === 'production') return {plugins: [new BundleAnalyzerPlugin()]}
                
                const plugins = []
                <span class="comment">//去掉不用的css 多余的css</span>
                plugins.push(
                    new PurgecssPlugin({
                        paths: glob.sync([path.join(__dirname, ".<span class="comment">/**/</span>*.vue")]),
                        extractors: [{
                            extractor: class Extractor {
                                static extract(content) {
                                    const validSection = content.replace(/&lt;style([\s\S]*?)&lt;\/style&gt;+/gim, "")
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
                <span class="comment">//启用代码压缩</span>
                plugins.push(
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {
                                warnings: false,
                                drop_console: true,
                                drop_debugger: false,
                                pure_funcs: ["console.log"] <span class="comment">//移除console</span>
                            }
                        },
                        sourceMap: false,
                        parallel: true
                    })
                ),
                <span class="comment">//代码压缩打包</span>
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
            },</span>
            <span style="color:#1c79c0">chainWebpack: config =&gt; { 
                <span class="comment">// 修改选项</span>
                config.module
                    .rule('vue')
                    .use('vue-loader')
                    .loader('vue-loader')
                    .tap(options =&gt; {
                        <span class="comment">// 修改选项...</span>
                        return options
                    }) 

                <span class="comment">// 添加一个新的Loader</span>
                config.module
                    .rule('graphql')
                    .test(/\.graphql$/)
                    .use('graphql-tag/loader')
                    .loader('graphql-tag/loader')
                    .end()

                config.plugin('html')
                    .tap(args =&gt; {
                        args[0].title = 'K宝'
                        return args
                    })

                <span class="comment">// 修复HMR</span>
                config.resolve.symlinks(true)  

                <span class="comment">// 修复Lazy loading routes  按需加载的问题，如果没有配置按需加载不需要写，会报错</span>
                <span class="comment">// config.plugin("html").tap(args =&gt; {</span>
                <span class="comment">//   args[0].chunksSortMode = "none"</span>
                <span class="comment">//   return args</span>
                <span class="comment">// })</span>

                <span class="comment">// 添加别名</span>
                config.resolve.alias  
                    .set("@", resolve("src"))
                    .set("assets", resolve("src/assets"))
                    .set("components", resolve("src/components"))
                    .set("layout", resolve("src/layout"))
                    .set("base", resolve("src/base"))
                    .set("static", resolve("src/static"))

                <span class="comment">// 压缩图片</span>
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
            }</span>
        }</span></div></div>
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

# HTML CDN 

<pre class="code-block">
&lt;script src="https://unpkg.com/vue@next"&gt;&lt;/script&gt;
</pre>

</div>