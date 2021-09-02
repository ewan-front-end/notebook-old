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
            <span>N 2021.09.02 14:29</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>算法</h1><strong>算法</strong>
</div>
<div class="static-content">



<pre class="code-block">
数学公式：
a²+b² = (a+b)²-2ab
a²-b² = (a+b)(a-b)
</pre>

## 运算基础
- bit  比特 0或1

- 字节(8 bit Byte) 逻辑寻址单位
    byte 字节     01011110
    可表示的**数值范围**：0-255 即：0b00000000 - 0b11111111

- 处理器 面向字节
    存储地址 8位、16位、32位、64位或128位

- 字节序(Endian)

<pre class="code-block">
    存储：int a = 0x12345678
        正序(Big-Endian)     0x12 0x34 0x56 0x78
        逆序(Little-Endian)  0x78 0x56 0x34 0x12

    Adobe Photoshop                        Big Endian                          BMP (Windows and OS/2 Bitmaps)         Little Endian
    DXF (AutoCad)                          Variable                            GIF                                    Little Endian
    IMG (GEM Raster)                       Big Endian                          JPEG                                   Big Endian
    FLI (Autodesk Animator)                Little Endian                       MacPaint                               Big Endian
    PCX (PC Paintbrush)                    Little Endian                       PostScript                             Not Applicable (text!)
    POV (Persistence of Vision ray-tracer) Not Applicable (text!)              QTM (Quicktime Movies)                 Little Endian (on a Mac!) 
    Microsoft RIFF (.WAV & .AVI)           Both                                Microsoft RTF (Rich Text Format)       Little Endian
    SGI (Silicon Graphics)                 Big Endian                          Sun Raster                             Big Endian
    TGA (Targa)                            Little Endian                       TIFF                                   Both, Endian identifier encoded into file
    WPG (WordPerfect Graphics Metafile)    Big Endian (on a PC!)               XWD (X Window Dump)                    Both, Endian identifier encoded into file
</pre>



二进制 0b 开头
八进制 0 开头
十六进制 0x 开头

