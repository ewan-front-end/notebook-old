const fs = require('fs')

module.exports = {
    writeFile: (path, content, callback) => {
        fs.writeFile(path, content, { encoding: 'utf8' }, err => { console.log('written: ' + path) })
    },
    editWritCommonFile: (path, editHandler) => {
        const fileObj = require(path)
        const next = editHandler(fileObj)
        console.log(this)
        next && this.writeFile(path, `module.exports = ${JSON.stringify(fileObj, null, 4)}`)
    }
}