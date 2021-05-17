create-react-app / unt-design-mobile
react / react-dom / react-router / redux / axios 



框架是  Create React App
UI库是Ant Design Mobile of React
yarn install
yarn start
yarn build
ui库文档 https://mobile.ant.design/docs/react/introduce-cn

##### 环境&应用
会自动安装运行环境，集成了react/react-dom/react-router等
```
npm install -g create-react-app  // create-react-app --version 

npx create-react-app react-app       
cd react-app
react-app > npm start // http://localhost:3000/
```

##### 项目管理
1. 登录平台创建仓库
2. git init
3. git remote add origin https://github.com/wanyuaning/react-app.git
4. git push -u origin master // 关联后无需add/commit 远程浏览时无项目文件 切换到正确的分支

##### VScode开发
Path Autocomplete 路径提示功能
One Dark Pro      Atom风格美化
Auto Close Tag
Simple React Snippets
React Component

##### 资源
图片：import logo from './logo.svg'; <img src={logo} />
元素：
  JSX语法：const ele = <h1>欢迎进入React的世界</h1>   脚本语法：const ele = React.createElement('h1', {className: 'blue', children: 'Hello, world'})
  插入元素：{ele}   渲染元素：ReactDOM.render( <Demo list={['张三', '李四', '王五']} />, document.getElementById('root') );
组件：
  静态
  function Demo(props) { return ( <div className="red"> { props.list.map(item => { return <span>{item}</span> }) } </div> ) }
  ReactDOM.render( <Demo list={['张三', '李四', '王五']} />, document.getElementById('root') );
实例和节点

##### 流程遍历
{ arr.map((item, index) => {
  return <span key={index}>{item}</span>
})}

##### 组件
  /////////////////////////////components/game.jsx 以类的形式可实现动态效果
  import React from 'react'
  class Game extends React.Component { render() { return ( <div className="shopping-list"> <h1>Shopping List for {this.props.name}</h1> </div> ) } }
  export default Game;
  /////////////////////////////App.jsx
  import Game from './components/game'
  <Game name="ewan"></Game>
方法调用


##### React Devtools
https://www.gugeapps.net/webstore/category/extensions







<Message style={{color:'red', groundbackColor: 'green'}}/>


性能检测工具 Web Vitals
src/index.js 最后一行末
reportWebVitals(console.log);

##### 受控组件
class Form extends Component{
    constructor(){ super(); this.state = {a: 0, b: 0, res: 0} }
    handleA = e => { let val = Number(e.target.value); this.setState({ a: val, res: val + this.state.b }) }
    handleB = e => { let val = Number(e.target.value); this.setState({ b: val, res: this.state.a + val }) }
    render(){ return <div><input value={this.state.a} onChange={this.handleA}></input>+<input value={this.state.b} onChange={this.handleB}></input>=<input value={this.state.res} readOnly></input></div> }
}
##### 非受控组件
class Form2 extends Component{
    handle = e => { let a = Number(this.refs.a.value); let b = Number(this.refs.b.value); this.refs.c.value = a + b }
    render(){ return <div  onChange={this.handle}><input ref="a" type="text"/> + <input ref="b" type="text"/> = <input ref="c" type="text"/></div> }
}


事件
class Button extends Component{
    constructor(){ super(); this.state = {buttonText: 'on'} }
    handleClick = () => { this.setState({buttonText: 'off'}) } // 这个方法是按钮对象引用 要保持this不变
    render(){ return <button onClick={this.handleClick}>{this.state.buttonText}</button> }
}


默认属性&属性限制
import React, {Component} from 'react'
import PropTypes from 'prop-types' // 脚手架已经代为安装了
class Person extends Component{
    static defaultProps = { name: '无名' }
    static propTypes = { name: PropTypes.string, age: PropTypes.number.isRequired }
    render(){ return <div>{this.props.name} {this.props.age}</div> }
}
<Person name="ewan" age={20} />
<Person />