[链接](http://c.biancheng.net/view/5471.html)
[链接](https://blog.csdn.net/oracle_microsoft/article/details/4398216)


<pre class="code-block">

原码：00000000 00000000 00000000 00000101
反码：11111111 11111111 11111111 11111010
补码：11111111 11111111 11111111 11111011

溢出：

左移位运算符 '&lt;&lt;' 数学意义：在数字没有溢出的前提下，对于正数和负数，左移一位都相当于乘以2的1次方，左移n位就相当于乘以2的n次方
    5 &lt;&lt; 2    <span class="comment"> // 返回值20</span>
    <img :src="$withBase('/images/左移位运算符.jpg')">
    1 &lt;&lt; 8    <span class="comment"> // 256</span>

右移位运算符 '&gt;&gt;' 数学意义：右移一位相当于除2，右移n位相当于除以2的n次方。这里是取商哈，余数就不要了
    1000 &gt;&gt; 8    <span class="comment"> // 返回值3</span>
    <img :src="$withBase('/images/右移位运算符.jpg')">

'&gt;&gt;&gt;'运算符

按位或 '|=' 数学意义：
    i = 1
    i|=2 相当于 i= i|2 <span class="comment"> // 0001 | 0010 = 0011 = 3</span>
    本质为相位或运算
        0   0   0   1      1
        0   0   1   0      2
        0   0   1   1      或运算


<span class="h1 bg3 cf"> 实际应用 </span>
<span>● 判断奇偶</span>
    a&1 == 0 <span class="comment"> // 偶数</span>
    a&1 == 1 <span class="comment"> // 奇数</span>
<span>● 整数平均数    </span>
    int average(int x, int y) {  <span class="comment"> // (x+y)/2可能产生溢出</span>
        return (x&y)+((x^y)&gt;&gt;1);
    }
<span>● 不用<strong>临时变量</strong>交换两个数</span>
    x ^= y;
    y ^= x;
    x ^= y;



</pre>



## 对称加密

## 非对称加密
原则：公钥加密，私钥解密

## 摘要运算
> 可将消息哈希转换成一个固定长度的值唯一的字符串




## Depth-First-Search


::: details 矩阵运算
链接：[矩阵算法](/projects#矩阵算法工具包)

<pre class="code-block">
<span class="h1 bg3 cf"> 加减运算 </span>
<span>● 规则</span>
    同型矩阵 加减法运算才有意义 即加减运算是可行的
<span>● 性质</span>
　　满足交换律和结合律
    　　交换律 a + b = b + a
    　　结合律 (a + b ) + c = a + (b + c)
<span>● 实现：matrix(a, b)</span>
    1. 判断a、b是否为同型矩阵
    2. 相同位置的元素相加减 
<span>● 实例：</span>
        ┌ a1 a2 a3 ┐     ┌ b1 b2 b3 ┐              ┌ a1+b1 a2+b2 a3+b3 ┐              ┌ a1-b1 a2-b2 a3-b3 ┐      ┌ 1 2 3 ┐   ┌ 1 2 3 ┐   ┌ 2  4  6  ┐                                           
    A = │ a4 a5 a6 │ B = │ b4 b5 b6 │      A + B = │ a4+b4 a5+b5 a6+b6 │      A - B = │ a4-b4 a5-b5 a6-b6 │      │ 4 5 6 │ + │ 4 5 6 │ = │ 8  10 12 │       
        └ a7 a8 a9 ┘     └ b7 b8 b9 ┘              └ a7+b7 a8+b8 a9+b9 ┘              └ a7-b7 a8-b8 a9-b9 ┘      └ 7 8 9 ┘   └ 7 8 9 ┘   └ 14 16 18 ┘ 

<span class="h1 bg3 cf"> 乘法:矩阵与数 </span>
<span>● 规则</span>
　　数乘矩阵，就是将数乘以矩阵中的每一个元素
　　称-A为A的负矩阵
<span>● 性质</span>
　　满足结合律和分配律
    　　结合律： (λμ)A = λ(μA)  (λ+μ)A = λA+μA
    　　分配律： λ(A+B) = λA+λB
<span>● 例题</span>
        ┌ a1 a2 a3 ┐                ┌ a1*10 a2*10 a3*10 ┐      ┌ 1 2 3 ┐        ┌ 10 20 30 ┐                                          
    A = │ a4 a5 a6 │       A * 10 = │ a4*10 a5*10 a6*10 │      │ 4 5 6 │ * 10 = │ 40 50 60 │       
        └ a7 a8 a9 ┘                └ a7*10 a8*10 a9*10 ┘      └ 7 8 9 ┘        └ 70 80 90 ┘

<span class="h1 bg3 cf"> 乘法:矩阵与矩阵 </span>
<span>● 性质&规则</span>
    1. 有意义的运算 A矩阵的列数 ＝ B矩阵的行数
    2. 不对易性(不满足交换律) 顺序敏感
　　如：A * B = C 则：
    　　1. C行数与A相同，C列数与B相同
    　　2. C的第i行第j列的元素 由A的第i行元素与B的第j列元素对应相乘，再取乘积之和

    ▢▢▢   ▢▢▢   ▤▤▤ ▦▢▢   ▢▢▢ ▦▢▢   ▢▢▢ ▦▢▢   ▤▤▤ ▦▦▢   ▢▢▢ ▦▦▢   ▢▢▢ ▦▦▢   ▤▤▤ ▦▦▦   ▢▢▢ ▦▦▦   ▢▢▢ ▦▦▦
    ▢▢▢ * ▢▢▢   ▢▢▢ ▥▢▢ &gt; ▤▤▤ ▦▢▢ &gt; ▢▢▢ ▦▢▢ &gt; ▢▢▢ ▦▥▢ &gt; ▤▤▤ ▦▦▢ &gt; ▢▢▢ ▦▦▢ &gt; ▢▢▢ ▦▦▥ &gt; ▤▤▤ ▦▦▦ &gt; ▢▢▢ ▦▦▦
    ▢▢▢   ▢▢▢   ▢▢▢ ▥▢▢   ▢▢▢ ▥▢▢   ▤▤▤ ▦▢▢   ▢▢▢ ▦▥▢   ▢▢▢ ▦▥▢   ▤▤▤ ▦▦▢   ▢▢▢ ▦▦▥   ▢▢▢ ▦▦▥   ▤▤▤ ▦▦▦
    ┌➀ ➁ ➂┐ ┌➀ ➁ ➂┐   1   ┌30 ▢ ▢┐  4   ┌30 ▢ ▢┐  7   ┌30  ▢ ▢┐      2   ┌30 36 ▢┐  8   ┌30  36 ▢┐  14  ┌30  36  ▢┐      3   ┌30  36  42┐  12  ┌30  36  42┐  21  ┌30  36  42 ┐     
    │➃ ➄ ➅│*│➃ ➄ ➅│   +8  │ ❹ ▢ ▢│  +20 │66 ▢ ▢│  +32 │66  ▢ ▢│      +10 │66  ❺ ▢│  +25 │66  81 ▢│  +40 │66  81  ▢│      +12 │66  81  ❻ │  +30 │66  81  96│  +48 │66  81  96 │    
    └➆ ➇ ➈┘ └➆ ➇ ➈┘   +21 └ ❼ ▢ ▢┘  +42 └ ❼ ▢ ▢┘  +63 └102 ▢ ▢┘      +24 └102 ❽ ▢┘  +48 └102  ❽ ▢┘  +72 └102 126 ▢┘      +27 └102 126 ❾ ┘  +54 └102 126 ❾ ┘  +81 └102 126 150┘    

    <span>● 典型例题</span>
            ┌ a1 ┐                            ┌ a1 ┐                  ┌ a1b1 a1b2 a1b3 ┐                          ┌ a1 ┐
        A = │ a2 │ B = [ b1 b2 b3 ]      AB = │ a2 │ * [ b1 b2 b3 ] = │ a2b1 a2b2 a2b3 │      BA = [ b1 b2 b3 ] * │ a2 │ = b1a1 + b2a2 + b3a3
            └ a3 ┘                            └ a3 ┘                  └ a3b1 a3b2 a3b3 ┘                          └ a3 ┘

        ┌ 1 2  ┐ ┌ 1  2 -3 ┐ = ┌ -1  4 1 ┐
        └ 1 -1 ┘ └ -1 1 2  ┘   └ 2  1 -5 ┘
              
     
         

 &gt; 课堂练习
　　1、设，，求．
　　2、在第1道练习题中，两个矩阵相乘的顺序是A在左边，B在右边，称为A左乘B或B右乘A．如果交换顺序，让B在左边，A在右边，即A右乘B，运算还能进行吗？请算算试试看．并由此思考：两个矩阵应当满足什么条件，才能够做乘法运算．
　　3、设列矩阵，行矩阵，求和，比较两个计算结果，能得出什么结论吗？
　　4、设三阶方阵，三阶单位阵为，试求和，并将计算结果与A比较，看有什么样的结论．

　　解：
　　第1题
．
　　第2题
　　对于
，．
　　求是有意义的，而是无意义的．

　　结论1　只有在下列情况下，两个矩阵的乘法才有意义，或说乘法运算是可行的：左矩阵的列数＝右矩阵的行数．
　　第3题
　　是矩阵，是的矩阵．
　　　        ．
             
    结论2　在矩阵的乘法中，必须注意相乘的顺序．即使在与均有意义时，也未必有=成立．可见矩阵乘法不满足交换律．
　　第4题
　　计算得：．
　　结论3　方阵A和它同阶的单位阵作乘积，结果仍为A，即．
　　单位阵在矩阵乘法中的作用相当于数1在我们普通乘法中的作用．

　　典型例题
　　例6.5.3　设，试计算和．
　　解　
　　　　　　
　　　　　　．
　　　　
　　　　　　
　　　　　　
    结论4　两个非零矩阵的乘积可以是零矩阵．由此若，不能得出或的结论．

　　例6.5.4　利用矩阵的乘法，三元线性方程组

　　可以写成矩阵的形式
 ＝
　　若记系数、未知量和常数项构成的三个矩阵分别为
 ，，，
　　则线性方程组又可以简写为矩阵方程的形式：．

　　2、 运算性质（假设运算都是可行的）
　　(1)　结合律　．
　　(2)　分配律　（左分配律）；
　　　　　　　　　（右分配律）．
　　(3)　．
　　 3、 方阵的幂
		
	　　定义：设A是方阵，是一个正整数，规定
，
显然，记号表示个A的连乘积．	
		

<div> 矩阵的转置

 &gt; 定义
		
	　　定义：将矩阵A的行换成同序号的列所得到的新矩阵称为矩阵A的转置矩阵，记作或．	
		
　　例如，矩阵的转置矩阵为．
　　2、运算性质（假设运算都是可行的）
　　(1)　
　　(2)　
　　(3)　
　　(4)　，是常数．

 &gt; 典型例题
　　例6.5.5  利用矩阵

　　验证运算性质：
　　解　   ；
　　而
　　　　
　　所以
　　　．

		
	　　定义：如果方阵满足，即，则称A为对称矩阵．	
		
　　对称矩阵的特点是：它的元素以主对角线为对称轴对应相等．

</div> 方阵的行列式

 &gt; 定义
		
	　　定义：由方阵A的元素所构成的行列式（各元素的位置不变），称为方阵A的行列式，记作或．	
		

 &gt; 运算性质
　　(1)  （行列式的性质）
　　(2) ，特别地：
　　(3) （是常数，A的阶数为n）
　　思考：设A为阶方阵，那么的行列式与A的行列式之间的关系为什么不是，而是？

　　不妨自行设计一个二阶方阵，计算一下和．
　　例如，则．
　　于是，而 ．
　　思考：设，有几种方法可以求？
　　解  方法一：先求矩阵乘法，得到一个二阶方阵，再求其行列式．
　　　　方法二：先分别求行列式，再取它们的乘积．
</pre>
:::
::: details 矩阵算法实现
```js
const Matrix = {
    mul(a, b) {
        const res = new Array(a.length)
        const rowLen = b[0].length
        for (let i = 0; i < res.length; i++) {
            const arr = new Array(rowLen)
            for (let j = 0; j < arr.length; j++) {
                const aColArr = a[i]
                const bRowArr = b.map(c => c[j])
                let sum = 0        
                aColArr.forEach((ar, k) => { 
                    sum += ar * bRowArr[k]
                })
                arr[j] = sum
            }
            res[i] = arr
        }
        return res
    } 
}

export default Matrix

```
:::

## 缓动算法

<pre class="code-block">
<span class="comment">/**
  * ░▒▓ 缓动策略 ▓▒░
                                                                                                                        ✚ linear        ✚ easeIn                 
                            ┌────────────────────── DURATION d=5 ──────────────────────┐                                 100*1/5+0= 20   100*(t/=5)*0.2+0= 4      
        START_POSITION b=0 ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ END_POSITION c=100              100*2/5+0= 40   100*(t/=5)*0.4+0= 16 
                            ▲           ▲           ▲           ▲           ▲          ▲                                 100*3/5+0= 60   100*(t/=5)*0.6+0= 36 
                            0           1           2           3           4          5                                 100*4/5+0= 80   100*(t/=5)*0.8+0= 64
                                                                                                                        100*5/5+0= 100  100*(t/=5)*1.0+0= 100

    ✚ strongEaseIn                        ✚ strongEaseOut                                 ✚ sineaseIn                  ✚ sineaseOut 
    100*(t/=5)*0.2*0.2*0.2*0.2+0= 0.032   100*((t=1/5-1)*-0.8*-0.8*-0.8*-0.8+1)+0= 67.23   100*(t/=5)*0.2*0.2+0= 0.800   100*((t=1/5-1)*-0.8*-0.8+1)+0= 48.79
    100*(t/=5)*0.4*0.4*0.4*0.4+0= 1.024   100*((t=2/5-1)*-0.6*-0.6*-0.6*-0.6+1)+0= 92.22   100*(t/=5)*0.4*0.4+0= 6.400   100*((t=2/5-1)*-0.6*-0.6+1)+0= 78.40
    100*(t/=5)*0.6*0.6*0.6*0.6+0= 7.775   100*((t=3/5-1)*-0.4*-0.4*-0.4*-0.4+1)+0= 98.97   100*(t/=5)*0.6*0.6+0= 21.59   100*((t=3/5-1)*-0.4*-0.4+1)+0= 93.60             
    100*(t/=5)*0.8*0.8*0.8*0.8+0= 32.76   100*((t=4/5-1)*-0.2*-0.2*-0.2*-0.2+1)+0= 99.96   100*(t/=5)*0.8*0.8+0= 51.20   100*((t=4/5-1)*-0.2*-0.2+1)+0= 99.20
    100*(t/=5)*1.0*1.0*1.0*1.0+0= 100     100*((t=5/5-1)*-0.0*-0.0*-0.0*-0.0+1)+0= 100     100*(t/=5)*1.0*1.0+0= 100     100*((t=5/5-1)*-0.0*-0.0+1)+0= 100
  *  
  */</span>
let tweens = new StrategyPattern()
tweens.setStrategyObj({
  linear: (t,b,c,d) =&gt; c * t / d + b,
  easeIn: (t,b,c,d) =&gt; c * (t /= d) * t + b,
  strongEaseIn: (t,b,c,d) =&gt; c * (t /= d) * t * t * t * t + b,
  strongEaseOut: (t,b,c,d) =&gt; c * ((t = t / d - 1) * t * t * t * t + 1) + b,
  sineaseIn: (t,b,c,d) =&gt; c * (t /= d) * t * t + b,
  sineaseOut: (t,b,c,d) =&gt; c * ((t = t / d - 1) * t * t + 1) + b
})<span class="comment">
// 指针</span><span class="comment">
// tweens.useStrategy('sineaseOut')</span><span class="comment">
// 策略使用</span><span class="comment">
// tweens.run(t - startTime, startPos, endPos, duration)</span>
</pre>


## 傅立叶变换
## 麦克斯韦方程组
## 伽利略变换
## 洛伦兹变换(Lorentz transformation)
> 是狭义相对论中两个作相对匀速运动的惯性参考系（S和S′）之间的坐标变换，是观测者在不同惯性参考系之间对物理量进行测量时所进行的转换关系，在数学上表现为一套方程组。

<pre>
{
    x_: (x, u, t) => (x - u * t) / Math.sqrt(1 - (u * u) / (c * c)),
    t_: (x, u, t) => (t - u * x / (c * c)) / Math.sqrt(1 - (u * u) / (c * c)),

    // 钟慢
    deltaT: (deltaT_, u) => deltaT_ * Math.sqrt(1 - (u * u) / (c * c) ),
    // 尺缩
    long: (long_) => long_ * Math.sqrt(1 - (u * u) / (c * c) ),
    // 质能转换
}


同时性丧失所带来的矛盾
双生子佯谬  车库佯谬  火车钻山洞问题
光的传播是否需要介质 以太

时空事件表示（x,y,z,t）

座标系S(x,y,z,t) - 座标系S′(x',y',z',t')  
S′坐标系 沿 S坐标系 x轴运动 速度为v


伽利略变换
x' = x - v * t
y' = y
z' = z
t' = t

https://zhuanlan.zhihu.com/p/105732091
洛伦兹变换的推导：
S  x = ct  
   x' = x - vt
S′ x' = ct'

假设时空度量相同 
    t = t'  
    x' = ct' = ct 
    x = ct
    ct = ct -vt 即 vt = 0 矛盾出现
假设时空度量不同
    假设差了一个线性的缩放系数γ(两个参考系下观察火车到石头的距离)
    地面参考系：x'= γ(x - vt )  
    火车参考系：x = γ(x'+ vt')
    两条公式左右两边乘起来：
        x'x = γ²(x-vt)(x'+ vt')
        c²tt' = γ²(ct - vt)(ct' + vt')
        c²tt' = γ²(c-v)(c+v)tt'
        c² = γ²(c² - v²)
    得到空间缩放系数
        γ = 1 / Math.sqrt(1 - v² / c²)

        x'= (x - vt) / Math.sqrt(1 - v² / c²)  
        x = (x'+ vt') / Math.sqrt(1 - v² / c²) 
        y = y'
        z = z'
    对于时间t的变换
        x'= γ(x - vt ) 代入 x = γ(x'+ vt')
        x = γ(γ(x - vt ) + vt')
        t'=(-v/c²)x + t / Math.sqrt(1 - v² / c²) 
        同理
        t =(v/c²)x' + t' / Math.sqrt(1 - v² / c²) 

总结 正变换
x'= (x - vt) / Math.sqrt(1 - v² / c²)
y'= y
z'= z
t'= (-v/c²)x + t / Math.sqrt(1 - v² / c²)
总结 逆变换
x = (x'+ vt') / Math.sqrt(1 - v² / c²) 
y = y'
z = z'
t = (v/c²)x' + t' / Math.sqrt(1 - v² / c²) 

</pre>

</div>