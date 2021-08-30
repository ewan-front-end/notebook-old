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
            <span>N 2021.08.30 19:05</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Typescript</h1><strong>Typescript</strong>
</div>
<div class="static-content">


基础类型 变量声明 接口 类 函数 泛型 类型推新 高级类型

- 管理版本和发布：Semantic release
- 单元测试：Jest
- 规范化的提交注释：Commitizen
- 打包构建项目：RollupJS
- 代码风格：TSLint
- 美化代码格式：Prettier


类型：
```
string 
object 
boolean 
数字  
let decLiteral: number = 6;         // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;   // 八进制

数组
let list: number[] = [1,2,3]
let list: Array<number> = [1,2,3]    // 数组泛型
let list: [string, number] = ['a',1] // 支持不同类型 元组方式
let list: any[] = [1, true, 'a']     // 支持不同类型 忽略方式

元组
let x: [string, number]   x = ['a'. 10]

枚举 为一组数值赋予更友好的名字
enum Color{Red, Green, Blue}  let c:Color.Green  let c:Color[1]
enum Color{Red, Green, Blue}  let c:Color.Green
enum Color{Red=1, Green, Blue}  let colorName:string = Color[2]
enum Color{Red=1, Green=3, Blue}  let colorName:string = Color[3]

any 未知类型 不作类型检查
let item: any = 4  item = 'a'  item = true

void 无类型
function fn(): void {}
let a: void = undefined // 无意义
let a: void = null      // 无意义 

never 无法结束 无限循环
function error(message: string): never {}
function inifiniteLoop(): never { while(true){}}


联合类型
let item: string | number = 'a'  item = 1

类型断言
```



##### 安装
1. npm i -g **typescript** // tsc -V   npm i -g typescript@3.1 通过使用版本号可用于降级
2. typescript-demo/examples/**greeter.ts**
```
  // 定义对象
  class User{
      fullName: string
      firstName: string
      lastName: string
      constructor(firstName: string, lastName: string){
          this.firstName = firstName
          this.lastName = lastName
          this.fullName = firstName + lastName
      }
  }
  // 定义接口
  interface Person { firstName: string, lastName: string }

  function fnDemo(person: Person){
      return 'Hello ' + person.firstName + person.lastName
  }
  //var user = {firstName: 'W', lastName: 'Y'}
  var user = new User('W', 'Y')
  console.log(fnDemo(user))
```
3. typescript-demo> **tsc** examples/**greeter.ts**
4. typescript-demo> **node** examples/**greeter.js**

##### tsc命令参数：
tsc --outFile ./js/Element.js src/Element.ts

tsc --outDir ./js/ src/：将编译结果输出到指定文件夹

tsc --outFile ：将编译结果输出到指定文件

tsc --config tsconfig.json

##### tsconfig.json
```
{
  "compilerOptions": {
    "moduleResolution": "node",                   // 指定模块解析策略："Classic(TypeScript pre-1.6)" "Node(node .js)"
    "target": "es5",                              // 指定ECMAScript目标版本: "ES3(默认)" "ES5" "ES6" "ES2015" "ES2016" "ES2017" "ESNext"
    "module":"es2015",                            // 输出模块标准: "None" "CommonJS" "AMD" "System" "UMD" "ES6" "ES2015"
    "lib": ["es2015", "es2016", "es2017", "dom"], // 编译过程中需要引入的库文件的列表: ["es5", "es2015", "es2016", "es2017", "es2018", "dom"]
    "strict": true,
    "sourceMap": true,                            // 是否生成map文件    
    "declaration": true,                          // 是否自动创建类型声明文件
    "declarationDir": "dist/types",               // 类型声明文件的输出目录
    "allowSyntheticDefaultImports": true,         // commonjs版本的包允许以默认方式导入
    "experimentalDecorators": true,               // 允许使用实验性的ES装饰器
    "emitDecoratorMetadata": true,                // 启用了对为decorator发出类型元数据的实验性支持
    "outDir": "dist/lib",                         // 将输出结构重定向到目录
    "typeRoots": ["node_modules/@types"]          // 包含类型定义的文件夹列表
  },

  // 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
  "include": [
    "src"
  ],

  // 指定一个排除列表（include的反向操作）
  "exclude": [
    "demo.ts"
  ],

  // 指定哪些文件使用该配置（属于手动一个个指定文件）
  "files": [
    "demo.ts"
  ]
}
补充
"compilerOptions": {
    "allowJs": true，        // 允许编译javascript文件
    "checkJs": true，        // 报告.js文件中的错误
    "jsx": "preserve"，      // 指定jsx代码生成:"preserve" "response -native" "react"
    "declaration": true，    // 生成对应的’.d。ts文件
    "declaration ationmap ": true， /为每个对应的’.d '生成一个sourcemap。ts文件。 /
    "sourceMap": true， /生成相应的’。地图的文件。 /
    :"outFile。/"， /连接并将输出发送到单个文件。 /
    
    "rootDir":"。/"， /指定输入文件的根目录。用于用——outDir控制输出目录结构。 /
    "composite": true， /启用项目编译/
    "removeComments":true， /不向输出发出注释。 /
    "noEmit":true， /不发出输出。 /
    "importthelpers":true， /* Import从"tslib"中释放助手。* /
    "downlevelIteration":true， /当目标为"ES5"或"ES3"时，为"for-of"、"spread"和"destructuring"中的迭代提供完全支持。 /
    "isolatedModules":true， /将每个文件转换为一个单独的模块(类似于"ts.transpileModule")。 /
    严格的类型检查选项

    "strict":true， /启用所有严格的类型检查选项。 /
    "noImplicitAny":true， /对隐含的"any"类型的表达式和声明提出错误。 /
    "strictnullcheck":true， /启用严格的空检查。 /
    "strictFunctionTypes": true， /启用对函数类型的严格检查。 /
    " strictpropertyinitialized ": true， /在类中启用严格的属性初始化检查。 /
    "noImplicitThis":true， /对包含"any"类型的"this"表达式提出错误。 /
    "always sstrict":true， /在strict模式下解析，并为每个源文件发出"use strict"。 /
    附加检查

    "noUnusedLocals":true， /报告未使用局部变量的错误。 /
    "noUnusedParameters":true， /报告未使用参数的错误。 /
    "noImplicitReturns":true， /当函数中并非所有代码路径都返回值时报告错误。 /
    "noFallthroughCasesInSwitch":true， /在switch语句中报告错误。 /
    模块解析选项

    
    "baseUrl":"。/"， /基本目录来解析非绝对模块名。 /
    "path":{}，/一系列条目，这些条目将导入重新映射到相对于"baseUrl"的查找位置。 /
    "rootDirs":[]，/根文件夹列表，其组合内容表示运行时项目的结构。 /
    
    "types":[]， /编译中包含的类型声明文件。 /
    "allowSyntheticDefaultImports":true， /允许从没有默认导出的模块进行默认导入。这并不影响代码发出，只影响类型查询。 /
    "esModuleInterop":true /通过为所有导入创建名称空间对象，支持CommonJS和ES模块之间的互操作性。意味着"allowSyntheticDefaultImports"。 /
    "preserveSymlinks":true， /不解析符号链接的实际路径。 /
    源映射选项

    "sourceRoot": ""， /指定调试器应该定位TypeScript文件而不是源位置的位置。 /
    "mapRoot": ""， /指定调试器应该定位映射文件的位置，而不是生成的位置。 /
    "inlineSourceMap": true， /发出一个带有源映射的文件，而不是一个单独的文件。 /
    "inlineSources":true， /*在单个文件中，将源文件与源文件一起发出;需要设置’- inlineSourceMap’或’- sourceMap’ . */
    实验选项

    "experimental entaldecorator ": true， /支持对ES7 decorator的实验支持。 /
    
    ————————————————
    版权声明：本文为CSDN博主「koudiddy」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    原文链接：https://blog.csdn.net/weixin_42185305/article/details/105652819
    


    "allowUnreachableCode": true, // 不报告执行不到的代码错误。
    "allowUnusedLabels": false,	// 不报告未使用的标签错误
    "alwaysStrict": false, // 以严格模式解析并为每个源文件生成 "use strict"语句
    "baseUrl": ".", // 工作根目录
     
    "jsx": "react", // 在 .tsx文件里支持JSX
    
    
    "noImplicitAny": false, // 是否默认禁用 any
    "removeComments": true, // 是否移除注释
    "types": [ //指定引入的类型声明文件，默认是自动引入所有声明文件，一旦指定该选项，则会禁用自动引入，改为只引入指定的类型声明文件，如果指定空数组[]则不引用任何文件
      "node", // 引入 node 的类型声明
    ],
    "paths": { // 指定模块的路径，和baseUrl有关联，和webpack中resolve.alias配置一样
      "src": [ //指定后可以在文件之直接 import * from 'src';
        "./src"
      ],
    },
    
    "outDir": "./dist", // 输出目录
    
    "allowJs": true, // 允许编译javascript文件。
    

  }