类组件状态管理
class Timer extends Component{
    constructor(){ super(); this.state = { time: new Date().toLocaleString() } }
    render(){ return <h1>{this.state.time}</h1> }
    componentDidMount(){ window.setInterval(() => { this.setState({ time: new Date().toLocaleString() }) }) }
}
函数组件状态管理
import React, {useState} from 'react'
export default (props) => {
  const [name, set_name] = useState('Jam')
  setTimeout(() => { set_name('Tom') }, 1000)  
  return (<span>{name}</span>)    
}
状态响应
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => { document.title = `You clicked ${count} times` });
  return (<div><p>You clicked {count} times</p> <button onClick={() => setCount(count + 1)}> Click me </button></div>);
}


组件生命周期
class Demo extends React.Component {
  componentWillMount(){}
  componentDidMount(){}
  componentDidUpdate(){}
}

##### 路由(5.x)
1. npm install react-router react-router-dom --save
2. src/App.js
    import { BrowserRouter, Route, Link } from 'react-router-dom';
    import Home from './pages/home';
    import Detail from './pages/detail';
    import Login from './pages/login';
    <BrowserRouter>
      <Route path='/login' exact component={Login}></Route>
      <Route path='/detail/:id' exact component={Detail}></Route>
      <Route path='/' exact component={Home}></Route>                  
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/detail/5">Detail</Link>
    </BrowserRouter>
    脚本跳转：this.props.history.push({pathname:"/path/" + name});
    取参接收：this.props.match.params.name

    <Route path='/web/departManange ' component={DepartManange}/>
    <Link to="web/departManange?tenantId=12121212">xxx</Link>
    脚本跳转：this.props.history.push({pathname:"/web/departManange?tenantId" + row.tenantId});
    取参接收：this.props.location.search

    <Route path='/query' component={Query}/>
    <Link to={{ path : '/query' , query : { name : 'sunny' }}}>
    脚本跳转：this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
    取参接收：this.props.location.query.name

    <Route path='/sort ' component={Sort}/>
    <Link to={{ path : ' /sort ' , state : { name : 'sunny' }}}> 
    脚本跳转：this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
    取参接收：this.props.location.query.state 

##### 状态管理机
单一数据源
State 是只读的
使用纯函数来执行修改
reducers  描述action如何改变state tree

普通使用
  1. npm install redux react-redux --save
  2. 注入 src/index.js
      import { createStore } from "redux"
      import { Provider } from "react-redux"
      import reducer from "./store/reducer"
      const store = createStore(reducer)
      ReactDOM.render(  
        <React.StrictMode> <Provider store={store}> <App /> </Provider> </React.StrictMode>,
        document.getElementById('root')
      );
  3. 使用 src/component/Store.jsx
      import React,{Component} from 'react'
      import {connect} from 'react-redux'
      class Store extends Component{
          constructor({title}){ super(); this.state = { title } }
          render(){ return <h1>状态管理机:{this.state.title}</h1> }
      }
      export default connect(state => { return { title: state.title } })(Store)
模块化


##### 重写create-react-app配置 包括Webpack等
1. react-app > npm install react-app-rewired customize-cra --save-dev

1. react-app > yarn add react-app-rewired customize-cra --dev

  /package.json
  "scripts": {
    "start": "react-app-rewired start",            // <= "react-scripts start"
    "build": "react-app-rewired build",            // <= "react-scripts build"
    "test":  "react-app-rewired test --env=jsdom", // <= "react-scripts test --env=jsdom"
  }

  /config-overrides.js
  const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
  const path = require('path')
  module.exports = override(
    // 引入Ant Design Mobile组件库
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
    // 配置文件路径别名
    addWebpackAlias({
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      common: path.resolve(__dirname, './src/common')
    })
  );

##### 团队协同 开发规范
  .editorconfig
  ```
  # https://editorconfig.org
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 4
  end_of_line = lf
  insert_final_newline = true
  trim_trailing_whitespace = true

  [*.md]
  insert_final_newline = false
  trim_trailing_whitespace = false
  ```

