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
            <span>N 2021.09.20 12:29</span>
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
    ▮ ASCII(American Standard Code for Information Interchange) 1-127
        Bin(二进制)   Oct(八进制)   Dec(十进制)   Hex(十六进制)   缩写/字符   解释
        0000 0000    00            0            0x00           NUL(null)   空字符              NUL(null)  SOH(start of headline) STX (start of text) ...
        0010 0000    040           32           0x20           (space)     空格

        0011 0000    060           48           0x30           0           字符0               0 1 2 3 4 5 6 7 8 9    
        0011 1001    071           57           0x39           9           字符9

        0011 1010    072           58           0x3A           :           冒号                : ; &lt; = &gt; ? @
        0100 0000    0100          64           0x40           @           电子邮件符号

        0100 0001    0101          65           0x41           A           大写字母A            A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
        0101 1010    0132          90           0x5A           Z           大写字母Z

        0101 1011    0133          91           0x5B           [           开方括号             [ \ ] ^ _ `
        0110 0000    0140          96           0x60           `           开单引号

        0110 0001    0141          97           0x61           a           小写字母a            a b c d e f g h i j k l m n o p q r s t u v w x y z
        0111 1010    0172          122          0x7A           z           小写字母z

        0111 1011    0173          123          0x7B           {           开花括号             { | } ~ DEL
        0111 1111    0177          127          0x7F           DEL         删除

    ▮ 计算机的世界化过程中，欧洲紧随其后，ASCII基础上，利用ASCII字节中闲置的最高位 扩展到了第255号字符

    ▮ 亚洲象形文字，ASCII基础上，通过扩展字节表示更多的字符

    ▮ 世界统一标准，Unicode规范出台，为世界上所有字符都分配了一个唯一的数字编号，从 0x000000 到 0x10FFFF 有 110 多万个

    ▮ Unicode规范实现：规范编号对应到二进制表示方案主要有 UTF-8 UTF-16 UTF-32

    ▮ UTF-8
        使用的字节数可变
        Unicode编号溢出255时 扩展字节 字节数1-4不等
        入库规范：
            二进制格式(X为Unicode编号占位符)                   十六进制编号范围      十进制编号范围
            ──────────────────────────────────────────────┼────────────────────┼───────────────
            单字节  0XXXXXXX                                 0x00-0x7F            0-127
            二字节  110XXXXX 10XXXXXX                        0x80-0x7FF           128-2047
            三字节  1110XXXX 10XXXXXX 10XXXXXX               0x800-0xFFFF         2048-65535
            四字节  11110XXX 10XXXXXX 10XXXXXX 10XXXXXX      0x10000-0x10FFFF     65536-
        入库流程：
            例：'马'的Unicode编号是：0x9A6C，整数编号是 39532
                1. 1110XXXX 10XXXXXX 10XXXXXX  <span class="comment"> // 找到Unicode编号范围对应的二进制格式</span>
                2. 39532 &gt; 1001 1010 0110 1100 <span class="comment"> // Unicode编号转化为二进制数</span>
                3. 111X1001 10101001 10101100  <span class="comment"> // 将二进制数从右&gt;左依次填入占位符</span>
                4. 11101001 10101001 10101100  <span class="comment"> // 剩余占位符设为0</span>
</pre>
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