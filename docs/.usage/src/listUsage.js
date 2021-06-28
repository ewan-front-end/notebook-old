const path = require('path')
const PATH_USAGE = '../.LIST_USAGE.json'
const LIST_USAGE = require(PATH_USAGE)
module.exports = {
    LIST_USAGE,
    LIST_USAGE_SET: json => {
        writeFile(path.resolve(__dirname, PATH_USAGE), JSON.stringify(json, null, 4))
    }
}