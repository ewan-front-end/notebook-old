---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>M 2022.03.07 17:07</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Java</h1><strong>Java</strong>
</div>
<div class="static-content">


<pre class="code-block">
<span class="title1 reverse1" style="margin-top:15px;color:#b2d4a8;background-color:#f2ffe7"><i></i> JVM：Java Virtual Machine     </span>
    <span style="color:#b2d4a8">虚拟机：实现跨平台的最核心的部分，所有的java程序会首先被编译为.class的类文件，这种类文件可以在虚拟机上执行</span>
<span class="title1 reverse1" style="margin-top:15px;color:#b2d4a8;background-color:#f2ffe7"><i></i> JRE：Java Runtime Environment </span>
    <span style="color:#b2d4a8">运行环境：只有JVM还不能成class的执行，因为在解释class的时候JVM需要调用解释所需要的类库lib，而jre包含lib类库
    JRE中包含了Java virtual machine（JVM），runtime class libraries和Java application launcher，这些是运行Java程序的必要组件</span>
<span class="title1 reverse1" style="margin-top:15px;color:#b2d4a8;background-color:#f2ffe7"><i></i> JDK：Java Development Kit     </span>
    <span style="color:#b2d4a8">开发工具包：是整个JAVA的核心，包括了Java运行环境JRE、一堆Java工具（javac/java/jdb等）和Java基础的类库（即Java API 包括rt.jar）</span> 


<span class="h4 bg3 cf"> 部署JAVA开发环境 </span>
Android Studio安装后自带jre(Android Studio/jre) 如果想要使用自己安装的jre
        JDK：http://www.oracle.com/technetwork/java/javase/downloads/index.html  Downloads/Java Platform (JDK) 10
            <span class="title6" style="margin-top:0px;color:#e3739b;"><i></i> SE(J2SE) standard edition    标准版  JDK5.0始名 Java SE     <span class="comment">// 是我们通常用的一个版本</span></span>
            <span class="title6" style="margin-top:0px;color:#d672da;"><i></i> EE(J2EE) enterprise edition  企业版  JDK5.0始名 Java EE     <span class="comment">// 使用这种JDK开发J2EE应用程序</span></span>
            <span class="title6" style="margin-top:0px;color:#74b4d4;"><i></i> ME(J2ME) micro edition       移嵌版  JDK5.0始名 Java ME     <span class="comment">// 主要用于移动设备、嵌入式设备上的java应用程序</span></span>
