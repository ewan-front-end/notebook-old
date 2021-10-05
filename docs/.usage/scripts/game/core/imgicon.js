import Shape from './element/shape.js'
import {asyncImage} from "./resouce.js"

/**
 * 图像元素
 * @extends Shape
 * @constructor
 * @param <Image> img 图像、画布或视频
 * @param [Number] sx 开始剪切的x坐标位置
 * @param [Number] sy 开始剪切的y坐标位置
 * @param [Number] swidth 被剪切图像的宽度
 * @param [Number] sheight 被剪切图像的高度
 * @param <Number> x 在画布上放置图像的x坐标位置
 * @param <Number> y 在画布上放置图像的y坐标位置
 * @param [Number] width 要使用的图像的宽度(可缩放)
 * @param [Number] height 要使用的图像的高度(可缩放)
 */
 export default class Imgicon extends Shape {
    constructor(img, x = 0, y = 0, width, height, sx=0, sy=0, swidth, sheight, options) {
        const data = {img, sx, sy, swidth, sheight, x, y, width, height}
        const assignment = {}
        super('Image', data, assignment)
        
        // 基础属性
        const initData = image => {
            !width && (this.width = this.data.width = image.width)
            !height && (this.height = this.data.height = image.height)
            !swidth && (this.swidth = this.data.swidth = image.width)
            !sheight && (this.sheight = this.data.sheight = image.height)
            this.img = this.data.img = image 
        }
        
        if (typeof img === 'string') {
            asyncImage(img).then(image => {
                initData(image)
            })
        } else {
            initData(img)
        }

        
    }
}