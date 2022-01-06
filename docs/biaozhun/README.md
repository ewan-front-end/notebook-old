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
            <span>M 2022.01.06 17:01</span>
        </div>
    </div>
    <div class="content"><div class="custom-block children"><ul></ul></div></div>
</div>
<div class="content-header">
<h1>规范</h1><strong>规范</strong>
</div>
<div class="static-content">




<pre class="code-block">
<span class="h4">项目架构之搭建登录架构解决方案与实现</span>
<span class="block-command">hello</span> vue create admin
    (*) Choose Vue version
    (*) Babel
    (*) Router
    (*) Vuex
    (*) CSS Pre-processors
    (*) Linter / Formatter

      Sass/SCSS (with dart-sass)
    &gt; Sass/SCSS (with node-sass)
      Less
      Stylus

<div class="block-detail"><span class="detail-desc">admin/.vscode/settings.json</span><div class="detail-content"><span>{
    "editor.formatOnSave": true,
    "vetur.format.defaultFormatter.html": "prettier",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}</span></div></div>
<div class="block-detail"><span class="detail-desc">admin/.prettierrc.js</span><div class="detail-content">    <span>module.exports = {
        semi: false,                         <span class="comment">// 不尾随分号</span>
        trailingComma: 'none',               <span class="comment">// 不尾随逗号</span>
        singleQuote: true,                   <span class="comment">// 使用单引号</span>
        tabWidth: 4,                         <span class="comment">// 代码缩进</span>
        
        useTabs: false,                      <span class="comment">// 使用tab还是空格</span>
        jsxSingleQuote: false,               <span class="comment">// JSX双引号</span>
        bracketSpacing: true,                <span class="comment">// 在对象文字中打印括号之间的空格</span>
        jsxBracketSameLine: true,            <span class="comment">// &gt; 标签放在最后一行的末尾，而不是单独放在下一行</span>
        arrowParens: 'avoid',                <span class="comment">// 箭头圆括号</span>
        insertPragma: false,                 <span class="comment">// 在文件顶部插入一个特殊的 @format 标记</span>
        endOfLine: 'auto',                   <span class="comment">// 行尾换行格式</span>
        HTMLWhitespaceSensitivity: 'ignore',
        printWidth: 2000,                    <span class="comment">// 最大长度200个字符</span>
    }</span></div></div>
<div class="block-detail"><span class="detail-desc">admin/.eslintrc.js</span><div class="detail-content">    <span>module.exports = {
        rules: {
            indent: 'off',
            "space-before-function-paren": "off"
        }
    }</span></div></div>
<div class="block-detail"><span class="detail-desc">如果项目中有.editorconfig 该文件用来定义项目的编码规范 优先级比编辑器自身的设置要高 需与Prettier和ESLint相符</span><div class="detail-content">    <span>[*.{js,jsx,ts,tsx,vue}]
    indent_style = space
    indent_size = 2
    trim_trailing_whitespace = true
    insert_final_newline = true</span></div></div>

<span style="color:#f66">清空 src/views/</span>
<span style="color:#f66">清空 src/components/</span>
<div class="block-detail"><span class="detail-desc">admin/src/main.js</span><div class="detail-content">    <span>import { createApp } from 'vue'
    import router from './router'
    import store from './store'
    import App from './App.vue'

    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')</span></div></div>
<div class="block-detail"><span class="detail-desc">admin/src/App.vue</span><div class="detail-content">    <span>&lt;template&gt;
        &lt;router-view /&gt;
    &lt;/template&gt;

    &lt;style lang="scss"&gt;&lt;/style&gt;</span></div></div>
<div class="block-detail"><span class="detail-desc">admin/src/router/index.js</span><div class="detail-content">    <span>import { createRouter, createWebHashHistory } from 'vue-router'

    const routes = []

    const router = createRouter({
        history: createWebHashHistory(),
        routes
    })

    export default router</span></div></div>
浏览器:http://localhost:8080/

<span class="h2 bg3 cf"> 构建登录页面 UI 结构 </span>
<div class="block-detail">    <span class="detail-desc">src/router/index.js</span><div class="detail-content">        <span><span class="comment">/**
         * 公开路由表
         */</span>
        const publicRoutes = [
            {
                path: '/login',
                component: () =&gt; import('@/views/login/index')
            }
        ]

        const router = createRouter({
            routes: publicRoutes
        })</span></div></div>

    src/views/login
<div class="block-detail">    <span class="detail-desc">src/views/login/index.vue</span><div class="detail-content">        <span>&lt;template&gt;
            &lt;div class="login-container"&gt;
                &lt;el-form class="login-form"&gt;
                    &lt;div class="title-container"&gt;
                        &lt;h3 class="title"&gt;用户登录&lt;/h3&gt;
                    &lt;/div&gt;

                    &lt;el-form-item prop="username"&gt;
                        &lt;span class="svg-container"&gt;
                            &lt;svg-icon icon="user" /&gt;
                        &lt;/span&gt;
                        &lt;el-input placeholder="username" name="username" type="text" /&gt;
                    &lt;/el-form-item&gt;

                    &lt;el-form-item prop="password"&gt;
                        &lt;span class="svg-container"&gt;
                            &lt;svg-icon icon="password" /&gt;
                        &lt;/span&gt;
                        &lt;el-input placeholder="password" name="password" /&gt;
                        &lt;span class="show-pwd"&gt;
                            &lt;svg-icon icon="eye" /&gt;
                        &lt;/span&gt;
                    &lt;/el-form-item&gt;

                    &lt;el-button type="primary" style="width: 100%; margin-bottom: 30px"&gt;登录&lt;/el-button&gt;
                &lt;/el-form&gt;
            &lt;/div&gt;
        &lt;/template&gt;

        &lt;script setup&gt;
        <span class="comment">// 导入组件之后无需注册可直接使用</span>
        import {} from '@element-plus/icons'
        import {} from 'vue'
        &lt;/script&gt;
        
        &lt;style lang="scss" scoped&gt;
        $bg: #2d3a4b;
        $dark_gray: #889aa4;
        $light_gray: #eee;
        $cursor: #fff;

        .login-container {
            min-height: 100%;
            width: 100%;
            background-color: $bg;
            overflow: hidden;

            .login-form {
                position: relative;
                width: 520px;
                max-width: 100%;
                padding: 160px 35px 0;
                margin: 0 auto;
                overflow: hidden;

                ::v-deep .el-form-item {
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                    color: #454545;
                }

                ::v-deep .el-input {
                    display: inline-block;
                    height: 47px;
                    width: 85%;

                    input {
                        background: transparent;
                        border: 0px;
                        -webkit-appearance: none;
                        border-radius: 0px;
                        padding: 12px 5px 12px 15px;
                        color: $light_gray;
                        height: 47px;
                        caret-color: $cursor;
                    }
                }
            }

            .svg-container {
                padding: 6px 5px 6px 15px;
                color: $dark_gray;
                vertical-align: middle;
                display: inline-block;
            }

            .title-container {
                position: relative;

                .title {
                    font-size: 26px;
                    color: $light_gray;
                    margin: 0px auto 40px auto;
                    text-align: center;
                    font-weight: bold;
                }
            }

            .show-pwd {
                position: absolute;
                right: 10px;
                top: 7px;
                font-size: 16px;
                color: $dark_gray;
                cursor: pointer;
                user-select: none;
            }
        }
        &lt;/style&gt;</span></div></div>
    
