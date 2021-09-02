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
            <span>N 2021.09.02 14:29</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>VSCode</h1><strong>VSCode</strong>
</div>
<div class="static-content">


::: details settings
- 全新个性项目
```js
// .vscode/settings.json
{
    "editor.tabSize": 4,                            // 缩进明显 结构清晰 层次分明
    "editor.minimap.enabled": false,                // 关闭地图 窗口开阔
    "editor.mouseWheelZoom": true,                  // 滚轮缩放 局部整体

    "editor.formatOnSave": true,                    // 默认格式化(缩进、基础格式)                                                   
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "editor.detectIndentation": false               // 关闭根据文件类型自动设置TabSize
}
```

- 全新正规项目
```js
// 扩展 > 安装Vetur/Prettier
// .vscode/settings.json
{
    "editor.tabSize": 2,                            // Google、Facebook、Twitter似乎有这种趋势 语言如coffeescript、less/sass、dart等似乎是这个趋势
    "editor.formatOnSave": true,                    // 随时保持代码整洁
                                                    // 引入Vue工具&Prettier规范
    "vetur.format.defaultFormatter.html": "prettier",
    "[javascript]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},
    "[vue]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},
    "[html]": {"editor.defaultFormatter": "esbenp.prettier-vscode"}
}
```

- Settings Map
```json
{  
    "editor.tabSize": 4,                            // 设置缩进不生效时关闭editor.detectIndentation 插件设置优先,再不行应如下插件设置
    // "editor.detectIndentation": false,           // 默认启用了根据文件类型自动设置tabSize
    // "beautify.tabSize": 4,                       // beautify插件
    // "vetur.format.options.tabSize": 4,           // vetur插件
    // "prettier.tabWidth": 4,                      // prettier插件
    "editor.fontFamily": "monospace",               // windows下IDE正常："consolas"
    "editor.formatOnSave": false,                   // 保存时格式化文档
    "editor.minimap.enabled": false,                // 迷你地图
    "editor.mouseWheelZoom": true,                  // 滚轮缩放字号大小
    "editor.rulers": [100, 150],                    // 在一定数量的等宽字符后显示垂直标尺
    ////////////////////////////////////////////////// Prettier详细配置
    ////////////////////////////////////////////////// koroFileHeader详细配置
                                                    // 调试 通常以launch.json形式
    "launch": {
        "configurations": [],
        "compounds": []
    }
}
```

- 头部注释 koroFileHeader详细配置
```js
{
    "fileheader.customMade": {             
        "autoAdd": false,                           // 关闭自动添加头部注释
        "Description": "file content",
        "Version": "2.0",
        "Author": "Ewan",
        "Date": "Do not edit",
        "LastEditors": "Ewan",
        "LastEditTime": "Do not edit"
    },
    "fileheader.cursorMode": {                      // 函数注释
        "description": "",
        "param": "",
        "return": "",
        "author": "Ewan"
    }
}
```

- 代码规范 Prettier详细配置
```js
{    
    "vetur.format.defaultFormatter.html": "prettier",
                                                    // 语言默认格式化规则
    "[html]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},
    "[css]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},
    "[less]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},
    "[javascript]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},
    "[vue]": {"editor.defaultFormatter": "esbenp.prettier-vscode"}, 
                                                    // 详细配置
    "prettier.printWidth": 100,                     // 超过最大值换行
    "prettier.tabWidth": 4,                         // 缩进字节数
    "prettier.useTabs": false,                      // 缩进不使用tab，使用空格
    "prettier.semi": true,                          // 句尾添加分号
    "prettier.singleQuote": true,                   // 使用单引号代替双引号
    "prettier.proseWrap": "preserve",               // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    "prettier.arrowParens": "avoid",                //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    "prettier.bracketSpacing": true,                // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.disableLanguages": ["vue"],           // 不格式化vue文件，vue文件的格式化单独设置
    "prettier.endOfLine": "auto",                   // 结尾是 \n \r \n\r auto
    "prettier.eslintIntegration": false,            // 不让prettier使用eslint的代码格式进行校验
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore",       // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    "prettier.jsxBracketSameLine": false,           // 在jsx中把'>' 是否单独放一行
    "prettier.jsxSingleQuote": false,               // 在jsx中使用单引号代替双引号
    "prettier.parser": "babylon",                   // 格式化的解析器，默认是babylon
    "prettier.requireConfig": false,                // Require a 'prettierconfig' to format prettier
    "prettier.stylelintIntegration": false,         // 不让prettier使用stylelint的代码格式进行校验
    "prettier.trailingComma": "es5",                // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    "prettier.tslintIntegration": false             // 不让prettier使用tslint的代码格式进行校验
}

```
:::

