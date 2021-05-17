const _fs=require('fs')

const fs = {
    creatDir: function(){
        // let paths = _fs.readdirSync(src); //同步读取当前目录
        // paths.forEach(function(path){
        //     console.log(path)
        //     var _src=src+'/'+path;
        //     var _src2=src2+'/'+path;
        //     _fs.stat(_src,function(err,stats){  //stats  该对象 包含文件属性
        //         if(err)throw err;
        //         if(stats.isFile()){ //如果是个文件则拷贝 
        //             let  readable=_fs.createReadStream(_src);//创建读取流
        //             let  writable=_fs.createWriteStream(_src2);//创建写入流
        //             readable.pipe(writable);
        //         }else if(stats.isDirectory()){ //是目录则 递归 
        //             checkDirectory(_src,_src2,copy);
        //         }
        //     });
        // });
        console.log('=============================')
    }
}

export default fs