const {readFile, writeFile} = require('./src/tools-fs')
const Path = require('path')
const exec = require('child_process').exec

const chokidar = require('chokidar')
const log = console.log

chokidar.watch('./docs/.usage/resources/md')
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {
        const resPath = path.split(/resources[\\\/]md[\\\/]/)[1].replace('.md', '')
        const resMapPathFile = require('./.RES_MAP_PATH.json')

        // const _path = Path.resolve(process.cwd(), path)
        // const now = new Date().toJSON().slice(0, 10).replace(/-/g, '.')
        // let _file = readFile(_path)    
        // const dateMark = _file.match(/:::\d{4}\.\d{2}\.\d{2}:::/)       
        // _file = dateMark ? _file.replace(dateMark[0], `:::${now}:::`) : `:::${now}:::` + _file        
        // writeFile(_path, _file)
        if (resPath === 'scene') {
            exec('node docs/.usage/updateScene.js ', function(error, stdout, stderr) {});
        } else if (resMapPathFile) {
            const target = resMapPathFile[resPath]
            if (target) {
                exec('node docs/.usage/create.js ' + target, function(error, stdout, stderr) {});
            } else {
                console.log('当前编辑资源未与siteMap数据关联');
            }
        } else {
            console.log('资源映射数据文件 .RES_MAP_PATH.json 不存在, 请先生成数据：node docs/.usage/create.js');
        }
        
        
        
        
    })    
  


    