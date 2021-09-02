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
<h1>Markdown</h1><strong>Markdown</strong>
</div>
<div class="static-content">

[detail1](pages/system/index)

### ewan-layout
<!-- layout:start -->
<!-- col:4 -->
  4/24
<!-- col:4 -->
  4/24
<!-- col:4 -->
  4/24
<!-- col:4 -->
  4/24
<!-- col:4 -->
  4/24
<!-- col:4 -->
  4/24  
<!-- layout:end -->

<!-- layout:start -->
<!-- col:8 -->
  8/24
<!-- col:8 -->
  8/24
<!-- col:8 -->
  8/24
<!-- layout:end -->

```
<!-- layout:start -->
<!-- col:8 -->
  spans 8 / total 24
<!-- layout:end -->
```

### docsify-plantuml
[PlantUML](../tools/plantuml) 
[数学](../tools/plantuml?id=数学) 
[工作分解结构](../tools/plantuml?id=工作分解结构) 
[思维导图](../tools/plantuml?id=思维导图) 
[甘特图](../tools/plantuml?id=甘特图) 
[流程图](../tools/plantuml?id=流程图) 
[时序图](../tools/plantuml?id=时序图) 
[用例图](../tools/plantuml?id=用例图) 
[组件图](../tools/plantuml?id=组件图) 
[状态图](../tools/plantuml?id=状态图) 



### docsify-tabs
<!-- tabs:start -->
#### ** 第一步 **
index.html `<script src="https://cdn.jsdelivr.net/npm/docsify-tabs@1"></script>`
#### ** 第二步 **
```javascript
window.$docsify = {
  // ...
  tabs: {
    persist    : true,      // default
    sync       : true,      // default
    theme      : 'classic', // default
    tabComments: true,      // default
    tabHeadings: true       // default
  }
}
```
#### ** 第三步 **
添加css变量
```html
<style>
  :root {
    --docsifytabs-border-color: #ededed;
    --docsifytabs-tab-highlight-color: purple;
  }
  .docsify-tabs__tab~.docsify-tabs__tab{outline:none;} /* 去除蓝框 */
  .docsify-tabs--classic .docsify-tabs__tab:first-of-type {outline:none;}
</style>
```
#### ** 使用 **
```
<!-- tabs:start -->
#### ** English **
Hello!
#### ** French **
Bonjour!
#### ** Italian **
Ciao!
<!-- tabs:end -->
```
<!-- tabs:end -->



### docsify-plugin-flexible-alerts
<!-- tabs:start -->
#### ** 第一步a **
index.html `<script src="https://unpkg.com/docsify-plugin-flexible-alerts"></script>`
#### ** 第二步a **
```javascript
  window.$docsify = {
    // ...
    'flexible-alerts': {
      style: 'flat'
    }
  };
```
#### ** 使用a **
```html
> [!NOTE]
> An alert of type 'note' using global style 'callout'.

> [!NOTE|style:flat]
> An alert of type 'note' using alert specific style 'flat' which overrides global style 'callout'.

> [!TIP]
> An alert of type 'tip' using global style 'callout'.

> [!WARNING]
> An alert of type 'warning' using global style 'callout'.

> [!ATTENTION]
> An alert of type 'attention' using global style 'callout'.

> [!COMMENT]
> An alert of type 'comment' using style 'callout' with default settings.
```
#### ** 官网a **
https://github.com/fzankl/docsify-plugin-flexible-alerts
<!-- tabs:end -->

<!-- layout:start -->
<!-- col:12 -->
  > [!NOTE]
  > An alert of type 'note' using global style 'callout'.

  > [!NOTE|style:flat]
  > An alert of type 'tip' using global style 'callout'.

  > [!TIP]
  > An alert of type 'tip' using global style 'callout'.
<!-- col:12 -->
  > [!WARNING]
  > An alert of type 'warning' using global style 'callout'.

  > [!ATTENTION|style:flat]
  > An alert of type 'attention' using global style 'callout'.

  > [!COMMENT]
  > An alert of type 'comment' using style 'callout' with default settings.
<!-- layout:end -->




　
<!-- layout:start:class2 -->
<!-- col:24 -->
|　　缩进(全角空格"　")
<!-- layout:end -->

<!-- layout:start:class2 -->
<!-- col:6 -->
  |&thinsp;|&#8201;|&#x2009;
<!-- col:6 -->
  |&nbsp;|&#160;|&#xA0;
<!-- col:6 -->
  |&ensp;|&#8194;|&#x2002;
<!-- col:6 -->
  |&emsp;|&#8195;|&#x2003;
