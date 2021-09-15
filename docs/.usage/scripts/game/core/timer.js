export default class Timer{
    constructor({FPS}){
      this.FPS = FPS || 33.3333
      this.stop = true
    }
    testStart(game, {FPS, duration}){
      this.stop = false
      duration && setTimeout(()=>{this.stop = true}, duration)
      let count = 0
      let timer = () => {
        if(this.stop) return
        game.draw()
        window.setTimeout(timer, FPS || this.FPS)
        //console.log(count);
        count++
      }
      timer()
    }
    start(game){
      this.stop = false
      let count = 0
      let timer = () => {
        if(this.stop) return
        game.draw()
        window.setTimeout(timer, this.FPS)
        count++
      }
      timer()
    }
    stops(){
      this.stop = true
    }
} 