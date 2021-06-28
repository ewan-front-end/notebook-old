const path = require('path')
const PATH_SOLUTION = '../.LIST_SOLUTION.json'
const LIST_SOLUTION = require(PATH_SOLUTION)
module.exports = {
    LIST_SOLUTION,
    LIST_SOLUTION_SET: json => {
        writeFile(path.resolve(__dirname, PATH_SOLUTION), JSON.stringify(json, null, 4))
    }
}