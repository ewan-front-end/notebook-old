import Stage from './canvas.js'
import {Scene, Sprite, SpriteSheet, Rect} from './element.js'
import Timer from './timer.js'

export default class Game {
    // 配置
    #CONFIG = {
        showGrid: false,
        showRuler: false,
        FPS: 33.3333,
        debug: true
    }
    // 引擎
    #ENGINES = {
        stage: null,
        timer: null
    }

    #SCENES_MAP = {}
    #CURRENT_SCENE = 'SCENE0'

    #ACTOR_MANAGER = {}
    #CREATE_MAP = {
        Sprite: (x, y, width, height, options, transform, config) => new Sprite(x, y, width, height, options, transform, config),
        SpriteSheet: (x, y, width, height, image, transform, config) => new SpriteSheet(x, y, width, height, image, transform, config),
        Rect: (x, y, width, height, options, config) => new Rect(x, y, width, height, options, config),
        Circle: (x, y, r, options, config) => new Circle(x, y, r, options, config),
        Polygon: (points, options, config) => new Polygon(points, options, config),
        Imagee: (img, sx, sy, swidth, sheight, x, y, width, height) => new Imagee(img, sx, sy, swidth, sheight, x, y, width, height)
    }
    /**
     * FPS:1, 
     * sceneTransition:{type: 'fade'} 场景转换
     * showGrid: true,
     * showRuler: true,
     * debug
     */
    constructor({ showGrid, showRuler, FPS, debug }) {
        showGrid && (this.#CONFIG.showGrid = true)
        showRuler && (this.#CONFIG.showRuler = true)
        debug && (this.#CONFIG.debug = true)
        FPS && (this.#CONFIG.FPS = FPS)

        // 舞台&设施
        let canvas = document.getElementById("myCanvas")
        let stage = new Stage()
        stage.setCanvas(canvas)
        stage.setStageSize(1000, 400)
        stage && (this.#ENGINES.stage = stage)

        // 场景管理
        this.scene = new Scene('SCENE0')
        this.scenes = [this.scene]
        this.#SCENES_MAP['SCENE0'] = this.scene
        // 帧率引擎
        this.#ENGINES.timer = new Timer({ FPS: this.#CONFIG.FPS })
    }
    setStage(stage) { this.#ENGINES.stage = stage }
    // 场景
    addScene(scene) { this.scenes.push(scene); this.#SCENES_MAP[scene.name] = scene }
    setSceneTransition() {
        this.scenes.forEach(e => {
            e.setTransition('fade', { fillStyle: '#0f0' })
        })
    }
    changeSceneTo(name) {
        let currentScene = this.#SCENES_MAP[this.#CURRENT_SCENE], nextScene = this.#SCENES_MAP[name]
        if (!nextScene) return
        currentScene.out(() => {
            nextScene.in()
            this.#CURRENT_SCENE = name

        })
    }
    addActor(actor) { this.scene.addChild(actor) }
    create(name, options, parent) {
        let actor = this.#CREATE_MAP[options.type].apply(null, options.data)
        this.#ACTOR_MANAGER[name] = actor
        parent ? this.#ACTOR_MANAGER[parent].addChild(actor) : this.scene.addChild(actor)
    }
    transform(name, transform) {
        for (let key in transform) {
            this.#ACTOR_MANAGER[name][key](transform[key])
        }
    }
    getActor(name) {
        console.log(this.#ACTOR_MANAGER[name]);

        return this.#ACTOR_MANAGER[name]
    }
    start() {
        let { debug } = this.#CONFIG
        let { timer } = this.#ENGINES
        debug ? timer.testStart(this, { duration: 10000 }) : timer.start(this)
    }

    draw() {
        let scene = this.#SCENES_MAP[this.#CURRENT_SCENE]
        let { showGrid, showRuler } = this.#CONFIG
        let { stage } = this.#ENGINES
        // 1.清除画布
        stage.clean()
        // 2.公共设施
        showGrid && stage.showGrid()
        showRuler && stage.showRuler()
        scene.children.forEach(e => {
            e.type === 'Sprite' && e.update()
            stage.draw(e)
        })

        //transition.active && stage.draw(transition.data)
    }

}