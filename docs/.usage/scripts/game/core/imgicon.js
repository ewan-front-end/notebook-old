import Element from './element.js'

/**
 * 图像
 * @extends Element
 * @constructor
 * @param <Number> img     图像、画布或视频
 * @param [Number] sx      开始剪切的x坐标位置
 * @param [Number] sy      开始剪切的y坐标位置
 * @param [Number] swidth  被剪切图像的宽度
 * @param [Number] sheight 被剪切图像的高度
 * @param <Number> x       在画布上放置图像的x坐标位置
 * @param <Number> y       在画布上放置图像的 x 坐标位置
 * @param [Number] width   要使用的图像的宽度(伸展或缩小图像)
 * @param [Number] height  要使用的图像的高度(伸展或缩小图像)
 */
 export default class Imgicon extends Element {
    constructor(img, sx, sy, swidth, sheight, x, y, width, height) {
        super('Imagee', 3)
        delete this.children
        delete this.addChild
        this.data = { img, sx, sy, swidth, sheight, x, y, width, height }
    }
}