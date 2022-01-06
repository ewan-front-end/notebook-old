

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

admin/.vscode/settings.json ▾
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
admin/.prettierrc.js ▾
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
admin/.eslintrc.js ▾
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
admin/src/main.js ▾
    ↧import { createApp } from 'vue'
    import router from './router'
    import store from './store'
    import App from './App.vue'

    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')↥
admin/src/App.vue ▾
    ↧<template>
        <router-view />
    </template>

    <style lang="scss"></style>↥
admin/src/router/index.js ▾
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
            admin/src/main.js
                import installElementPlus from './plugins/element'
                installElementPlus(app)↥
        方式二 ▾
            ↧
            admin> npm i element-plus --save // 1.0.2-beta.28
            admin/src/main.js
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
            admin/vue.config.js ▾
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
            admin/.env.development ▾
                ↧▧&#35; 标志
                ENV = 'development'

                &#35; base api
                1►VUE_APP_BASE_API◄ = '/api'▨↥
            admin/.env.production ▾
                ↧▧&#35; 标志
                ENV = 'production'

                &#35; base api
                1►VUE_APP_BASE_API◄ = '/prod-api'▨↥
            admin/src/utils/request.js ▾
                ↧▧import axios from 'axios'

                const service = axios.create({
                    baseURL: process.env.1►VUE_APP_BASE_API◄,
                    timeout: 5000
                })

                export default service▨↥
        2.封装 接口请求 模块
            admin/src/api/sys.js ▾
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
            admin/src/store/modules/user.js ▾
                ↧▧import { 2►login◄ } from '@/api/sys'
                import md5 from 'md5'
                3►export default◄ {
                    namespaced: true,
                    state: () => ({}),
                    mutations: {},
                    actions: {
                        login(context, userInfo) {
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
            admin/src/store/index.js ▾
                ↧▧import { createStore } from 'vuex'
                import 3►user◄ from './modules/user.js'
                export default createStore({
                    modules: {
                        3►user◄
                    }
                })▨↥
            admin/src/views/login/index.vue ▾
                ↧▧<el-form 6►ref="loginFromRef"◄ :model="loginForm" :rules="loginRules">
                    <el-button 5►:loading="loading"◄ 4►@click="handleLogin"◄>登录</el-button>
                </el-form>
                
                <script setup>
                import { ref } from 'vue'
                import { validatePassword } from './rules'
                import { useStore } from 'vuex'

                // 登录动作处理
                const 5►loading◄ = ref(false)
                const 6►loginFromRef◄ = ref(null)
                const store = useStore()
                const 4►handleLogin◄ = () => {
                    6►loginFromRef◄.value.validate(valid => {
                        if (!valid) return

                        5►loading◄.value = true
                        store
                        .dispatch('user/login', loginForm.value)
                        .then(() => {
                            5►loading◄.value = false
                            // TODO: 登录后操作
                        })
                        .catch(err => {
                            console.log(err)
                            5►loading◄.value = false
                        })
                    })
                }
                </script>▨↥
            admin/vue.config.js ▾
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
            admin/src/utils/storage.js ▾
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
            admin/src/constant/index.js
                export const TOKEN = 'token'
            admin/src/store/modules/user.js ▾
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
            响应数据的统一处理
            admin/src/utils/request.js ▾
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
            admin/src/store/modules/user.js ▾
                ↧▧❶this.commit('user/setToken', data.token)❶▨↥
        5.登录鉴权
            admin/src/layout/index.vue
            admin/src/router/index.js ▾
                ↧{
                    path: '/',
                    component: () => import('@/layout/index')
                }↥
            admin/src/permission.js ▾
                ↧▧import router from './router'
                import store from './store'

                // 白名单
                const whiteList = ['/login']
                /**
                * 路由前置守卫
                */
                router.beforeEach(async (to, from, next) => {
                    // 存在 token ，进入主页
                    // if (store.state.user.token) {
                    // 快捷访问
                    if (store.getters.token) {
                        if (to.path === '/login') {
                            next('/')
                        } else {
                            next()
                        }
                    } else {
                        // 没有token的情况下，可以进入白名单
                        if (whiteList.indexOf(to.path) > -1) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                })▨↥
            admin/src/store/getters.js ▾ 快捷访问
                ↧const getters = {
                    token: state => state.user.token
                }
                export default getters↥
            admin/src/store/index.js ▾
                ↧import getters from './getters'
                export default createStore({
                    getters
                })↥
            admin/src/main.js ▾
                ↧// 导入权限控制模块
                import './permission'↥



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

