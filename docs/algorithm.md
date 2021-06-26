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
            <span>M 2021.06.26</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>算法</h1>
</div>



公式：
a²+b² = (a+b)²-2ab
a²-b² = (a+b)(a-b)

## Depth-First-Search

## 缓动算法
/**
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
  */
let tweens = new StrategyPattern()
tweens.setStrategyObj({
  linear: (t,b,c,d) => c * t / d + b,
  easeIn: (t,b,c,d) => c * (t /= d) * t + b,
  strongEaseIn: (t,b,c,d) => c * (t /= d) * t * t * t * t + b,
  strongEaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
  sineaseIn: (t,b,c,d) => c * (t /= d) * t * t + b,
  sineaseOut: (t,b,c,d) => c * ((t = t / d - 1) * t * t + 1) + b
})
// 指针
// tweens.useStrategy('sineaseOut')
// 策略使用
// tweens.run(t - startTime, startPos, endPos, duration)

## 矩阵


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