<div class="block-detail">    <span class="detail-desc">src/styles/index.scss</span><div class="detail-content">        <span>html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        }

        #app {
            height: 100%;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
        }

        a:focus,
        a:active {
            outline: none;
        }

        a,
        a:focus,
        a:hover {
            cursor: pointer;
            color: inherit;
            text-decoration: none;
        }

        div:focus {
            outline: none;
        }

        .clearfix {
            &:after {
                visibility: hidden;
                display: block;
                font-size: 0;
                content: ' ';
                clear: both;
                height: 0;
            }
        }</span></div></div>
<div class="block-detail">    <span class="detail-desc">src/main.js</span><div class="detail-content">        <span>// 导入全局样式
        import './styles/index.scss'</span></div></div>

    导入 <a href="https://element-plus.gitee.io/zh-CN/" target="_blank">Element Plus</a>
<div class="block-detail">        <span class="detail-desc">快捷方式</span><div class="detail-content">            <span>
            <span class="block-command">admin</span> vue add element-plus
                ? How do you want to import Element Plus?  <span class="comment">// 如何导入Element Plus</span>
                    &gt; Fully import     <span class="comment">// 全局导入</span>
                    Import on demand <span class="comment">// 按需导入</span>
                ? Do you want to overwrite the SCSS variables of Element Plus? (y/N)     <span class="comment">// 生成覆盖变量的scss文件</span>
                ? Choose the locale you want to load, the default locale is English (en) <span class="comment">// 选择想要加载的语言环境，默认语言环境是英语</span>
                    en 
                    &gt; zh-cn 
                    af-za 
                ✔  Successfully installed plugin: vue-cli-plugin-element-plus
            src/App.vue
                &lt;template&gt;
                    &lt;router-view /&gt;
                &lt;/template&gt;

                &lt;script&gt;
                export default {
                    name: 'App'
                }
                &lt;/script&gt;

                &lt;style&gt;&lt;/style&gt;
            admin/src/main.js
                import installElementPlus from './plugins/element'
                installElementPlus(app)</span></div></div>
<div class="block-detail">        <span class="detail-desc">方式二</span><div class="detail-content">            <span>
            <span class="block-command">admin</span> npm i element-plus --save <span class="comment">// 1.0.2-beta.28</span>
            admin/src/main.js
                import ElementPlus from 'element-plus'
                import 'element-plus/dist/index.css'
                app.use(ElementPlus)
            使用: &lt;el-button&gt;默认按钮&lt;/el-button&gt;</span></div></div>

    SVG图标通用解决方案
<div class="block-detail">        <span class="detail-desc">src/components/SvgIcon/index.vue</span><div class="detail-content">            <span>&lt;template&gt;
                &lt;div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className" /&gt;
                &lt;svg v-else class="svg-icon" :class="className" aria-hidden="true"&gt;
                    &lt;use :xlink:href="iconName" /&gt;
                &lt;/svg&gt;
            &lt;/template&gt;

            &lt;script setup&gt;
            import { isExternal as external } from '@/utils/validate'
            import { defineProps, computed } from 'vue'
            const props = defineProps({
                <span class="comment">// icon 图标</span>
                icon: {
                    type: String,
                    required: true
                },
                <span class="comment">// 图标类名</span>
                className: {
                    type: String,
                    default: ''
                }
            })

            <span class="comment">/**
            * 判断是否为外部图标
            */</span>
            const isExternal = computed(() =&gt; external(props.icon))
            <span class="comment">/**
            * 外部图标样式
            */</span>
            const styleExternalIcon = computed(() =&gt; ({
                mask: `url(${props.icon}) no-repeat 50% 50%`,
                '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
            }))
            <span class="comment">/**
            * 项目内图标
            */</span>
            const iconName = computed(() =&gt; `#icon-${props.icon}`)
            &lt;/script&gt;

            &lt;style scoped&gt;
            .svg-icon {
                width: 1em;
                height: 1em;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }

            .svg-external-icon {
                background-color: currentColor;
                mask-size: cover !important;
                display: inline-block;
            }
            &lt;/style&gt;</span></div></div>
<div class="block-detail">        <span class="detail-desc">src/utils/validate.js</span><div class="detail-content">            <span><span class="comment">/**
             * 判断是否为外部资源
             */</span>
            export function isExternal(path) {
                return /^(https?:|mailto:|tel:)/.test(path)
            }</span></div></div>

        使用：外部图标
            import SvgIcon from '@/components/SvgIcon'
            &lt;svg-icon icon="https://res.lgdsunday.club/user.svg"&gt;&lt;/svg-icon&gt;

        使用：内部图标
            src/icons/
            src/icons/svg/ <span class="comment">// SVG资源</span>
<div class="block-detail">            <span class="detail-desc">src/icons/index.js</span><div class="detail-content">                <span>import SvgIcon from '@/components/SvgIcon'
                <span class="comment">// 1. 导入所有的SVG图标</span>
                <span class="comment">// https://webpack.docschina.org/guides/dependency-management/#requirecontext</span>
                <span class="comment">// 通过 require.context() 函数来创建自己的 context</span>
                const svgRequire = require.context('./svg', false, /\.svg$/)
                <span class="comment">// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。</span>
                <span class="comment">// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标</span>
                <span class="comment">// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入</span>
                svgRequire.keys().forEach(svgIcon =&gt; svgRequire(svgIcon))

                <span class="comment">// 2. 完成SvgIcon全局注册</span>
                export default app =&gt; {
                    app.component('svg-icon', SvgIcon)
                }</span></div></div>
<div class="block-detail">            <span class="detail-desc">src/main.js</span><div class="detail-content">                <span>// 导入 svgIcon
                import installIcons from '@/icons'
                installIcons(app)</span></div></div>
            <span class="block-command">admin</span> npm i --save-dev svg-sprite-loader@6.0.9
