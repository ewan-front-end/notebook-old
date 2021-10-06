
/**
 * 计时器
 * @constructor(options)
 * @param [Number] FPS 计时帧率
 * @param [Number] duration 计时时长
 * @param [Boolean] forward 正向计时
 * @param [Function] frameHandler 帧处理函数
 * @param [Boolean] autoStart 创世开始计时
 * @method setForward 设置计时方向
 */
export default class Timer{
    constructor(options = {}){
        const {
            FPS = 33.3333, 
            duration = 0,          
            forward = true, 
            frameHandler = function(){},
            autoStart = false 
        } = options

        Object.assign(this, {FPS, duration, forward, frameHandler, autoStart})        
        this.genesis = new Date().getTime() // 创世纪时间
        this.state = 0 // 计时状态(0初始1开始2暂停)
    }
    setForward(bool) {this.forward = bool}
    start(){
      this.state = 1
      const {FPS} = this
      const timer = () => {
        if(this.stop) return
        this.frameHandler()
        window.setTimeout(timer, FPS)
      }
      timer()
    }
    pause() {
        this.state = 2
    }
    stop(){
        this.state = 0
    }
}