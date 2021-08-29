const fs = require('fs')
const path= require("path")

// 递归创建目录 同步方法
function checkDirSync(dirname) {
    if (fs.existsSync(dirname)) {
        console.log('目录已存在：' + dirname)
      return true
    } else {
      if (checkDirSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        console.log('已创新目录: ' + dirname)
        return true;
      }
    }
}

module.exports = {
    readFile: (path) => {
        return fs.readFileSync(path, 'utf8')
    },
    writeFileSync: (path, content) => {
        try {
            fs.writeFileSync(path, content)
        } catch (err) {
            console.log(err)
        }        
    },
    writeFile: (path, content) => {      
        fs.writeFile(path, content, { encoding: 'utf8' }, err => { 
            if(err){ 
                console.log(err) 
            } else {
                console.log('written: ' + path)
            } 
        })
    },
    editWritCommonFile: (path, editHandler) => {
        const fileObj = require(path)
        const next = editHandler(fileObj)
        next && module.exports.writeFile(path, `module.exports = ${JSON.stringify(fileObj, null, 4)}`)
    },
    mkdirSync: checkDirSync,
    saveFile(filePath, fileData) {
        return new Promise((resolve, reject) => {
            /*fs.createWriteStream(path,[options])
            options <String> | <Object>
            {
                flags: 'w',
                defaultEncoding: 'utf8',
                fd: null,
                mode: 0o666,
                autoClose: true
            }
            */
            const wstream = fs.createWriteStream(filePath)
            wstream.on('open', () => {
                const blockSize = 128
                const nbBlocks = Math.ceil(fileData.length / (blockSize))
                for (let i = 0; i < nbBlocks; i += 1) {
                    const currentBlock = fileData.slice(blockSize * i, Math.min(blockSize * (i + 1), fileData.length),)
                    wstream.write(currentBlock)
                }
                wstream.end()
            })
            wstream.on('error', (err) => { reject(err) })
            wstream.on('finish', () => { resolve(true) })
        })
    }
}