<div class="block-detail">            <span class="detail-desc">admin/vue.config.js</span><div class="detail-content">                <span>const path = require('path')
                function resolve(dir) {
                    return path.join(__dirname, dir)
                }
                <span class="comment">// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F</span>
                module.exports = {
                    chainWebpack(config) {
                        <span class="comment">// 设置 svg-sprite-loader</span>
                        config.module.rule('svg').exclude.add(resolve('src/icons')).end()
                        config.module
                            .rule('icons')
                            .test(/\.svg$/)
                            .include.add(resolve('src/icons'))
                            .end()
                            .use('svg-sprite-loader')
                            .loader('svg-sprite-loader')
                            .options({
                                symbolId: 'icon-[name]'
                            })
                            .end()
                    }
                }</span></div></div>
            重新启动项目

    http://localhost:8080/#/Login

<span class="h2 bg3 cf"> 登陆逻辑 </span>
    表单验证
<div class="block-detail">        <span class="detail-desc">src/views/login/index.vue</span><div class="detail-content">            <span><span class="format-block">&lt;el-form :model="<i class="i1">loginForm</i>" :rules="<i class="i2">loginRules</i>"&gt;
                &lt;el-form-item prop="username"&gt;
                    &lt;el-input v-model="<i class="i1">loginForm</i>.username" /&gt;
                &lt;/el-form-item&gt;
                &lt;el-form-item prop="password"&gt;
                    &lt;el-input v-model="<i class="i1">loginForm</i>.password" /&gt;
                &lt;/el-form-item&gt;
            &lt;/el-form&gt;
                
            &lt;script setup&gt;
            import { ref } from 'vue'
            import { <i class="i3">validatePassword</i> } from './rules'
            <span class="comment">// 数据源</span>
            const <i class="i1">loginForm</i> = ref({
                username: 'super-admin',
                password: '123456'
            })
            <span class="comment">// 验证规则</span>
            const <i class="i2">loginRules</i> = ref({
                username: [{required: true, trigger: 'blur', message: '用户名为必填项'}],
                password: [{required: true, trigger: 'blur', validator: <i class="i3">validatePassword</i>()}]
            })
            &lt;/script&gt;</span></span></div></div>
<div class="block-detail">        <span class="detail-desc">src/views/login/rules.js</span><div class="detail-content">            <span><span class="format-block">export const <i class="i3">validatePassword</i> = () =&gt; {
                return (rule, value, callback) =&gt; {
                    if (value.length &lt; 6) {
                        callback(new Error('密码不能少于6位'))
                    } else {
                        callback()
                    }
                }
            }</span></span></div></div>
    密码框状态通用处理
<div class="block-detail">        <span class="detail-desc">src/views/login/index.vue</span><div class="detail-content">        <span><span class="format-block">&lt;el-input placeholder="password" name="password" <i class="i2">:type="passwordType"</i> v-model="loginForm.password" /&gt;
        &lt;svg-icon <i class="i2">:icon="passwordType === 'password' ? 'eye' : 'eye-open'"</i> <i class="i3">@click="onChangePwdType"</i> /&gt;
        
        <span class="comment">// 处理密码框文本显示状态</span>
        const <i class="i2">passwordType</i> = ref('password')
        const <i class="i3">onChangePwdType</i> = () =&gt; {
            if (passwordType.value === 'password') {
                passwordType.value = 'text'
            } else {
                passwordType.value = 'password'
            }
        }</span></span></div></div>
    通用后台登录方案        
        1.封装 axios 模块
            <span class="block-command">admin</span> npm i axios --save <span class="comment">// 0.24.0</span>
<div class="block-detail">            <span class="detail-desc">admin/.env.development</span><div class="detail-content">                <span><span class="format-block">&#35; 标志
                ENV = 'development'

                &#35; base api
                <i class="i1">VUE_APP_BASE_API</i> = '/api'</span></span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/.env.production</span><div class="detail-content">                <span><span class="format-block">&#35; 标志
                ENV = 'production'

                &#35; base api
                <i class="i1">VUE_APP_BASE_API</i> = '/prod-api'</span></span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/src/utils/request.js</span><div class="detail-content">                <span><span class="format-block">import axios from 'axios'

                const service = axios.create({
                    baseURL: process.env.<i class="i1">VUE_APP_BASE_API</i>,
                    timeout: 5000
                })

                export default service</span></span></div></div>
        2.封装 接口请求 模块
<div class="block-detail">            <span class="detail-desc">admin/src/api/sys.js</span><div class="detail-content">                <span><span class="format-block">import request from '@/utils/request'

                <span class="comment">/**
                * 登录
                */</span>
                export const <i class="i2">login</i> = data =&gt; {
                    return request({
                        url: '/sys/login',
                        method: 'POST',
                        data
                    })
                }</span></span></div></div>
        3.封装登录请求动作
            <span class="block-command">admin</span> npm i md5 --save
<div class="block-detail">            <span class="detail-desc">admin/src/store/modules/user.js</span><div class="detail-content">                <span><span class="format-block">import { <i class="i2">login</i> } from '@/api/sys'
                import md5 from 'md5'
                <i class="i3">export default</i> {
                    namespaced: true,
                    state: () =&gt; ({}),
                    mutations: {},
                    actions: {
                        login(context, userInfo) {
                            const { username, password } = userInfo
                            return new Promise((resolve, reject) =&gt; {
                                <i class="i2">login</i>({
                                    username,
                                    password: md5(password)
                                })
                                    .then(data =&gt; {
                                        resolve()
                                    })
                                    .catch(err =&gt; {
                                        reject(err)
                                    })
                            })
                        }
                    }
                }</span></span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/src/store/index.js</span><div class="detail-content">                <span><span class="format-block">import { createStore } from 'vuex'
                import <i class="i3">user</i> from './modules/user.js'
                export default createStore({
                    modules: {
                        <i class="i3">user</i>
                    }
                })</span></span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/src/views/login/index.vue</span><div class="detail-content">                <span><span class="format-block">&lt;el-form <i class="i6">ref="loginFromRef"</i> :model="loginForm" :rules="loginRules"&gt;
                    &lt;el-button <i class="i5">:loading="loading"</i> <i class="i4">@click="handleLogin"</i>&gt;登录&lt;/el-button&gt;
                &lt;/el-form&gt;
                
                &lt;script setup&gt;
                import { ref } from 'vue'
                import { validatePassword } from './rules'
                import { useStore } from 'vuex'

                <span class="comment">// 登录动作处理</span>
                const <i class="i5">loading</i> = ref(false)
                const <i class="i6">loginFromRef</i> = ref(null)
                const store = useStore()
                const <i class="i4">handleLogin</i> = () =&gt; {
                    <i class="i6">loginFromRef</i>.value.validate(valid =&gt; {
                        if (!valid) return

                        <i class="i5">loading</i>.value = true
                        store
                        .dispatch('user/login', loginForm.value)
                        .then(() =&gt; {
                            <i class="i5">loading</i>.value = false
                            <span class="comment">// TODO: 登录后操作</span>
                        })
                        .catch(err =&gt; {
                            console.log(err)
                            <i class="i5">loading</i>.value = false
                        })
                    })
                }
                &lt;/script&gt;</span></span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/vue.config.js</span><div class="detail-content">                <span><span class="format-block">module.exports = {
                    devServer: {
                        <span class="comment">// 配置反向代理</span>
                        proxy: {
                            <span class="comment">// 当地址中有/api的时候会触发代理机制</span>
                            '/api': {
                                <span class="comment">// 要代理的服务器地址  这里不用写 api</span>
                                target: 'https://api.imooc-admin.lgdsunday.club/',
                                changeOrigin: true <span class="comment">// 是否跨域</span>
                            }
                        }
                    }
                }</span></span></div></div>
        4.保存服务端返回的 token
