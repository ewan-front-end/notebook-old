const Path = require('path')
const {writeFile} = require('../src/tools-fs')
module.exports = {
    reWriteFile: (path, obj) => {
        writeFile(Path.resolve(__dirname, path), JSON.stringify(obj, null, 4))
    }
}