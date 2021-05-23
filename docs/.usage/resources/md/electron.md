```
Electron
安装
$ npm install -g electron
$ npm install -g electron-forge

新建项目
$ electron-forge init notepad(小写)

启动app
$ cd notepad && electron-forge start

开发app

componentWillMount：组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。下一个版本可能会被废弃。
render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
componentDidMount:组件渲染之后调用，只调用一次。
componentWillReceiveProps：组件初始化时不调用，组件接受新的props时调用。
componentWillUnmount：组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
componentWillUndate:组件更新结束之前执行，在初始化render时不执行。
componentDidUndate:组件更新结束之后执行，在初始化render时不执行







```