<div class="block-detail">            <span class="detail-desc">admin/src/utils/storage.js</span><div class="detail-content">                <span><span class="format-block"><span class="comment">/**
                 * 存储数据
                 */</span>
                export const setItem = (key, value) =&gt; {
                    <span class="comment">// 将数组、对象类型的数据转化为 JSON 字符串进行存储</span>
                    if (typeof value === 'object') {
                        value = JSON.stringify(value)
                    }
                    window.localStorage.setItem(key, value)
                }

                <span class="comment">/**
                 * 获取数据
                 */</span>
                export const getItem = key =&gt; {
                    const data = window.localStorage.getItem(key)
                    try {
                        return JSON.parse(data)
                    } catch (err) {
                        return data
                    }
                }

                <span class="comment">/**
                 * 删除数据
                 */</span>
                export const removeItem = key =&gt; {
                    window.localStorage.removeItem(key)
                }

                <span class="comment">/**
                 * 删除所有数据
                 */</span>
                export const removeAllItem = key =&gt; {
                    window.localStorage.clear()
                }</span></span></div></div>
            admin/src/constant/index.js
                export const TOKEN = 'token'
<div class="block-detail">            <span class="detail-desc">admin/src/store/modules/user.js</span><div class="detail-content">                <span><span class="format-block">import { login } from '@/api/sys'
                import md5 from 'md5'
                <i class="order4">import { setItem, getItem } from '@/utils/storage'
                import { TOKEN } from '@/constant'</i>

                export default {
                    namespaced: true,
                    state: () =&gt; ({
                        <i class="order3">token: getItem(TOKEN) || ''</i>
                    }),
                    mutations: {
                        <i class="order2">setToken(state, token) {
                            state.token = token
                            setItem(TOKEN, token)
                        }</i>
                    },
                    actions: {
                        login(context, userInfo) {
                            const { username, password } = userInfo
                            return new Promise((resolve, reject) =&gt; {
                                login({
                                    username,
                                    password: md5(password)
                                })
                                    .then(data =&gt; {
                                        <i class="order1">this.commit('user/setToken', data.data.data.token)</i>
                                        resolve()
                                    })
                                    .catch(err =&gt; {
                                        reject(err)
                                    })
                            })
                        }
                    }
                }</span></span></div></div>
            响应数据的统一处理
<div class="block-detail">            <span class="detail-desc">admin/src/utils/request.js</span><div class="detail-content">                <span><span class="format-block">import { ElMessage } from 'element-plus'

                <span class="comment">// 响应拦截器</span>

                service.interceptors.response.use(
                    response =&gt; {
                        const { success, message, data } = response.data
                        <span class="comment">//   要根据success的成功与否决定下面的操作</span>
                        if (success) {
                            return data
                        } else {
                            <span class="comment">// 业务错误</span>
                            ElMessage.error(message) <span class="comment">// 提示错误消息</span>
                            return Promise.reject(new Error(message))
                        }
                    },
                    error =&gt; {
                        <span class="comment">// TODO: 将来处理 token 超时问题</span>
                        ElMessage.error(error.message) <span class="comment">// 提示错误信息</span>
                        return Promise.reject(error)
                    }
                )</span></span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/src/store/modules/user.js</span><div class="detail-content">                <span><span class="format-block"><i class="order1">this.commit('user/setToken', data.token)</i></span></span></div></div>
        5.登录鉴权
            admin/src/layout/index.vue
