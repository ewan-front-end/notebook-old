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
            <span>M 0000.00.00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>ESLint</h1>
</div>


安装
```
$ npm init
$ npm install eslint --save-dev 这一步建议最好是在当前项目中安装， 不要全局安装，遇到过错误①
$ eslint --init
How would you like to configure ESLint? //您想如何配置ESLint?
Use a popular style guide 
Answer questions about your style 
Inspect your JavaScript file(s) 
Which style guide do you want to follow? //你想要遵循哪个风格指南?
Airbnb (https://github.com/airbnb/javascript) 
Standard (https://github.com/standard/standard) 
Google (https://github.com/google/eslint-config-google) 
What format do you want your config file to be in? //配置文件的格式是什么?
JavaScript 
YAML 
JSON 

Would you like to install them now with npm? (Y/n)
```


webstorm里的相关提示
```
ESLint please specify Node.js interpreter correctly  请指定正确的nodejs解释器
①ESLint Error: Cannot find module ‘eslint-config-standard’ 
Infix operators must be spaced  中缀操作符必须是间隔的
Extra semicolon  额外的分号
Newline required at end of file but not found 在文件末尾需要换行，但未找到
```
eslintrc.json
```
{
    "extends": "standard"
}
```



https://cloud.tencent.com/developer/section/1135580
```
"rules": {
  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  "react/forbid-prop-types": 0,
  "react/no-array-index-key": 0,
  "react/jsx-wrap-multilines": 0,
  "react/prop-types": 1,
  "jsx-a11y/no-static-element-interactions": 0,
  "no-underscore-dangle": 0,
  "no-script-url": 0,
  "class-methods-use-this": 0,
  "no-constant-condition": 0,
  "max-len": 0,
  "no-nested-ternary": 0,
  "semi": 1,
  "space-before-function-paren": 1
}
```
