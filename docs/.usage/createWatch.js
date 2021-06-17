const {readFile, writeFile} = require('./src/tools-fs')
const Path = require('path')
const exec = require('child_process').exec


const chokidar = require('chokidar')
const log = console.log

chokidar.watch('./docs/.usage/resources/md')
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {
        console.log(path);
        const _path = Path.resolve(process.cwd(), path)
        const now = new Date().toJSON().slice(0, 10).replace(/-/g, '.')
        let _file = readFile(_path)    
        const dateMark = _file.match(/:::\d{4}\.\d{2}\.\d{2}:::/)  
       
        _file = dateMark ? _file.replace(dateMark[0], `:::${now}:::`) : `:::${now}:::` + _file
        
        writeFile(_path, _file)

        
    })    
  