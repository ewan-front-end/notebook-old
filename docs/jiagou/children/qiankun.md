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






















