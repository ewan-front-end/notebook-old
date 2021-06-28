const path = require('path')
const PATH_SCENE = '../.LIST_SCENE.json'
const LIST_SCENE = require(PATH_SCENE)
module.exports = {
    LIST_SCENE,
    LIST_SCENE_SET: json => {
        writeFile(path.resolve(__dirname, PATH_SCENE), JSON.stringify(json, null, 4))
    }
}