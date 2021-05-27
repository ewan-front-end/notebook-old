const fs = require('fs')
const path= require("path")

// 递归创建目录 同步方法
function checkDirSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (checkDirSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        console.log('created ' + dirname)
        return true;
      }
    }
}

module.exports = {
    writeFile: (path, content, callback) => {
        fs.writeFile(path, content, { encoding: 'utf8' }, err => { console.log('written: ' + path) })
    },
    editWritCommonFile: (path, editHandler) => {
        const fileObj = require(path)
        const next = editHandler(fileObj)
        next && module.exports.writeFile(path, `module.exports = ${JSON.stringify(fileObj, null, 4)}`)
    },
    mkdirSync: checkDirSync
}



