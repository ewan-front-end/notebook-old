## Java环境
- 安装JDK
    http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html   jdk-16.0.1_windows-x64_bin.exe
- 配置环境变量
<pre>
    此电脑/属性/高级系统设置/环境变量
    系统变量 > 新建
        变量名: "Java_Home"
        变量值: "C:\Program Files\Java\jdk-16.0.1"
        确定

    系统变量 > Path > 编辑
        添加 %Java_Home%\bin;%Java_Home%\jre\bin; 到最前面
        确定

    系统变量 > 新建
        变量名: "CLASSPATH"
        变量值: ".;%Java_Home%\bin;%Java_Home%\lib\dt.jar;%Java_Home%\lib\tools.jar"
        确定
</pre>