<div class="block-detail">            <span class="detail-desc">admin/src/router/index.js</span><div class="detail-content">                <span>{
                    path: '/',
                    component: () =&gt; import('@/layout/index')
                }</span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/src/permission.js</span><div class="detail-content">                <span><span class="format-block">import router from './router'
                import store from './store'

                <span class="comment">// 白名单</span>
                const whiteList = ['/login']
                <span class="comment">/**
                * 路由前置守卫
                */</span>
                router.beforeEach(async (to, from, next) =&gt; {
                    <span class="comment">// 存在 token ，进入主页</span>
                    <span class="comment">// if (store.state.user.token) {</span>
                    <span class="comment">// 快捷访问</span>
                    if (store.getters.token) {
                        if (to.path === '/login') {
                            next('/')
                        } else {
                            next()
                        }
                    } else {
                        <span class="comment">// 没有token的情况下，可以进入白名单</span>
                        if (whiteList.indexOf(to.path) &gt; -1) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                })</span></span></div></div>
            admin/src/store/getters.js ▾ 快捷访问
                ↧const getters = {
                    token: state =&gt; state.user.token
                }
                export default getters↥
<div class="block-detail">            <span class="detail-desc">admin/src/store/index.js</span><div class="detail-content">                <span>import getters from './getters'
                export default createStore({
                    getters
                })</span></div></div>
<div class="block-detail">            <span class="detail-desc">admin/src/main.js</span><div class="detail-content">                <span>// 导入权限控制模块
                import './permission'</span></div></div>



</pre>
▾↧↥

::: details 标准化大厂编程规范解决方案之ESLint + Git Hooks

<pre class="code-block">
指望所有人都看一遍规范文档？ 自动处理规范化的内容！

<span class="block-command">hello</span> vue create coding-standard
    Default ([Vue 2] babel, eslint)      
    Default ([Vue 3] babel, eslint)
    &gt; Manually select features  <span class="comment">// 推荐</span>
            (*) Choose Vue version  (*)Babel  (*)Linter/Formatter
                  2.x
                &gt; 3.x  
                      ESLint with error prevention only <span class="comment">// 仅包含错误的ESLint</span>
                      ESLint + Airbnb config            <span class="comment">// Airbnb的ESLint延伸规则</span>
                    &gt; ESLint + Standard config          <span class="comment">// 标准的ESLint延伸规则</span>
                      ESLint + Prettier                    
<span class="block-command">hello</span> cd coding-standard
<span class="block-command">coding-standard</span> npm run serve
<span class="block-command">coding-standard</span> npm run build

<span class="h2 bg3 cf"> 从动检测 </span>
ESLint目标：提供一个插件化的javascript代码检测工具
ESLint配置：coding-standard/.eslintrc.js <a href="https://eslint.bootcss.com/docs/user-guide/configuring" target="_blank">文档</a>
    module.exports = {        
        root: true,                                              <span class="comment">// 表示当前目录即为根目录 规则将被限制到该目录下</span>
        env: { node: true },                                     <span class="comment">// 检测的环境</span>
        extends: ["plugin:vue/vue3-essential", "@vue/standard"], <span class="comment">// ESLint 中基础配置需要继承的配置</span>
        parserOptions: { parser: "babel-eslint" },               <span class="comment">// 解析器</span>
        <span class="comment">/**
        * 启用规则：错误级别
        * "off"/0   关闭规则
        * "warn"/1  开启规则，使用警告级别的错误：warn (不会导致程序退出)
        * "error"/2 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
        */</span>
        rules: {
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
        }
    }

coding-standard/src/components/HelloWorld.vue
    name: 'HelloWorld' 改为 name: "HelloWorld"

      35:9  <span style="color:#F66">error</span>  Strings must use singlequote  <span style="color:#09c;font-weight:bold">quotes</span>
    <span style="color:#F66">✖ 1 problem (1 error, 0 warnings)
      1 error and 0 warnings potentially fixable with the `--fix` option.</span>

    解决：
        按照 ESLint 的要求修改代码
      &gt; 修改 ESLint 的验证规则 .eslintrc.js
            module.exports = {
                rules: {
                    "<span style="color:#09c;font-weight:bold">quotes</span>": "warn" <span class="comment">// off、warn、error</span>
                }
            }
            <span class="block-command">coding-standard</span> npm run serve

<span class="h2 bg3 cf"> 主动规范 </span>
团队中人员的水平不齐 大量的ESLint规则校验 会让开发者头疼 影响开发进度
<a href="https://www.prettier.cn/" target="_blank">Prettier</a>: 代码格式化工具
1. VSCode 中安装 prettier
2. coding-standard/.prettierrc
    {    
        "semi": false,           <span class="comment">// 不尾随分号</span>
        "trailingComma": "none", <span class="comment">// 不尾随逗号</span>
        "singleQuote": true,     <span class="comment">// 使用单引号</span>
        "tabWidth": 4            <span class="comment">// 代码缩进</span>
    }
3. VSCode &gt; setting &gt; 工作区    ▣ Format On Save

<span class="h1">Prettier和ESLint的唯一冲突</span>
    export default {
        created() {}
    }

      8:10  <span style="color:#F66">error</span>  Missing space before function parentheses  <span style="color:#09c;font-weight:bold">space-before-function-paren</span>
    <span style="color:#F66">✖ 1 problem (1 error, 0 warnings)
      1 error and 0 warnings potentially fixable with the `--fix` option.</span>

    解决：修改 ESLint 的验证规则 .eslintrc.js
        module.exports = {
            rules: {
                "<span style="color:#09c;font-weight:bold">space-before-function-paren</span>": "off" <span class="comment">// off、warn、error</span>
            }
        }
        <span class="block-command">coding-standard</span> npm run serve

<span class="h2 bg3 cf"> 多规范之默认规范 </span>
<div class="block-detail">    <span class="detail-desc">coding-standard/.vscode/settings.json</span><div class="detail-content">    <span>{
        "editor.formatOnSave": true,
        "vetur.format.defaultFormatter.html": "prettier",
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[vue]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[html]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[scss]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
    }</span></div></div>
</pre>
:::

::: details 约定式提交规范

<pre class="code-block">
项目创建 参考标准化大厂编程规范解决方案

约定式提交规范要求：
    &lt;type&gt;[optional scope]: &lt;description&gt;   &lt;类型&gt;[可选 范围]: &lt;描述&gt;
    [optional body]                         [可选 正文]
    [optional footer]                       [可选 脚注]

<span style="color:#d96">按照规范提交太过繁琐</span>
<span class="block-command">xxxx</span> npm install -g <a href="https://github.com/commitizen/cz-cli" target="_blank">commitizen</a>@4.2.4
<span class="block-command">coding-standard</span> npm i cz-customizable@6.3.0 --save-dev

<div class="block-detail"><span class="detail-desc">coding-standard/package.json</span><div class="detail-content">    <span>"config": {
        "commitizen": {
            "path": "node_modules/cz-customizable"
        }
    }</span></div></div>
<div class="block-detail"><span class="detail-desc">coding-standard/.cz-config.js</span><div class="detail-content">    <span>module.exports = {
        <span class="comment">// 可选类型</span>
        types: [
            { value: 'feat', name: 'feat:     新功能' },
            { value: 'fix', name: 'fix:      修复' },
            { value: 'docs', name: 'docs:     文档变更' },
            { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
            {
                value: 'refactor',
                name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
            },
            { value: 'perf', name: 'perf:     性能优化' },
            { value: 'test', name: 'test:     增加测试' },
            { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
            { value: 'revert', name: 'revert:   回退' },
            { value: 'build', name: 'build:    打包' }
        ],
        <span class="comment">// 消息步骤</span>
        messages: {
            type: '请选择提交类型:',
            customScope: '请输入修改范围(可选):',
            subject: '请简要描述提交(必填):',
            body: '请输入详细描述(可选):',
            footer: '请输入要关闭的issue(可选):',
            confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
        },    
        skipQuestions: ['body', 'footer'], <span class="comment">// 跳过问题</span>
        subjectLimit: 72                   <span class="comment">// subject文字长度默认是72</span>
    }</span></div></div>

<span class="block-command">coding-standard</span> git cz  <span class="comment">// 代替 git commit</span>

<span style="color:#d96">如果有人忘记了使用 git cz 指令，直接就提交了怎么办呢？</span>
目标：当《提交描述信息》不符合 约定式提交规范 的时候，阻止当前的提交，并抛出对应的错误提示

Git hooks：
    commit-msg 可以用来规范化标准格式，并且可以按需指定是否要拒绝本次提交
    pre-commit 会在提交前被调用，并且可以按需指定是否要拒绝本次提交
    ...
工具：
    1. commitlint 用于检查提交信息
    <span class="block-command">coding-standard</span> npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
<div class="block-detail">    <span class="detail-desc">coding-standard/commitlint.config.js</span><div class="detail-content">        <span> <span class="comment">//确保保存为 UTF-8 的编码格式</span>
        module.exports = {
            extends: ['@commitlint/config-conventional'], <span class="comment">// 继承的规则</span>
            <span class="comment">// 定义规则类型</span>
            rules: {
                <span class="comment">// type 类型定义，表示 git 提交的 type 必须在以下类型范围内</span>
                'type-enum': [
                    2,
                    'always',
                    [
                        'feat',     <span class="comment">// 新功能 feature</span>
                        'fix',      <span class="comment">// 修复 bug</span>
                        'docs',     <span class="comment">// 文档注释</span>
                        'style',    <span class="comment">// 代码格式(不影响代码运行的变动)</span>
                        'refactor', <span class="comment">// 重构(既不增加新功能，也不是修复bug)</span>
                        'perf',     <span class="comment">// 性能优化</span>
                        'test',     <span class="comment">// 增加测试</span>
                        'chore',    <span class="comment">// 构建过程或辅助工具的变动</span>
                        'revert',   <span class="comment">// 回退</span>
                        'build'     <span class="comment">// 打包</span>
                    ]
                ],        
                'subject-case': [0] <span class="comment">// subject 大小写不做校验</span>
            }
        }</span></div></div>

    2. husky      是git hooks工具
    <span class="block-command">coding-standard</span> npm install husky@7.0.1 --save-dev
    <span class="block-command">coding-standard</span> npx husky install <span class="comment">// 或/package.json "scripts": {"prepare": "husky install"} 运行 npm run prepare 会生成 .husky 文件夹</span>
    执行成功提示：<span style="color:#69c">husky - Git hooks installed</span>

    添加 commitlint 的 hook 到 husky中 并在 commit-msg 的 hooks 下执行 npx --no-install commitlint --edit "$1" 指令
    <span class="block-command">coding-standard</span> npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
    coding-standard/.husky/commit-msg <span class="comment">// 生成的文件</span>

<span style="color:#d96">如果有人忘记配置保存自动格式代码直接就提交？</span>
    ● <strong>提交时自动检测</strong>
        <span class="block-command">coding-standard</span> npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src" <span class="comment">// 添加 commit 时的 hook （npx eslint --ext .js,.vue src 会在执行到该 hook 时运行）</span>
        coding-standard/.husky/pre-commit <span class="comment">// 生成的文件</span>

        测试：
            1. 关闭 VSCode 的自动保存操作
            2. 修改一处代码，使其不符合 ESLint 校验规则
            3. 执行 提交操作 会发现，抛出一系列的错误，代码无法提交

    ● <strong>提交时自动修复</strong>
        <a href="https://github.com/okonet/lint-staged" target="_blank">lint-staged</a> <span class="comment">// vue-cli 已经安装过了 直接使用即可</span>
<div class="block-detail">        <span class="detail-desc">coding-standard/package.json</span><div class="detail-content">            <span>"lint-staged": {
                "src<span class="comment">/**/</span>*.{js,vue}": [
                    "eslint --fix",
                    "git add"
                ]
            }</span></div></div>
<div class="block-detail">        <span class="detail-desc">coding-standard/.husky/pre-commit</span><div class="detail-content">            <span>#!/bin/sh
            . "$(dirname "$0")/_/husky.sh"

            npx lint-staged</span></div></div>
        再次执行提交代码 发现暂存区中不符合 ESlint 的内容，被自动修复
</pre>
:::

::: details Ewan

- 全局配置 config.js
- 资源统筹(应对架构变化资源调配) config.js

config.js
```js
const PATH = require('path')
const {readFile} = require('./scripts/utils/fs')

// 系统配置
module.exports.config = { title: '标题文本' }

// 资源中枢
const MAP_DIR =   { ".usage": "../.usage"}
const MAP_FILE =  { "package": "../../package.json" }
const MAP_RES =   { "logo": "resources/images/logo.png" }
const MAP_DATA =  { "main": "data/.MAIN.js" }
const MAP_UTILS = { "ewan": "scripts/utils/ewan.js" }
const MAP_CORE =  { "create": "core/create.js" }
const MAP_PARSE = { "search": "core/parse/search.js" }
const requireFile = relativePath => require(PATH.resolve(__dirname, relativePath))
const readFileFn = relativePath => readFile(PATH.resolve(__dirname, relativePath))
const fetchFileByType = {
    "DATA":  key => requireFile(MAP_DATA[key]),
    "UTILS": key => requireFile(MAP_UTILS[key]),
    "CORE":  key => requireFile(MAP_CORE[key]),
    "PARSE": key => requireFile(MAP_PARSE[key]),
    "FILE":  key => requireFile(MAP_FILE[key]),
    "RES":   key => requireFile(MAP_RES[key])
}
const fetchPathByType = {
    "DATA":  key => PATH.resolve(__dirname, MAP_DATA[key]),
    "UTILS": key => PATH.resolve(__dirname, MAP_UTILS[key]),
    "CORE":  key => PATH.resolve(__dirname, MAP_CORE[key]),
    "PARSE": key => PATH.resolve(__dirname, MAP_PARSE[key]),
    "DIR":   key => PATH.resolve(__dirname, MAP_DIR[key]),
    "FILE":  key => PATH.resolve(__dirname, MAP_FILE[key]),
    "RES":   key => PATH.resolve(__dirname, MAP_RES[key])
}
const readFileByType = {
    "DATA":  key => readFileFn(MAP_DATA[key]),
    "UTILS": key => readFileFn(MAP_UTILS[key]),
    "CORE":  key => readFileFn(MAP_CORE[key]),
    "PARSE": key => readFileFn(MAP_PARSE[key]),
    "FILE":  key => readFileFn(MAP_FILE[key]),
    "RES":   key => readFileFn(MAP_RES[key])
}
module.exports.fetch = identifier => {
    const [type, key] = identifier.split('|')
    return fetchFileByType[type](key)
}
module.exports.fetchPath = identifier => {
    const [type, key] = identifier.split('|')
    return fetchPathByType[type](key)
}
module.exports.read = identifier => {
    const [type, key] = identifier.split('|')
    return readFileByType[type](key)
}
```

<pre class="code-block">
const { config, fetch, fetchPath } = require('../config')
const {writeFileSync} = fetch('UTILS|fs')
const src = fetchPath("DATA|src:updateTime")
read('RES|markdown.scene')
</pre>
:::

::: details vuepress

<pre class="code-block">
<span class="h2 bg3 cf"> 自定义格式 </span>

预设className：
    颜色 c0 c3 c6 c9 cc cf
    背景 bg0 bg3 bg6 bg9 bgc bgf
    标题 h1 h2 h3 h4 h5 h6
    注释 comment

普通区域
● <strong>Flex</strong>
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 8             <span class="comment">// 小于等于10 flex-grow: 8</span>
    col 01
    &#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61; 100classname  <span class="comment">// 大于10 flex-basis: n  可注入自定义classname</span>
    col 02
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

自定义代码块 
&#61;&#61;&#61;&#43; 
    ANCHOR&#91;1627821297227|node-inspect&#93;  &gt; 
    ANCHOR&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;
    ANCHOR&#91;1123403874911|gulp&#93;                        &lt;div class="anchor" name="1123403874911" id="1123403874911"&gt;&lt;/div&gt;
    ANCHOR&#91;1123403874915|gulp&#93;
    ANCHOR&#91;1123403874919|gulp&#93;
    ANCHOR&#91;1627903874915|gulp&#93;
    ANCHOR&#91;1627903874915|gulp&#93;
    ANCHOR&#91;1627908583281|commander&#93;
    ANCHOR&#91;1627905586210|chokidar&#93;
    ANCHOR&#91;1627905787356|chalk&#93;
    ANCHOR&#91;1627966781710|node-plantuml&#93;
    ANCHOR&#91;1627970757090|uglify-js&#93;
    ANCHOR&#91;1627970949874|child_process&#93;
    ANCHOR&#91;1627971037955|nodemon&#93;
    ANCHOR&#91;1628080742911|pm2&#93; 
    ANCHOR&#91;1628080758946|concurrently&#93; 
    ANCHOR&#91;1628080852157|node-cache&#93; 

    TITLE2&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;
    TITLE2&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;
    
    LINK&#91;1627821297227|自命名&#93;  LINK&#91;1627821297227&#93;
    LINK&#91;npm_user_register|没有帐户&多人发布&#93;
    LINK&#91;npm_user_register|没有帐户&多人发布&#93;
    LINK&#91;1627821297227|node-inspect&#93;
        

    
    

    

    &#91;FORM_START&#93;

        [{color:#f33}e4fc5eb9-316a-48e5-a970-dc116e7ab897]
        <img :src="$withBase('/images/db-brace-left.png')">[{color:#26f}API]<img :src="$withBase('/images/db-brace-right.png')">
        <img :src="$withBase('/images/db-brace-left.png')">[{color:#26f}RES]<img :src="$withBase('/images/db-brace-right.png')">

        按钮： 
        [BTNbg6 cf|+ New Collection]
        [BTNbg6 cf|Save to collection-name]
        [BTNbg6 cf|Manage Environments]
        [BTNbg6 cf|Add]
        [BTNbg6 cf|Add] 
        [BTN|Send] 
        [BTN|Save]
        [BTNbg6 cf|Save]
        [BTNbg6 cf|Send]
        [BTN|Send] [BTN|Save]
        [BTNbg6 cf|Select File]
        [BTNbg6 cf|Save]
        [BTNbg6 cf|Send]

        INPUT: 
        ▭说明文本▭
        ▭{color:#ffaa22}collection-name▭
        ▭{color:#20b477}(bd)登录▭
        ▭{color:#8922ff}environment-name▭
        ▭<img :src="$withBase('/images/db-brace-left.png')">[{color:#26f}API]<img :src="$withBase('/images/db-brace-right.png')">/api/login/▭
        ▭<img :src="$withBase('/images/db-brace-left.png')">[{color:#26f}RES]<img :src="$withBase('/images/db-brace-right.png')">/api/cdn/UploadFile/▭

        选项卡：
        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        ▥⇤Params  Authorization  [Headers]  Body  Pre-request Script  Tests  Settings▥
        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        单选：
        ◉⇤none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL◉
        ◉⇤none  form-data  x-www-form-urlencoded  raw  [binary]  GraphQL◉

        列表菜单： 
        ▤collection-name[登录(active),上传]▤                       
        ▤(vtop)collection-name{color:#ffaa22}[登录(active),上传]▤
        ▤collection-name{color:#ffaa22}(bd)▤
        ▤Add Request▤
        ▤(vtop)collection-name{color:#ffaa22}[登录(active),上传]▤
        ▤(vtop)collection-name{color:#ffaa22}<span class="active">登录,上传</span>▤

        下拉选项：
        ▼POST▼ 
        ▼environment-name{color:#8922ff}▼ 
        ▼collection-name{color:#ffaa22}(bd)▼
        ▼environment-name{color:#8922ff}▼
        ▼environment-name{color:#8922ff}▼

        表格：
        ▦⇤VARIABLE(变量)        INITIAL VALUE(初始值)      CURRENT VALUE(当前值) 
        API{color:#26f}  https://api.com:4432  https://api.com:4432
        RES{color:#26f}  https://res.com:4433  https://res.com:4433
        ▦
        ▦⇤KEY        VALUE      DESCRIPTION  
            username   ewan
            password   123456
        ▦
        ▦⇤KEY        VALUE      DESCRIPTION  
            authenticate  e4fc5eb9-316a-48e5-a970-dc116e7ab897{color:#f33}
        ▦

        连接格式：
        ↴background-color:#eef7f4; vertical-align:top; padding:10px↤ ↦       

        
    &#91;FORM_END&#93;

    表单重构：
    ﹃
        ⊙Radio◉
        ☐Checkbox▣
        ⅠInput▏
        ▎Textarea▎
        ▭ Button▭ ▬ ▭
        ▼ Select
        ▤Table▥
        ☰List☷
        ▮Tab▯
        TreeSelect
        ↦ ↔ → ⇥ Step
        ⚠Alert⊗

    ﹄


&#61;&#61;&#61;&#45;


<span class="h2 bg3 cf"> 场景 </span>
<span class="h2 bg3 cf"> 攻略 </span>
<span class="h2 bg3 cf"> 方案 </span>
<span class="h2 bg3 cf"> 规范 </span>
<span class="h2 bg3 cf"> PlantUML </span>
</pre>
:::

::: details Javascript注释
<div class="box-flex">
<div class="box-flex-item  flex-1">


<pre class="code-block">
<span class="h1 bg3 cf"> 普通注释 </span>
目的：帮助开发者和阅读者更好地理解程序+
规范：
    1. 总是在单行注释符后留一个空格
    2. 总是在多行注释的结束符前留一个空格(使星号对齐)
    3. 不要把注释写在多行注释的开始符、结束符所在行
    4. 不要编写无意义的注释
</pre>

</div>
<div class="box-flex-item " style="flex-basis:100px">


<pre class="code-block">

&nbsp; <span class="comment color5">// 正确的单行注释</span>
&nbsp; 
&nbsp; <span class="comment color5">/*
&nbsp; 正确的多行注释
&nbsp; 注释符星号对齐                           
&nbsp;  */</span>
</pre>

</div>
<div class="box-flex-item " style="flex-basis:300px">


<pre class="code-block">

<span class="comment color1">/* 不要在此书写
                             
   不要在此书写 */</span>
 <span class="comment color1">// 声明变量value(无意义)</span>
</pre>

</div>
<div class="box-flex-item  flex-1">

<strong>■ TODO</strong>

<pre class="code-block"> <span class="comment">// TODO 未处理IE6-8的兼容性</span>
function setOpacity(node, val) {
    node.style.opacity = val;
}
</pre>

</div>
</div>

<div class="box-flex">
<div class="box-flex-item " style="flex-basis:400px">


<pre class="code-block">
<span class="h1 bg3 cf"> 文档注释 </span>
规范：
    1. 星号对齐
    2. 注释内容与星号间留一个空格
    3. 文档注释必须包含一个或多个注释标签
</pre>

</div>
<div class="box-flex-item  flex-1">


<pre class="code-block">

类型：String/Number/Object/Array/ArrayLike&lt;Element&gt;/Element
多类型：{(string|string[])} {*}

参数有默认值时：[参数名=默认值]
</pre>

</div>
</div>

<div class="box-flex">
<div class="box-flex-item " style="flex-basis:200px">


<pre class="code-block">
<span class="comment color1">/**
 * 模块说明
 * @module 模块名
 */</span>

<span class="comment color2">/**
 * 类说明
 * @class 类名
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */</span>

<span class="comment color3">/**
 * 类方法说明
 * @method 方法名
 * @for 所属类名                     
 * @param {参数类型} 参数名 参数说明  
 * @return {返回值类型} 返回值说明    
 * @static                          
 */</span>
</pre>

</div>
<div class="box-flex-item " style="flex-basis:300px">


<pre class="code-block">
<span class="comment color1">/**
 * 提供最基础、最核心的接口
 * @module Core
 */</span>

<span class="comment color2">/**
 * 节点集合类
 * @class NodeList
 * @constructor                     
 * @param {ArrayLike&lt;Element&gt;} nodes 初始化节点
 */</span>

<span class="comment color3">/**
 * 返回当前集合中指定位置的元素
 * @method
 * @for NodeList                                         
 * @param {Number} [i=0] 位置下标
 * @return {Element} 指定元素   
 */</span>
</pre>

</div>
<div class="box-flex-item  flex-4">


<pre class="code-block">
<span class="comment color4">/**
 * 属性说明
 * @property {属性类型} 属性名
 */</span>




&nbsp; <span class="comment">// 必须搭配@constructor或@static使用，分别标记非静态类与静态类</span>
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp; <span class="comment">// 没有指定@for时，表示此函数为全局或模块顶层函数</span>
&nbsp; <span class="comment">// 当函数有参数时</span>
&nbsp; <span class="comment">// 当函数有返回值时</span>
&nbsp; <span class="comment">// 当函数为静态函数时</span>

</pre>

</div>
</div>

<div class="box-flex">
<div class="box-flex-item  flex-1">


<pre class="code-block">
<span class="h1 bg3 cf"> 文件注释 </span>
规范：
    1. 文件注释位于文件的最前面
    2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中2222

<span class="comment color3">/*!
 * jRaiser 2 Javascript Library
 * kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)      <span class="comment">// 概要说明及版本(必须) 修改时间(必须)以ISO格式表示</span>
 * http://jraiser.org/ | Released under MIT license    <span class="comment">// 项目地址(开源组件必须) 开源协议(开源组件必须)</span>
 * Copyright 2005-2013 56.com                          <span class="comment">// 版权声明(必须)</span>
 *
 * Include sizzle (http://sizzlejs.com/)               <span class="comment">// 如果文件内包含开源组件 则必须在文件注释中进行说明</span>
 */</span>
</pre>

</div>
</div>


<pre class="code-block">
<span class="h1 bg3 cf"> 块标签 </span>
</pre>
<div class="box-flex">
<div class="box-flex-item  flex-2">


<pre class="code-block">
<span class="h1">对文件进行描述</span>
@author       指定项目作者
@copyright    描述版权信息
@see          描述可以参考外部资源
@version      描述版本信息
@tutorial     插入一个指向教程的链接，作为文档的一部分
@since        描述该功能哪个版本哪个时间添加进来的
@summary      描述一个简写版本
@file         文件说明，在文件开头使用
@license      描述代码才有那种软件许可协议

<span class="h1">标注js使用方法</span>
@returns      描述一个函数的返回值
@param        描述传递给函数的参数
@description  描述
@example      举例
@throws       描述可能会被抛出什么样的错误

<span class="h1">开发者备注</span>
@deprecated   标注关联代码已经被弃用
@todo         描述一个将要完成的任务
</pre>

</div>
<div class="box-flex-item  flex-3">


<pre class="code-block">
<span class="h1">文件详细结构</span>
@abstract     标注该成员必须在子类中实现或重写
@access       标注该成员的访问级别
@access private &gt; @private
@access protected &gt; @protected
@access public &gt; @public
@augments(@extends)    标注这个子类继承自哪个父类，后面需要加父类名
@class(@constructor)   标注该函数是一个构造函数，需要使用new来实例化
@constant(@const)      标注这个对象是一个常量
@constructs            标注这个函数用来作为类的构造器
@default               标注默认值
@exports               标注javascript模块导出的内容
@function(@func、@method) 标注该对象作为一个函数
@global                   标注为全局变量(对象)
@implements    标注实现一个接口
@inheritdoc    标注继承其父类的文档
@inner         标注为其父类的内部成员
@instance      标注为其父类的实例成员
@interface     标注其为可以实现的接口
@kind          指明标注的类型(@kind class = @class)
@lends         将一个字面量对象的所有成员标记为某个类(或模块)的成员
@memberof      标注成员属于哪个父级
@mixes         标注该对象混入了另一个对象的所有成员
@mixin         标注一个混入对象
@module        将当前文档标注为一个模块
</pre>

</div>
<div class="box-flex-item  flex-3">


<pre class="code-block">

@protected  标注为受保护的
@public     标注为公开的
@readonly   标注为只读的
@requires   标注这个文件需要一个javascript模块
@static     标注为静态的
@type       标注类型
@typeof     标注一个自定义的类型
@this       描述this关键字的指向
@alias      标注成员有一个别名
@borrow     将另一个标识符的描述添加到当前标识符的描述
@name       强制jsdoc使用这个给定的名称，而忽略代码里的实际名称
@namespace  标注一个命名空间对象
@override   标注覆盖其父类同名的方法
@private    标注为私有
@classdesc  与@class结合使用，描述类
@callback   描述一个回调函数
@enum       描述一个静态属性值的全部相同的集合，通常与@readonly结合使用
@event      描述事件
@member     描述一个成员 @member [] []
@property   描述一个对象的属性
@external   标识一个外部的类，命名空间，或模块
@files      标明当一个方法被调用时将触发一个指定类型的事件
@listens    标注监听事件
@variation  区分具有相同名称的不同对象
</pre>

</div>
</div>

:::



</div>