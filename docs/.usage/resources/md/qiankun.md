
===+
人工智能教程
https://www.captainai.net/jiangyu1013/
https://www.captainai.net/join/



window.__CURRENT_SUB_APP__ = '/react15'



【1】从0打造微前端框架，实战汽车资讯平台
    【2】设计原则
        【4】开闭原则
        一个软件实体，如类，模块和函数应该对外扩展开发，对内修改关闭。
        解读：用抽象构建框架，用实现扩展细节。不以改动原有类的方式来实现新需求，而是应该以实现事先抽象出来的接口（或具体类继承抽象类）的方式来实现。
        优点：开闭原则的优点在于可以在不改动原有代码的前提下给程序扩展功能。增加了程序的可扩展性，同时也降低了程序的维护成本。

        【4】单一职责原则
        一个类只允许有一个职责，即只有一个导致该类变更的原因。
        解读：类职责的变化往往就是导致类变化的原因：也就是说如果一个类具有多种职责，就会有多种导致这个类变化的原因，从而导致这个类的维护变得困难。往往在软件开发中，随着需求的不断增加，可能会给原来的类添加一些本来不属于它的一些职责，从而违反了单一职责原则。如果我们发现当前类的职责不仅仅有一个，就应该将本来不属于该类真正的职责分离出去。不仅仅是类，函数也要遵循单一职责原则，即一个函数制作一件事情。如果发现一个函数里面有不同的任务，则需要将不同的任务以另一个函数的形式分离出去。
        优点：如果类与方法的职责划分的很清晰，不但可以提高代码的可读性，更实际性地更降低了程序出错的风险，因为清晰的代码会让bug无处藏身，也有利于bug的追踪，也就是降低了程序的维护成本。

        【4】依赖倒置原则
        依赖抽象而不是依赖实现。抽象不应该依赖细节，细节应该依赖抽象。高层模块不能依赖低层模块，二者都应该依赖抽象。
        解读：针对接口编程，而不是针对实现编程。尽量不要从具体的类派生，而是以继承抽象类或实现接口来实现。关于高层模块与低层模块的划分可以按照决策能力的高低进行划分。业务层自然就处于上层模块，逻辑层和数据层自然就归类为底层。
        优点：通过抽象来搭建框架，建立类和类的关联，以减少类间的耦合性。而且以抽象搭建的系统要比以具体实现搭建的系统更加稳定，扩展性更高，同时也便于维护。

        【4】接口分离原则
        多个特定的客户端接口要好于一个通用性的总接口。
        解读：客户端不应该依赖它不需要实现的接口。不建立庞大臃肿的接口，应尽量细化接口，接口中的方法应尽量少。需要注意的是接口的力度也不能太小，如果过小，则会造成接口数量过多，使设计复杂化。
        优点：避免同一个接口里面包含不同类职责的方法，接口责任划分更加明确，符合高内聚低耦合的思想。

        【4】迪米特法则
        一个对象应该对尽可能少的对象有接触，也就是只接触那些真正需要接触的对象。
        解读：迪米特法则也叫做最少知道原则，一个类应该只和它的成员变量，方法的输入，返回参数中的类作交流，而不应该引入其他的类（间接交流）。
        优点：实践迪米特法则可以良好地降低类与类之间的耦合，减少类与类之间的关联程度，让类与类之间的协作更加直接。

        【4】里氏替换原则
        所有引用基类的地方必须能透明地使用其子类的对象，也就是说子类对象可以替换其父类对象，而程序执行效果不变。
        解读：在继承体系中，子类中可以增加自己特有的方法，也可以实现父类的抽象方法，但是不能重写父类的非抽象方法，否则该继承关系就不是一个正确的继承关系。
        优点：可以检验继承使用的正确性，约束继承在使用上的泛滥。

    【2】改造子应用

===-







# 场景
统筹巨石应用
维护遗产应用
负责聚合/切换多个相互独自的微应用 一起构成了整个大的微前端应用，一般来说页面上同一时间活跃着的也往往只有一个微应用。
在同一个页面中，加载多个不同的微应用，每个微应用都是主应用的组成部分 或者是 提供一些增强能力，这种场景可以说是微应用粒度的前端组件化 [qiankun@2.0]()

# 理念趋势
微前端框架 > 微应用加载器

# 目前主流方案
iframe
基座模式，主要基于路由分发，qiankun和single-spa就是基于这种模式
组合式集成，即单独构建组件，按需加载，类似npm包的形式
EMP，主要基于Webpack5 Module Federation
Web Components

要解决的相关问题：
运行时容器
版本管理
质量管控
配置下发
线上监控
灰度发布
安全监测
等与工程和平台相关的问题


# 微前端架构

应用分发路由
商品模块 订单模块 营销模块 资金模块 客服模块 ...

路由分发应用
基座应用
    业务单元
        功能单元

应用的加载与切换
    路由问题、应用入口、应用加载
应用的隔离与通信
    js隔离、css样式隔离、应用间通信


新增模块
1.创建一个新应用
2.修改基座应用的路由规则

# 如何搭建一个微前端项目