##### ESLint配置
///////////////////////////////////////////////// 方式一：/package.json
"eslintConfig": {
  "root": true,
  "env": { "node": true },
  "extends": [ "plugin:vue/essential", "@vue/standard" ], // "react-app", "react-app/jest"
  "rules": {                                  // 参考 Eslint详细规则
    "eol-last": [0],
    "semi": [2, "always"],                    // 强制语句分号结尾
    "indent": [2, 4],                         // 强制缩进4 spaces
    "no-new": [0],                            // 不允许new一个实例后不赋值或不比较
    "no-debugger": [0],                       // 不允许出现debugger语句
    "camelcase": [0, {"properties": "never"}] // 关闭驼峰命名规则
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
},
"eslintIgnore": [
  "dist/*",
  "node_modules/*",
  "build/*",
  "*.md"
],
///////////////////////////////////////////////// 方式二：/.eslintrc 
module.exports = {
  root: true,
  parser: 'babel-eslint',//解析器，这里我们使用babel-eslint
  parserOptions: {
    sourceType: 'module'//类型为module，因为代码使用了使用了ECMAScript模块
  },
  env: {
    browser: true,//预定义的全局变量，这里是浏览器环境
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'standard', //扩展，可以通过字符串或者一个数组来扩展规则
  // required to lint *.vue files
  plugins: [
   'html' //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
  ],
  // add your custom rules here
  'rules': {
    // 参考 Eslint详细规则
  }
}

##### Sass资源
import './sass/css_class.scss';


##### 23种设计模式
  [状态模式] https://zhuanlan.zhihu.com/p/91912672
  



##### 设计模式的六大原则
  


##### 坑
使用scss，遇上node-sass安装不上
  1. 下载 https://npm.taobao.org/mirrors/node-sass/v4.14.1/win32-x64-64_binding.node 下载完成放在如D:\；
  2. 运行命令： npm install node-sass -D --sass_binary_path=D:/win32-x64-64_binding.node

node_modules\node-sass\vendor 的报错解决方法
  Error: ENOENT: no such file or directory, scandir 'D:\Work\ybxzs\node_modules\node-sass\vendor'
  按提示创建vendor文件夹 ...\node_modules\node-sass\vendor
  yarn start
  这时报错：
  Error: Missing binding D:\Work\ybxzs\node_modules\node-sass\vendor\win32-x64-72\binding.node
  Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 12.x

  去 https://github.com/sass/node-sass/releases 跟据.node或.pdb下载对应版本的node-sass的binding,比如我这里就要下载: win32-x64-72_binding.node
  将该文件改名并放到相应目录： ...\node_modules\node-sass\vendor\win32-x64-47\binding.node

##### Eslint详细规则
'rules': {
      "comma-dangle": ["error", "never"], //是否允许对象中出现结尾逗号
      "no-cond-assign": 2, //条件语句的条件中不允许出现赋值运算符
      "no-console": 2, //不允许出现console语句
      "no-constant-condition": 2, //条件语句的条件中不允许出现恒定不变的量
      "no-control-regex": 2, //正则表达式中不允许出现控制字符
      "no-debugger": 2, //不允许出现debugger语句
      "no-dupe-args": 2, //函数定义的时候不允许出现重复的参数
      "no-dupe-keys": 2, //对象中不允许出现重复的键
      "no-duplicate-case": 2, //switch语句中不允许出现重复的case标签
      "no-empty": 2, //不允许出现空的代码块
      "no-empty-character-class": 2, //正则表达式中不允许出现空的字符组
      "no-ex-assign": 2, //在try catch语句中不允许重新分配异常变量
      "no-extra-boolean-cast": 2, //不允许出现不必要的布尔值转换
      "no-extra-parens": 0, //不允许出现不必要的圆括号
      "no-extra-semi": 2, //不允许出现不必要的分号
      "no-func-assign": 2, //不允许重新分配函数声明
      "no-inner-declarations": ["error", "functions"], //不允许在嵌套代码块里声明函数
      "no-invalid-regexp": 2, //不允许在RegExp构造函数里出现无效的正则表达式
      "no-irregular-whitespace": 2, //不允许出现不规则的空格
      "no-negated-in-lhs": 2, //不允许在in表达式语句中对最左边的运算数使用取反操作
      "no-obj-calls": 2, //不允许把全局对象属性当做函数来调用
      "no-regex-spaces": 2, //正则表达式中不允许出现多个连续空格
      "quote-props": 2, //对象中的属性名是否需要用引号引起来
      "no-sparse-arrays": 2, //数组中不允许出现空位置
      "no-unreachable": 2, //在return，throw，continue，break语句后不允许出现不可能到达的语句
      "use-isnan": 2, //要求检查NaN的时候使用isNaN()
      "valid-jsdoc": ["error", {
          "requireReturn": false,
          "requireParamDescription": false,
          "requireReturnDescription": true
      }], //强制JSDoc注释
      "valid-typeof": ["error", {
          "requireStringLiterals": true
      }], //在使用typeof表达式比较的时候强制使用有效的字符串
      "block-scoped-var": 2, //将变量声明放在合适的代码块里
      "complexity": 0, //限制条件语句的复杂度
      "consistent-return": 2, //无论有没有返回值都强制要求return语句返回一个值
      "curly": ["error", "all"], //强制使用花括号的风格
      "default-case": 0, //在switch语句中需要有default语句
      "dot-notation": ["error", {"allowKeywords": false, "allowPattern": ""}], //获取对象属性的时候使用点号
      "eqeqeq": ["error", "smart"], //比较的时候使用严格等于
      "no-alert": 1, //不允许使用alert，confirm，prompt语句
      "no-caller": 2, //不允许使用arguments.callee和arguments.caller属性
      "guard-for-in": 0, //监视for in循环，防止出现不可预料的情况
      "no-div-regex": 2, //不能使用看起来像除法的正则表达式
      "no-else-return": 0, //如果if语句有return，else里的return不用放在else里
      "no-labels": ["error", {
          "allowLoop": false,
          "allowSwitch": false
      }], //不允许标签语句
      "no-eq-null": 2, //不允许对null用==或者!=
      "no-eval": 2, //不允许使用eval()
      "no-extend-native": 2, //不允许扩展原生对象
      "no-extra-bind": 2, //不允许不必要的函数绑定
      "no-fallthrough": 2, //不允许switch按顺序全部执行所有case
      "no-floating-decimal": 2, //不允许浮点数缺失数字
      "no-implied-eval": 2, //不允许使用隐式eval()
      "no-iterator": 2, //不允许使用__iterator__属性
      "no-lone-blocks": 2, //不允许不必要的嵌套代码块
      "no-loop-func": 2, //不允许在循环语句中进行函数声明
      "no-multi-spaces": 2, //不允许出现多余的空格
      "no-multi-str": 2, //不允许用\来让字符串换行
      "no-global-assign": 2, //不允许重新分配原生对象
      "no-new": 2, //不允许new一个实例后不赋值或者不比较
      "no-new-func": 2, //不允许使用new Function
      "no-new-wrappers": 2, //不允许使用new String，Number和Boolean对象
      "no-octal": 2, //不允许使用八进制字面值
      "no-octal-escape": 2, //不允许使用八进制转义序列
      "no-param-reassign": 0, //不允许重新分配函数参数
      "no-proto": 2, //不允许使用__proto__属性
      "no-redeclare": 2, //不允许变量重复声明
      "no-return-assign": 2, //不允许在return语句中使用分配语句
      "no-script-url": 2, //不允许使用javascript:void(0)
      "no-self-compare": 2, //不允许自己和自己比较
      "no-sequences": 2, //不允许使用逗号表达式
      "no-throw-literal": 2, //不允许抛出字面量错误 throw "error"
      "no-unused-expressions": 2, //不允许无用的表达式
      "no-void": 2, //不允许void操作符
      "no-warning-comments": [1, {"terms": ["todo", "fixme", "any other term"]}], //不允许警告备注
      "no-with": 2, //不允许使用with语句
      "radix": 1, //使用parseInt时强制使用基数来指定是十进制还是其他进制
      "vars-on-top": 0, //var必须放在作用域顶部
      "wrap-iife": [2, "any"], //立即执行表达式的括号风格
      "yoda": [2, "never", {"exceptRange": true}], //不允许在if条件中使用yoda条件
      "strict": [2, "function"], //使用严格模式
      "no-catch-shadow": 2, //不允许try catch语句接受的err变量与外部变量重名
      "no-delete-var": 2, //不允许使用delete操作符
      "no-label-var": 2, //不允许标签和变量同名
      "no-shadow": 2, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
      "no-shadow-restricted-names": 2, //js关键字和保留字不能作为函数名或者变量名
      "no-undef": 2, //不允许未声明的变量
      "no-undef-init": 2, //不允许初始化变量时给变量赋值undefined
      "no-undefined": 2, //不允许把undefined当做标识符使用
      "no-unused-vars": [2, {"vars": "all", "args": "after-used"}], //不允许有声明后未使用的变量或者参数
      "no-use-before-define": [2, "nofunc"], //不允许在未定义之前就使用变量
      "indent": 2, //强制一致的缩进风格
      "brace-style": [2, "1tbs", { "allowSingleLine": false}], //大括号风格
      "camelcase": [2, {"properties": "never"}], //强制驼峰命名规则
      "comma-style": [2, "last"], //逗号风格
      "consistent-this": [0, "self"], //当获取当前环境的this是用一样的风格
      "eol-last": 2, //文件以换行符结束
      "func-names": 0, //函数表达式必须有名字
      "func-style": 0, //函数风格，规定只能使用函数声明或者函数表达式
      "key-spacing": [2, {"beforeColon": false, "afterColon": true}], //对象字面量中冒号的前后空格
      "max-nested-callbacks": 0, //回调嵌套深度
      "new-cap": [2, {"newIsCap": true, "capIsNew": false}], //构造函数名字首字母要大写
      "new-parens": 2, //new时构造函数必须有小括号
      "newline-after-var": 0, //变量声明后必须空一行
      "no-array-constructor": 2, //不允许使用数组构造器
      "no-inline-comments": 0, //不允许行内注释
      "no-lonely-if": 0, //不允许else语句内只有if语句
      "no-mixed-spaces-and-tabs": [2, "smart-tabs"], //不允许混用tab和空格
      "no-multiple-empty-lines": [2, {"max": 2}], //空行最多不能超过两行
      "no-nested-ternary": 2, //不允许使用嵌套的三目运算符
      "no-new-object": 2, //禁止使用new Object()
      "fun-call-spacing": 2, //函数调用时，函数名与()之间不能有空格
      "no-ternary": 0, //不允许使用三目运算符
      "no-trailing-spaces": 2, //一行最后不允许有空格
      "no-underscore-dangle": 2, //不允许标识符以下划线开头
      "no-extra-parens": 0, //不允许出现多余的括号
      "one-var": 0, //强制变量声明放在一起
      "operator-assignment": 0, //赋值运算符的风格
      "padded-blocks": [2, "never"], //块内行首行尾是否空行
      "quote-props": 0, //对象字面量中属性名加引号
      "quotes": [1, "single", "avoid-escape"], //引号风格
      "semi": [2, "always"], //强制语句分号结尾
      "semi-spacing": [2, {"before": false, "after": true}], //分后前后空格
      "sort-vars": 0, //变量声明时排序
      "space-before-blocks": [2, "always"], //块前的空格
      "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}], //函数定义时括号前的空格
      "space-infix-ops": [2, {"int32Hint": true}], //操作符周围的空格
      "keyword-spacing": 2, //关键字前后的空格
      "space-unary-ops": [2, { "words": true, "nonwords": false}], //一元运算符前后不要加空格
      "wrap-regex": 2, //正则表达式字面量用括号括起来
      "no-var": 0, //使用let和const代替var
      "generator-star-spacing": [2, "both"], //生成器函数前后空格
      "max-depth": 0, //嵌套块深度
      "max-len": 0, //一行最大长度，单位为字符
      "max-params": 0, //函数最多能有多少个参数
      "max-statements": 0, //函数内最多有几个声明
      "no-bitwise": 0, //不允许使用位运算符
      "no-plusplus": 0 //不允许使用++ --运算符
  }









