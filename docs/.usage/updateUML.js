const fs = require('fs')
const {saveFile} = require('./src/tools-fs')
const plantuml = require('node-plantuml')
const DATA_UML = require('./data/.PLANTUML')

for (let key in DATA_UML) {//{charset:'UTF-8'}
    plantuml.generate(DATA_UML[key]).out.pipe(fs.createWriteStream('./docs/.vuepress/public/uml/' + key + '.png', {defaultEncoding: 'utf8'}))
}
    
    
       


