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
            <span>M 2021.08.22 20:00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>PostMan</h1><strong>PostMan</strong>
</div>
<div class="static-content">


<pre class="code-block">
<span>● 新建一个收藏 (+ New Collection)</span>
<span>● [收藏菜单]新建一个请求 (Add Request)</span>
    Request name[]
    Request description[]
    Select a collection  <span class="comment"> // 保存在哪个收藏夹</span>

<span>● 新建一个环境 (Add Environment)</span>
    右上角[Manage Environments] &gt; 弹窗[Add] 
    &gt; 
    EnvironmentName[ ] 
    变量VARIABLE[ ]  初始值INITIAL VALUE[ ]  当前值 CURRENT VALUE[ ]
    &gt; [Add] &gt; 

<span class="h1 bgc3 cf"> 验证 </span>
    <span>● 登录 </span><div class="form-elements">        <span class="list"><span class="list-item"><span class="item-title">XX项目API集</span><span class="sub-box"><i>*login</i><i>upload</i></span></span></span>
        切换环境：<span class="drop-down">sever-demo</span>  要使用的变量：origin

        <span class="drop-down">POST</span> <span class="input"><img :src="$withBase('/images/db-brace-left.jpg')">origin<img :src="$withBase('/images/db-brace-right.jpg')">/api/login/</span>  <span class="button">Send</span> <span class="button">Save</span>
        
        <span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
        <span class="radio"><i>none</i><i>form-data</i><strong>x-www-form-urlencoded</strong><i>raw</i><i>binary</i><i>GraphQL</i><i></i><i></i><i></i><i></i></span>
        <span class="table"><span class="col"><strong>KEY</strong><i>username</i><i>password</i></span><span class="col"><strong>VALUE</strong><i>ewan</i><i>123456</i></span><span class="col"><strong>DESCRIPTION</strong><i></i><i></i></span></span>

        <span class="button active">Save</span> &gt; <span class="button active">Send</span> &gt; 得到：e4fc5eb9-316a-48e5-a970-dc116e7ab897</div>
    
    <span>● 需要验证的请求</span><div class="form-elements">        <span class="list"><span class="list-item"><span class="item-title">XX项目API集</span><span class="sub-box"><i>login</i><i>*upload</i></span></span></span>
        切换环境：<span class="drop-down">sever-demo</span>  要使用的变量：origin

        <span class="drop-down">POST</span> <span class="input"><img :src="$withBase('/images/db-brace-left.jpg')">origin<img :src="$withBase('/images/db-brace-right.jpg')">/api/cdn/UploadFile/</span>  <span class="button">Send</span> <span class="button">Save</span>

        <span class="tab"><i>Params</i><i>Authorization</i><strong>Headers</strong><i>Body</i><i>Pre-request Script</i><i>Tests</i><i>Settings</i><i></i><i></i><i></i><i></i><i></i><i> </i></span>
        <span class="table"><span class="col"><strong>KEY</strong><i>authenticate</i></span><span class="col"><strong>VALUE</strong><i>e4fc5eb9-316a-48e5-a970-dc116e7ab897</i></span><span class="col"><strong>DESCRIPTION</strong><i></i></span></span>

        <span class="tab"><i>Params</i><i>Authorization</i><i>Headers</i><strong>Body</strong><i>Pre-request Script</i><i>Tests</i><i>Settings</i></span>
        <span class="radio"><i>none</i><i>form-data</i><i>x-www-form-urlencoded</i><i>raw</i><strong>binary</strong><i>GraphQL </i></span>
        <span class="button active">Select File</span>

        <span class="button active">Save</span> &gt; <span class="button active">Send</span></div>
</pre>

</div>