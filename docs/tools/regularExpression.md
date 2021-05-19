[上一级](../)



```table
.  通配符[^\n\r\u2028\u2029]，换行符、回车符、行分隔符和段分隔符除外

\d  [0-9]              \D  [^0-9]             匹配任意非数字的字符
\w  [0-9a-zA-Z_]       \W  [^0-9a-zA-Z_]      匹配任意不是字母，数字，下划线，汉字的字符
\s  [ \t\v\n\r\f]      \S  [^ \t\v\n\r\f]     匹配任意不是空白符的字符
\b  a\b \bnice         \B                     匹配不是单词开头或结束的位置(隐式位置) 

?  {0,1}            +  {1,}           *  {0,}

/i  不区分大小写     /g  全局匹配       /m  多行匹配  

取反      \W \S \D [^x]匹配除了x以外的任意字符 !(else|\s) [^aeiou]匹配除了aeiou这几个字母以外的任意字符 
惰性匹配  量词 + ?  实现惰性匹配  {m,n}?　　{m,}?　　??　　+?　　*?


```
例子：
```
/\b(?:(?!(else|\s))[\w\W])+\b/gi  "[1| if] else [1| no] else [1| but] [1| if]" 
/<span[^>]+>/                     "[1| <span title="#">]"
a\b \bnice                        "It's [1| a nice] day today."   
```

```
/SCENE\(([^\)]+)\)/.[ch|exec](string) 

let item
while ((item = /正则/.exec(data)) !== null) {
  
}
```

RegExp 类型
标志flag的含义：

     g ：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
     i ：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；
     m ：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

 

RegExp实例的创建
   1. 字面量形式：

                                                 var expression = / pattern / flags ;

   返回：RegExp实例（对象）

   规则：没有正则含义的元字符都必须转义。正则表达式中的元字符包括： ( [ { \ ^ $ | ) ? * + .]}

var pattern1 = /[bc]at/i;       // 匹配第一个"bat"或"cat"，不区分大小写，这里的元字符是有特殊含义，表示其中可以匹配其中任意的字符
var pattern2 = /\[bc\]at/i;     // 匹配第一个" [bc]at"，不区分大小写
var pattern3 = /.at/gi;         // 匹配所有以"at"结尾的 3 个字符的组合，不区分大小写
var pattern4 = /\.at/gi;        // 匹配所有".at"，不区分大小写
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

   2. 构造函数：

                                                 var expression = new RegExp("pattern ", "flags") ;

   入参：两个字符串参数

   返回：返回一个RegExp实例（对象）。

var pattern2 = new RegExp("[bc]at", "i");
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

   规则：没有正则含义的元字符（或组合字符）要对字符进行双重转义。

// 字面量模式与等价的字符串
var pattern1 = /\[bc\]at/;         // 等价于 var pattern1 = new RegExp("\\[bc\\]at", "i");
var pattern2 = /\.at/i;            // 等价于 var pattern2 = new RegExp("\\.at", "i");
var pattern3 = /name\/age/;        // 等价于 var pattern3 = new RegExp("name\\/age", "i");
var pattern4 = /\d.\d{1,2}/;       // 等价于 var pattern4 = new RegExp("\\d.\\d{1,2}", "i");
var pattern5= /\w\\hello\\123/;    // 等价于 var pattern5 = new RegExp("\\w\\\\hello\\\\123", "i");
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

 RegExp实例的属性
    global ：返回布尔值，是否设置了 g 标志。
    ignoreCase ：返回布尔值，是否设置了 i 标志。
    lastIndex ：返回整数，开始搜索下一个匹配项的字符位置，从 0 算起。
    multiline ：返回布尔值，是否设置了 m 标志。
    source ：返回正则表达式的字符串，按照字面量形式而非传入构造函数中的字符串模式返回。

var pattern1 = /\[bc\]at/i;        
alert(pattern1.global);            // false，表示没有设置 g 标志
alert(pattern1.ignoreCase);        // true，表示没有设置 i 标志
alert(pattern1.multiline);         // false，表示没有设置 m 标志
alert(pattern1.lastIndex);         // 0，表示开始搜索下一个匹配项的字符位置
alert(pattern1.source);            // "\[bc\]at"，表示正则表达式的字符串表示
 
var pattern2 = new RegExp("\\[bc\\]at", "i");
alert(pattern2.global);            // false，表示没有设置 g 标志
alert(pattern2.ignoreCase);        // true，表示没有设置 i 标志
alert(pattern2.multiline);         // false，表示没有设置 m 标志
alert(pattern2.lastIndex);         // 0，表示没有设置 g 标志
alert(pattern2.source);            // "\[bc\]at"，表示正则表达式的字符串表示
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

 RegExp实例方法
   1. exec() 方法：

                                                            pattern.exec(string);  

    入参：一个字符串

    返回：返回数组，将字符串中匹配正则表达式的结果放到数组中

