const fs = require('fs')

module.exports = {
    writeFile: (path, content, callback) => {
        fs.writeFile(path, content, { encoding: 'utf8' }, err => { console.log('written: ' + path) })
    },
    editWritCommonFile: (path, editHandler) => {
        const fileObj = require(path)
        const next = editHandler(fileObj)
        next && module.exports.writeFile(path, `module.exports = ${JSON.stringify(fileObj, null, 4)}`)
    }
}