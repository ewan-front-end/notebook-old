const {reWriteFile} = require('../common.js')
const PATH = './.RES_MAP_PATH.json'
const RES_MAP_PATH = require(PATH) || {}
module.exports = {
    RES_MAP_PATH,
    setResMapPath: obj => {         
        reWriteFile(PATH, obj) 
    }
}