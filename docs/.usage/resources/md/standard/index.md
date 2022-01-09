

===+
#### 项目架构之搭建登录架构解决方案与实现
hello> vue create admin
    (*) Choose Vue version
    (*) Babel
    (*) Router
    (*) Vuex
    (*) CSS Pre-processors
    (*) Linter / Formatter

      Sass/SCSS (with dart-sass)
    > Sass/SCSS (with node-sass)
      Less
      Stylus

.vscode/settings.json ▾
↧{
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
}↥
.prettierrc.js ▾
    ↧module.exports = {
        semi: false,                         // 不尾随分号
        trailingComma: 'none',               // 不尾随逗号
        singleQuote: true,                   // 使用单引号
        tabWidth: 4,                         // 代码缩进
        
        useTabs: false,                      // 使用tab还是空格
        jsxSingleQuote: false,               // JSX双引号        
        bracketSpacing: true,                // 在对象文字中打印括号之间的空格
        jsxBracketSameLine: true,            // > 标签放在最后一行的末尾，而不是单独放在下一行
        arrowParens: 'avoid',                // 箭头圆括号        
        insertPragma: false,                 // 在文件顶部插入一个特殊的 @format 标记
        endOfLine: 'auto',                   // 行尾换行格式
        HTMLWhitespaceSensitivity: 'ignore',
        printWidth: 2000,                    // 最大长度200个字符
    }↥
.eslintrc.js ▾
    ↧module.exports = {
        rules: {
            indent: 'off',
            "space-before-function-paren": "off"
        }
    }↥
如果项目中有.editorconfig 该文件用来定义项目的编码规范 优先级比编辑器自身的设置要高 需与Prettier和ESLint相符 ▾
    ↧[*.{js,jsx,ts,tsx,vue}]
    indent_style = space
    indent_size = 2
    trim_trailing_whitespace = true
    insert_final_newline = true↥

