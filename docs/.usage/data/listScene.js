const {reWriteFile} = require('../common.js')
const PATH = './.LIST_SCENE.json'
const LIST_SCENE = require(PATH)
module.exports = {
    LIST_SCENE,
    LIST_SCENE_SET: obj => { reWriteFile(PATH, obj) }
}