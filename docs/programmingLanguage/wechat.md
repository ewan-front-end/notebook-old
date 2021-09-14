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
            <span>N 2021.09.14 19:27</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>微信小程序</h1><strong>微信小程序</strong>
</div>
<div class="static-content">

```js
小程序企业账号申请
地址：https://mp.weixin.qq.com/wxopen/wacontractorpage?action=step3&lang=zh_CN&token=1549060622
资料：1.企业名称；2.营业执照注册号；3.企业对公账户的开户名称；4.对公账户号



<button bindtap="scanningCode" id="0"> 盘点 </button>
<view wx:for="{{items}}" wx:for-index="index" wx:for-item="item"> {{index+1}}、{{item.title}} </view>
跳转：wx.navigateTo({ url: '../test/test' });




■ 设置title
静态：对应json页面 { "navigationBarTitleText": "新标题"} 总标题在app.json里
动态：事件名: function () { wx.setNavigationBarTitle({ title: '新标题' }) }


■ 流程
<view wx:for="{{projectArr}}" wx:key="index">
{{item.name}}
</view>
<view wx:for="{{projects}}" wx:for-index="index1" wx:for-item="item1" wx:key="index1">
{{item1.name}}
<view wx:for="{{item1.children}}" wx:for-index="index2" wx:for-item="item2" wx:key="index2">
{{item2.name}}
</view>
</view>

■ 过滤器&计算属性
/libs/filter.wxs
var util = {
  formatDate: function (dt, fmt) {
    var dateObj = getDate(dt);
    fmt = fmt.replace("yyyy", dateObj.getFullYear() + "");
    fmt = fmt.replace("mm", dateObj.getMonth() + 1);
    fmt = fmt.replace("dd", dateObj.getDate());
    fmt = fmt.replace("hh", dateObj.getHours());
    fmt = fmt.replace("mm", dateObj.getMinutes());
    return fmt;
  }
}
module.exports = {
  formatDate: util.formatDate
}
/pages/main/index.wxml
<wxs module="filter" src="../../libs/filter.wxs"></wxs>
<van-field value="{{ filter.formatDate(currentFenbufenxiang.time_start, 'yyyy-mm-dd hh:mm') }}" />
■ 使用LESS
$ sudo npm install -g wxss-cli
$ wxss /Users/xxxxxxxxxx/Work/cyj/app/miniprogram/pages
app/miniprogram/pages/main/excel.less   会自动生成 excel.wxss
app/miniprogram/pages/main/index.wxss    @import "./excel.wxss";


■ 跳转传参
//A页面  实现跳转
wx.navigateTo({
url: "./info" +
"?index1=" + this.data.projectIndex +      
"&index2=" + this.data.danweiIndex
})
//B页面  接收参数
onLoad: function (options) {
let index1 = options.index1;
let index2 = options.index2;
}


■ 公共状态管理
//app.js
App({
onLaunch: function () {
this.globalData = {
name: '张三',
age: 18
}
}
})
//其它页面
const app = getApp()
Page({
data: {
name: '未知'
},
onLoad: function () {
this.setData({ name: app.globalData.name});
}
})


■ 表单提交
<form bindsubmit="infoSubmit" bindreset="">
添加项目：<input name="pname" />
<button formType="submit">添加</button>
</form>
infoSubmit: function(e){
let { pname } = e.detail.value; console.log(pname)
}


■ 数据库
建数据库：数据库环境即为数据库
添加集合：控制台(云开发) > 数据库 > (左上角+号)创建集合
添加记录：记录列表 > 添加记录
云函数(操作内容)
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) //调用所在环境相同的数据库的引用
const db = cloud.database() // 数据库引用
const _ = db.command // 数据库操作符
const todos = db.collection('projects') // 合集引用

const result = todos.where({_id:'e2297d935eb40ee100380406563b261a'}).get()
return result
联表查询
const db = cloud.database() 
const _ = db.command // 数据库操作符
const $ = _.aggregate   // 聚合操作符

const result = db.collection("danwei").aggregate() // 查询子类表
.lookup({
from:"projects", // 把父类表关联上
localField: 'p_id', // 子类表的关联字段
foreignField: '_id', // 父类表的关联字段
as: 'projectChildren' // 匹配的结果聚合成一个别名
})
.project({
//project把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段
projectChildren: 0
})
.end({
success:function(res){
return res;
},
fail(error) {
return error;
}
})
return result

多表联查
const result = cloud.database().collection("fenbufenxiang").aggregate()
.lookup({
from: "danwei",
localField: 'd_id',
foreignField: '_id',
as: 'danwei'
})
.addFields({
p_id: $.arrayElemAt(['$danwei.p_id', 0]),
d_name: $.arrayElemAt(['$danwei.name', 0])
})
.lookup({
from: "projects",
localField: 'p_id',
foreignField: '_id',
as: 'projects'
})
.addFields({
p_name: $.arrayElemAt(['$projects.name', 0])
})
.project({ danwei: 0, projects: 0 })  
.end({
success: function (res) { return res; },
fail(error) { return error; }
})
return result

■ 云函数(如数据操作块)

服务端(云函数)：cloudfunctions/project/index.js

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 常量(需 SDK v1.1.0 或以上) 默认请求的云环境就是云函数当前所在的环境
})

exports.main = async (event, context) => { 
// 通常做数据库操作，参考【数据库/云函数】
return event.x + event.y // 简单计算
}


客户端：通常事件驱动

wx.cloud.init({ env: 'cyj-qxjbm' });

wx.cloud.callFunction({
name: 'project', // 要调用的云函数名称
data: { x: 1, y: 2 } // 传递给云函数的event参数
})
.then(res => { console.log(res.result) })
.catch(err => { console.log(err) })

调试：
云函数目录：npm install --save wx-server-sdk@latest

■ 数据监听
// app.js
onLaunch: function () {
let global = this.globalData
this.setWatch = function(page) {
let data = page.data
let watch = page.watch

Object.keys(watch).forEach(v => {
let key = v.split('.')

let context
if (key[0]==='global') { context = global; key.shift() } else { context = data }

let nowData = context
for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
nowData = nowData[key[i]] // 将nowData指向它的key属性对象
}
let lastKey = key[key.length - 1]
let watchFun = watch[v].handler || watch[v] // 兼容带handler和不带handler的两种写法
let deep = watch[v].deep // 若未设置deep,则为undefine
observe(nowData, lastKey, watchFun, deep, page) // 监听nowData对象的lastKey
})
};

function observe(obj, key, watchFun, deep, page) {
var val = obj[key]
// 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
if (deep && val != null && typeof val === 'object') { 
Object.keys(val).forEach(childKey=>{ // 遍历val对象下的每一个key
this.observe(val,childKey,watchFun,deep,page) // 递归调用监听函数
})
}
var that = this
Object.defineProperty(obj, key, {
configurable: true,
enumerable: true,
set: function(value) {
// 用page对象调用,改变函数内this指向,以便this.data访问data内的属性值
watchFun.call(page,value,val) // value是新值，val是旧值
val = value
if(deep){ // 若是深度监听,重新监听该对象，以便监听其属性
that.observe(obj, key, watchFun, deep, page) 
}
},
get: function() {
return val
}
})
}
}


// 使用页
const app = getApp()

Page({  
data: {
projectArr: []    
},
onLoad: function () {
app.setWatch(this)
},
watch:{
// global开头时为公共上下文
"global.projectArr": function(newValue){
this.setData({ projectArr: newValue});
}
}
})



■ 引入官方WeUI组件库(成功)
1. 小程序根目录: npm init
2. npm install --save weui-miniprogram
3. 微信开发者工具右上角 > 详情 > 本地设置， 勾选“使用 npm 模块”选项
4. 微信开发者工具菜单栏 > 工具 > 构建 npm

5. app.wxss引入全局样式:
@import '/miniprogram_npm/weui-miniprogram/weui-wxss/dist/style/weui.wxss';
6. 以pages的index为例，json中引入cell：
{
"usingComponents": {
"mp-cell": "../../miniprogram_npm/weui-miniprogram/cell/cell "
}
}
7. 官方文档：
https://developers.weixin.qq.com/miniprogram/dev/extended/weui/slideview.html


■ 引入Vant Weapp(成功)
1. 小程序根目录: npm init -y
2. npm i vant-weapp -S --production
3. 微信开发者工具右上角 > 详情 > 本地设置， 勾选“使用 npm 模块”选项
4. 微信开发者工具菜单栏 > 工具 > 构建 npm
5. 官网：https://youzan.github.io/vant-weapp/#/intro

使用：(以pages的index使用button为例)
index.json
{
"usingComponents": {
"van-button": "../../miniprogram_npm/vant-weapp/button/index"
}
}
index.wxml
<van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>


遮罩层

Excel文件下载
1 云函数：npm install node-xlsx


cloud://cyj-qxjbm.6379-cyj-qxjbm-1302036063/test.xlsx
```

</div>