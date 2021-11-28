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
            <span>M 2021.11.28 11:30</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>PostMan</h1><strong>PostMan</strong>
</div>
<div class="static-content">



<pre class="code-block">
<div style="background-color:#fbf4e7"><span class="h4"> 新建一个目录(收藏)</span>{color:#e6b362}
</div><div style="border:#f5e1c1 1px solid;padding:10px 0"><div class="form-elements">    <span class="button bg6 cf">+ New Collection</span> ➤ <span class="inline" style="background-color:#fcf7ee; vertical-align:top; padding:10px">名称<span class="input " style="color:#ffaa22">collection-name</span> 说明<span class="input ">说明文本</span></span> ➤ <span class="button bg6 cf">Create</span>
</div></div>

<div style="background-color:#e7f4ef"><span class="h4"> 新建一个请求</span>{color:#60b491}
</div><div style="border:#c1e2d4 1px solid;padding:10px 0"><div class="form-elements">    <span class="list"><div class="list-wrapper"><span class="list-item"><span class="item-title bd" style="color:#ffaa22">collection-name</span></span></div></span>  ➤ <span class="list"><div class="list-wrapper"><span class="list-item"><span class="item-title">Add Request</span></span></div></span> ➤ <span class="inline" style="background-color:#eef7f4; vertical-align:top; padding:10px">请求名称<span class="input bd" style="color:#20b477">登录</span> 请求说明<span class="input ">说明文本</span> 选择所属目录:<span class="drop-down"><i class="bd" style="color:#ffaa22">collection-name</i></span></span> ➤ <span class="button bg6 cf">Save to collection-name</span>
</div></div>

<div style="background-color:#f3ecfc"><span class="h4"> 新建一个环境</span>{color:#b180eb}
</div><div style="border:#e0cdf7 1px solid;padding:10px 0"><div class="form-elements">    右上角 <span class="button bg6 cf">Manage Environments</span> ➤ 弹窗 <span class="button bg6 cf">Add</span> ➤ <span class="inline" style="background-color:#f7f2fd; vertical-align:top; padding:10px">Environment Name<span class="input " style="color:#8922ff">environment-name</span>    
<span class="table"><span class="col"><strong>VARIABLE(变量)</strong><i style="color:#26f">API</i><i style="color:#26f">RES</i></span><span class="col"><strong>INITIAL VALUE(初始值)</strong><i>https://api.com:4432</i><i>https://res.com:4433</i></span><span class="col"><strong>CURRENT VALUE(当前值)</strong><i>https://api.com:4432</i><i>https://res.com:4433</i></span></span></span> ➤ <span class="button bg6 cf">Add</span>
</div></div>

<span class="h3 bg3 cf"> 需要验证的请求 </span>
<div style="border:#ddd 1px solid; padding: 10px 0">    ● <strong>登录 </strong><div class="form-elements">        切换环境：<span class="drop-down"><i style="color:#8922ff">environment-name</i></span>
        <span class="list vtop"><div class="list-wrapper"><span class="list-item"><span class="item-title" style="color:#ffaa22">collection-name</span><span class="sub-box"><i class="active">登录</i><i>上传</i></span></span></div></span> ➤ <span class="inline" style="background-color:#f3f3f3; vertical-align:top; padding:10px"><span class="drop-down"><i>POST</i></span> <span class="input "><img :src="$withBase('/images/db-brace-left.png')">[{color:#26f}API]<img :src="$withBase('/images/db-brace-right.png')">/api/login/</span>  <span class="button">Send</span> <span class="button">Save</span>
        
<span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="radio"><i>none</i><i>form-data</i><strong>x-www-form-urlencoded</strong><i>raw</i><i>binary</i><i>GraphQL</i></span>
<span class="table"><span class="col"><strong>KEY</strong><i>username</i><i>password</i></span><span class="col"><strong>VALUE</strong><i>ewan</i><i>123456</i></span><span class="col"><strong>DESCRIPTION</strong><i></i><i></i></span></span></span> ➤ <span class="button bg6 cf">Save</span> ➤ <span class="button bg6 cf">Send</span> ➤ 得到：[{color:#f33}e4fc5eb9-316a-48e5-a970-dc116e7ab897]
</div></div><div style="border:#ddd 1px solid; padding: 10px 0">    ● <strong>需要验证的请求</strong><div class="form-elements">        切换环境：<span class="drop-down"><i style="color:#8922ff">environment-name</i></span>
        <span class="list vtop"><div class="list-wrapper"><span class="list-item"><span class="item-title" style="color:#ffaa22">collection-name</span><span class="sub-box"><i>登录</i><i class="active">上传</i></span></span></div></span> ➤ <span class="inline" style="background-color:#f3f3f3; vertical-align:top; padding:10px"><span class="drop-down"><i>POST</i></span> <span class="input "><img :src="$withBase('/images/db-brace-left.png')">[{color:#26f}RES]<img :src="$withBase('/images/db-brace-right.png')">/api/cdn/UploadFile/</span>  <span class="button">Send</span> <span class="button">Save</span>

<span class="tab"><i>Params</i><i>Authorization</i><strong>Headers</strong><i>Body</i><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="table"><span class="col"><strong>KEY</strong><i>authenticate</i></span><span class="col"><strong>VALUE</strong><i style="color:#f33">e4fc5eb9-316a-48e5-a970-dc116e7ab897</i></span><span class="col"><strong>DESCRIPTION</strong><i></i></span></span>

<span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
<span class="radio"><i>none</i><i>form-data</i><i>x-www-form-urlencoded</i><i>raw</i><strong>binary</strong><i>GraphQL</i></span>
        <span class="button bg6 cf">Select File</span></span> ➤ <span class="button bg6 cf">Save</span> ➤ <span class="button bg6 cf">Send</span>
</div></div>
</pre>

</div>