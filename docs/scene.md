- [Node版本管理](/node.html#版本管理)


node获取可用端口号
用法一：
var portfinder = require('portfinder');

  portfinder.getPort(function (err, port) {
    //
    // `port` 说明可以在此作用域使用
    //
  });

用法二：
const portfinder = require('portfinder');

  portfinder.getPortPromise()
    .then((port) => {
        //
        // `port` 说明可以在此作用域使用
        //
    })
    .catch((err) => {
        //
        // 不能使用，肯定会返回具体错误信息`err`,比如`Error: listen EACCES: permission denied 127.0.0.1:80`等信息
        //
    });




- 获取北京时间
- 前端性能优化-通用的缓存SDK
- NPM内网源搭建
- 搭建websocket服务(/node/socket)
- 搭建聊天室(/socket/)
- Node测试方案
- node插件开发(/node/plugin)
- 打造一个Node命令行工具 https://www.imooc.com/article/3156
- html模块化开发
- 移动端web的调试
- 为项目添加文档功能 [Vuepress最佳实践](/framework/vuepress.html#最佳完整实践) [Docsify](/framework/docsify)
- 免费社工库机器人  @FreeSGKbot
- Node中使用ES6模块化规范 [Node模块化ES6规范](/node/#es6模块化应用)
- 地区限制 [地区限制方案](/solution#地区限制方案)
- 流程图 跨职域流程图 数据结构表 顺序图 状态转换图 类图 [UML(Unified Modeling Language)](/tools/uml)
- 业务模块进行归并、划分时的E—R图（实体关系法）以及连带的数据结构设计
- OOA（面向对象分析） OOD（面向对象设计）
- [设计模式(Design pattern)](/designPattern)

## 解决方案
- [用户帐户体系](/solution.html#用户帐户体系sdk)
- [微前端架构](/solution#微前端架构)
- [浏览器静默与激活](/solution#浏览器静默与激活)


## 项目



## 环境搭建 
::: details Node环境下ES6模块化开发
http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html
```
■ 目录结构  
    ┠ src ----------------------------- 开发目录
    ┃   ┠ a.js
    ┃   ┖ b.js
    ┠ main.js 

    demo/src/a.js
        export default (a, b) => a + b
    demo/src/b.js
        export const pow = x => x * x
        export const sqrt = x => Math.sqrt(x)
    demo/main.js   
        import add from './src/a'
        import { pow, sqrt } from './src/b'
        console.log(add(1, 2))
        console.log(pow(9))
        console.log(sqrt(9))  

■ 目标
    > deme> node main.js 运行不报错

■ 技术部署
    1. demo> npm init -y
    2. demo> npm i babel-register babel-env --save-dev
    3. 创建新入口如：demo/main-new.js
        require('babel-register') ({ presets: [ 'env' ] })
        module.exports = require('./main.js') // 在这里输出老入口
    4. deme> node main-new.js 
```
:::


::: details HTML+ES6模块化开发
```
■ 目标
    > File协议浏览index.html
    > 在静态页(index.html)中以script标签方式引入主入口(main.js)
    > 将主入口(main.js)打包成 main-bundle.js

■ 目录结构
    ┠ src ----------------------------- 开发目录
    ┃   ┠ a.js
    ┃   ┖ b.js
    ┠ main.js 
    ┠ index.html

    demo/src/a.js
        export default (a, b) => a + b
    demo/src/b.js
        export const pow = x => x * x
        export const sqrt = x => Math.sqrt(x)
    demo/main.js   
        import add from './src/a'
        import { pow, sqrt } from './src/b'
        console.log(add(1, 2))
        console.log(pow(9))
        console.log(sqrt(9))  
    demo/index.html   
        <h1>HTML+ES6模块化开发</h1>
        <script src="main.js"></script>
       
■ 实现
    demo> npm init -y
    demo> npm i webpack@5.42.0 webpack-cli@4.7.2 --save-dev

    demo/webpack.config.js
        module.exports = {
            entry: './main.js',             // 入口 相对路径
            output: {                       // 出口 绝对路径
                filename: 'main-bundle.js',
                path: __dirname
            },
            mode: 'development'             // 环境：production/development/none
        }
    demo> npx webpack 

    调整 demo/index.html script src="main-bundle.js"></script>
    打开 demo/index.html
```
:::

::: details HTML+ES6模块化/热更新开发
```
■ 目标
    > File协议浏览dist/index.html
    > 在静态页(dist/index.html)中以script标签方式引入主入口(src/main.js)    
    > 发布主入口文件到dist/js/下
    > 监控响应开发目录

■ 目录结构
    ┠ dist ---------------------------- 发布目录
    ┃   ┖ index.html
    ┠ src ----------------------------- 开发目录
    ┃   ┠ main.js
    ┃   ┖ modules
    ┃       ┠ a.js
    ┃       ┖ b.js    
    
    demo/dist/index.html   
        <h1>HTML+ES6模块化/热更新开发</h1>     
        <script src="js/main.js"></script>             
    demo/src/main.js    
        import add from './modules/a'
        import { pow, sqrt } from './modules/b'
        console.log(add(1, 2))
        console.log(pow(9))
        console.log(sqrt(9))    
    demo/src/modules/a.js
        export default (a, b) => a + b
    demo/src/modules/b.js
        export const pow = x => x * x
        export const sqrt = x => Math.sqrt(x)
       
■ 实现
    demo> npm init -y
    demo> npm i webpack@5.42.0 webpack-cli@4.7.2 nodemon-webpack-plugin --save-dev

    demo/webpack.config.js
        const path = require('path')
        const NodemonPlugin = require('nodemon-webpack-plugin')
        module.exports = {
            mode: 'development',
            entry: './src/main.js',
            output: {
                path: path.resolve(__dirname, 'dist/js'),
                filename: '[name].js'
            },
            plugins: [new NodemonPlugin()]
        }
    如果主入口要暴露方法则需指定引用模式/访问前缀：
        module.exports = {
            output: {
                library: 'lib', 
                libraryTarget: 'umd'
            }
        }

    demo> npx webpack --watch
    部署完成 可以开发了    
```
:::


::: details HTML+ES6模块化/热更新/服务预览
```
■ 目标
    > Http协议浏览example/index.html
    > 在静态页(example/index.html)中以script标签方式引入主入口(src/main.js)    
    > 发布主入口文件到example/js/下
    > 监控响应开发目录

■ 目录结构
    ┠ example ---------------------------- 发布目录
    ┃   ┖ index.html
    ┠ src ----------------------------- 开发目录
    ┃   ┠ main.js
    ┃   ┖ modules
    ┃       ┠ a.js
    ┃       ┖ b.js    
    
    demo/example/index.html   
        <h1>HTML+ES6模块化/热更新/服务预览</h1>     
        <script src="js/main.js"></script>  
        <script> 
            console.log(lib.str) 
            console.log(`3 + 5 = ${lib.add(3, 5)}`)
            console.log(`7 * 7 = ${lib.pow(7)}`)
            console.log(`36的平方根 = ${lib.sqrt(36)}`)
        </script>           
    demo/src/main.js    
        import add from './modules/a'
        import { pow, sqrt } from './modules/b'
        console.log(add(1, 2))
        console.log(pow(9))
        console.log(sqrt(9)) 
        const str = 'libstring'
        export {str, add, pow, sqrt}  
        // 接收热更新输出，只有accept才能被更新
        if (module.hot) { module.hot.accept() }  
    demo/src/modules/a.js
        export default (a, b) => a + b
    demo/src/modules/b.js
        export const pow = x => x * x
        export const sqrt = x => Math.sqrt(x)    

■ 搭建服务
    demo> npm init -y
    demo> npm i express@4.17.1 --save-dev 

    demo/example/server.js
        const express = require('express')
        const app = express()
        const port = 3001
        app.use(express.static(__dirname))
        app.listen(port, ()=>{console.log('\nhttp://localhost:' + port + '\n')})
    
    demo> node example/server.js

■ 开发部署
    demo> npm i webpack@5.42.0 webpack-cli@4.7.2 --save-dev

    demo/example/webpack.config.js
        const path = require('path')        
        module.exports = {
            mode: 'development',
            entry: {
                main: path.resolve(__dirname, '../src/main.js'), // 相对路径 使用绝对路径突破服务限制
            },
            output: {
                path: path.resolve(__dirname, 'js'),             // 绝对路径
                filename: '[name].js',
                publicPath: '/js/',                              // 很重要 script资源引用时的依据
                library: 'lib', 
                libraryTarget: 'umd'
            }
        }
    demo> npx webpack --config example/webpack.config.js 
    demo> node example/server.js

    为服务添加热更新：监控开发文件/浏览器自刷新
        demo> npm i webpack-dev-middleware@5.0.0 webpack-hot-middleware@2.25.0 --save-dev

        调整服务器 demo/example/server.js 在'const port = 3001'和'app.use(express.static(__dirname))'之间
            const webpackDevMiddleware = require('webpack-dev-middleware')
            const webpackHotMiddleware = require('webpack-hot-middleware')
            const webpack = require('webpack')
            const webpackConfig = require('./webpack.config.js')
            const compiler = webpack(webpackConfig)            
            app.use(webpackDevMiddleware(compiler))
            app.use(webpackHotMiddleware(compiler))  

        服务订阅 demo/example/webpack.config.js            
            const webpack = require('webpack')
            module.exports = {  
                entry: [
                    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
                    path.resolve(__dirname, '../src/main.js')
                ], 
                plugins: [
                    new webpack.HotModuleReplacementPlugin(), // 启动HMR
                    new webpack.NoEmitOnErrorsPlugin()        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
                ]
            }
        
    demo> node example/server.js
    http://localhost:8081/ 如果输出未定义 1 webpack.config.js output.publicPath是否已设置 2 HtmlWebpackPlugin插件是否设置inject
    偿试编辑 src/main.js 再刷新浏览器查看
```
:::

::: detaile 测试
```
demo/package.json
"scripts": {    
    "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e"
},

demo/test/
端到端测试(e2e)
单元测试



```
:::






::: details 1111111111
npm init -y
npm i webpack webpack-cli webpack-hot-middleware --save-dev
demo/src/main.js

demo/webpack.config.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].[hash].js'
    }
}
module.exports = {
    mode: 'development',
    entry: ['webpack-hot-middleware/client', './src/main.js'],
    output: {
        path: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}

demo> npx webpack
:::



::: details 较完整项目
```
■ 目标
    > Http协议浏览example/
    > 在静态页(example/index.html)中以script标签方式引入主入口(src/main.js)    
    > 发布主入口文件到example/js/下
    > 监控响应开发目录
    > 环境
■ 目录结构    
    ┠ src ----------------------------- 开发目录
    ┃   ┠ Element.js
    ┃   ┠ main.js
    ┃   ┖ modules
    ┃       ┠ a.js
    ┃       ┖ b.js   
    ┠ examples ------------------------ 应用演示    
    ┃   ┠ index.html
    ┃   ┠ 001
    ┃   ┃   ┠ app.js
    ┃   ┃   ┠ index.html
    ┠ plugin -------------------------- 独立插件 src/Element.js最终要独立开发

    demo/src/Element.js
        export class Element{  
            constructor(type){
                this.type = type
                this.data = {a: 1}
            }
        }
    demo/src/main.js    
        import add from './modules/a'
        import { pow, sqrt } from './modules/b'
        console.log(add(1, 2))
        console.log(pow(9))
        console.log(sqrt(9))    
    demo/src/modules/a.js
        export default (a, b) => a + b
    demo/src/modules/b.js
        export const pow = x => x * x
        export const sqrt = x => Math.sqrt(x)
    demo/examples/index.html
        <h1>应用实例</h1>
        <a href="001/">001</a>
    demo/examples/001/index.html
        <script src="/static/Element.js"></script>   <!-- 开启服务 从跟目录读取资源 File协议浏览 "../static/Element.js" 从上一级目录读取资源 -->
        <script>
            var el = new lib.Element('Sprite')
            console.log('el', el)
        </script>

■ 搭建服务
    demo> npm init -y
    demo> npm i express@4.17.1 --save-dev 

    demo/examples/server.js
        const express = require('express')
        const app = express()
        const port = 3001
        app.use(express.static(__dirname))
        app.listen(port, ()=>{console.log('Listen on '+port)})
    
    demo> node examples/server.js
    搭建完成 服务根目录/static/Element.js还不存在：需发布打包

■ 发布打包
    demo> npm i webpack@5.42.0 webpack-cli@4.7.2 --save-dev

    > demo/examples/webpack.config.js
        const path = require('path')
        module.exports = {
            mode: 'development',
            entry: {
                Element: path.resolve(__dirname, '001/app.js') // 用绝对路径 突破服务限制
            },
            output: {
                path: path.resolve(__dirname, 'static'),
                filename: '[name].js',
                publicPath: '/static/',
                library: 'lib',
                libraryTarget: 'umd'
            }
        }
    > demo/examples/001/app.js
        import {Element} from '../../src/Element'
        export {Element}

    demo> npx webpack --config examples/webpack.config.js
    打包完成 http://localhost:3001

■ 开发打包
    1. 为服务添加热更新
        demo> npm i webpack-dev-middleware@5.0.0 webpack-hot-middleware@2.25.0 --save-dev

        调整服务器 demo/examples/server.js
            const port = 3001
            const webpackDevMiddleware = require('webpack-dev-middleware')
            const webpackHotMiddleware = require('webpack-hot-middleware')
            const webpack = require('webpack')
            const webpackConfig = require('./webpack.config.js')
            const compiler = webpack(webpackConfig)
            
            app.use(webpackDevMiddleware(compiler))
            app.use(webpackHotMiddleware(compiler))
            app.use(express.static(__dirname))
        
    2. demo> node examples/server.js
    3. 偿试编辑 src/Element.js 再刷新浏览器查看
    
```
:::

::: details HTML+ES6模块化项目服务开发多入口服务器渲染
aaaa
:::





## 工具
::: details 表单验证
- /demo.html
```html
<form id="formid" onsubmit="return false">
    <div id="loginNoAutocomplete"><input type="text"><input type="password"></div>
    <label>
        <input id="emai" name="email" type="text" autocomplete="true" valid="present,email">
    </label>
    <input id="submitid" value="Login" type="submit" >
</form>
```
- /form-check.js
```js
const rules = {
    mobile: v => {},
    email: v => {},
    present: v => {
        if (!v.trim()){return {type: 'present', message: '必填'}}
    }
}
export default (form) => {
    if (!(form && form.elements)) return
    const elements = form.elements
    let checkResult = []

    Array.from(elements).filter(item => item.getAttribute('valid')).map(item => {
        const valids = item.getAttribute('valid').split(',')
        const value = item.value
        let errorArr = []
        valids.forEach(valid => {
            if (rules[valid]) {
                let result = rules[valid](value)
                result && errorArr.push(result)
            }
        })
        if (errorArr.length) {
            checkResult.push({
                dom: item,
                errorArr,
                name: item.name,
                message: errorArr[0].message,
                type: errorArr[0].type
            })
        }
    })
    return checkResult
}
```
- /event.js
```js
import FormCheck from './form-check'
document.getElementById('submitid').onclick = () => {
    const checkResult = formCheck(document.getElementById('formid'))
    console.log('checkResult', checkResult)
}
```
:::

::: details 验证滑块
```html
<style> .register-verify-wrapper{height: 36px;} </style>
<div id="register-verify-wrapper" class="register-verify-wrapper"></div>
```
```js
const $ = (id) => document.getElementById(id)
const render = Symbol('render');
const bindEvent = Symbol('bindEvent');
const style =
`<style>
    .vs-wrapper { position: relative; width: 100%; height: 100%; }
    .vs-moved-bg { background: green; width: 0; position: absolute; z-index: 999; height: 100%; }
    .vs-unmoved-bg { background: gray; width: 100%; position:absolute; z-index: 998; height: 100%; }
    .vs-text { position: absolute; width: 100%; top: 0; z-index: 1000; backgound: rgba(0,0,0,0); text-align: center; }
    .vs-move-btn { height: 100%; width: 30px; background: #333333; position: absolute; top: 0; left: 0; z-index: 1001; }
</style>`
class Slider {
    constructor(opts) {
        this.opts = opts;
        if (!opts.container) {
            throw '请填写container配置';
        }
        else {
            this[render](opts);
            this[bindEvent](opts);
        }
    }

    [render](opts) {
        const unsuccessTip = opts.unsuccessTip || '请按住滑块，拖动到最右边';
        /*
         * vs = verify-slider
         */
        const tpl =  style + `
            <div id="vs-wrapper" class="vs-wrapper">
                <div id="vs-moved-bg" class="vs-moved-bg"></div>
                <span id="vs-move-btn" class="vs-move-btn"></span>
                <div id="vs-unmoved-bg" class="vs-unmoved-bg"></div>
                <span id="vs-text" class="vs-text" ondrag="return false;">${ unsuccessTip }</span>
            </div>
        `

        opts.container.innerHTML = tpl;
    }

    [bindEvent](opts) {
        const $btn = $('vs-move-btn');
        const $moved = $('vs-moved-bg');
        const $wrapper = $('vs-wrapper');
        const $text = $('vs-text');
        const reset = () => {
            this.startX = 0;
            this.start = false;
            this.end = false;
            $btn.style.left = '0px';
            $moved.style.width = '0px';
        }

        $btn.onmousedown = (e) => {
            this.startX = e.pageX;
            this.start = true;
        }

        window.onmousemove = (e) => {
            if (this.start && !this.end) {
                let offset = e.pageX - this.startX;
                let r1 = $moved.offsetLeft + parseInt(window.getComputedStyle($moved).width);
                let r2 = parseInt(window.getComputedStyle($wrapper).width) - parseInt(window.getComputedStyle($btn).width);
                $btn.style.left = offset + 'px';
                $moved.style.width = offset + 'px';
                if (r1 >= r2) {
                    this.end = true;
                    this.start = false;
                    $btn.style.left = r2 + 'px';
                    $moved.style.width = r2 + 'px';
                    opts.success && opts.success($wrapper, $text);
                }
            }
        }

        window.onmouseup = (e) => {
            if (!this.end) {
                reset();
            }
        }
    }

    reset() {
        this[render](this.opts);
        this[bindEvent](this.opts);
    }
}
```
```js
const slider = new Slider({
    container: document.getElementById('register-verify-wrapper'),
    success: async ($wrapper, $text) => { console.log('服务请求') }
}) 
```
:::

::: details NPM内网源搭建
```js
// 源 : http://127.0.0.1:7001/  
// WEB: http://127.0.0.1:7002/  

1. CNPMJS
    下载：git clone git://github.com/cnpm/cnpmjs.org.git 或 https://github.com/cnpm/cnpmjs.org/ 下载zip
    安装：cd cnpmjs.org && npm install 或 npm install --registry=http://registry.npm.taobao.org
    配置：cnpmjs.org/config/index.js 参考/* #CNPMCONFIG</strong> */

2. MySQL
    创建数据库:cnpmjs_test
    创建表:将cnpmjs.org/doc/db.sql中的内容复制出来在mysql中执行一遍即可
    $ cd /Users/xxxxxxxxxx/Project/cnpmjs.org
    $ node dispatch.js // 启动成功后，即可看到内网源的web页面了，后台自动开始同步官方模块

3. 内网源的使用
    1 安装cnpm客户端: npm i cnpm -g
    2 设置cnpm源为内网源: cnpm config set registry="http://127.0.0.1:7001"
    3 cnpm install 模块名称 // 支持所有npm命令

4. 模块发布
    1 创建用户:cnpm adduser
    2 登录:cnpm login
    3 cd 模块目录 // 注意模块名称必须带前缀，如@xxx/name，与config中的scopes配置对应
    4 cnpm publish

/* #CNPMCONFIG</strong> */
var config = {
  bindingHost: '127.0.0.1',                     // #1设置指定外网IP,默认是127.0.0.1  
                                                // #2注意，添加用户时，请添加该处配置的用户，不然不能发布模块的
  admins: {     
    fengmk2: 'fengmk2@gmail.com',
    admin: 'xxxxxxxxxx@163.com',                // #3
    dead_horse: 'dead_horse@qq.com',
  },  
  database: {      
    dialect: 'mysql',                           // #4数据库类型,目前支持: 'mysql', 'sqlite', 'postgres', 'mariadb'
  },
  enablePrivate: true,                          // #5私库开关
  scopes: ['@cnpm', '@cnpmtest', '@cnpm-test'], // #6指定私有包的前缀，避免与官方模块冲突  
  syncModel: 'exist',                           // #7
}
```
:::

::: details 开发一个NPM插件
```js
账户 u:xxxxxxxxxx  p:xxxxxxxxxxew.. e:xxxxxxxxxx@163.com  组织：seahan、angg

规范
bin   可执行二进制文件
lib   javascript代码
doc   文档
test  单元测试用例
package.json  包描述
    {
        "name": "@angg/express"
        "repository": { "type": "git", "url": "https://github.com/wmgcuan/express.git" },
        "homepage": "https://github.com/wmgcuan/express",
        "bugs": { "url": "https://github.com/wmgcuan/express/issues" }
    }

开发

发布 https://segmentfault.com/a/1190000009315989
1 $ npm adduser // 命令向导分别要求填入username/password/email,可通过 npm whoami 查看当前用户
2 $ npm publish --access public // npm publish 默认发布私有，所以会导致失败，如果是二次发布，则需先迭代version

多人发布
npm owner add <user> [<@scope>/]<pkg> # 将用户添加到包的所有者列表,如 npm owner add xxxxxxxxxx @angg/express>
npm owner rm <user> [<@scope>/]<pkg> # 从包的所有这列表中删除用户
npm owner ls [<@scope>/]<pkg> # 列出包的所有者
```
:::






### 分页
<img src="assets/images/fa-page.jpg">



### Enter提交表单
```
<input type="text" onchange="console.log(this.value);" />
<input type="text" onkeydown="handleKeydown(event)" />
function handleKeydown(e){ console.log(e.keyCode) }
```











#################### 运行时
文件结构

配置列表
CONF_BW = {
  THEME:     '主题站点',
  SKIN:      '主题皮肤',
  TITLE:     '站点标题',
  COPYRIGHT: '备案信息',
}
RES_PUBLIC: 'static/'
RES_PRIVATE: CONF_BW.THEME + '/'


场景：
新增一个主题站点
新增一个主题皮肤
主题皮肤变更指引：资源变迁 

#### 构建时
CONF_THEME = {
  THEME: {
    SKIN:      '主题皮肤',
    // 私有资源注册Private Resource Registration
    PRR:{
      addr: THEME // 可自定义
      res: []
    }
  }
}
打包指定站点
打包配置列表
生成场景引导 新成员
开发规范说明 新成员
公共私有目录查询

初始：
生成 THEME:配置 映射表  依据THEME快速查询

解决方案：












# 人机验证
暴力破解密码  频繁操作导致服务器压力崩溃的恶意攻击
数字、字母、中文的组合 缺点：用户需要在鼠标-键盘、中英文之间切换，不具备任何趣味性
```





### 前端工程搭建
```
npm install -g babel-cli
babel --version
demo> npm init -y 
demo> npm install --save-dev babel-preset-es2015 babel-cli

index.html    src         dist    .babelrc
              index.js

/index.html   
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ES6项目搭建</title>
    <script src="dist/index.js"></script>
</head>
<body>
    Hello ECMA Script2016
</body>
</html>
```
/src/index.js
```js
let a = 1
console.log(a)

const b = '测试ES6'
console.log(b)
```
/.babelrc     
```json
{"presets":["es2015"], "plugins":[]}
```
/package.json
```json
{"scripts": {"build": "babel src/index.js -o dist/index.js"}}
```
demo> babel src/index.js -o dist/index.js  
或  
demo> npm run build
浏览 /index.html
```


### 前端工程搭建-Babel7+
```
https://www.babeljs.cn/docs/usage

|es6-babel7> npm init -y
|es6-babel7> npm install --save-dev [b ch|@babel/core @babel/cli]

[src[a.js], lib, package.json]
[b-blue|/src/a.js] [DETAIL/es6-project-07]
|es6-babel7> ./node_modules/.bin/babel src --out-dir lib [DETAIL/es6-project-05] 
[b-blue|/lib/a.js] [DETAIL/es6-project-07]           

[b3 cf| 指定代码转换功能 ] 箭头函数
|es6-babel7> npm install --save-dev [b ch|@babel/plugin-transform-arrow-functions]
|es6-babel7> ./node_modules/.bin/babel src --out-dir lib [b ch|--plugins=@babel/plugin-transform-arrow-functions]
[b-green|/lib/a.js] [DETAIL/es6-project-06] 

[b3 cf| 指定代码转换功能 ] 更多 避免添加很多插件 使用官方预设定(preset)
|es6-babel7> npm install --save-dev [b ch|@babel/preset-env]
|es6-babel7> ./node_modules/.bin/babel src --out-dir lib [b ch|--presets=@babel/env]
[b-green|/lib/a.js] [DETAIL/es6-project-08]

[b3 cf| 指定代码转换功能 ] 预设配置 
/babel.config.json [DETAIL/es6-project-09]
|es6-babel7> ./node_modules/.bin/babel src --out-dir lib 
[b-green|/lib/a.js] 

[b3 cf| 指定代码转换功能 ] 预设配置 Polyfill[DETAIL/es6-project-10] 
|es6-babel7> npm install --save [b ch|@babel/polyfill]
/babel.config.json [DETAIL/es6-project-11]
|es6-babel7> ./node_modules/.bin/babel src --out-dir lib 
[b-green|/lib/a.js] 



总结：
[@babel/core, @babel/cli, @babel/preset-env, @babel/polyfill]
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill








▉es6-project-11▉
"useBuiltIns" 参数设置为 "usage" 时，Babel 将检查你的所有代码，以便查找目标环境中缺失的功能，然后只把必须的 polyfill 包含进来。
否则，必须在所有代码之前通过 require 加载一次完整的 polyfill。

{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        [b ci|"useBuiltIns": "usage"],
      }
    ]
  ]
}
▉
▉es6-project-10▉
@babel/polyfill 模块包含 core-js 和一个自定义的 regenerator runtime 来模拟完整的 ES2015+ 环境。

这意味着你可以使用诸如 Promise 和 WeakMap 之类的新的内置组件、 Array.from 或 Object.assign 之类的静态方法、 Array.prototype.includes 之类的实例方法以及生成器函数（generator functions）（前提是你使用了 regenerator 插件）。为了添加这些功能，polyfill 将添加到全局范围（global scope）和类似 String 这样的原生原型（native prototypes）中。

对于软件库/工具的作者来说，这可能太多了。如果你不需要类似 Array.prototype.includes 的实例方法，可以使用 transform runtime 插件而不是对全局范围（global scope）造成污染的 @babel/polyfill。

更进一步，如果你确切地知道你所需要的 polyfills 功能，你可以直接从 core-js 获取它们。
如：
require("core-js/modules/es.promise.finally");
Promise.resolve().finally();

▉
▉es6-project-09▉
{
  "presets": [
    [
    "@babel/env",
      {
        // 只为目标浏览器中没有的功能加载转换插件
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
          }
        }
      ]
    ]
}
▉
▉es6-project-08▉
"use strict";

var a = 11;
console.log(a);

var fn = function fn() {
  return 1;
};
▉
▉es6-project-07▉
const a = 11;
console.log(a);

const fn = () => 1;
▉
▉es6-project-06▉
const a = 11;
console.log(a);

const fn = function () {
  return 1;
};
▉
▉es6-project-05▉
将解析 src 目录下的所有 JavaScript 文件输出到 lib 目录下。由于还[b ci|没有指定任何代码转换功能]，所以输出的代码将[b ci|与输入的代码相同]。

其它动行参数：
  -o, --out-file [out]                        将所有输入文件编译成一个文件.
  -d, --out-dir [out]                         将模块的输入目录编译成输出目录.
  --relative                                  编译成相对于输入目录或文件的输出目录.
  -D, --copy-files                            在非编译文件上编译目录副本时.
  --include-dotfiles                          编译和复制非编译文件时包含点文件.
  --no-copy-ignored                           在复制非编译文件时排除忽略的文件.
  --verbose                                   记录一切。这个选项与——quiet相冲突.
  --quiet                                     不记录任何东西。此选项与——verbose冲突.
  --delete-dir-on-start                       在编译前删除out目录.
  --out-file-extension [string]               对输出文件使用特定的扩展名.
  -V, --version                               输出版本号.
  -h, --help                                  输出使用信息.
▉








```

```plantuml
@startuml
start
:"获取网页";
:"用户请求验证码";
:"服务返回图形 设置cookie";
:"用户提交 打码&cookie";
:"服务对比 打码&cookie";

if ("对比结果") then (相同)
    :"验证成功";
    stop
else (异同)
    :"验证失败";
    stop
endif
@enduml
```



