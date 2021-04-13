const fs = require('fs')
const path = require('path')
const rootDocs = path.resolve(__dirname, '../')

const rootHomePage = {key:'ROOT_HOME', id: 'home', path: '.', title: '首页标题'}
const siteMap = {
    tools: {
        children: {
            doc: {children: {}},
            markdown: {children: {}},
            webpack: {children: {}},
            bat: {fileName: 'bat.md'},
            git_npm: {fileName: 'git-npm.md', name: 'Git&NPM', title: 'Git&NPM最佳实践'}
        }
    },
    platform: {
        children: {
            node: {children: {}}
        }
    }
}
let errorCount = 0
const flatDataMap = {}



function createFile(item) {
    if (item.fileName) {
        item.path = item.parent.path + '/' + item.fileName
        flatDataMap[item.id] = {
            type: 'FILE', 
            path: path.resolve(rootDocs, item.path),
            target: item
        }
    } else {
        console.warn(item.parent.path + '/' + item.key, '如果作为目录，缺失children; 如果作为文件，缺失fileName')
        errorCount++
    }
}

function createDir(item, children) {
    // 创建目录 
    const filePath = path.resolve(rootDocs, item.path)
    if (!fs.existsSync(filePath)) {
        flatDataMap[item.id] = {
            type: 'DIR', 
            path: filePath,
            target: item
        }
        // 新建README.md首页文件
        flatDataMap[item.id + '_index'] = {
            type: 'FILE', 
            path: filePath + '/README.md',
            target: item
        }
    }
    for (key in children) {
        handleItem(key, children[key], item)
    }
}

function handleItem(key, item, parent){
    item.parent = parent
    item.key = key
    item.name = item.name || key
    item.id = parent.id + '_' + key
    if (item.children) {
        item.path = parent.path + '/' + key
        createDir(item, item.children)
    } else {
        createFile(item)
    }
}
for (key in siteMap) {
    handleItem(key, siteMap[key], rootHomePage)
}

if (errorCount === 0) {

    for (id in flatDataMap) {
        let item = flatDataMap[id]
        item.type === 'DIR' && fs.mkdirSync(item.path)
        if (item.type === 'FILE') {
            let target = item.target
            var content = ``
            // 添加标题
            target.title && (content += `# ${target.title}\n`)
            // 添加上一级按钮
            content += `[上一级](../)\n\n`
            // 子类链接
            content += `子链接：`
            for (key in target.children){
                let child = target.children[key]
                content += `[${child.name}](./${child.fileName || child.key}) `
            }
            
            fs.writeFile(item.path, content, { encoding: 'utf8' }, err => {})
        }
    }
    

}else {
    console.warn(errorCount + ' 条数据异常, 请修复 siteMap 再构建！')
}

