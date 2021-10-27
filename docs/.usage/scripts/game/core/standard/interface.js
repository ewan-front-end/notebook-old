export default {
    ElementOptions: {
        parent: null,  // 由父容器创建时有值，通常是由addChild/appendTo方法产生此值，用于数据链、单一容器
        type: '',      // 元素类型识别 RECT CIRCLE
        level: 0,      // 层级包含关系
        classType: '', // 被父容器审查的添加依据
        options: null, 
        
        event: null,     // 事件

        data: null,       // 绘制 方法参数
        context: null, // 绘制 上下文环境
        config: null,     // 绘制 策略 
        transform: null,  // 绘制 变形

        x: 0,
        y: 0,
        width: 0,
        height: 0,
        origin: [0, 0]
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
    }
}
