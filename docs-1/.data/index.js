module.exports = {title: 'Home', src: 'index', path: '', children: {      
    css:{title:'CSS', src:'css', desc:'层叠样式表(Cascading Style Sheets)', children:{
        preset:{title:'预处理', src:'css-preset'},
        variable:{title:'CSS变量', src:'css-variable'}
    }},   
    system:{title:'系统&平台&工具', src:'system', children:{
        mac:{title:'MacBook',linkName:'MacBook', src:'system-mac'},
        linux:{title:'Linux',linkName:'Linux', src:'system-linux'},
        windows:{title:'Windows',linkName:'Windows', src:'system-windows'},
        ios:{title:'IOS',linkName:'IOS', src:'ios'},
        android:{title:'Android',linkName:'Android', src:'android'},
        google:{title:'Google',linkName:'Google', src:'google'}
    }} 
}}