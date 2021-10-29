export default {
    canvasContextOptions: {
        globalAlpha: 1,
        fillStyle: '#333',
        strokeStyle: '#333',
        lineWidth: 1,
        lineCap: 'butt',      // 线条末端样式:butt(平直)、round(圆形)、square(夌形)，默认butt
        lineJoin: 'miter',    // 两条线条如何连接:round、bevel、miter，默认miter
        miterLimit: 1,        // 当lineJoin:'miter'时，斜连接长度和线条宽度的最大比率
        shadowBlur: 0,        // 羽化阴影的程度。默认0
        shadowColor: 'black', // 可指定为CSS字符串或Web样式字符串，且可包含alpha部分来表示透明度。默认black
        shadowOffsetX: 0,
        shadowOffsetY: 0, 
        globalCompositeOperation: 'source-over'
    },
    ElementOptions: {
        parent: null,  // 由父容器创建时有值，通常是由addChild/appendTo方法产生此值，用于数据链、单一容器
        type: '',      // 元素类型识别 RECT CIRCLE
        level: 0,      // 层级包含关系
        classType: '', // 被父容器审查的添加依据
        options: null, 
        
        event: null,     // 事件

        canvas: null,
        

        x: 0,
        y: 0,
        width: 0,
        height: 0,
        origin: [0, 0]
    },
    Painter: {
        data: null,       // 绘制 方法参数
        context: null,    // 绘制 上下文环境
        config: null,     // 绘制 策略 
        transform: null,  // 绘制 变形
    },
    GameOptions: {
        canvas: null,  // 必选 类型String/Element
        width: 0,      // 必选  
        height: 0      // 必选 
    },
    StageOptions: {
        canvas: null, 
        width: 0, 
        height: 0,
        showGrid: false,
        showRuler: false,
        allowEvent: false
    },
    SceneOptions: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        defaultSceneConfig: null
    },
    background: {
        color: '#eee',
        image: {
            src: '',
            position: [0, 0],
            size: ['100%', '100%'],
            repeat: 'no-repeat',
            origin: [0, 0],
        },
        clip: null,
        attachment: null
    },
    bound: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        target: null
    },
    event: {
        type: 'click', 
        state: 0,               // 事件状态0初始1触发2完成 
        target: null,           // 元素 
        bound: null,            // 元素包围盒
        CLICK_FN: [],
        MOUSEMOVE_FN: [],
        MOUSEDOWN_FN: []
    },
    QuadTreeOptions: {
        maxChildrenNum: 5,         // 子类数量阈值
        maxLevels: 5,              // 最大细分层级
        startBound : {x: 0, y: 0, width: 0, height: 0, target: null}
    },
    match(target, options) {
        target = this[target]
        if (Object.prototype.toString.call(target) === '[object Object]') {
            const obj = {}
            for(let i in target) {obj[i] = options[i] || target[i]}
            return obj
        }
        if (Object.prototype.toString.call(target) === '[object Array]') {
            const arr = target.slice()
            arr.forEach((e,i) => {
                if (options.length > i) arr[i] = options[i]
            })
            return arr
        }
    },
    check(target, options, errMsg) {
        target = this[target]
        for(let i in target) {
            if (!options[i]) throw(errMsg + i)
        }
    },
    min(target, options) {
        if (!options) return options
        target = this[target]
        let obj = {}
        for(let key in target) {
            if (options[key]) obj[key] = options[key]
        }
        return obj
    }
}
