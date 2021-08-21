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
            <span>M 2021.08.12 20:56</span>
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
<span class="h1 bgc3 cf"> 匹配IP </span>
    STYLE_BLOCK
    ((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}
    <span>● 2(5[0-5]|[0-4]\d)                         <span class="comment"> // 匹配：200 ~ 255</span></span>
    <span>● [0-1]?\d{1,2}                             <span class="comment"> // 匹配：0 ~ 199</span></span>
    <span>● (\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}<span class="comment"> // 后三段重复3次</span></span>
<span class="h1 bgc3 cf"> 密码 </span>
    <span>● ^(?=.*[a-z])              <span class="comment"> // 匹配行头 跟随内容包含小写字母</span></span>
    <span>● ^(?=.*[A-Z])              <span class="comment"> // 匹配行头 跟随内容包含大写字母</span></span>
    <span>● ^(?=.*\d)                 <span class="comment"> // 匹配行头 跟随内容包含数字</span></span>
    <span>● ^(?=.*[@!%&\$\*\?])       <span class="comment"> // 匹配行头 跟随内容包含列举字符</span></span>
    <span>● [a-zA-Z\d@!%&\$\*\?]{8,}  <span class="comment"> // 匹配内容 大小写字母、数字、@!%&$*? 任意组合 8位以上</span></span>

   <span class="comment"> // 大小写字母、数字、@!%&$*?组成8位以上 必须至少包含一个大写字母、一个小写字母、一个数字和一个特殊字符</span>
    ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?])[A-Za-z\d@!%&\$\*\?]{8,}$ 

<span class="h1 bgc3 cf"> 密码2 </span>
   <span class="comment"> // 大小写字母、数字、@!%&$*?组成8位以上 必须至少包含大写字母、小写字母、数字、特殊字符中三种类型</span>
    <span class="h1">^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))|((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))|((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?]))[A-Za-z\d@!%&\$\*\?]{8,}$</span>
    (?=.*[a-z])(?=.*[A-Z])(?=.*\d))|            <span class="comment"> // 包含 小字母、大字母、数字 三种</span>
    ((?=.*[a-z])(?=.*[A-Z])(?=.*[@!%&\$\*\?]))| <span class="comment"> // 包含 小字母、大字母、特殊字符 三种</span>
    ((?=.*[a-z])(?=.*\d)(?=.*[@!%&\$\*\?]))|    <span class="comment"> // 包含 小字母、数字、特殊字符 三种</span>
    ((?=.*[A-Z])(?=.*\d)(?=.*[@!%&\$\*\?])      <span class="comment"> // 包含 大字母、数字、特殊字符 三种</span>

    
    
</pre>0
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