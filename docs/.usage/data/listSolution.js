const {reWriteFile} = require('./common')
const PATH = './.LIST_SOLUTION.json'
const LIST_SOLUTION = require(PATH)
module.exports = {
    LIST_SOLUTION,
    LIST_SOLUTION_SET: obj => { reWriteFile(PATH, obj) }
}