<div class="block-detail">        <span class="detail-desc">如：jdk1.7.0_21</span><span class="comment"></span><div class="detail-content">            <span>bin                         <span class="comment">// Java工具的可执行文件，包括: java、Java编译器javac、反编译.class文件javap、密钥管理工具keytool、Java文档工具javadoc等</span>
                javac.exe               <span class="comment">// 基本工具 - Java语言编译器， 将Java源代码转换成字节码</span>
                java.exe                <span class="comment">// 基本工具 - Java应用程序启动器，直接从类文件执行Java应用程序字节代码</span>
                javadoc.exe             <span class="comment">// 基本工具 - Java API 文档生成器,从源码注释中提取文档</span>
                apt.exe                 <span class="comment">// 基本工具 - java 注释处理器</span>
                appletviewer.exe        <span class="comment">// 基本工具 - java applet 小程序浏览器，一种执行HTML文件上的Java小程序的Java浏览器。</span>
                jar.exe                 <span class="comment">// 基本工具 - java文件压缩打包工具</span>
                jdb.exe                 <span class="comment">// 基本工具 - Java 调试器，debugger，查错工具</span>
                javah.exe               <span class="comment">// 基本工具 - C 头文件和stub生成器，用于写本地化方法，例如生产JNI样式的头文件。产生可以调用Java过程的C过程，或建立能被Java程序调用的C过程的头文件</span>
                javap.exe               <span class="comment">// 基本工具 - class文件反编译工具，显示编译类文件中的可访问功能和数据，同时显示字节代码含义。</span>
                extcheck.exe            <span class="comment">// 基本工具 - 用于检测jar包中的问题</span>
                keytool.exe             <span class="comment">// 安全工具 - 管理密钥库和证书.</span>
                jarsigner.exe           <span class="comment">// 安全工具 - 生产和校验JAR签名</span>
                policytool.exe          <span class="comment">// 安全工具 - 有用户界面的规则管理工具</span>
                kinit.exe.exe           <span class="comment">// 安全工具 - 用于获得和缓存网络认证协议Kerberos 票证的授予票证</span>
                klist.exe.exe           <span class="comment">// 安全工具 - 凭据高速缓存和密钥表中的 Kerberos 显示条目</span>
                ktab.exe.exe            <span class="comment">// 安全工具 - 密钥和证书管理工具</span>
                native2ascii.exe        <span class="comment">// Java国际化工具 - 将文本转化为 Unicode Latin-1。详情参考http://java.sun.com/javase/6/docs/technotes/tools/windows/native2ascii.html</span>
                rmic.exe                <span class="comment">// 远程方法调用工具 - 生成远程对象的stubs and skeletons(存根和框架)</span>
                rmid.exe                <span class="comment">// 远程方法调用工具 - Java 远程方法调用(RMI:Remote Method Invocation) 活化系统守护进程</span>
                rmiregistry.exe         <span class="comment">// 远程方法调用工具 - Java 远程对象注册表</span>
                serialver.exe           <span class="comment">// 远程方法调用工具 - 返回类的 serialVersionUID.</span>
                tnameserv.exe           <span class="comment">// Java IDL and RMI-IIOP 工具 - Provides access to the naming service.</span>
                idlj.exe                <span class="comment">// Java IDL and RMI-IIOP 工具 - 生产映射到OMG IDL接口可以使Java应用程序使用CORBA的.java文件</span>
                orbd.exe                <span class="comment">// Java IDL and RMI-IIOP 工具 - 为客户可以在CORBA环境下透明的定位和调用服务器的稳定的对象提供支持</span>
                servertool.exe          <span class="comment">// Java IDL and RMI-IIOP 工具 - 为应用程序提供易于使用的接口用于注册，注销，启动，关闭服务器</span>
                pack200.exe             <span class="comment">// Java 部署工具 - 使用java gzip压缩工具将JAR文件转换为压缩的pack200文件，生产打包文件是高度压缩的JAR包，可以直接部署，减少下载时间</span>
                unpack200.exe           <span class="comment">// Java 部署工具 - 解包pack200文件为JARs</span>
                htmlconverter.exe       <span class="comment">// Java 插件工具 - Java Plug-in HTML转换器 htmlconverter -gui 可以启动图形界面</span>
                javaws.exe              <span class="comment">// Java web 启动工具 - Java web 启动命令行工具</span>
                jvisualvm.exe           <span class="comment">// Java 故障检修，程序概要分析，监视和管理工具 - 一个图形化的Java虚拟机，不说了 大家研究一下就发现太酷了.这是想了解JVM的人的神器http://java.sun.com/javase/6/docs/technotes/guides/visualvm/index.html</span>
                jconsole.exe            <span class="comment">// Java 故障检修，程序概要分析，监视和管理工具 -java监视台和管理控制台，图形界面的功能太强大了，运行一下就知道 ，不想多说，看了就知道</span>
                schemagen.exe           <span class="comment">// Java web 服务工具 - Java构架的XML Schema生成器</span>
                wsgen.exe               <span class="comment">// Java web 服务工具 - 生成 JAX-WS</span>
                wsimport.exe            <span class="comment">// Java web 服务工具 - 生成 JAX-WS</span>
                xjc.exe                 <span class="comment">// Java web 服务工具 - 绑定编译器</span>
                jps.exe                 <span class="comment">// 监视工具 - JVM Process Status 进程状态工具。列出目标系统的HotSpot JJVM , 监视Java虚拟机的性能，不支持Windows 98 和Windows ME 平台</span>
                jstat.exe               <span class="comment">// 监视工具 - 按照命令行的具体要求记录和收集一个JVM的性能数据</span>
                jstatd.exe              <span class="comment">// 监视工具 - JVM jstat 的守护进程</span>
                jinfo.exe               <span class="comment">// 故障检测和修理工具 - 配置或打印某个Java进程VM flag</span>
                jhat.exe                <span class="comment">// 故障检测和修理工具 - 堆储存查看器</span>
                jmap.exe                <span class="comment">// 故障检测和修理工具 - Java内存图</span>
                jsadebugd.exe           <span class="comment">// 故障检测和修理工具 - Java 的 Serviceability Agent Debug的守护进程</span>
                jstack.exe              <span class="comment">// 故障检测和修理工具 - Java堆栈跟踪</span>
                jrunscript.exe          <span class="comment">// Java脚本工具 - 运行脚本</span>
            lib                         <span class="comment">// Java开发工具要用的一些库文件，有包含了支持JDK工具的非核心类库tool.jar，dt.jar 归档的 BeanInfo 文件,用于告诉IDE这样显示java组件怎样让开发者在自己的应用程序中用户化它们</span>
                dt.jar                  <span class="comment">// 包含了Swing包，是运行环境的类库。目前的发展趋势是Java越来越少的用作GUI开发，所以这个类库基本不会用到了</span>
                tools.jar               <span class="comment">// 工具类库，bin目录下的可执行程序，好多都会用到这个类库。比如javac[.exe]，javadoc[.exe]等</span>
            jre                         <span class="comment">// JDK使用的Java运行环境（JRE）的根目录，这个运行环境实现了Java平台</span>
                bin                     <span class="comment">// 可以认为就是jvm 包含了java运行所需要的可执行文件，比如java[.exe]</span>
                                        <span class="comment">// Java平台所要用的工具和库的可执行文件这些可执行文件和 /jdk1.7.0_21/bin相同的。这个路径不需要设置 PATH 环境变量  //Java 启动器工具充当了应用程序启动器(覆盖了1.1版本的JDK推出的旧版本JRE工具)</span>
                    client              <span class="comment">// 包含Java Hotspot(Java性能引擎) Client Virtual Machine 客户虚拟机要用的DLL文件</span>
                    server              <span class="comment">// 包含Java Hotspot(Java性能引擎) Server Virtual Machine 服务器虚拟机要用的DLL文件 ----JDK 比 JRE C:\Program Files\Java\jre7\bin多一个server端的java虚拟机。即这个folder “Server” 不存在于JRE下。</span>
                lib                     <span class="comment">// jvm工作所需要的类库 包含了运行时依赖的java类库和动态链接库（.so或.dll或.dylib）</span>
                    amd64               <span class="comment">// 包含了程序运行所需的动态链接库</span>
                    rt.jar              <span class="comment">// Java运行时类库(java核心APIRunTime类)包括java.lang，java.io，java.net，java.util等</span>
                                        <span class="comment">// java.lang  Java语言包，这个包下的文件不需要显式import。包括：Object类，数据类型相关的类（String，Long，Byte），Class类，线程相关类Thread，异常类Throwable，等。</span>
                                        <span class="comment">// java.io    I/O操作相关的类。包括：文件类File，FileReader，FileWriter，输入输出流InputStream/OutputStream，等。</span>
                                        <span class="comment">// java.net   网络相关类。包括：http连接类HttpURLConnection，socket类，等。</span>
                                        <span class="comment">// java.util  工具类。包括：数据结构相关的类ArrayList、Hashmap，日期类Date，随机数类Random，等</span>
                    charsets.jar        <span class="comment">// 字符转换类库</span>
                    ext                 <span class="comment">// 默认的Java平台扩展安装环境</span>
                    ext\localedata.jar  <span class="comment">// ava.text 和 java.util包要用到的地区数据</span>
                    security            <span class="comment">// 包含安全管理文件，有安全规则(java.policy)和安全属性文件(java.security)</span>
                    applet              <span class="comment">// Java applets 要的Jar包，可以放到lib/applet/目录,可以节省 applet 类装载器从本地文件系统装载 大的applets 所需的applet类时间,减少从网上下载具有相同的保护的时间</span>
                    fonts               <span class="comment">// 包含平台所需的TrueType字体文件</span>
            db                          <span class="comment">// 纯Java开发的数据库 Apache Derby，是一个开源的100%Java开发的关系数据库</span>
                                        <span class="comment">// 有关 Java DB 的信息，请参见 http://developers.sun.com/prodtech/javadb/</span>
                                        <span class="comment">// 有关 Derby 的文档，请参见：http://db.apache.org/derby/manuals/index.html</span>
            src.zip                     <span class="comment">// Java类库源码，包括了rt.jar库中的关键部分；除了Java类库，还包含了启动器（launcher）的源码（C语言实现）</span>
            include                     <span class="comment">// C 语言头文件 支持 用Java本地接口和Java虚拟机接口 来本机代码编程 .h头文件，C语言开发时用到的头文件。比如jni.h是开发jni程序时必须引用的头文件</span>
            </span></div></div>

        配置3个环境变量(系统变量)：
            JAVA_HOME：C:\Program Files\Java\jdk-17.0.2  
            Path：;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
            CLASSPATH：.;%JAVA_HOME%\bin;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
                <span class="comment">// dt.jar：运行环境类库，主要是Swing包，这一点通过用压缩软件打开dt.jar也可以看到。如果在开发时候没有用到Swing包，那么可以不用将dt.jar添加到CLASSPATH变量中</span>
                <span class="comment">// tools.jar：工具类库，它跟我们程序中用到的基础类库没有关系。我们注意到在Path中变量值bin目录下的各个exe工具的大小都很小，一般都在27KB左右，这是因为它们实际上仅仅相当于是一层代码的包装，这些工具的实现所要用到的类库都在tools.jar中，用压缩软件打开tools.jar,你会发现有很多文件是和bin目录下的exe工具相对性的</span>


        <span class="block-command">xxxx</span> javac –version
        <span class="block-command">xxxx</span> java –version

<span class="title1" style="margin-top:15px;"><i></i> Hello World!</span>
    demo/
    demo/src
<div class="block-detail">    <span class="detail-desc">demo/src/HelloWorld.java</span><span class="comment"> 创建一个HelloWorld类</span><div class="detail-content">        <span>public class HelloWorld {
            public static void main(String[] args){
                System.out.println("Hello World!");
            }
        }</span></div></div>
    <span class="block-command">demo/src</span> javac HelloWorld.java  <span class="comment">// 编译程序</span>
    <span class="block-command">demo/src</span> java HelloWorld        <span class="comment">// 运行程序</span>
    
<span class="title1" style="margin-top:15px;"><i></i> 接口服务</span>
    新建一个动态web工程

<span class="title1" style="margin-top:15px;"><i></i> 嵌入式</span>






[1] IDE
    配置JDK HOME
        将JDK的类库全部引用进来，供开发使用
        
    mac下的IntelliJ IDEA为例，看一下都有那些类：










</pre>

</div>