```





Features
1. 在浏览器端使用XMLHttpRequest对象通讯
2. 支持Promise API
3. 请求和响应的拦截
4. 请求和响应数据的转换
5. 请求的取消
6. JSON数据自动转换
7. 客户端防止XSRF

初始化项目
1. 脚手架typescript-library-starter克隆成项目
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios

2. 关联远程库
```
.git/config
[remote "origin"]
	url = https://github.com/xxxxxxxxxx/ts-axios.git
或 ts-axios> git remote add origin https://github.com/xxxxxxxxxx/ts-axios.git
```
ts-axios> git push

##### 开发
src/index.ts

demo编写: 
  "webpack": "^4.28.4",
  "ts-loader": "^5.3.3",
  "tslint-loader": "^3.5.4",
  "express": "^4.16.4",
  "webpack-dev-middleware": "^3.5.0",
  "webpack-hot-middleware": "^2.24.3",
  "body-parser": "^1.18.3"

examples
  simple
    app.ts
    index.html
  index.html
  global.css
  webpack.config.js
  server.js

examples/webpack.config.js
```
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
module.exports = {
  /**
   * examples下会建多个子目录
   * 每个子目录下会创建一个app.ts
   * app.ts作为webpack的入口文件
   * entries收集了多目录入口文件 并且每个入口还引入了一个用于热更新的文件
   * entries是一个对象 key为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)){
      entries[dir] = ['webpack-hot-middleware', entry]
    }
    return entries
  }, {}),
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },
  module: {
    rules: [
      {test: /\.ts$/, enforce: 'pre', use: [{loader: 'tslint-loader'}]},
      {test: /\.tsx?$/, use: [{loader:'ts-loader', options: {transpileOnly: true}}]}
    ]
  }, 
  resolve: {extensions: ['.ts', '.tsx', '.js']},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
```
examples/server.js
```
```


##### 单元测试


</div>