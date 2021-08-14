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
    <div class="content"><div class="children"><ul><li><a href="/computer/dataStructure">数据结构</a></li><li><a href="/computer/computerNetworks">计算机网络</a></li><li><a href="/computer/algorithm">算法</a></li></ul></div></div>
</div>
<div class="content-header">
<h1>计算机</h1><strong>计算机</strong>
</div>
<div class="static-content">

ACHOR[1628599921387|字符集]
::: details 字符集

<pre class="normal-block">
&lt;div&gt;
    &lt;p&gt;第一个&lt;/p&gt;
    &lt;span&gt;other&lt;/span&gt;
    &lt;p&gt;第二个&lt;/p&gt;  &lt;--------------  div p:nth-child(3){color:#f00}        [-, p, span, p, p] [3]
    &lt;p&gt;第三个&lt;/p&gt;  &lt;--------------  div p:nth-of-type(3) {color:#0f0}     [-, p, p, p] [3]
&lt;/div&gt;

x:nth-child(n)         [兄弟节点集][n]        
x:nth-of-type(n)       [同类兄弟节点集][n]  

el:nth-child(2n)       选择父元素列表中的第 2n 个标签, 也就是偶数个元素
el:nth-child(n+n)      选择父元素列表中的第 n 个标签后的标签
el:nth-child(-n+n)     选择父元素列表中的第 n 个标签之前的标签
el:nth-child(odd)      选择父元素列表中的是奇数的标签
el:nth-child(even)     选择父元素列表中的是偶数的标签
el:nth-child(n+3)      未知
el:nth-child(n-3)      未知
</pre>3
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