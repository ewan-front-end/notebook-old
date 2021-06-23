const {readFile, writeFile} = require('./src/tools-fs')
const Path = require('path')
const exec = require('child_process').exec
const chokidar = require('chokidar')
const {config} = require('./config')
const log = console.log

chokidar.watch('./docs/.usage/resources/md')
    .on('error', error => log(`监听错误: ${error}`)) 
    .on('change', path => {
        const resPath = path.split(/resources[\\\/]md[\\\/]/)[1].replace('.md', '').replace(/\\/g, '/')
        const resMapPathFile = require('./.RES_MAP_PATH.json') 
        let debugText = `${resPath}.md文件被编辑`      

        const _path = Path.resolve(process.cwd(), path)
        const now = new Date().toJSON().slice(0, 10).replace(/-/g, '.')
        let _file = readFile(_path)    
        const dateMark = _file.match(/:::\d{4}\.\d{2}\.\d{2}:::/)       
        _file = dateMark ? _file.replace(dateMark[0], `:::${now}:::`) : `:::${now}:::\n\n` + _file        
        writeFile(_path, _file)

        if (resPath === 'scene') {
            debugText += ` 重新聚合场景数据.`
            exec('node docs/.usage/updateScene.js ', function(error, stdout, stderr) {});
        } else if (resMapPathFile) {
            debugText += ` [资源-数据]表`
            const target = resMapPathFile[resPath]
            if (target) {
                debugText += `"${resPath}"键对应的数据路径为"${target}".\n`
                debugText += `... node docs/.usage/create.js ${target}`
                exec('node docs/.usage/create.js ' + target, function(error, stdout, stderr) {});
            } else {
                debugText += `"${resPath}"键不存在. 请重新生成映射表：node docs/.usage/create.js 再重启监控：node docs/.usage/createWatch.js`
                if (config.debug) {
                    console.log(resMapPathFile);
                } else {
                    console.log('当前编辑资源未与siteMap数据关联');
                }
            }
        } else {
            debugText += ` 资源映射表.RES_MAP_PATH.json 不存在, 请重新生成映射表：node docs/.usage/create.js 再重启监控：node docs/.usage/createWatch.js`
            if (!config.debug) console.log(debugText)
        }
        config.debug && setTimeout(() => {
            console.log(debugText);
        }, 4000)
    })   
    
    
    


    