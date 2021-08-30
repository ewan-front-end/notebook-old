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
data = {
    stack: {},<span class="comment"> // 条状图 多个legend 且某些legend要堆叠在一起</span>
    legend: [],
    dataAxis: []
}

const seriesArr = []
legend.forEach(e =&gt; {
    seriesArr.push({
        name: e.title,
        data: e.data,
        type: 'bar',
        stack: 'area',
        label: { show: true, position: 'insideTop' },
        itemStyle: { normal: { color: e.color, lineStyle: { color: e.color, width: 2 <img :src="$withBase('/images/db-brace-right.png')">}
       <span class="comment"> // itemStyle: {</span>
       <span class="comment"> //   color: new echarts.graphic.LinearGradient(</span>
       <span class="comment"> //     0, 0, 0, 1,</span>
       <span class="comment"> //     [</span>
       <span class="comment"> //       { offset: 0, color: '#bf88f2' },</span>
       <span class="comment"> //       { offset: 1, color: '#3f39de' }</span>
       <span class="comment"> //     ]</span>
       <span class="comment"> //   )</span>
       <span class="comment"> // }</span>
    })
})
var options = {
    tooltip: { trigger: 'axis' },
    grid: { left: 10, right: 10, bottom: 20, top: 10, containLabel: true },
    xAxis: { type: 'category', data: dataAxis, axisLabel: { interval: 0 <img :src="$withBase('/images/db-brace-right.png')">,
    yAxis: { type: 'value' },
   <span class="comment"> // legend: { data: legendData, right: 'center', bottom: 0 },</span>
    series: seriesArr
}<span class="comment">
// if (dataVal.length &gt; 10) options.xAxis.axisLabel.rotate = -45</span>
this.chart.setOption(options)
</pre>0
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