/**
 * 画布类
 * @constructor
 * @param {参数类型} 参数名 参数说明
 */
const setCanvas = (o, {canvas, width, height, styleWidth, styleHeight}) => {
    if (canvas) {
        o.canvas = canvas
        o.context = canvas.getContext("2d")
    }
    if (width) {
        o.width = width
        o.canvas && (o.canvas.width = width)
    }
    if (height) {
        o.height = height
        o.canvas && (o.canvas.height = height)
    }
    styleWidth && (o.canvas.style.width = styleWidth + 'px')
    styleHeight && (o.canvas.style.height = styleHeight + 'px')
}

export default class Canvas {
    constructor(options) {
        setCanvas(this, options)
    }
    set(options){setCanvas(this, options)}
    clean() {this.context.clearRect(0, 0, W, H)}
    draw({type, data, assignment, config, transform}) {   
        let ctx = this.context
        ctx.beginPath()
        
        Object.assign(ctx, assignment)

        config.save || config.clip && ctx.save()
        
        this['draw' + type] && this['draw' + type](data, transform)

        assignment.fillStyle && ctx.fill()
        assignment.strokeStyle && ctx.stroke()
        config.clip && ctx.clip()
        config.closePath && ctx.closePath()
        config.restore || config.unclip && ctx.restore()
    }
    
    drawSprite({ x, y, opacity, width, height, transform, config }) {
        const {save, restore, clip, unclip} = config
        let startX = 0, startY = 0
        
        this.context.transform(transform.a, transform.b, transform.c, transform.d, transform.e, transform.f)
        transform && this.context.restore()
    }
    /**
     * drawRect(x, y, width, height, options)
     */
    drawRect({ x, y, opacity, width, height }, transform) {
        this.context.transform(...transform)
        this.context.rect(x, y, width, height)
    }
    drawCircle({ x, y, r, options }) {
        let ctx = this.context
        options = options || {}
        Object.assign(ctx, options)
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.closePath();
        options.fillStyle && ctx.fill();
        options.strokeStyle && ctx.stroke();
    }
    drawText({ text, x, y, options }) {
        let ctx = this.context
        options = options || {}
        Object.assign(ctx, options)
        let maxWidth = options.maxWidth || ctx.measureText(text).width
        ctx.beginPath()
        options.fillStyle && ctx.fillText(text, x, y, maxWidth)
        options.strokeStyle && ctx.strokeText(text, x, y, maxWidth)
    }
    drawLine({ start, end, options }) {
        let ctx = this.context
        options = options || {}
        Object.assign(ctx, options)
        ctx.beginPath();
        ctx.lineTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]);
        options.strokeStyle && ctx.stroke();
    }

    /**
     * 多边形
     * [[0,0], [50,0]]
     * options{fillStyle:'#ccc', strokeStyle:'#000', lineWidth:5, lineCap:'round'}
     * config{closePath: true, startPosition: [0, 0]}
     */
    drawPolygon({ points, options, config }) {
        //console.log('11',points, options, config);

        options = options || {}
        config = config || {}
        let ctx = this.context, xPos = 0, yPos = 0
        Object.assign(ctx, options)
        ctx.beginPath()
        if (config && config.startPosition) { xPos = config.startPosition[0], yPos = config.startPosition[1] }
        for (let i = 0, len = points.length; i < len - 1; i++) {
            let start = points[i], end = points[i + 1]
            ctx.lineTo(start[0] + xPos, start[1] + yPos)
            ctx.lineTo(end[0] + xPos, end[1] + yPos)
        }
        (options.fillStyle || config.closePath) && ctx.closePath()
        options.fillStyle && ctx.fill()
        options.strokeStyle && ctx.stroke()
    }
    /**
     * 绘制图片
     * img	          规定要使用的图像、画布或视频。
       sx	sy	        可选。开始剪切的 xy 坐标位置(图片定位)
       swidth sheight	可选。被剪切图像的宽度高度。
       x y	          在画布上放置图像的 xy 坐标位置(画布定位)
       width height	  可选。要使用的图像的宽度高度。（伸展或缩小图像）
     */
    drawImagee({ img, sx, sy, swidth, sheight, x, y, width, height }) {
        this.context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
    }
    /**
     * [
         {name:'translate', props:[x, y]},
         {name:'rotate', props:[5*Math.PI/180]},
         {name:'scale', props:[scalewidth,scaleheight]}
     * ]
     */
    transform(arr) {
        arr.forEach(item => {
            this.context[item.name].apply(this.context, item.props)
        })
    }
}

/* 
    ▇▇▇▇▇▇▇▇▇▇▇▇▇ assignment ▇▇▇▇▇▇▇▇▇▇▇▇▇
    ▯fillStyle: "#000000"    ctx.fill()      填充颜色、模式或渐变。值：字符串、CanvasGradient 对象或 CanvasPattern 对象
    ▯strokeStyle: "#000000"  ctx.stroke()    描边颜色、模式和渐变。值：字符串、CanvasGradient 对象或 CanvasPattern 对象
    ▮lineCap: "butt"                         线条末端形状：butt  round/square (平直/圆形/夌形)
    ▮lineJoin: "miter"                       线条连接形式：miter round/bevel
    ▮miterLimit: 10                          当lineJoin 为miter时，这个属性指定斜连接长度和线条宽度的最大比率
    ▮lineWidth: 1                            线条宽度：1.0 及大于0.0 线条在路径上居中 每边有线条宽的一半
    ▯shadowBlur: 0                           指定羽化阴影的程度。默认值是 0
    ▯shadowColor: "#f00"                     把阴影颜色指定为CSS字符串或Web样式字符串，且可包含alpha部分来表示透明度。默认值是 black
    ▯shadowOffsetX: 0                        指定阴影水平和垂直偏移。较大值使得阴影化对象漂浮在背景较高位置上。 默认值是 0
    ▯shadowOffsetY: 0
    ▮font: "10px sans-serif"
    ▮textBaseline: "alphabetic"              文本基线：alphabetic top/middle/bottom/hanging/ideographic 普通的字母基线/em方框的顶端/em方框的正中/em方框的底端/悬挂基线/表意基线
    ▮textAlign: "start"                      文本对齐：start end/center/left/right
    ▮direction: "ltr"                        绘制方向: ltr(left to right)
    ▮maxWidth: 100                           文本域宽
    ▯globalAlpha: 1                          不透明度 1.0 及0.0-1.0
    ▯globalCompositeOperation: "source-over" 新图像如何覆盖旧图像    
    ▮filter: "none"
    ▮imageSmoothingEnabled: true
    ▮imageSmoothingQuality: "low"
    ▮lineDashOffset: 0
    ▇▇▇▇▇▇▇▇▇▇▇▇▇ config  ▇▇▇▇▇▇▇▇▇▇▇▇▇
    ▯save                      缓存options
    ▯restore                   释放缓存
    clip: true,                 通过save/restore做到撤消的效果
    unclip: false, 
    closePath: false            闭合路径
    showRange: {color:'#000'}   显示范围
    ▇▇▇▇▇▇▇▇▇▇▇ transform ▇▇▇▇▇▇▇▇▇▇▇▇
    位移 ctx.transform(a,b,c,d,[e],[f])
    旋转 ctx.transform([a],[b],[c],[d],e,f)
    缩放 ctx.transform([a],b,c,[d],e,f)
    斜切 ctx.transform(a,[b],[c],d,e,f)
    rotate: 45
    translate: [10, 10]
    scale: [2, 1.5]
    skew: [1, 1] [1=45度,直角锐角邻边与对边之比]
    origin: 5    [1/2/3/4/5/6/7/8/9]
    */