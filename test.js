let count = 4
while(count > 0){
    console.log('----', count)
    count--
}




var str = '../../../systemAuthentication'
var arr = str.match(/\.\.\//g)

if(arr){
    console.log('-------------------------------------', arr)
}
arr.forEach((e,i) => {
    str = str.replace(/..\//g, '')
    console.log(str)
})