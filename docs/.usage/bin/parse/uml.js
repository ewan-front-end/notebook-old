
module.exports = code => {
    // PlantUML图形
    let matchUML        
    while ((matchUML = /```plantuml[\w\W]+?```/.exec(code)) !== null) {     
        const {name} = handleUML(matchUML[0])
        code = code.replace(matchUML[0], `<img :src="$withBase('/uml/${name}.png')">`)         
    }
    return code
}