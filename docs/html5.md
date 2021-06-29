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
            <span>M 0000:00:00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>HTML5</h1><strong>HTML5</strong>
</div>
<div class="static-content">



## 缓存
<pre>
localStorage.setItem('id', 1)     localStorage.getItem('id')  
sessionStorage.setItem('id', 1)   sessionStorage.getItem('id')
</pre>


## canvas
```js
▇ 上下文属性 ▇
canvas                       // 取得画布Canvas 元素
fillStyle                    // 填充路径的当前的颜色、模式或渐变。值：字符串、CanvasGradient 对象或 CanvasPattern 对象
strokeStyle                  // 绘制路径的颜色、模式和渐变。值：字符串、CanvasGradient 对象或 CanvasPattern 对象
lineCap                      // 指定线条末端如何绘制。值：butt(平直)、round(圆形)、square(夌形)。默认值是 butt
lineJoin                     // 指定两条线条如何连接。值：round、bevel和miter。默认值是 "miter"
miterLimit                   // 当 lineJoin 为miter时，这个属性指定斜连接长度和线条宽度的最大比率
lineWidth                    // 绘制线条的线条宽度。默认值是 1.0，且必须大于 0.0。线条在路径上居中，每边有线条宽的一半

shadowBlur                   // 指定羽化阴影的程度。默认值是 0
shadowColor                  // 把阴影颜色指定为CSS字符串或Web样式字符串，且可包含alpha部分来表示透明度。默认值是 black
shadowOffsetX                // 指定阴影水平和垂直偏移。较大值使得阴影化对象漂浮在背景较高位置上。 默认值是 0
shadowOffsetY   

font
textBaseline                 /* alphabetic	默认。文本基线是普通的字母基线。
                                top	        文本基线是 em 方框的顶端
                                hanging	    文本基线是悬挂基线
                                middle	    文本基线是 em 方框的正中
                                ideographic	文本基线是表意基线
                                bottom	    文本基线是 em 方框的底端*/
textAlign                    /* start	      默认。文本在指定的位置开始
                                end	        文本在指定的位置结束
                                center	    文本的中心被放置在指定的位置
                                left	      文本左对齐
                                right	      文本右对齐*/
maxWidth

globalAlpha                  /* 不透明度 值0.0(完全透明)-1.0(完全不透明)间 默认1.0*/
globalCompositeOperation     /* 新图像如何覆盖旧图像 
                                source-over	     默认 在旧图像上显示新图像
                                source-atop	     在旧图像上显示新图像 新图像位于旧图像之外的部分是不可见的
                                source-in	       在旧图像中显示新图像 只有旧图像内的新图像部分会显示 旧图像是透明的
                                source-out	     在旧图像外显示新图像 只会显示旧图像之外新图像部分   旧图像是透明的
                                destination-over 在新图像上显示旧图像
                                destination-atop 在新图像上显示旧图像 新图像之外的旧图像部分不会被显示
                                destination-in	 在新图像中显示旧图像 只有新图像内的旧图像部分会被显示 新图像是透明的
                                destination-out	 在新图像外显示旧图像 只有新图像外的旧图像部分会被显示 新图像是透明的
                                lighter	         显示新图像 + 旧图像
                                copy	           显示新图像 忽略旧图像。
                                xor	             对新图像与旧图像进行异或操作*/

▇ 管理 ▇
clearRect(x, y, width, height) // 清除画布特定矩形区域中像素
beginPath()                    // 开启一条新路径的唯一方法
moveTo(x, y)                   // 抬悬笔触定位到目标位置
save()                         // 保存当前环境状态
restore()                      // 恢复当前环境状态

▇ 路径 ▇ 
lineTo(x, y)                            // 当前路径延伸到下一点
arc(x, y, r, sAngle, eAngle, nishizhen) // 当前路径添加一条弧线(角度用弧度Math.PI表示) 
arcTo(sX, sY, eX, eY, r)                // 创建介于两个切线之间的弧
rect(x, y , width, height)              // 矩形子路径。
quadraticCurveTo(cx, cy, x, y)          // 二次贝塞尔曲线 开始点智能获取或moveTo设定 控制点x 控制点y 目标点x 目标点y
bezierCurveTo(c1x,c1y,c2x,c2y,x,y)      // 三次贝塞尔曲线 开始点智能获取或moveTo设定 第一个控制点xy 第二个控制点xy 目标点xy

▇ 路径工具 ▇
fill()                           // 填充当前路径 
stroke()                         // 描边当前路径
measureText(text).width          // 检测文本宽度
fillText(text, x, y, maxWidth)   // 文本 位置 最大文本宽度
strokeText(text, x, y, maxWidth) // 描边文本
closePath()                      // 闭合路径 与beginPath没有逻辑关系！！！！！！！

▇ 绘制 ▇
drawImage(img, ix,iy,iwidth,iheight, x,y,width,height)  // 图片 图片剪切点 图片剪切范围 放置在画布的位置 在画布上显示的尺寸
fillRect(x,y,width,height)                              // 绘制矩形
strokeRect(x,y,width,height)                            // 描边矩形。

▇ 变换 ▇
rotate(angle)                  // 以弧度计 角度&弧度换算：角度*Math.PI/180 公式进行计算 如需旋转 5 度：5*Math.PI/180
scale(scalewidth,scaleheight)  // 以1为基数
translate(x, y)                // 位移
clip()                         // 用当前路径去定义的剪切区域

▇ 复杂填充 ▇
var linearGradient = context.createLinearGradient(0, 0, 170, 0)           // 创建线性渐变模型 开始点xy 结束点xy
    linearGradient.addColorStop(0, "#f00")                                // 为模型添加颜色 停止位置(跨程映射在0-1位置) 颜色值
    linearGradient.addColorStop(0.5, "#000")
    context.fillStyle = linearGradient                                    // 使用模型
    context.fillRect(20, 20, 150, 100)
var pattern = context.createPattern(image,"repeat")                       // 资源排列模型 用于填充路径 repeat|repeat-x|repeat-y|no-repeat
    context.rect(0,0,150,100) 
    context.fillStyle = pattern
    context.fill() 
var radialGradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1) // 放射圆形渐变模型 起点圆圆心xy 半径 放射圆圆心xy 半径
    radialGradient.addColorStop(0,"red");
    radialGradient.addColorStop(1,"white");
    context.fillStyle = radialGradient                                    // 使用模型
    context.fillRect(20, 20, 150, 100)
```

</div>