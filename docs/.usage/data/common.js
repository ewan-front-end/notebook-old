const Path = require('path')
const {writeFile} = require('../src/tools-fs')
module.exports = {
    reWriteFile: (path, obj, isModul) => {

        isModul ? 
        writeFile(Path.resolve(__dirname, path), `module.exports = ${JSON.stringify(obj, null, 4)}`) :
        writeFile(Path.resolve(__dirname, path), JSON.stringify(obj, null, 4))
    }
}