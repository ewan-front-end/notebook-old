const Path = require('path')
const {writeFile, writeFileSync} = require('../src/tools-fs')
module.exports = {
    reWriteFile: (path, obj, isModul) => {

        isModul ? 
        writeFile(Path.resolve(__dirname, path), `module.exports = ${JSON.stringify(obj, null, 4)}`) :
        writeFileSync(Path.resolve(__dirname, path), JSON.stringify(obj))
    }
}