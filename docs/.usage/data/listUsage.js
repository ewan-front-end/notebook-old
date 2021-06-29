const {reWriteFile} = require('./common')
const PATH = './.LIST_USAGE.json'
const LIST_USAGE = require(PATH)
module.exports = {
    LIST_USAGE,
    LIST_USAGE_SET: obj => { reWriteFile(PATH, obj) }
}