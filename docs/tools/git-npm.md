# GIT攻略
➤ git status
➤ git add
➤ git commit
➤ git push

# NPM开发部署

- 参考https://www.jb51.net/article/153745.htm
- 工具命名：xxxx

## 部署

1. demo➤ npm init -y
2. demo/package.json
    ```
    "bin": { "xxxx": "./index.js" }
    ```
3. demo/index.js
    ```
    #!/usr/bin/env node
    console.log('tool demo')
    ```
4. demo➤ npm link
5. demo➤ **xxxx**

## 发布
1、创建npm账户（如果已有，略过该步骤）
注册地址： https://www.npmjs.com/signup

2、登陆npm login

3、发布 npm publish

每次发布时都需要更改package.json 中的version；

发布需将npm registry地址设为 http://registry.npmjs.org

npm config set registry http://registry.npmjs.org


## 开发
demo/index.js
#### 读取参数
```js
console.log(process.argv)
// 命令行参数解析包: yargs、commander.js等
```
demo➤ **xxxx** arg1 arg2
<br>
<font color=#ccc>
[<br>
    'C:\\Program Files\\nodejs\\node.exe', // node引擎路径<br>
    'C:\\Users\\new\\AppData\\Roaming\\npm\\node_modules\\aa\\index.js', // 运行脚本路径<br>
    'arg1',<br>
    'arg2'<br>
]
</font>

#### 参数解析
demo➤ npm i commander -D
```js
#!/usr/bin/env node
const program = require('commander');
program.version('1.0.0')
program
 .command('codeLineNum')
 .description('统计git提交代码量')
 .option("--author [author]", "统计指定作者git提交代码量")
 .action(function (options) {
  console.log(options.author)
 })
program.parse(process.argv);
```
demo➤ xxxx -h<br>
demo➤ xxxx codeLineNum

npm config get registry                             查看npm源地址
npm config set registry https://registry.npmjs.org  设置为官方源地址

npm adduser  第一次登录
npm login    非第一次登录

npm publish                   普通包
npm publish --access=public   组织包

npm unpublish @lauwen/kiss-ui@1.0.0 --force  撤销发布


## 参考
#### commander