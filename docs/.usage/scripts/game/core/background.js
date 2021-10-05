import Imgicon from "./imgicon.js"
import Rect from './rect.js'

export default class Background {
    constructor({color, image, position = [0, 100], size = ['100%', '100%'], repeat = 'no-repeat', origin = [0, 0], clip, attachment}, container) {
        const {x, y, width, height} = container
        if (color) container.addChild(new Rect(0, 0, 800, 500, {}, {fillStyle: color}))        
        if (image) container.addChild(new Imgicon(image, 0, 0, width, height, x, y, width, height))
        
    }
}