var str = '../../../systemAuthentication'
var arr = str.match(/..\//g)
console.log('-------------------------------------')
arr.forEach((e,i) => {
    str = str.replace(/..\//g, '')
    console.log(str)
})