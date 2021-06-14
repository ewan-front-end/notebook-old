const {readFile, writeFile} = require('./src/tools-fs')
const Path = require('path')
const chokidar = require('chokidar')
const log = console.log

chokidar.watch('./docs/.usage/resources/md')
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {
        const _path = Path.resolve(process.cwd(), path)
        const now = new Date().toJSON().slice(0, 10).replace(/-/g, '.')
        let _file = readFile(_path)        
        _file = _file.replace(/:::\d{4}\.\d{2}\.\d{2}:::/, `:::${now}:::`)
        writeFile(_path, _file)
    })    
  