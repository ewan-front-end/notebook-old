const fs = require('fs')
const path = require('path')

// console.log(fs.existsSync('.'));

// const {mkdirSync} = require('./docs/.usage/src/tools-fs')

// mkdirSync('./test4/001/002/');

const str = fs.readFileSync(path.resolve(__dirname, './docs/.usage/resources/md/docs-vuepress.md'), 'utf8')
console.log(str.match(/(?:^|\n)#{1,6}\s.+/g)) // (?:^|\n)#{1,6}\s.+