清空 src/views/[{color:#f66}]
清空 src/components/[{color:#f66}]
src/main.js ▾
    ↧import { createApp } from 'vue'
    import router from './router'
    import store from './store'
    import App from './App.vue'

    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')↥
src/App.vue ▾
    ↧<template>
        <router-view />
    </template>

    <style lang="scss"></style>↥
src/router/index.js ▾
    ↧import { createRouter, createWebHashHistory } from 'vue-router'

    const routes = []

    const router = createRouter({
        history: createWebHashHistory(),
        routes
    })

    export default router↥
浏览器:http://localhost:8080/

[##] 构建登录页面 UI 结构
    src/router/index.js ▾
        ↧/**
         * 公开路由表
         */
        const publicRoutes = [
            {
                path: '/login',
                component: () => import('@/views/login/index')
            }
        ]

        const router = createRouter({
            routes: publicRoutes
        })↥

    src/views/login
    src/views/login/index.vue ▾
        ↧<template>
            <div class="login-container">
                <el-form class="login-form">
                    <div class="title-container">
                        <h3 class="title">用户登录</h3>
                    </div>

                    <el-form-item prop="username">
                        <span class="svg-container">
                            <svg-icon icon="user" />
                        </span>
                        <el-input placeholder="username" name="username" type="text" />
                    </el-form-item>

                    <el-form-item prop="password">
                        <span class="svg-container">
                            <svg-icon icon="password" />
                        </span>
                        <el-input placeholder="password" name="password" />
                        <span class="show-pwd">
                            <svg-icon icon="eye" />
                        </span>
                    </el-form-item>

                    <el-button type="primary" style="width: 100%; margin-bottom: 30px">登录</el-button>
                </el-form>
            </div>
        </template>

        <script setup>
        // 导入组件之后无需注册可直接使用
        import {} from '@element-plus/icons'
        import {} from 'vue'
        </script>
        
        <style lang="scss" scoped>
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
        </style>↥
    
    src/styles/index.scss ▾
        ↧html,
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
        }↥
    src/main.js ▾
        ↧// 导入全局样式
        import './styles/index.scss'↥

    导入 [Element Plus](https://element-plus.gitee.io/zh-CN/)
        快捷方式 ▾
            ↧
            admin> vue add element-plus
                ? How do you want to import Element Plus?  // 如何导入Element Plus
                    > Fully import     // 全局导入
                    Import on demand // 按需导入
                ? Do you want to overwrite the SCSS variables of Element Plus? (y/N)     // 生成覆盖变量的scss文件
                ? Choose the locale you want to load, the default locale is English (en) // 选择想要加载的语言环境，默认语言环境是英语
                    en 
                    > zh-cn 
                    af-za 
                ✔  Successfully installed plugin: vue-cli-plugin-element-plus
            src/App.vue
                <template>
                    <router-view />
                </template>

                <script>
                export default {
                    name: 'App'
                }
                </script>

                <style></style>
            src/main.js
                import installElementPlus from './plugins/element'
                installElementPlus(app)↥
        方式二 ▾
            ↧
            admin> npm i element-plus --save // 1.0.2-beta.28
            src/main.js
                import ElementPlus from 'element-plus'
                import 'element-plus/dist/index.css'
                app.use(ElementPlus)
            使用: <el-button>默认按钮</el-button>↥

    SVG图标通用解决方案
        src/components/SvgIcon/index.vue ▾
            ↧<template>
                <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className" />
                <svg v-else class="svg-icon" :class="className" aria-hidden="true">
                    <use :xlink:href="iconName" />
                </svg>
            </template>

            <script setup>
            import { isExternal as external } from '@/utils/validate'
            import { defineProps, computed } from 'vue'
            const props = defineProps({
                // icon 图标
                icon: {
                    type: String,
                    required: true
                },
                // 图标类名
                className: {
                    type: String,
                    default: ''
                }
            })

            /**
            * 判断是否为外部图标
            */
            const isExternal = computed(() => external(props.icon))
            /**
            * 外部图标样式
            */
            const styleExternalIcon = computed(() => ({
                mask: `url(${props.icon}) no-repeat 50% 50%`,
                '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
            }))
            /**
            * 项目内图标
            */
            const iconName = computed(() => `#icon-${props.icon}`)
            </script>

            <style scoped>
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
            </style>↥
        src/utils/validate.js ▾
            ↧/**
             * 判断是否为外部资源
             */
            export function isExternal(path) {
                return /^(https?:|mailto:|tel:)/.test(path)
            }↥

        使用：外部图标
            import SvgIcon from '@/components/SvgIcon'
            <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon>

        使用：内部图标
            src/icons/
            src/icons/svg/ // SVG资源
            src/icons/index.js ▾
                ↧import SvgIcon from '@/components/SvgIcon'
                // 1. 导入所有的SVG图标
                // https://webpack.docschina.org/guides/dependency-management/#requirecontext
                // 通过 require.context() 函数来创建自己的 context
                const svgRequire = require.context('./svg', false, /\.svg$/)
                // 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
                // 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
                // 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
                svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

                // 2. 完成SvgIcon全局注册
                export default app => {
                    app.component('svg-icon', SvgIcon)
                }↥
            src/main.js ▾
                ↧// 导入 svgIcon
                import installIcons from '@/icons'
                installIcons(app)↥
            admin> npm i --save-dev svg-sprite-loader@6.0.9
            vue.config.js ▾
                ↧const path = require('path')
                function resolve(dir) {
                    return path.join(__dirname, dir)
                }
                // https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
                module.exports = {
                    chainWebpack(config) {
                        // 设置 svg-sprite-loader
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
                }↥
            重新启动项目

    http://localhost:8080/#/Login

[##] 登陆逻辑
    表单验证
        src/views/login/index.vue ▾
            ↧▧<el-form :model="1►loginForm◄" :rules="2►loginRules◄">
                <el-form-item prop="username">
                    <el-input v-model="1►loginForm◄.username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="1►loginForm◄.password" />
                </el-form-item>
            </el-form>
                
            <script setup>
            import { ref } from 'vue'
            import { 3►validatePassword◄ } from './rules'
            // 数据源
            const 1►loginForm◄ = ref({
                username: 'super-admin',
                password: '123456'
            })
            // 验证规则
            const 2►loginRules◄ = ref({
                username: [{required: true, trigger: 'blur', message: '用户名为必填项'}],
                password: [{required: true, trigger: 'blur', validator: 3►validatePassword◄()}]
            })
            </script>▨↥
        src/views/login/rules.js ▾
            ↧▧export const 3►validatePassword◄ = () => {
                return (rule, value, callback) => {
                    if (value.length < 6) {
                        callback(new Error('密码不能少于6位'))
                    } else {
                        callback()
                    }
                }
            }▨↥
    密码框状态通用处理
        src/views/login/index.vue ▾
        ↧▧<el-input placeholder="password" name="password" 2►:type="passwordType"◄ v-model="loginForm.password" /> 
        <svg-icon 2►:icon="passwordType === 'password' ? 'eye' : 'eye-open'"◄ 3►@click="onChangePwdType"◄ />
        
        // 处理密码框文本显示状态
        const 2►passwordType◄ = ref('password')
        const 3►onChangePwdType◄ = () => {
            if (passwordType.value === 'password') {
                passwordType.value = 'text'
            } else {
                passwordType.value = 'password'
            }
        }▨↥
    通用后台登录方案        
        1.封装 axios 模块
            admin> npm i axios --save // 0.24.0
            .env.development ▾
                ↧▧# 标志
                ENV = 'development'

                # base api
                1►VUE_APP_BASE_API◄ = '/api'▨↥
            .env.production ▾
                ↧▧# 标志
                ENV = 'production'

                # base api
                1►VUE_APP_BASE_API◄ = '/prod-api'▨↥
            src/utils/request.js ▾{background-color:#999; color:#fff}
                ↧▧import axios from 'axios'

                const service = axios.create({
                    baseURL: process.env.1►VUE_APP_BASE_API◄,
                    timeout: 5000
                })

                export default service▨↥
        2.封装 接口请求 模块
            src/api/sys.js ▾{background-color:#999; color:#fff}
                ↧▧import request from '@/utils/request'

                /**
                * 登录
                */
                export const 2►login◄ = data => {
                    return request({
                        url: '/sys/login',
                        method: 'POST',
                        data
                    })
                }▨↥
        3.封装登录请求动作
            admin> npm i md5 --save
            src/store/modules/user.js ▾{background-color:#999; color:#fff} 封装请求
                ↧▧import { 2►login◄ } from '@/api/sys'
                import md5 from 'md5'
                3►export default◄ {
                    namespaced: true,
                    state: () => ({}),
                    mutations: {},
                    actions: {
                        3►login◄(context, userInfo) {
                            const { username, password } = userInfo
                            return new Promise((resolve, reject) => {
                                2►login◄({
                                    username,
                                    password: md5(password)
                                })
                                    .then(data => {
                                        resolve()
                                    })
                                    .catch(err => {
                                        reject(err)
                                    })
                            })
                        }
                    }
                }▨↥
            src/store/index.js ▾
                ↧▧import { createStore } from 'vuex'
                import 3►user◄ from './modules/user.js'
                export default createStore({
                    modules: {
                        3►user◄
                    }
                })▨↥
            src/views/login/index.vue ▾{background-color:#999; color:#fff} 请求
                ↧▧<el-form 0►ref="loginFromRef"◄ :model="loginForm" :rules="loginRules">
                    <el-button 0►:loading="loading"◄ 0►@click="handleLogin"◄>登录</el-button>
                </el-form>
                
                <script setup>
                import { ref } from 'vue'
                import { validatePassword } from './rules'
                import { useStore } from 'vuex'
                import { useRouter } from 'vue-router'

                // 登录动作处理
                const 0►loading◄ = ref(false)
                const 0►loginFromRef◄ = ref(null)
                const store = useStore()
                const router = useRouter()
                const 0►handleLogin◄ = () => {
                    0►loginFromRef◄.value.validate(valid => {
                        if (!valid) return

                        0►loading◄.value = true
                        store
                        .dispatch('3►user/login◄', loginForm.value)
                        .then(() => {
                            0►loading◄.value = false
                            // TODO: 登录后操作
                            router.push('/')
                        })
                        .catch(err => {
                            console.log(err)
                            0►loading◄.value = false
                        })
                    })
                }
                </script>▨↥
            vue.config.js ▾
                ↧▧module.exports = {
                    devServer: {
                        // 配置反向代理
                        proxy: {
                            // 当地址中有/api的时候会触发代理机制
                            '/api': {
                                // 要代理的服务器地址  这里不用写 api
                                target: 'https://api.imooc-admin.lgdsunday.club/',
                                changeOrigin: true // 是否跨域
                            }
                        }
                    }
                }▨↥
        4.保存服务端返回的 token
            src/utils/storage.js ▾ 封装localStorage操作方法
                ↧▧/**
                 * 存储数据
                 */
                export const setItem = (key, value) => {
                    // 将数组、对象类型的数据转化为 JSON 字符串进行存储
                    if (typeof value === 'object') {
                        value = JSON.stringify(value)
                    }
                    window.localStorage.setItem(key, value)
                }

                /**
                 * 获取数据
                 */
                export const getItem = key => {
                    const data = window.localStorage.getItem(key)
                    try {
                        return JSON.parse(data)
                    } catch (err) {
                        return data
                    }
                }

                /**
                 * 删除数据
                 */
                export const removeItem = key => {
                    window.localStorage.removeItem(key)
                }

                /**
                 * 删除所有数据
                 */
                export const removeAllItem = key => {
                    window.localStorage.clear()
                }▨↥
            src/constant/index.js ▾ 抽取TOKEN键值为常量
                ↧export const TOKEN = 'token'↥
            src/store/modules/user.js ▾{background-color:#999; color:#fff}
                ↧▧import { login } from '@/api/sys'
                import md5 from 'md5'
                ❹import { setItem, getItem } from '@/utils/storage'
                import { TOKEN } from '@/constant'❹

                export default {
                    namespaced: true,
                    state: () => ({
                        ❸token: getItem(TOKEN) || ''❸
                    }),
                    mutations: {
                        ❷setToken(state, token) {
                            state.token = token
                            setItem(TOKEN, token)
                        }❷
                    },
                    actions: {
                        login(context, userInfo) {
                            const { username, password } = userInfo
                            return new Promise((resolve, reject) => {
                                login({
                                    username,
                                    password: md5(password)
                                })
                                    .then(data => {
                                        ❶this.commit('user/setToken', data.data.data.token)❶
                                        resolve()
                                    })
                                    .catch(err => {
                                        reject(err)
                                    })
                            })
                        }
                    }
                }▨↥            
            src/utils/request.js ▾ 响应数据的统一处理 data.data.data.token > data.token 
                ↧▧import { ElMessage } from 'element-plus'

                // 响应拦截器

                service.interceptors.response.use(
                    response => {
                        const { success, message, data } = response.data
                        //   要根据success的成功与否决定下面的操作
                        if (success) {
                            return data
                        } else {
                            // 业务错误
                            ElMessage.error(message) // 提示错误消息
                            return Promise.reject(new Error(message))
                        }
                    },
                    error => {
                        // TODO: 将来处理 token 超时问题
                        ElMessage.error(error.message) // 提示错误信息
                        return Promise.reject(error)
                    }
                )▨↥
            src/store/modules/user.js ▾
                ↧▧❶this.commit('user/setToken', data.token)❶▨↥
        5.登录鉴权
            src/layout/index.vue
            src/router/index.js ▾
                ↧{
                    path: '/',
                    component: () => import('@/layout/index')
                }↥
            src/permission.js ▾{background-color:#999; color:#fff} 鉴权模块
                ↧▧import router from './router'
                import store from './store'

                // 白名单
                const whiteList = ['/login']

                // 路由前置守卫
                router.beforeEach(async (to, from, next) => {
                    // 存在 token 进入主页
                    if (store.getters.token) {
                        if (to.path === '/login') {
                            next('/')
                        } else {
                            next()
                        }
                    } else {                        
                        if (whiteList.indexOf(to.path) > -1) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                })▨↥
            src/store/getters.js ▾ 快捷访问 store.state.user.token > store.getters.token
                ↧const getters = {
                    token: state => state.user.token
                }
                export default getters↥
            src/store/index.js ▾
                ↧import getters from './getters'
                export default createStore({
                    getters
                })↥
            src/main.js ▾{background-color:#999; color:#fff} 导入鉴权模块
                ↧import './permission'↥

[##] 搭建Layout架构    
    src/layout/
        index.vue ▾ 基础架构
            ↧<template>
                <div class="app-wrapper">
                    <!-- 左侧 menu -->
                    <sidebar id="guide-sidebar" class="sidebar-container" :style="{ backgroundColor: variables.menuBg }" />
                    <div class="main-container">
                        <div class="fixed-header">
                            <!-- 顶部的 navbar -->
                            <navbar />
                        </div>
                        <!-- 内容区 -->
                        <app-main />
                    </div>
                </div>
            </template>

            <script setup>
            import Navbar from './components/Navbar'
            import Sidebar from './components/Sidebar/'
            import AppMain from './components/AppMain'

            import variables from '@/styles/variables.scss'
            </script>

            <style lang="scss" scoped>
            @import '~@/styles/mixin.scss';
            @import '~@/styles/variables.scss';

            .app-wrapper {
                @include clearfix;
                position: relative;
                height: 100%;
                width: 100%;
            }

            .fixed-header {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 9;
                width: calc(100% - #{$sideBarWidth});
            }
            </style>↥
        components/
            Sidebar/
                index.vue ▾
                    ↧<template>
                        <div class="">sidebar</div>
                    </template>

                    <script setup>
                    import {} from 'vue'
                    </script>

                    <style lang="scss" scoped></style>↥
            Navbar.vue ▾
                ↧<template>
                    <div class="">navbar</div>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped></style>↥
            AppMain.vue ▾
                ↧<template>
                    <div class="app-main">AppMain</div>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped>
                .app-main {
                    min-height: calc(100vh - 50px);
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    padding: 61px 20px 20px 20px;
                    box-sizing: border-box;
                }
                </style>↥
    src/styles/
        index.scss
            @import './variables.scss';
            @import './mixin.scss';
            @import './sidebar.scss';
            ...
        variables.scss ▾ 定义常量
            ↧// sidebar
            $menuText: #bfcbd9;
            $menuActiveText: #ffffff;
            $subMenuActiveText: #f4f4f5;

            $menuBg: #304156;
            $menuHover: #263445;

            $subMenuBg: #1f2d3d;
            $subMenuHover: #001528;

            $sideBarWidth: 210px;    // 侧栏展开时宽度
            $hideSideBarWidth: 54px; // 侧栏收缩后宽度
            $sideBarDuration: 0.28s; // 侧栏开闭动画时长

            // https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
            // JS 与 scss 共享变量，在 scss 中通过 :export 进行导出，在 js 中可通过 ESM 进行导入
            :export {
                menuText: $menuText;
                menuActiveText: $menuActiveText;
                subMenuActiveText: $subMenuActiveText;
                menuBg: $menuBg;
                menuHover: $menuHover;
                subMenuBg: $subMenuBg;
                subMenuHover: $subMenuHover;
                sideBarWidth: $sideBarWidth;
            }↥
        mixin.scss ▾ 定义通用的 css
            ↧@mixin clearfix {
                &:after {
                    content: '';
                    display: table;
                    clear: both;
                }
            }

            @mixin scrollBar {
                &::-webkit-scrollbar-track-piece {
                    background: #d3dce6;
                }

                &::-webkit-scrollbar {
                    width: 6px;
                }

                &::-webkit-scrollbar-thumb {
                    background: #99a9bf;
                    border-radius: 20px;
                }
            }

            @mixin relative {
                position: relative;
                width: 100%;
                height: 100%;
            }↥
        sidebar.scss ▾ 处理 menu 菜单的样式
            ↧#app {
                .main-container {
                    min-height: 100%;
                    margin-left: $sideBarWidth;
                    position: relative;
                    transition: margin-left #{$sideBarDuration};
                }

                .sidebar-container {
                    width: $sideBarWidth !important;
                    height: 100%;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 1001;
                    overflow: hidden;
                    
                    transition: width #{$sideBarDuration};

                    // 重置 element-plus 的css
                    .horizontal-collapse-transition {
                        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
                    }

                    .scrollbar-wrapper {
                        overflow-x: hidden !important;
                    }

                    .el-scrollbar__bar.is-vertical {
                        right: 0px;
                    }

                    .el-scrollbar {
                        height: 100%;
                    }

                    &.has-logo {
                        .el-scrollbar {
                            height: calc(100% - 50px);
                        }
                    }

                    .is-horizontal {
                        display: none;
                    }

                    a {
                        display: inline-block;
                        width: 100%;
                        overflow: hidden;
                    }

                    .svg-icon {
                        margin-right: 16px;
                    }

                    .sub-el-icon {
                        margin-right: 12px;
                        margin-left: -2px;
                    }

                    .el-menu {
                        border: none;
                        height: 100%;
                        width: 100% !important;
                    }

                    .is-active > .el-submenu__title {
                        color: $subMenuActiveText !important;
                    }

                    & .nest-menu .el-submenu > .el-submenu__title,
                    & .el-submenu .el-menu-item {
                        min-width: $sideBarWidth !important;
                    }
                }

                .hideSidebar {
                    .sidebar-container {
                        width: 54px !important;
                    }

                    .main-container {
                        margin-left: 54px;
                    }

                    .submenu-title-noDropdown {
                        padding: 0 !important;
                        position: relative;

                        .el-tooltip {
                            padding: 0 !important;

                            .svg-icon {
                                margin-left: 20px;
                            }

                            .sub-el-icon {
                                margin-left: 19px;
                            }
                        }
                    }

                    .el-submenu {
                        overflow: hidden;

                        & > .el-submenu__title {
                            padding: 0 !important;

                            .svg-icon {
                                margin-left: 20px;
                            }

                            .sub-el-icon {
                                margin-left: 19px;
                            }

                            .el-submenu__icon-arrow {
                                display: none;
                            }
                        }
                    }

                    .el-menu--collapse {
                        .el-submenu {
                            & > .el-submenu__title {
                                & > span {
                                    height: 0;
                                    width: 0;
                                    overflow: hidden;
                                    visibility: hidden;
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }

                .el-menu--collapse .el-menu .el-submenu {
                    min-width: $sideBarWidth !important;
                }

                .withoutAnimation {
                    .main-container,
                    .sidebar-container {
                        transition: none;
                    }
                }
            }

            .el-menu--vertical {
                & > .el-menu {
                    .svg-icon {
                        margin-right: 16px;
                    }
                    .sub-el-icon {
                        margin-right: 12px;
                        margin-left: -2px;
                    }
                }

                // 菜单项过长时
                > .el-menu--popup {
                    max-height: 100vh;
                    overflow-y: auto;

                    &::-webkit-scrollbar-track-piece {
                        background: #d3dce6;
                    }

                    &::-webkit-scrollbar {
                        width: 6px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: #99a9bf;
                        border-radius: 20px;
                    }
                }
            }↥
    头像菜单
        获取并展示用户信息                
            src/api/sys.js ▾ 定义接口请求方法
                ↧/**
                    * 获取用户信息
                    */
                export const getUserInfo = () => {
                    return request({
                        url: '/sys/profile'
                    })
                }↥
            src/store/modules/user ▾ 定义调用接口的动作 
                ↧▧import { 0►getUserInfo◄ } from '@/api/sys'

                export default {
                    state: () => ({
                        0►userInfo: {}◄
                    }),
                    mutations: {
                        0►setUserInfo(state, userInfo) {
                            state.userInfo = userInfo
                        }◄
                    },
                    actions: {
                        0►async getUserInfo(context) {
                            const res = await getUserInfo()
                            this.commit('user/setUserInfo', res)
                            return res
                        }◄
                    }
                }▨↥

                
            src/utils/request.js ▾ 通用token注入
                ↧import store from '@/store'

                // 请求拦截器
                service.interceptors.request.use(
                    config => {
                        // 在这个位置需要统一的去注入token
                        if (store.getters.token) {
                            // 如果token存在 注入token
                            config.headers.Authorization = `Bearer ${store.getters.token}`
                        }
                        return config // 必须返回配置
                    },
                    error => {
                        return Promise.reject(error)
                    }
                )↥
            src/permission.js ▾ 在权限拦截时触发动作
                ↧▧router.beforeEach(async (to, from, next) => {
                    if (store.getters.token) {
                        if (to.path === '/login') {
                            ...
                        } else {
                            // 判断用户资料是否获取
                            // 若不存在用户信息，则需要获取用户信息
                            if (!store.getters.hasUserInfo) {
                                // 触发获取用户信息的 action
                                2►await store.dispatch('user/getUserInfo')◄
                            }
                            next()
                        }
                    } else {
                        ...
                    }
                })▨↥
            src/store/getters.js ▾
                ↧const getters = {
                    userInfo: state => state.user.userInfo,
                    /**
                        * @returns true 表示已存在用户信息
                        */
                    hasUserInfo: state => {
                        return JSON.stringify(state.user.userInfo) !== '{}'
                    }
                }↥
        渲染用户头像菜单 element-plus中的dropdown组件使用
            src/layout/components/navbar.vue ▾
                ↧▧<template>
                    <div class="navbar">
                        <div class="right-menu">
                            <!-- 头像 -->
                            0►<el-dropdown class="avatar-container" trigger="click">◄
                                0►<div class="avatar-wrapper">◄
                                    1►<el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>◄
                                    <i class="el-icon-s-tools"></i>
                                0►</div>◄
                                0►<template #dropdown>◄
                                    2►<el-dropdown-menu class="user-dropdown">◄
                                        <router-link to="/">
                                            <el-dropdown-item> 首页 </el-dropdown-item>
                                        </router-link>
                                        <a target="_blank" href="">
                                            <el-dropdown-item>课程主页</el-dropdown-item>
                                        </a>
                                        <el-dropdown-item divided> 退出登录 </el-dropdown-item>
                                    2►</el-dropdown-menu>◄
                                0►</template>◄
                            0►</el-dropdown>◄
                        </div>
                    </div>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped>
                .navbar {
                    height: 50px;
                    overflow: hidden;
                    position: relative;
                    background: #fff;
                    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

                    .right-menu {
                        display: flex;
                        align-items: center;
                        float: right;
                        padding-right: 16px;

                        ::v-deep .avatar-container {
                            cursor: pointer;
                            .avatar-wrapper {
                                margin-top: 5px;
                                position: relative;
                                .el-avatar {
                                    --el-avatar-background-color: none;
                                    margin-right: 12px;
                                }
                            }
                        }
                    }
                }
                </style>▨↥
        退出登录方案
            1.清理掉当前用户缓存数据
            2.清理掉权限相关配置
            3.返回到登录页

            用户主动退出：用户点击登录按钮之后退出
                src/store/modules/user.js ▾
                    ↧import { removeAllItem } from '@/utils/storage'
                    import router from '@/router'

                    export default {                            
                        actions: {
                            logout() {
                                this.commit('user/setToken', '')
                                this.commit('user/setUserInfo', {})
                                removeAllItem()
                                router.push('/login')
                            }
                        }
                    }↥
                src/layout/components/navbar.vue ▾ 为退出登录按钮添加点击事件
                    ↧<el-dropdown-item divided @click="logout"> 退出登录 </el-dropdown-item>

                    import { useStore } from 'vuex'
                    const store = useStore()
                    const logout = () => {
                        store.dispatch('user/logout')
                    }↥
            用户被动退出：token过期或被其他人“顶下来”时退出
                主动计算token的失效时间(时效token)
                    src/utils/auth.js ▾
                        ↧import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
                        import { setItem, getItem } from '@/utils/storage'
                        /**
                        * 获取时间戳
                        */
                        export function getTimeStamp() {
                            return getItem(TIME_STAMP)
                        }
                        /**
                        * 设置时间戳
                        */
                        export function setTimeStamp() {
                            setItem(TIME_STAMP, Date.now())
                        }
                        /**
                        * 是否超时
                        */
                        export function isCheckTimeout() {
                            // 当前时间戳
                            var currentTime = Date.now()
                            // 缓存时间戳
                            var timeStamp = getTimeStamp()
                            return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
                        }↥
                    src/constant/index.js ▾ 抽取常量
                        ↧// token 时间戳
                        export const TIME_STAMP = 'timeStamp'
                        // 超时时长(毫秒) 两小时
                        export const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 1000↥
                    src/store/modules/user.js ▾ 保存登录时间
                        ↧▧0►import { setTimeStamp } from '@/utils/auth'◄
                        export default {                                
                            actions: {
                                login(context, userInfo) {
                                    const { username, password } = userInfo
                                    return new Promise((resolve, reject) => {login().then(data => {                                            
                                        0►setTimeStamp()◄
                                    })})
                                }
                            }
                        }▨↥
                    src/utils/request.js ▾ 检测token是否过期
                        ↧▧3►import { isCheckTimeout } from '@/utils/auth'◄
                        // 请求拦截器
                        service.interceptors.request.use(
                            config => {
                                if (store.getters.token) {
                                    3►if (isCheckTimeout()) {                                            
                                        store.dispatch('user/logout')
                                        return Promise.reject(new Error('token 失效'))
                                    }◄
                                }
                            }
                        )▨↥
                被动 token过期 和 单点登录
                    src/utils/request.js ▾ 检测token是否过期
                        ↧▧3►import { isCheckTimeout } from '@/utils/auth'◄
                        // 响应拦截器
                        service.interceptors.response.use(
                            response => {},
                            error => {
                                // 处理 token 超时问题
                                3►if (error.response && error.response.data && error.response.data.code === 401) {
                                    store.dispatch('user/logout')
                                }◄
                                // 单点登录也一样协议返回码

                                ElMessage.error(error.message) // 提示错误信息
                                return Promise.reject(error)
                            }
                        )▨↥
    临时menu菜单
        src/layout/components/Sidebar/SidebarMenu.vue ▾
            ↧▧<template>
                <!-- 一级 menu 菜单 -->
                <1►el-menu◄ :uniqueOpened="true" default-active="2" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <!-- 子集 menu 菜单 -->
                    <2►el-submenu◄ index="1">
                        <template #title>
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <3►el-menu-item◄ index="1-1">选项1</3►el-menu-item◄>
                        <3►el-menu-item◄ index="1-2">选项2</3►el-menu-item◄>
                    </2►el-submenu◄>
                    <!-- 具体菜单项 -->
                    <3►el-menu-item◄ index="4">
                        <i class="el-icon-setting"></i>
                        <template #title>导航四</template>
                    </3►el-menu-item◄>
                </1►el-menu◄>
            </template>▨↥
        src/layout/components/Sidebar/index.vue ▾ 导入SidebarMenu
            ↧▧<template>
                <div class="">
                    <h1>占位</h1>
                    <el-scrollbar>
                        0►<sidebar-menu></sidebar-menu>◄
                    </el-scrollbar>
                </div>
            </template>

            <script setup>
            0►import SidebarMenu from './SidebarMenu'◄
            import {} from 'vue'
            </script>▨↥
    动态menu菜单
        路由表 对应menu菜单规则: 
            如果meta && meta.title && meta.icon
            如果存在children以el-sub-menu(子菜单)展示 否则 则以el-menu-item(菜单项)展示

        1.创建页面组件
            src/views/article-create/index.vue 创建文章
            src/views/article-detail/index.vue 文章详情
            src/views/article-ranking/index.vue 文章排名
            src/views/error-page/404.vue 错误页面
            src/views/error-page/401.vue 错误页面
            src/views/import 导入
            src/views/permission-list 权限列表
            src/views/profile 个人中心
            src/views/role-list 角色列表
            src/views/user-info 用户信息
            src/views/user-manage 用户管理
        2.生成路由表
            src/router/index.js ▾
                ↧import { createRouter, createWebHashHistory } from 'vue-router'
                import layout from '@/layout'

                /**
                * 私有路由表
                */
                const privateRoutes = [
                    {
                        path: '/user',
                        component: layout,
                        redirect: '/user/manage',
                        meta: {
                            title: 'user',
                            icon: 'personnel'
                        },
                        children: [
                            {
                                path: '/user/manage',
                                component: () => import('@/views/user-manage/index'),
                                meta: {
                                    title: 'userManage',
                                    icon: 'personnel-manage'
                                }
                            },
                            {
                                path: '/user/role',
                                component: () => import('@/views/role-list/index'),
                                meta: {
                                    title: 'roleList',
                                    icon: 'role'
                                }
                            },
                            {
                                path: '/user/permission',
                                component: () => import('@/views/permission-list/index'),
                                meta: {
                                    title: 'permissionList',
                                    icon: 'permission'
                                }
                            },
                            {
                                path: '/user/info/:id',
                                name: 'userInfo',
                                component: () => import('@/views/user-info/index'),
                                meta: {
                                    title: 'userInfo'
                                }
                            },
                            {
                                path: '/user/import',
                                name: 'import',
                                component: () => import('@/views/import/index'),
                                meta: {
                                    title: 'excelImport'
                                }
                            }
                        ]
                    },
                    {
                        path: '/article',
                        component: layout,
                        redirect: '/article/ranking',
                        meta: {
                            title: 'article',
                            icon: 'article'
                        },
                        children: [
                            {
                                path: '/article/ranking',
                                component: () => import('@/views/article-ranking/index'),
                                meta: {
                                    title: 'articleRanking',
                                    icon: 'article-ranking'
                                }
                            },
                            {
                                path: '/article/:id',
                                component: () => import('@/views/article-detail/index'),
                                meta: {
                                    title: 'articleDetail'
                                }
                            },
                            {
                                path: '/article/create',
                                component: () => import('@/views/article-create/index'),
                                meta: {
                                    title: 'articleCreate',
                                    icon: 'article-create'
                                }
                            },
                            {
                                path: '/article/editor/:id',
                                component: () => import('@/views/article-create/index'),
                                meta: {
                                    title: 'articleEditor'
                                }
                            }
                        ]
                    }
                ]

                /**
                * 公开路由表
                */
                const publicRoutes = [
                    {
                        path: '/login',
                        component: () => import('@/views/login/index')
                    },
                    {
                        path: '/',
                        // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
                        component: layout,
                        redirect: '/profile',
                        children: [
                            {
                                path: '/profile',
                                name: 'profile',
                                component: () => import('@/views/profile/index'),
                                meta: {
                                    title: 'profile',
                                    icon: 'el-icon-user'
                                }
                            },
                            {
                                path: '/404',
                                name: '404',
                                component: () => import('@/views/error-page/404')
                            },
                            {
                                path: '/401',
                                name: '401',
                                component: () => import('@/views/error-page/401')
                            }
                        ]
                    }
                ]

                const router = createRouter({
                    history: createWebHashHistory(),
                    routes: [...publicRoutes, ...privateRoutes]
                })

                export default router↥
            src/layout/AppMain.vue
                <template>
                    <div class="app-main">
                        <router-view></router-view>
                    </div>
                </template>
        3.解析路由表
            src/utils/route.js ▾
                ↧import path from 'path'

                /**
                * 返回所有子路由
                */
                const getChildrenRoutes = routes => {
                    const result = []
                    routes.forEach(route => {
                        if (route.children && route.children.length > 0) {
                            result.push(...route.children)
                        }
                    })
                    return result
                }
                /**
                * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
                * @param {*} routes router.getRoutes()
                */
                export const filterRouters = routes => {
                    const childrenRoutes = getChildrenRoutes(routes)
                    return routes.filter(route => {
                        return !childrenRoutes.find(childrenRoute => {
                            return childrenRoute.path === route.path
                        })
                    })
                }

                /**
                * 判断数据是否为空值
                */
                function isNull(data) {
                    if (!data) return true
                    if (JSON.stringify(data) === '{}') return true
                    if (JSON.stringify(data) === '[]') return true
                    return false
                }
                /**
                * 根据 routes 数据，返回对应 menu 规则数组
                */
                export function generateMenus(routes, basePath = '') {
                    const result = []
                    // 遍历路由表
                    routes.forEach(item => {
                        // 不存在 children && 不存在 meta 直接 return
                        if (isNull(item.meta) && isNull(item.children)) return
                        // 存在 children 不存在 meta，进入迭代
                        if (isNull(item.meta) && !isNull(item.children)) {
                            result.push(...generateMenus(item.children))
                            return
                        }
                        // 合并 path 作为跳转路径
                        const routePath = path.resolve(basePath, item.path)
                        // 路由分离之后，存在同名父路由的情况，需要单独处理
                        let route = result.find(item => item.path === routePath)
                        if (!route) {
                            route = {
                                ...item,
                                path: routePath,
                                children: []
                            }

                            // icon 与 title 必须全部存在
                            if (route.meta.icon && route.meta.title) {
                                // meta 存在生成 route 对象，放入 arr
                                result.push(route)
                            }
                        }

                        // 存在 children 进入迭代到children
                        if (item.children) {
                            route.children.push(...generateMenus(item.children, route.path))
                        }
                    })
                    return result
                }↥
        4.生成menu菜单
            src/layout/components/Sidebar/SidebarMenu.vue ▾ 处理数据，作为最顶层 menu 载体
                ↧<template>
                    <!-- 一级 menu 菜单 -->
                    <el-menu :uniqueOpened="true" default-active="2" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
                    </el-menu>
                </template>                    

                <script setup>
                import { computed } from 'vue'
                import { useRouter } from 'vue-router'
                import { filterRouters, generateMenus } from '@/utils/route'
                import SidebarItem from './SidebarItem'

                const router = useRouter()
                const routes = computed(() => {
                    const filterRoutes = filterRouters(router.getRoutes())
                    return generateMenus(filterRoutes)
                })
                console.log(JSON.stringify(routes.value))
                </script>↥
            src/layout/components/Sidebar/SidebarItem.vue ▾ 根据数据处理 当前项为 el-submenu || el-menu-item
                ↧<template>
                    <!-- 支持渲染多级 menu 菜单 -->
                    <el-submenu v-if="route.children.length > 0" :index="route.path">
                        <template #title>
                            <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
                        </template>
                        <!-- 循环渲染 -->
                        <sidebar-item v-for="item in route.children" :key="item.path" :route="item"></sidebar-item>
                    </el-submenu>
                    <!-- 渲染 item 项 -->
                    <el-menu-item v-else :index="route.path">
                        <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
                    </el-menu-item>
                </template>

                <script setup>
                import MenuItem from './MenuItem'
                import { defineProps } from 'vue'
                // 定义 props
                defineProps({
                    route: {
                        type: Object,
                        required: true
                    }
                })
                </script>↥
            src/layout/components/Sidebar/MenuItem.vue ▾ 处理 el-menu-item 样式
                ↧<template>
                    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
                    <svg-icon v-else :icon="icon"></svg-icon>
                    <span>{{ title }}</span>
                </template>

                <script setup>
                import { defineProps } from 'vue'
                defineProps({
                    title: {
                        type: String,
                        required: true
                    },
                    icon: {
                        type: String,
                        required: true
                    }
                })
                </script>

                <style lang="scss" scoped></style>↥

            残余：样式问题
                src/store/getters.js ▾
                    ↧import variables from '@/styles/variables.scss'
                    const getters = {
                        cssVar: state => variables
                    }
                    export default getters↥
                src/layout/components/Sidebar/SidebarMenu.vue ▾
                    ↧<!-- <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :uniqueOpened="true" default-active="2"  > -->
                    <el-menu 
                        :background-color="$store.getters.cssVar.menuBg" 
                        :text-color="$store.getters.cssVar.menuText" 
                        :active-text-color="$store.getters.cssVar.menuActiveText" 
                        :unique-opened="true">↥
            残余：路由跳转问题
                src/layout/components/Sidebar/SidebarMenu.vue ▾
                    ↧<el-menu router>↥
            残余：默认激活项
                src/layout/components/Sidebar/SidebarMenu.vue ▾
                    ↧import { useRoute } from 'vue-router'
                    <el-menu :default-active="activeMenu">
                    <script setup>
                    // 计算高亮 menu 的方法
                    const route = useRoute()
                    const activeMenu = computed(() => {
                        const { path } = route
                        return path
                    })
                    </script>↥
    左侧菜单伸缩功能实现
        src/store/modules/app.js ▾ 创建模块
            ↧export default {
                namespaced: true,
                state: () => ({
                    sidebarOpened: true
                }),
                mutations: {
                    triggerSidebarOpened(state) {
                        state.sidebarOpened = !state.sidebarOpened
                    }
                },
                actions: {}
            }↥
        src/store/index.js ▾ 引入模块
            ↧import app from './modules/app'
            export default createStore({
                modules: {
                    app
                }
            })↥
        src/store/getters.js ▾ 设置快捷访问
            ↧sidebarOpened: state => state.app.sidebarOpened↥
        src/components/Hamburger/index.vue ▾
            ↧<template>
                <div class="hamburger-container" @click="toggleClick">
                    <svg-icon class="hamburger" :icon="icon"></svg-icon>
                </div>
            </template>

            <script setup>
            import { computed } from 'vue'
            import { useStore } from 'vuex'

            const store = useStore()
            const toggleClick = () => {
                store.commit('app/triggerSidebarOpened')
            }

            const icon = computed(() => (store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'))
            </script>

            <style lang="scss" scoped>
            .hamburger-container {
                padding: 0 16px;
                .hamburger {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                }
            }
            </style>↥
        src/layout/components/navbar.vue ▾
            ↧▧<template>
                <div class="navbar">
                    1►<hamburger class="hamburger-container" />◄
                </div>
            </template>

            <script setup>
            1►import Hamburger from '@/components/Hamburger'◄
            </script>

            <style lang="scss" scoped>
            .navbar {                
                1►.hamburger-container {
                    line-height: 46px;
                    height: 100%;
                    float: left;
                    cursor: pointer;                        
                    transition: background 0.5s; // hover 动画
                    &:hover {
                        background: rgba(0, 0, 0, 0.1);
                    }
                }◄
            }
            </style>▨↥
        src/layout/components/Sidebar/SidebarMenu.vue ▾
            ↧<el-menu :collapse="!$store.getters.sidebarOpened">↥
        src/layout/index.vue ▾
            ↧▧<div class="app-wrapper" 1►:class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"◄>

            <style lang="scss" scoped>
            .fixed-header {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 9;
                width: calc(100% - #{$sideBarWidth});
                1►transition: width #{$sideBarDuration};◄
            }

            1►.hideSidebar .fixed-header {
                width: calc(100% - #{$hideSideBarWidth});
            }◄
            </style>▨↥
        src/layout/components/Sidebar/index.vue ▾ 完善占位
            ↧▧<template>
                <div class="">
                    1►<div class="logo-container">
                        <el-avatar size="44" shape="square" src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" />
                        <h1 class="logo-title" v-if="$store.getters.sidebarOpened">imooc-admin</h1>
                    </div>◄
                    <el-scrollbar>
                        <sidebar-menu></sidebar-menu>
                    </el-scrollbar>
                </div>
            </template>

            <script setup>
            import SidebarMenu from './SidebarMenu'
            import {} from 'vue'
            </script>

            <style lang="scss" scoped>
            1►.logo-container {
                height: 44px;
                padding: 10px 0 22px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                .logo-title {
                    margin-left: 10px;
                    color: #fff;
                    font-weight: 600;
                    line-height: 50px;
                    font-size: 16px;
                    white-space: nowrap;
                }
            }◄
            </style>▨↥
        src/styles/element.scss ▾
            ↧.el-avatar {
                --el-avatar-background-color: none !important;
            }↥
        src/styles/index.scss ▾
            ↧@import './element.scss';↥
    面包屑方案分析
        1.创建、渲染基本的面包屑组件
            src/components/Breadcrumb/index.vue ▾
                ↧<template>
                    <el-breadcrumb class="breadcrumb" separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <!-- 面包屑的最后一项 -->
                        <el-breadcrumb-item>
                            <span class="no-redirect">活动详情</span>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </template>

                <script setup>
                import {} from 'vue'
                </script>

                <style lang="scss" scoped>
                .breadcrumb {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 50px;
                    margin-left: 8px;

                    ::v-deep .no-redirect {
                        color: #97a8be;
                        cursor: text;
                    }
                }
                </style>↥
            src/layout/components/Navbar.vue 导入面包屑
                <template>
                    <div class="navbar">
                        <breadcrumb class="breadcrumb-container" />
                    </div>
                </template>
                <script setup>
                import Breadcrumb from '@/components/Breadcrumb'
                </script>
                <style lang="scss" scoped>
                .navbar {
                    .breadcrumb-container {
                        float: left;
                    }
                }
                </style>
        2.计算面包屑结构数据
            src/components/Breadcrumb/index.vue ▾
                ↧<script setup>
                import { ref, watch } from 'vue'
                import { useRoute } from 'vue-router'

                const route = useRoute()
                // 生成数组数据
                const breadcrumbData = ref([])
                const getBreadcrumbData = () => {
                    breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
                    console.log(breadcrumbData.value)
                }
                // 监听路由变化时触发
                watch(
                    route,
                    () => {
                        getBreadcrumbData()
                    },
                    {
                        immediate: true
                    }
                )
                </script>↥
        3.根据数据渲染动态面包屑内容
            src/components/Breadcrumb/index.vue ▾
                ↧<template>
                    <el-breadcrumb class="breadcrumb" separator="/">
                        <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
                            <!-- 不可点击项 -->
                            <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{ item.meta.title }}</span>
                            <!-- 可点击项 -->
                            <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ item.meta.title }}</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <script setup>
                import { useRouter } from 'vue-router'
                import { useStore } from 'vuex'

                // 处理点击事件
                const router = useRouter()
                const onLinkClick = item => {
                    console.log(item)
                    router.push(item.path)
                }

                // 将来需要进行主题替换，所以这里获取下动态样式
                const store = useStore()
                // eslint-disable-next-line
                const linkHoverColor = ref(store.getters.cssVar.menuBg)
                </script>

                <style lang="scss" scoped>
                .breadcrumb {
                    .redirect {
                        color: #666;
                        font-weight: 600;
                    }

                    .redirect:hover {
                        // 将来需要进行主题替换，所以这里不去写死样式
                        color: v-bind(linkHoverColor);
                    }
                }
                </style>↥  
            动画处理
                src/components/Breadcrumb/index.vue ▾
                    ↧▧<template>
                        <el-breadcrumb class="breadcrumb" separator="/">
                            0►<transition-group name="breadcrumb">◄
                            ...
                            0►</transition-group>◄
                        </el-breadcrumb>
                    </template>▨↥
                src/styles/transition.scss
                    .breadcrumb-enter-active,
                    .breadcrumb-leave-active {
                        transition: all 0.5s;
                    }

                    .breadcrumb-enter-from,
                    .breadcrumb-leave-active {
                        opacity: 0;
                        transform: translateX(20px);
                    }

                    .breadcrumb-leave-active {
                        position: absolute;
                    }
                src/styles/index.scss
                    @import './transition.scss';







    左侧的 Menu 菜单
        动态侧边栏方案
            
    顶部的 NavBar
        用户退出方案
            退出的通用逻辑封装

        动态面包屑方案
    中间的内容区 Main

    伸缩侧边栏动画
    组件状态驱动的动态 CSS 值

===-
▾↧↥

::: details 标准化大厂编程规范解决方案之ESLint + Git Hooks
===+
指望所有人都看一遍规范文档？ 自动处理规范化的内容！

hello> vue create coding-standard
    Default ([Vue 2] babel, eslint)      
    Default ([Vue 3] babel, eslint)
    > Manually select features  // 推荐
            (*) Choose Vue version  (*)Babel  (*)Linter/Formatter
                  2.x
                > 3.x  
                      ESLint with error prevention only // 仅包含错误的ESLint
                      ESLint + Airbnb config            // Airbnb的ESLint延伸规则
                    > ESLint + Standard config          // 标准的ESLint延伸规则
                      ESLint + Prettier                    
hello> cd coding-standard
coding-standard> npm run serve
coding-standard> npm run build

[##] 从动检测
ESLint目标：提供一个插件化的javascript代码检测工具
ESLint配置：coding-standard/.eslintrc.js [文档](https://eslint.bootcss.com/docs/user-guide/configuring)
    module.exports = {        
        root: true,                                              // 表示当前目录即为根目录 规则将被限制到该目录下        
        env: { node: true },                                     // 检测的环境        
        extends: ["plugin:vue/vue3-essential", "@vue/standard"], // ESLint 中基础配置需要继承的配置        
        parserOptions: { parser: "babel-eslint" },               // 解析器
        /**
        * 启用规则：错误级别
        * "off"/0   关闭规则
        * "warn"/1  开启规则，使用警告级别的错误：warn (不会导致程序退出)
        * "error"/2 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
        */
        rules: {
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
        }
    }

coding-standard/src/components/HelloWorld.vue
    name: 'HelloWorld' 改为 name: "HelloWorld"

      35:9  [error{color:#F66}]  Strings must use singlequote  [quotes{color:#09c;font-weight:bold}]
    【✖ 1 problem (1 error, 0 warnings)
      1 error and 0 warnings potentially fixable with the `--fix` option.】{color:#F66}

    解决：
        按照 ESLint 的要求修改代码
      > 修改 ESLint 的验证规则 .eslintrc.js
            module.exports = {
                rules: {
                    "[quotes{color:#09c;font-weight:bold}]": "warn" // off、warn、error 
                }
            }
            coding-standard> npm run serve

[##] 主动规范
团队中人员的水平不齐 大量的ESLint规则校验 会让开发者头疼 影响开发进度
[Prettier](https://www.prettier.cn/): 代码格式化工具
1. VSCode 中安装 prettier
2. coding-standard/.prettierrc
    {    
        "semi": false,           // 不尾随分号
        "trailingComma": "none", // 不尾随逗号
        "singleQuote": true,     // 使用单引号
        "tabWidth": 4            // 代码缩进
    }
3. VSCode > setting > 工作区    ▣ Format On Save

# Prettier和ESLint的唯一冲突
    export default {
        created() {}
    }

      8:10  [error{color:#F66}]  Missing space before function parentheses  [space-before-function-paren{color:#09c;font-weight:bold}]
    【✖ 1 problem (1 error, 0 warnings)
      1 error and 0 warnings potentially fixable with the `--fix` option.】{color:#F66}

    解决：修改 ESLint 的验证规则 .eslintrc.js
        module.exports = {
            rules: {
                "[space-before-function-paren{color:#09c;font-weight:bold}]": "off" // off、warn、error 
            }
        }
        coding-standard> npm run serve

[##] 多规范之默认规范
    coding-standard/.vscode/settings.json ▾
    ↧{
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
    }↥
===-
:::

::: details 约定式提交规范
===+
项目创建 参考标准化大厂编程规范解决方案

约定式提交规范要求：
    <type>[optional scope]: <description>   <类型>[可选 范围]: <描述>
    [optional body]                         [可选 正文]
    [optional footer]                       [可选 脚注]

按照规范提交太过繁琐[{color:#d96}]
xxxx> npm install -g [commitizen](https://github.com/commitizen/cz-cli)@4.2.4
coding-standard> npm i cz-customizable@6.3.0 --save-dev

coding-standard/package.json ▾
    ↧"config": {
        "commitizen": {
            "path": "node_modules/cz-customizable"
        }
    }↥
coding-standard/.cz-config.js ▾
    ↧module.exports = {
        // 可选类型
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
        // 消息步骤
        messages: {
            type: '请选择提交类型:',
            customScope: '请输入修改范围(可选):',
            subject: '请简要描述提交(必填):',
            body: '请输入详细描述(可选):',
            footer: '请输入要关闭的issue(可选):',
            confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
        },    
        skipQuestions: ['body', 'footer'], // 跳过问题    
        subjectLimit: 72                   // subject文字长度默认是72
    }↥

coding-standard> git cz  // 代替 git commit    

如果有人忘记了使用 git cz 指令，直接就提交了怎么办呢？[{color:#d96}]
目标：当《提交描述信息》不符合 约定式提交规范 的时候，阻止当前的提交，并抛出对应的错误提示

Git hooks：
    commit-msg 可以用来规范化标准格式，并且可以按需指定是否要拒绝本次提交
    pre-commit 会在提交前被调用，并且可以按需指定是否要拒绝本次提交
    ...
工具：
    1. commitlint 用于检查提交信息
    coding-standard> npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
    coding-standard/commitlint.config.js ▾
        ↧ //确保保存为 UTF-8 的编码格式
        module.exports = {
            extends: ['@commitlint/config-conventional'], // 继承的规则
            // 定义规则类型
            rules: {
                // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
                'type-enum': [
                    2,
                    'always',
                    [
                        'feat',     // 新功能 feature
                        'fix',      // 修复 bug
                        'docs',     // 文档注释
                        'style',    // 代码格式(不影响代码运行的变动)
                        'refactor', // 重构(既不增加新功能，也不是修复bug)
                        'perf',     // 性能优化
                        'test',     // 增加测试
                        'chore',    // 构建过程或辅助工具的变动
                        'revert',   // 回退
                        'build'     // 打包
                    ]
                ],        
                'subject-case': [0] // subject 大小写不做校验
            }
        }↥

    2. husky      是git hooks工具
    coding-standard> npm install husky@7.0.1 --save-dev
    coding-standard> npx husky install // 或/package.json "scripts": {"prepare": "husky install"} 运行 npm run prepare 会生成 .husky 文件夹
    执行成功提示：[husky - Git hooks installed{color:#69c}]

    添加 commitlint 的 hook 到 husky中 并在 commit-msg 的 hooks 下执行 npx --no-install commitlint --edit "$1" 指令
    coding-standard> npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
    coding-standard/.husky/commit-msg // 生成的文件

如果有人忘记配置保存自动格式代码直接就提交？[{color:#d96}]
    - 提交时自动检测
        coding-standard> npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src" // 添加 commit 时的 hook （npx eslint --ext .js,.vue src 会在执行到该 hook 时运行）
        coding-standard/.husky/pre-commit // 生成的文件

        测试：
            1. 关闭 VSCode 的自动保存操作
            2. 修改一处代码，使其不符合 ESLint 校验规则
            3. 执行 提交操作 会发现，抛出一系列的错误，代码无法提交

    - 提交时自动修复
        [lint-staged](https://github.com/okonet/lint-staged) // vue-cli 已经安装过了 直接使用即可
        coding-standard/package.json ▾
            ↧"lint-staged": {
                "src/**/*.{js,vue}": [
                    "eslint --fix",
                    "git add"
                ]
            }↥
        coding-standard/.husky/pre-commit ▾
            ↧#!/bin/sh
            . "$(dirname "$0")/_/husky.sh"

            npx lint-staged↥
        再次执行提交代码 发现暂存区中不符合 ESlint 的内容，被自动修复
===-
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
===+
const { config, fetch, fetchPath } = require('../config')
const {writeFileSync} = fetch('UTILS|fs')
const src = fetchPath("DATA|src:updateTime")
read('RES|markdown.scene')
===-
:::

::: details vuepress
===+
[##]  自定义格式 

预设className：
    颜色 c0 c3 c6 c9 cc cf
    背景 bg0 bg3 bg6 bg9 bgc bgf
    标题 h1 h2 h3 h4 h5 h6
    注释 comment

普通区域
- Flex
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 8             // 小于等于10 flex-grow: 8
    col 01
    &#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61;&#61; 100classname  // 大于10 flex-basis: n  可注入自定义classname
    col 02
    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

自定义代码块 
&#61;&#61;&#61;&#43; 
    ANCHOR&#91;1627821297227|node-inspect&#93;  > 
    ANCHOR&#91;npm_user_register|npm#NPM帐户|NPM帐户&#93;
    ANCHOR&#91;1123403874911|gulp&#93;                        <div class="anchor" name="1123403874911" id="1123403874911"></div>
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
        {{[{color:#26f}API]}}
        {{[{color:#26f}RES]}}

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
        ▭{{[{color:#26f}API]}}/api/login/▭
        ▭{{[{color:#26f}RES]}}/api/cdn/UploadFile/▭

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
        ▤(vtop)collection-name{color:#ffaa22}[登录,上传(active)]▤

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


[##]  场景 
[##]  攻略 
[##]  方案 
[##]  规范 
[##]  PlantUML 
===-
:::

::: details Javascript注释
-------------------------------------- 1
===+
[#]  普通注释 
目的：帮助开发者和阅读者更好地理解程序+
规范：
    1. 总是在单行注释符后留一个空格
    2. 总是在多行注释的结束符前留一个空格(使星号对齐)
    3. 不要把注释写在多行注释的开始符、结束符所在行
    4. 不要编写无意义的注释
===-
====================================== 100
===+

&nbsp; 5// 正确的单行注释
&nbsp; 
&nbsp; 5/*
&nbsp; 正确的多行注释
&nbsp; 注释符星号对齐                           
&nbsp;  */
===-
====================================== 300
===+

1/* 不要在此书写
                             
   不要在此书写 */

1// 声明变量value(无意义)
===-
====================================== 1
<strong>■ TODO</strong>
===+
// TODO 未处理IE6-8的兼容性
function setOpacity(node, val) {
    node.style.opacity = val;
}
===-
--------------------------------------

-------------------------------------- 400
===+
[#]  文档注释 
规范：
    1. 星号对齐
    2. 注释内容与星号间留一个空格
    3. 文档注释必须包含一个或多个注释标签
===-
====================================== 1
===+

类型：String/Number/Object/Array/ArrayLike<Element>/Element
多类型：{(string|string[])} {*}

参数有默认值时：[参数名=默认值]
===-
--------------------------------------

-------------------------------------- 200
===+
1/**
 * 模块说明
 * @module 模块名
 */

2/**
 * 类说明
 * @class 类名
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */

3/**
 * 类方法说明
 * @method 方法名
 * @for 所属类名                     
 * @param {参数类型} 参数名 参数说明  
 * @return {返回值类型} 返回值说明    
 * @static                          
 */
===-
====================================== 300
===+
1/**
 * 提供最基础、最核心的接口
 * @module Core
 */

2/**
 * 节点集合类
 * @class NodeList
 * @constructor                     
 * @param {ArrayLike<Element>} nodes 初始化节点
 */

3/**
 * 返回当前集合中指定位置的元素
 * @method
 * @for NodeList                                         
 * @param {Number} [i=0] 位置下标
 * @return {Element} 指定元素   
 */
===-
====================================== 4
===+
4/**
 * 属性说明
 * @property {属性类型} 属性名
 */




&nbsp; // 必须搭配@constructor或@static使用，分别标记非静态类与静态类
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp; // 没有指定@for时，表示此函数为全局或模块顶层函数
&nbsp; // 当函数有参数时
&nbsp; // 当函数有返回值时
&nbsp; // 当函数为静态函数时

===-
--------------------------------------

-------------------------------------- 1
===+
[#]  文件注释 
规范：
    1. 文件注释位于文件的最前面
    2. 文件注释必须全部以英文字符表示，并存在于文件的开发版本与生产版本中2222

3/*!
 * jRaiser 2 Javascript Library
 * kan.56.com - v1.0.0 (2013-03-15T14:55:51+0800)      // 概要说明及版本(必须) 修改时间(必须)以ISO格式表示
 * http://jraiser.org/ | Released under MIT license    // 项目地址(开源组件必须) 开源协议(开源组件必须)
 * Copyright 2005-2013 56.com                          // 版权声明(必须)
 *
 * Include sizzle (http://sizzlejs.com/)               // 如果文件内包含开源组件 则必须在文件注释中进行说明
 */
===-
--------------------------------------

===+
[#]  块标签 
===-
-------------------------------------- 2
===+
# 对文件进行描述
@author       指定项目作者
@copyright    描述版权信息
@see          描述可以参考外部资源
@version      描述版本信息
@tutorial     插入一个指向教程的链接，作为文档的一部分
@since        描述该功能哪个版本哪个时间添加进来的
@summary      描述一个简写版本
@file         文件说明，在文件开头使用
@license      描述代码才有那种软件许可协议

# 标注js使用方法
@returns      描述一个函数的返回值
@param        描述传递给函数的参数
@description  描述
@example      举例
@throws       描述可能会被抛出什么样的错误

# 开发者备注
@deprecated   标注关联代码已经被弃用
@todo         描述一个将要完成的任务
===-
====================================== 3
===+
# 文件详细结构
@abstract     标注该成员必须在子类中实现或重写
@access       标注该成员的访问级别
@access private > @private
@access protected > @protected
@access public > @public
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
===-
====================================== 3
===+

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
===-
--------------------------------------

:::

