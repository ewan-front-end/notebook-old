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
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Java</h1><strong>Java</strong>
</div>
<div class="static-content">

## Java环境
- 安装JDK
    http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html   jdk-16.0.1_windows-x64_bin.exe
- 配置环境变量

<pre class="code-block">
<span class="h1 bg3 cf"> 匹配IP </span>
    STYLE_BLOCK
    ((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}
    <span>● 2(5[0-5]|[0-4]\d)                         <span class="comment"> // 匹配：200 ~ 255</span></span>
    <span>● [0-1]?\d{1,2}                             <span class="comment"> // 匹配：0 ~ 199</span></span>
    <span>● (\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}<span class="comment"> // 后三段重复3次</span></span>
<span class="h1 bg3 cf"> 密码 </span>
    <span>● ^(?=.*[a-z])              <span class="comment"> // 匹配行头 跟随内容包含小写字母</span></span>
    <span>● ^(?=.*[A-Z])              <span class="comment"> // 匹配行头 跟随内容包含大写字母</span></span>
    <span>● ^(?=.*\d)                 <span class="comment"> // 匹配行头 跟随内容包含数字</span></span>
    <span>● ^(?=.*[@!%&\$\*\?])       <span class="comment"> // 匹配行头 跟随内容包含列举字符</span></span>
    <span>● [a-zA-Z\d@!%&\$\*\?]{8,}  <span class="comment"> // 匹配内容 大小写字母、数字、@!%&$*? 任意组合 8位以上</span></span>

   <span class="comment"> // 大小写字母、数字、@!%&$*?组成8位以上 必须至少包含一个大写字母、一个小写字母、一个数字和一个特殊字符</span>
    ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?])[A-Za-z\d@!%&\$\*\?]{8,}$ 

<span class="h1 bg3 cf"> 密码2 </span>
   <span class="comment"> // 大小写字母、数字、@!%&$*?组成8位以上 必须至少包含大写字母、小写字母、数字、特殊字符中三种类型</span>
    <span class="h1">^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))|((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))|((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?]))[A-Za-z\d@!%&\$\*\?]</span>{8,}$
    (?=.*[a-z])(?=.*[A-Z])(?=.*\d))|            <span class="comment"> // 包含 小字母、大字母、数字 三种</span>
    ((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))| <span class="comment"> // 包含 小字母、大字母、特殊字符 三种</span>
    ((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|    <span class="comment"> // 包含 小字母、数字、特殊字符 三种</span>
    ((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?])      <span class="comment"> // 包含 大字母、数字、特殊字符 三种</span>

    
    
</pre>0

</div>