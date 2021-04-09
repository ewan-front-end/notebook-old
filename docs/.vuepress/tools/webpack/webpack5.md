- 入口(entry)
- 输出(output)
- loader
- 插件(plugin)
- 模式(mode)                               development, production 或 none
- 浏览器兼容性(browser compatibility)       IE9+
- 环境(environment)                        运行于 Node.js v10.13.0+ 的版本

> "webpack": "^5.0.0-beta.29"
> "webpack-cli": "^4.0.0-beta.8"

不推荐全局安装
npm i --save-dev webpack         安装最新版本 v5.31.0(2021.4.8)
npm i --save-dev webpack@5.31.0  安装特定版本

webpack5/webpack.config.js
```
const path = require('path');
module.exports = {
    mode: 'development',
  entry: {
      '001': './examples/001/app.js',
      '002': './examples/002/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'examples/static'),
    filename: '[name].js',
    library: 'lib2',
    libraryTarget: 'umd'
  },
};
```
webpack5/examples/001/app.js
import {Element} from '../../src/index'
export {Element}
webpack5/examples/001/index.html
```
<script src="../static/001.js"></script>
<script>
    var sp = new lib2.Element('Sprite')
    sp.data.a = '001'
    console.log('element', sp)
</script>
```

webpack5/examples/002/app.js
import {Element} from '../../src/index'
export {Element}
webpack5/examples/002/index.html
```
<script src="../static/002.js"></script>
<script>
    var sp = new lib2.Element('Sprite')
    sp.data.a = '002'
    console.log('element', sp)
</script>
```

webpack5/src/index.js
```
export class Element{  
    constructor(type){
      this.type = type
      this.data = {a: 1}
    }
}
```

【webpack5】webpack