#### 搭建基座
1. 创建一个Vue项作为应用基座
2. yarn add qiankun
3. /micro-app.js
```js
const microApps: Array<any> = [
    {
        name: 'module-app1',               // 不能重复
        entry: 'https://app1.example.com', // 子应用入口
        activeRule: '/app1',               // 匹配url(何时加载该子应用)
        container: '#root-view',           // 子应用的加载位置
        sandbox: {                         // 布尔值时 是否启用沙箱模式，默认为true
            strictStyleIsolation: true     // 对象值时 可以同时开启子应用的样式隔离
        }
    }, 
    {
        name: 'module-shop',
        entry: 'https://app2.example.com',
        activeRule: '/app2',
        container: '#root-view',
        sandbox: {
            strictStyleIsolation: true // 开启样式隔离
        }
    }
    // ...
]

export default microApps
```
4. 第一是注册所有的微应用 启动qiankun
    如我们希望在加载左侧菜单栏的时候去注册和启动qiankun，于是我们可以在对应的组件内这样写：
```js
// 引入qiankun注册子应用和启动的接口函数
import { registerMicroApps, start } from 'qiankun';
// 引入微应用入口配置
import microApps from './modules/micro-apps';
@Component
export default class PrimeMenu extends Vue {
  async created () {
    registerMicroApps(microApps, {
      // 注册一些全局生命周期钩子，如进行日志打印，如果不需要可以不传
      beforeMount () {},
    });
    // 启动qiankun，并开启预加载
    start({ prefetch: true });
  }
}
```

#### 搭建/改造子应用
+ 无Webpack构建项目
mkdir qiankun-platform & cd qiankun-platform
demo> npm init -y
demo> npm i qiankun -S
demo/main/index.html
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <div id="view-01">loading...</div>
  </body>
  </html>

demo/main/index.js
  import { loadMicroApp } from 'qiankun'
  // 加载微应用
  loadMicroApp({
    name: '应用一',
    entry: '//localhost:7100',
    container: '#view-01',
    props: {
      slogan: 'Hello View01'
    }
  })
demo> node main/index.js



+ WEBPACK项目基座
demo> npm init -y
demo> npm i qiankun -S

+ 以Angular为基座

###### 以VUE为基座(vue-cli 3+生成的vue 2.x项目)
1. vue create qiankundemo
2. qiankundemo> npm i qiankun -S 或 yarn add qiankun
3. 部署
    - qiankundemo/src/public-path.js 用于修改运行时的 publicPath
    ```js
    if (window.__POWERED_BY_QIANKUN__) { __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ }
    ```

    - qiankundemo/src/main.js 1.在入口文件最顶部引入public-path.js 2.修改并导出三个生命周期函数
    ```js
    import './public-path';
    ...
    export async function bootstrap() { console.log('[vue] vue app bootstraped') }
    export async function mount(props) { console.log('[vue] props from main framework', props); render(props) }
    export async function unmount() {
        instance.$destroy();
        instance.$el.innerHTML = '';
        instance = null;
        router = null;
    }
    ```

    - 打包配置修改
    ```js
    const { name } = require('./package');
    module.exports = {
      devServer: {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
      configureWebpack: {
        output: {
          library: `${name}-[name]`,
          libraryTarget: 'umd', // 把微应用打包成 umd 库格式
          jsonpFunction: `webpackJsonp_${name}`,
        },
      },
    };
    ```

    qiankundemo/src/App.vue 修改主程序注册子应用容器
    ```

    ```

9. qiankundemo> npm run serve




微应用建议使用 history 模式的路由，需要设置路由 base，值和它的 activeRule 是一样的。
在入口文件最顶部引入 public-path.js，修改并导出三个生命周期函数。
修改 webpack 打包，允许开发环境跨域和 umd 打包。















# 安装qiankun
$ yarn add qiankun # 或者 npm i qiankun -S

# 注册微应用 在主应用中
```js
import { registerMicroApps, start } from 'qiankun'
registerMicroApps([
  { name: 'react app', entry: '//localhost:7100', container: '#yourContainer', activeRule: '/yourActiveRule' ,
  { name: 'vue app', entry: { scripts: ['//localhost:7100/main.js'] }, container: '#yourContainer2', activeRule: '/yourActiveRule2' }
]);

start();
```

# 生命周期钩子 在入口导出
- 入口如：vuedemo/src/main.js、webpack的entry
- 以供主应用在适当的时机调用 
 > bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等<br>
 > mount     应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法<br>
 > unmount   应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例<br>
 > update    可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效<br>
```js
export async function bootstrap() { console.log('react app bootstraped') }
export async function mount(props) { ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root')) }
export async function unmount(props) { ReactDOM.unmountComponentAtNode(props.container ? props.container.querySelector('#root') : document.getElementById('root')) }
export async function update(props) { console.log('update props', props) }
```




qiankun@2.0 
+ 新功能
> 支持多应用并行及多实例沙箱<br>
> 支持手动 加载/卸载 微应用<br>
> 支持 IE11 沙箱兼容<br>
> 官方的极简微应用通信方案<br>
> 支持基于 Shadow DOM 的样式隔离<br>