<!-- layout:end -->

<!-- layout:start -->
<!-- col:6 -->
  |&amp;thinsp;|&amp;#8201;|&amp;#x2009;
<!-- col:6 -->
  |&amp;nbsp;|&amp;#160;|&amp;#xA0;
<!-- col:6 -->
  |&amp;ensp;|&amp;#8194;|&amp;#x2002;
<!-- col:6 -->
  |&amp;emsp;|&amp;#8195;|&amp;#x2003;
<!-- layout:end -->

<!-- layout:start:class1 -->
<!-- col:4 -->
  <h1>一级标</h1>
<!-- col:4 -->
  <h2>二级标</h2>
<!-- col:4 -->
  <h3>三级标</h3>
<!-- col:4 -->
  <h4>四级标</h4>
<!-- col:4 -->
  <h5>五级标</h5>
<!-- col:4 -->
  <h6>六级标</h6>
<!-- layout:end -->

<!-- layout:start -->
<!-- col:4 -->
  # 一级标
<!-- col:4 -->
  ## 二级标
<!-- col:4 -->
  ### 三级标
<!-- col:4 -->
  #### 四级标
<!-- col:4 -->
  ##### 五级标
<!-- col:4 -->
  ###### 六级标 
<!-- layout:end -->

<!-- layout:start:class2 -->
<!-- col:6 -->
  <strong>这是加粗的文字</strong>
<!-- col:6 -->
  <em>这是倾斜的文字</em>
<!-- col:6 -->
  <strong><em>这是斜体加粗的文字</em></strong>
<!-- col:6 -->
  <del>这是加删除线的文字</del>
<!-- layout:end -->

<!-- layout:start -->
<!-- col:6 -->
  **这是加粗的文字**
<!-- col:6 -->
  *这是倾斜的文字*
<!-- col:6 -->
  ***这是斜体加粗的文字***
<!-- col:6 -->
  ~~这是加删除线的文字~~
<!-- layout:end -->

<!-- layout:start:class3 -->
<!-- col:8 -->
  <font face=“微软雅黑”>字体</font>
<!-- col:8 -->
  <font font size=5>字号</font>
<!-- col:8 -->
  <font color=red>颜色</font>
<!-- layout:end -->

<!-- layout:start -->
<!-- col:8 -->
  &lt;font face=“微软雅黑”&gt;字体&lt;/font&gt;
<!-- col:8 -->
  &lt;font font size=5&gt;字号&lt;/font&gt;
<!-- col:8 -->
  &lt;font color=red&gt;颜色&lt;/font&gt;
<!-- layout:end -->





>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
---
----
***
*****
```
>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
---
----
***
*****
```


![图片alt](图片地址 ''图片title'')

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

<img :src="$withBase('/images/timg.jpg')">


