import {tweens} from '../utils/tweens/Tweens.js'

export default class SnapWindows{    
    constructor(options) {
        const defaultOptions = {
            container: 'body',
            containerWidth: window.innerWidth,
            containerHeight: window.innerHeight,
            maxExpandSize: 0,
            snapTo : 'right',
            layoutType: 'float',
            switchState: false, // 开关状态
            btnRoughness: 20,   // 按钮粗度
            btnLength: 100,     // 按钮长度
        }
        Object.assign(defaultOptions, options)
        
        let {container, containerWidth, containerHeight, maxExpandSize, snapTo, layoutType, switchState} = defaultOptions
        const $container = document.querySelector(container), 
            $wrapper = document.createElement('div'), 
            $hiddContainer = document.createElement('div'),
            $contentContainer = document.createElement('div'),
            $switchBox = document.createElement('div'),
            $switchBtn = document.createElement('button')                
        $wrapper.className = `snap-windows-wrapper snap-${defaultOptions.snapTo} layout-${layoutType}`
        $hiddContainer.className = 'hidd-container'
        $contentContainer.className = 'content-container'
        $switchBox.className = 'snap-windows-switch' 
        $switchBox.appendChild($switchBtn) 
        $hiddContainer.appendChild($contentContainer)
        $wrapper.appendChild($hiddContainer)
        $wrapper.appendChild($switchBox)          
        $container.appendChild($wrapper)
        
        let winWidth = container === 'body' ? document.querySelector('html').clientWidth : $container.clientWidth, // 视窗尺寸 
            winHeight = container === 'body' ? document.querySelector('html').clientHeight : $container.clientHeight
            

        if (snapTo === 'right' || snapTo === 'left') {
            $wrapper.style.height = winHeight + 'PX'    
            maxExpandSize === 0 && (maxExpandSize = winWidth/2)        
            this.expandSize = Math.min(maxExpandSize, winWidth/2) // 展开尺寸
            switchState && ($wrapper.style.width = this.expandSize + 'PX') 
        }
        if (snapTo === 'top' || snapTo === 'bottom') {
            $wrapper.style.width = winWidth + 'PX'          
            maxExpandSize === 0 && (maxExpandSize = winHeight/2)  
            this.expandSize = Math.min(maxExpandSize, winHeight/2) // 展开尺寸
            switchState && ($wrapper.style.height = this.expandSize + 'PX')
        }
                
        $switchBtn.addEventListener('click', e => {
            this.switchState ? this.close() : this.open() 
        })
        
        this.$contentContainer = $contentContainer
        this.$wrapper = $wrapper
        this.switchState = switchState
        this.maxExpandSize = maxExpandSize
        this.snapTo = snapTo
    }
    open(size){
        if (this.switchState) return
        let target = this.expandSize
        if (size) target = this.expandSize = size
        this.changeWindow(0, target)
        this.switchState = true
    }
    close(){ 
        if (!this.switchState) return
        this.changeWindow(this.expandSize, 0)
        this.switchState = false
    }
    changeWindow(start, end) {
        console.log(start, end)
        let handleSize = val => {this.$wrapper.style.width = val + 'PX'}
        if (this.snapTo === 'top' || this.snapTo === 'bottom')  handleSize = val => {this.$wrapper.style.height = val + 'PX'}
        tweens.run(start, end - start, 500, handleSize, 'easeIn') 
    }
    setExpandSize(size){
        let newSize = Math.min(size, this.maxExpandSize)
        console.log('-----',size, this.maxExpandSize)
        if (this.expandSize !== newSize) {
            this.switchState && this.changeWindow(this.expandSize, newSize)
            this.expandSize = newSize
        }
    }
    setContent(content, isOpen) {
        this.$contentContainer.innerHTML = content
        if (this.snapTo === 'left' || this.snapTo === 'right') this.setExpandSize(this.$contentContainer.scrollWidth + 10)
        if (this.snapTo === 'top' || this.snapTo === 'bottom') this.setExpandSize(this.$contentContainer.scrollHeight + 10)
        isOpen && this.open()
    }
    setHTML(html, isOpen) {this.setContent(html, isOpen)}
    setCode(code, isOpen) {this.setContent(`<pre>${code}</pre>`, isOpen)}
}