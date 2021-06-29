const {reWriteFile} = require('./common')
const PATH = './.SITE_MAP.js'
const SITE_MAP = require(PATH)
module.exports = {
    SITE_MAP,
    SITE_MAP_SET: obj => { reWriteFile(PATH, obj) }
}