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
    <div class="content"><div class="custom-block children"><ul><li><a href="/computer/dataStructure">数据结构</a></li><li><a href="/computer/computerNetworks">计算机网络</a></li><li><a href="/computer/algorithm">算法</a></li></ul></div></div>
</div>
<div class="content-header">
<h1>计算机</h1><strong>计算机</strong>
</div>
<div class="static-content">


ACHOR[1628599921387|字符集]
::: details 字符集

<pre class="code-block">
<div style="background-color:#fbf4e7"><span class="h4" style="color:#e6b362"> 新建一个目录(收藏)</span>
</div><div style="border:#f5e1c1 1px solid;padding:10px 0"><div class="form-elements">    <span class="button bg6 cf">+ New Collection</span> ➤ <span class="inline" style="background-color:#fcf7ee; vertical-align:top; padding:10px">名称<span class="input " style="color:#ffaa22">collection-name</span> 说明<span class="input ">说明文本</span></span> ➤ <span class="button bg6 cf">Create</span>
</div></div>

<div style="background-color:#e7f4ef"><span class="h4" style="color:#60b491"> 新建一个请求</span>
</div><div style="border:#c1e2d4 1px solid;padding:10px 0"><div class="form-elements">    <span class="list"><div class="list-wrapper"><span class="list-item"><span class="item-title bd" style="color:#ffaa22">collection-name</span></span></div></span>  ➤ <span class="list"><div class="list-wrapper"><span class="list-item"><span class="item-title">Add Request</span></span></div></span> ➤ <span class="inline" style="background-color:#eef7f4; vertical-align:top; padding:10px">请求名称<span class="input bd" style="color:#20b477">登录</span> 请求说明<span class="input ">说明文本</span> 选择所属目录:<span class="drop-down"><i class="bd" style="color:#ffaa22">collection-name</i></span></span> ➤ <span class="button bg6 cf">Save to collection-name</span>
</div></div>

<div style="background-color:#f3ecfc"><span class="h4" style="color:#b180eb"> 新建一个环境</span>
</div><div style="border:#e0cdf7 1px solid;padding:10px 0"><div class="form-elements">    右上角 <span class="button bg6 cf">Manage Environments</span> ➤ 弹窗 <span class="button bg6 cf">Add</span> ➤ <span class="inline" style="background-color:#f7f2fd; vertical-align:top; padding:10px">Environment Name<span class="input " style="color:#8922ff">environment-name</span>    
<span class="table"><span class="col"><strong>VARIABLE(变量)</strong><i style="color:#26f">API</i><i style="color:#26f">RES</i></span><span class="col"><strong>INITIAL VALUE(初始值)</strong><i>https://api.com:4432</i><i>https://res.com:4433</i></span><span class="col"><strong>CURRENT VALUE(当前值)</strong><i>https://api.com:4432</i><i>https://res.com:4433</i></span></span></span> ➤ <span class="button bg6 cf">Add</span>
</div></div>

<span class="h3 bg3 cf"> 需要验证的请求 </span>
<div style="border:#ddd 1px solid; padding: 10px 0">    <span>● 登录 </span><div class="form-elements">        切换环境：<span class="drop-down"><i style="color:#8922ff">environment-name</i></span>
        <span class="list vtop"><div class="list-wrapper"><span class="list-item"><span class="item-title" style="color:#ffaa22">collection-name</span><span class="sub-box"><i class="active">登录</i><i>上传</i></span></span></div></span> ➤ <span class="inline" style="background-color:#f3f3f3; vertical-align:top; padding:10px"><span class="drop-down"><i>POST</i></span> <span class="input "><img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">API</span><img :src="$withBase('/images/db-brace-right.png')">/api/login/</span>  <span class="button">Send</span> <span class="button">Save</span>
        
<span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="radio"><i>none</i><i>form-data</i><strong>x-www-form-urlencoded</strong><i>raw</i><i>binary</i><i>GraphQL</i></span>
<span class="table"><span class="col"><strong>KEY</strong><i>username</i><i>password</i></span><span class="col"><strong>VALUE</strong><i>ewan</i><i>123456</i></span><span class="col"><strong>DESCRIPTION</strong><i></i><i></i></span></span></span> ➤ <span class="button bg6 cf">Save</span> ➤ <span class="button bg6 cf">Send</span> ➤ 得到：<span style="color:#f33">e4fc5eb9-316a-48e5-a970-dc116e7ab897</span>
</div></div><div style="border:#ddd 1px solid; padding: 10px 0">    <span>● 需要验证的请求</span><div class="form-elements">        切换环境：<span class="drop-down"><i style="color:#8922ff">environment-name</i></span>
        <span class="list vtop"><div class="list-wrapper"><span class="list-item"><span class="item-title" style="color:#ffaa22">collection-name</span><span class="sub-box"><i>登录</i><i class="active">上传</i></span></span></div></span> ➤ <span class="inline" style="background-color:#f3f3f3; vertical-align:top; padding:10px"><span class="drop-down"><i>POST</i></span> <span class="input "><img :src="$withBase('/images/db-brace-left.png')"><span style="color:#26f">RES</span><img :src="$withBase('/images/db-brace-right.png')">/api/cdn/UploadFile/</span>  <span class="button">Send</span> <span class="button">Save</span>

<span class="tab"><i>Params</i><i>Authorization</i><strong>Headers</strong><i>Body</i><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="table"><span class="col"><strong>KEY</strong><i>authenticate</i></span><span class="col"><strong>VALUE</strong><i style="color:#f33">e4fc5eb9-316a-48e5-a970-dc116e7ab897</i></span><span class="col"><strong>DESCRIPTION</strong><i></i></span></span>

<span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="radio"><i>none</i><i>form-data</i><i>x-www-form-urlencoded</i><i>raw</i><strong>binary</strong><i>GraphQL</i></span>
        <span class="button bg6 cf">Select File</span></span> ➤ <span class="button bg6 cf">Save</span> ➤ <span class="button bg6 cf">Send</span>
</div></div>
</pre>5
:::

::: details 字符集JS操作
'123' => [3355185] [12849]
:::
::: details 二进制文件格式设计
base64: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=
:::

## 数据结构
- 哈希表    存储键值对          // 学生信息
- 数组      列表               // 班级学员
- 链式存储  哈希表加入next属性  // 数组是顺序插入 需求是插入到中间
// 链表解决了插入问题 但是顺序不直观
- 队列
- 栈
- 树
- 图

## 计算机网络

## 算法

</div>