var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);    // matches为 ["mom and dad and baby", " and dad and baby", " and baby", index: 0, input: "mom and dad and baby", groups: undefined]
alert(matches.index);                // 0
alert(matches.input);                // "mom and dad and baby"
alert(matches[0]);                   // "mom and dad and baby"
alert(matches[1]);                   // " and dad and baby"
alert(matches[2]);                   // " and baby"
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

   规则：对于 exec() 方法而言，

     在模式中设置了全局标志（ g ），它每次也只会返回一个匹配项，多次调用exec() ，每次调用则都会在字符串中继续查找新匹配项；

var text = "cat, bat, sat, fat";
var pattern2 = /.at/g;
var matches = pattern2.exec(text);   // 返回数组 ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]
alert(matches.index);                // 0
alert(matches[0]);                   // cat
alert(pattern2.lastIndex);           // 3
 
matches = pattern2.exec(text);       // 返回数组 ["bat", index: 5, input: "cat, bat, sat, fat", groups: undefined]
alert(matches.index);                // 5
alert(matches[0]);                   // bat
alert(pattern2.lastIndex);           // 8
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

     在不设置全局标志的情况下，在同一个字符串上多次调用 exec() 将始终返回第一个匹配项的信息。

var text = "cat, bat, sat, fat";
var pattern1 = /.at/;
var matches = pattern1.exec(text);    // 返回数组 ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined] 
alert(matches.index);                 // 0
alert(matches[0]);                    // cat
alert(pattern1.lastIndex);            // 0
 
matches = pattern1.exec(text);
alert(matches.index);                 // 0
alert(matches[0]);                    // cat
alert(pattern1.lastIndex);            // 0
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

   2. test() 方法

                                                             pattern.test(string)

    入参：一个字符串

    返回：布尔值，检测字符串是否匹配正则表达式

var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)){
    alert("The pattern was matched.");
}
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

  注意：

/* 实例属性不会重置，所以在循环中再次调用 test() 方法会失败。
 * 第一次调用 test() 找到了 "cat" ，第二次调用是从索引为 3 的字符（上一次匹配的末尾）开始的，所以就找不到它。
 * 测试到字符串末尾，下一次再调用 test() 就又从开头开始。
 */ 
// 字面量实例
var re1 = /cat/g;
for (var i=0; i < 10; i++){
    console.log(re1.test("catastrophe"));  // 结果为 true false true false...
}
 
var re2 = null;
for (var i=0; i < 10; i++){
    re2 = /cat/g;
    console.log(re2.test("catastrophe"));  // 结果为 true true true true...
}
 
// 构造函数实例同理
 3.  toLocaleString() 和 toString()：

                                     pattern.toLocaleString() / pattern.toString()

    返回：返回正则表达式的字面量，与创建正则表达式的方式无关

var pattern = new RegExp("\\[bc\\]at", "gi");
alert(pattern.toString());                 // 返回 /\[bc\]at/gi
alert(pattern.toLocaleString());           // 返回 /\[bc\]at/gi
wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==

 RegExp构造函数属性（类似于静态属性）
长属性：

var text = "this has been a short summer";
var pattern = /(.)hort/g;
 
/*
* 注意：Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
* Internet Explorer 不支持 multiline 属性
*/
 
if (pattern.test(text)) {
    alert(RegExp.input);             // this has been a short summer，返回了原始字符串
    alert(RegExp.leftContext);       // this has been a，返回了单词 short 之前的字符串
    alert(RegExp.rightContext);      // summer，而 rightContext 属性则返回了 short
之后的字符串
    alert(RegExp.lastMatch);         // short，返回最近一次与整个正则表达式匹配的字符串，即 short ；
    alert(RegExp.lastParen);         // s，返回最近一次匹配的捕获组
    alert(RegExp.multiline);         // false
}
长属性简写方式——短属性

var text = "this has been a short summer";
var pattern = /(.)hort/g;
 
/*
* 注意：Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
* Internet Explorer 不支持 multiline 属性
*/
 
if (pattern.test(text)) {
    alert(RegExp.$_);             // this has been a short summer
    alert(RegExp["$`"]);          // this has been a
    alert(RegExp["$'"]);          // summer
    alert(RegExp["$&"]);          // short
    alert(RegExp["$+"]);          // s
    alert(RegExp["$*"]);          // false
}
其他属性：RegExp.$1 、 RegExp.$2 … RegExp.$9 ，分别用于存储第一、第二……第九个匹配的捕获组，在
调用 exec() 或 test() 方法时，这些属性会被自动填充

var text = "this has been a short summer";
var pattern = /(..)or(.)/g;
 
if (pattern.test(text)){
    alert(RegExp.$1);           // sh
    alert(RegExp.$2);           // t
}
 
