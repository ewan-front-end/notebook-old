/**
 * == 结构属性 ===========================================================================
 * CHILDREN       目录节点子类 
 * SRC            文件节点 资源引用 
 * 
 * == 内容属性 ===========================================================================
 * links          相关链接 1.'tools/qiankun' 2.{name:'乾坤', href:'tools/qiankun'} 3.'http...'   绝对路径:/tools/ 相对路径：./tools/ 或 tools/
 * contentFile    内容文件 统一扁平存放于file-lib 编译命名：platform-windows-bat.md 
 * --------------------------------------------------------------------------------------被链接
 * linkName: '乾坤微服务'    外链时 links item为纯href时 name可作为标题显示
 * --------------------------------------------------------------------------------------被卡片引用+
 * title          标题
 * desc           简要说明
 * detail         详情
 * --------------------------------------------------------------------------------------Create.js处理生成：name/path
 * name:''        Create会处理成 name: key
 * outPath:''     覆盖Create生成的path
 * --------------------------------------------------------------------------------------摘要生成
 * usage:{} || [] 
 *     title:'windows'       可选 子类标题 
 *     href:'/tools/vscode'  链接地址
 *     id:'自定义用户片段'    锚链接ID
 *     desc:'' || {} || []   必选  字符时为[文本描述] 对象时为[标题：描术]结构  数组时为分类嵌套[文本描述]或[标题：描术] 步骤描述或分点描述
 *         '简单内容'
 *         {title:'', text:'', links:[['title','path']]}          此描述的必要说明点
 *     links:[['title','path']]    
 * --------------------------------------------------------------------------------------场景生成
 * scene:{} || []  
 *     title:'简化特定通用代码', 
 *     href:'/tools/vscode'  链接地址 
 *     id:'自定义用户片段'    锚链接ID     
 */
 
module.exports = {
    tools: {title:'工具',links:[{name:'文档', href:'/docs/'}], CHILDREN: {            
        git: {linkName: 'Git', SRC:'git'},
        npm: {linkName: 'NPM', SRC:'npm', scene:[{title:'NPM内网源搭建', href:'/tools/npm', id:'NPM内网源搭建'},{title:'NPM版本管理',href:'/node',id:'版本管理'}], usage:[{title:'rvm',href:'/node',id:'版本管理',desc:'源于node版本改变的匹配'}]},
        markdown: {linkName: 'Markdown', SRC:'markdown'},
        webpack: {linkName: 'Webpack'},
        qiankun: {linkName: '乾坤微服务', SRC:'qiankun'},
        charts: {linkName: '需求图表', SRC:'0002'},
        vscode:{linkName:'VSCode', scene:[{title:'简化特定通用代码', href:'/tools/vscode', id:'自定义用户片段'}], SRC:'vscode'},
        chromeTools:{SRC:'chrome-tools'},
        plantuml:{SRC:'plantuml'},
        regularExpression:{linkName:'正则表达式', SRC:'regular-expression'},
        eslint: {linkName: 'ESLint', SRC:'eslint'}
    }}
}
