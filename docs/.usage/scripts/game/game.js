import { Scene } from "./core/element"

export default class Game {
    #SCENES
    constructor() {
        this.#SCENES = new Scene('SCENE_1')
    }
}