[超链接名](超链接地址 "超链接title")<br>
[简书](http://jianshu.com)
[百度](http://baidu.com)<br>
<a href="http://baidu.com" target="_blank">新窗口百度</a>

<!-- layout:start:class4 -->
<!-- col:8 -->
  <ul><li>列表内容</li><li>列表内容</li><li>列表内容</li><li>列表内容</li></ul>
<!-- col:8 -->
  <ol><li>列表内容</li><li>列表内容</li><li>列表内容</li></ol>
<!-- col:8 -->
  <ul><li>列表内容<ul><li>列表内容</li></ul></li><li>列表内容<ul><li>列表内容</li></ul></li></ul>
<!-- layout:end -->

<!-- layout:start:class5 -->
<!-- col:8 -->
  - 列表内容<br>
  + 列表内容<br>
  * 列表内容<br>
  * 列表内容<br>
<!-- col:8 -->
  1. 列表内容<br>
  2. 列表内容<br>
  3. 列表内容<br>
<!-- col:8 -->
- 列表内容<br>
　- 列表内容<br>
+ 列表内容<br>
　- 列表内容<br>
<!-- layout:end -->

---
### 表格

<!-- layout:start:class6 -->
<!-- col:8 -->
  <table>
    <tr>
      <th align="right">表头表头</th>
      <th>表头</th>
      <th align="left">表头表头</th>
    </tr>
    <tr>
      <td align="right">内容</td>
      <td>内容</td>
      <td align="left">内容</td>
    </tr>
    <tr>
      <td align="right">内容</td>
      <td>内容</td>
      <td align="left">内容</td>
    </tr>
</table>
<!-- col:6 -->
  表头表头|表头|表头表头<br>
  -----:|--|:---<br>
  内容|内容|内容<br>
  内容|内容|内容<br>
<!-- col:10 -->
  <strong>第二行分割表头和内容。</strong><br>
  "-" 有一个就行，为了对齐，多加了几个<br>
  文字默认居左<br>
  两边加":"表示文字居中<br>
  右边加":"表示文字居右<br>
  注：原生的语法两边都要用 | 包起来。此处省略
<!-- layout:end -->



代码块
`let i = 0`

```js
function fun(){
    echo "这是一句非常牛逼的代码";
}
fun()

const name = 'ewan'
const age = 20
console.log(name)
console.log(age)
```



# Docsify 示例

<p align="center">
  <a href="https://docsify.js.org">
    <img :src="$withBase('/images/icon.svg')">
  </a>
</p>

<p align="center">
  A magical documentation site generator.
</p>

<p align="center">
  <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/docsify/backers/badge.svg?style=flat-square"></a>
  <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/docsify/sponsors/badge.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/docsifyjs/docsify"><img alt="Travis Status" src="https://img.shields.io/travis/docsifyjs/docsify/master.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/docsify"><img alt="npm" src="https://img.shields.io/npm/v/docsify.svg?style=flat-square"></a>
  <a href="https://github.com/QingWei-Li/donate"><img alt="donate" src="https://img.shields.io/badge/%24-donate-ff69b4.svg?style=flat-square"></a>
  <a href="https://gitter.im/docsifyjs/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img alt="gitter" src="https://img.shields.io/gitter/room/docsifyjs/docsify.svg?style=flat-square"></a>
</p>

<p align="center">Gold Sponsor via <a href="https://opencollective.com/docsify">Open Collective</a></p>

<p align="center">
  <a href="https://opencollective.com/docsify/order/3254">
    <img src="https://opencollective.com/docsify/tiers/gold-sponsor.svg?avatarHeight=36">
  </a>
</p>

## Links

- [Documentation](https://docsify.js.org)
- [CLI](https://github.com/docsifyjs/docsify-cli)
- CDN: [UNPKG](https://unpkg.com/docsify/) | [jsDelivr](https://cdn.jsdelivr.net/npm/docsify/) | [cdnjs](https://cdnjs.com/libraries/docsify)
- [Awesome docsify](https://github.com/docsifyjs/awesome-docsify)
- [Community chat](https://gitter.im/docsifyjs/Lobby)

## Features

- No statically built html files
- Simple and lightweight (~21kB gzipped)
- Smart full-text search plugin
- Multiple themes
- Useful plugin API
- Compatible with IE10+
- Support SSR ([example](https://github.com/docsifyjs/docsify-ssr-demo))
- Support embedded files

## Quick start

Look at [this tutorial](https://docsify.js.org/#/quickstart)

[![Edit 307qqv236](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/307qqv236)

## Showcase

These projects are using docsify to generate their sites. Pull requests welcome :blush:

Move to [awesome-docsify](https://github.com/docsifyjs/awesome-docsify)

## Similar projects

| Project                                          | Description                              |
| ------------------------------------------------ | ---------------------------------------- |
| [docute](https://github.com/egoist/docute)       | 📜 Effortlessly documentation done right |
| [docpress](https://github.com/docpress/docpress) | Documentation website generator          |

## Contributing

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

## Development

```bash
npm run bootstrap && npm run dev
```

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/docsify#backers)]

<a href="https://opencollective.com/docsify#backers" target="_blank"><img :src="$withBase('/images/backers.svg')" width="890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/docsify#silver-sponsors)]

<a href="https://opencollective.com/docsify/silver-sponsors/0/website" target="_blank"><img :src="$withBase('/images/avatar1.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/1/website" target="_blank"><img :src="$withBase('/images/avatar2.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/2/website" target="_blank"><img :src="$withBase('/images/avatar3.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/3/website" target="_blank"><img :src="$withBase('/images/avatar4.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/4/website" target="_blank"><img :src="$withBase('/images/avatar5.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/5/website" target="_blank"><img :src="$withBase('/images/avatar6.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/6/website" target="_blank"><img :src="$withBase('/images/avatar7.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/7/website" target="_blank"><img :src="$withBase('/images/avatar8.svg')"></a>
<a href="https://opencollective.com/docsify/silver-sponsors/8/website" target="_blank"><img :src="$withBase('/images/avatar9.svg')"></a>

## Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/docsifyjs/docsify/graphs/contributors"><img :src="$withBase('/images/contributors.svg')"></a>

## License

[MIT](LICENSE)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fdocsifyjs%2Fdocsify.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fdocsifyjs%2Fdocsify?ref=badge_large)





</div>