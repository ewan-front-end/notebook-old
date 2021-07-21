## Java环境
- 安装JDK
    http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html   jdk-16.0.1_windows-x64_bin.exe
- 配置环境变量
<pre>
    此电脑/属性/高级系统设置/环境变量
    系统变量 > 新建
        变量名: "JAVA_HOME"
        变量值: "C:\Program Files\Java\jdk-16.0.1"
        确定

    系统变量 > Path > 编辑
        添加 %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin; 到最前面 
        确定
    
    系统变量 > 新建
        变量名: "CLASSPATH"
        变量值: ".;%JAVA_HOME%\bin;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar"  
        确定

    > java -version
</pre>