::: details 功能&技巧
<pre>
■ 自定义快捷键
界面左下解设置 > 键盘快捷方式 对应选项上右键 > 更改键绑定
■ 区域注释
shift+alt+a
■ 代码对比
按住Ctrl键 选取两个文件 右键菜单 > 将已选项进行比较
■ 提示禁止运行脚本
以管理员身份打开VScode，执行 Set-ExecutionPolicy RemoteSigned
</pre>
:::

::: details 插件
<pre>
■ JSON Tools
Ctrl(Cmd)+Alt+M    格式化代码
Alt+M              紧凑化代码

■ koroFileHeader
ctrl + Alt + i     文件头部注释 [fileheader.customMade](pages/tools/vscode.md?id=settings)
ctrl + Alt + t     在鼠标位置插入相应的注释 [fileheader.cursorMode](pages/tools/vscode.md?id=settings)

code runner
</pre>
:::




## 配置Node启动配置
，在这里可以设置环境变量
全局调试启动配置。应当作为跨工作区共享的 \"launch.json\" 的替代方法
launch.json
{
 "version": "0.2.0",
 "configurations": [
  {
   ...
   "request": "launch", //请求类型为启动 
  },
  {
  ...
   "request": "attach"， //请求类型为附加 
  }
 ]
}


# 配置/更换终端
[git-bash安装](../git/)
1. 搜索：shell:windows 找到：Terminal › Integrated › Shell: Windows
2. "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"

## 自定义用户片段
> 文件 > 首选项 > 用户片段 > 新建全局代码片段文件, 在输入栏输入命名如：log, 会生成一个log.json的方件
```js
{
  
  // Print to console 表示一个代码片段名称
	// scope            范围 表示此片段 用于什么语言 若为空 则表示所有语言
	// prefix           前缀 当你实际编写代码时 输入什么关键字 会触发此代码片段 如 con
	// body             主体 存放代码片段的实际内容
	// description      描述 如果没有description，默认提示信息是类似上图中Print to console一样的信息
  "[0 Print to console]": {
    "scope": "javascript,typescript",
    "prefix": "con",
    "body": [
      "console.log('$1');",
      "$2"
    ],
    "description": "打印到控制台"
  }
  "Add format comment": {
    "prefix": "comment",
    "body": [
      "/**",
      " * ",
      " * Ewan $(l3)CURRENT_YEAR(/l3)-$CURRENT_MONTH-$(l4)CURRENT_DATE(/l4) $CURRENT_HOUR:$(l5)CURRENT_MINUTE(/l5)",
      " */"
    ],
    "description": "添加注释"
  }
}

/* 变量调用: $变量名
---------------------------------------------------
TM_FILENAME               当前文件名
TM_FILENAME_BASE          当前文件名，不带扩展名
CURRENT_YEAR              当前年份
CURRENT_YEAR_SHORT        当前年份，最后两位数字
CURRENT_MONTH             当前月份数字形式，两位表示
CURRENT_MONTH_NAME        当前月份英文形式，如 July
CURRENT_MONTH_NAME_SHORT  当前月份英文缩写形式，如 Jul
CURRENT_DATE              当前日
CURRENT_DAY_NAME          当前星期，如 Monday
CURRENT_DAY_NAME_SHORT    当前星期缩写形式，如 Mon
CURRENT_HOUR              当前小时，24小时格式，两位表示
CURRENT_MINUTE            当前分钟，两位表示
CURRENT_SECOND            当前秒，两位表示
TM_DIRECTORY              当前文件所属目录的绝对路径
TM_FILEPATH               当前文件的绝对路径
*/
```


</div>