===+
【b2d4a8#1#f2ffe7】 JVM：Java Virtual Machine     
    [虚拟机：实现跨平台的最核心的部分，所有的java程序会首先被编译为.class的类文件，这种类文件可以在虚拟机上执行{color:#b2d4a8}]
【b2d4a8#1#f2ffe7】 JRE：Java Runtime Environment 
    [运行环境：只有JVM还不能成class的执行，因为在解释class的时候JVM需要调用解释所需要的类库lib，而jre包含lib类库
    JRE中包含了Java virtual machine（JVM），runtime class libraries和Java application launcher，这些是运行Java程序的必要组件{color:#b2d4a8}]
【b2d4a8#1#f2ffe7】 JDK：Java Development Kit     
    [开发工具包：是整个JAVA的核心，包括了Java运行环境JRE、一堆Java工具（javac/java/jdb等）和Java基础的类库（即Java API 包括rt.jar）{color:#b2d4a8}] 


[####] 部署JAVA开发环境 
Android Studio安装后自带jre(Android Studio/jre) 如果想要使用自己安装的jre
        JDK：http://www.oracle.com/technetwork/java/javase/downloads/index.html  Downloads/Java Platform (JDK) 10
            【e3739b#6】 SE(J2SE) standard edition    标准版  JDK5.0始名 Java SE     // 是我们通常用的一个版本
            【d672da#6】 EE(J2EE) enterprise edition  企业版  JDK5.0始名 Java EE     // 使用这种JDK开发J2EE应用程序
            【74b4d4#6】 ME(J2ME) micro edition       移嵌版  JDK5.0始名 Java ME     // 主要用于移动设备、嵌入式设备上的java应用程序
        如：jdk1.7.0_21 ▾
            ↧bin                         // Java工具的可执行文件，包括: java、Java编译器javac、反编译.class文件javap、密钥管理工具keytool、Java文档工具javadoc等 
                javac.exe               // 基本工具 - Java语言编译器， 将Java源代码转换成字节码
                java.exe                // 基本工具 - Java应用程序启动器，直接从类文件执行Java应用程序字节代码
                javadoc.exe             // 基本工具 - Java API 文档生成器,从源码注释中提取文档
                apt.exe                 // 基本工具 - java 注释处理器 
                appletviewer.exe        // 基本工具 - java applet 小程序浏览器，一种执行HTML文件上的Java小程序的Java浏览器。
                jar.exe                 // 基本工具 - java文件压缩打包工具 
                jdb.exe                 // 基本工具 - Java 调试器，debugger，查错工具
                javah.exe               // 基本工具 - C 头文件和stub生成器，用于写本地化方法，例如生产JNI样式的头文件。产生可以调用Java过程的C过程，或建立能被Java程序调用的C过程的头文件
                javap.exe               // 基本工具 - class文件反编译工具，显示编译类文件中的可访问功能和数据，同时显示字节代码含义。
                extcheck.exe            // 基本工具 - 用于检测jar包中的问题
                keytool.exe             // 安全工具 - 管理密钥库和证书. 
                jarsigner.exe           // 安全工具 - 生产和校验JAR签名
                policytool.exe          // 安全工具 - 有用户界面的规则管理工具
                kinit.exe.exe           // 安全工具 - 用于获得和缓存网络认证协议Kerberos 票证的授予票证 
                klist.exe.exe           // 安全工具 - 凭据高速缓存和密钥表中的 Kerberos 显示条目  
                ktab.exe.exe            // 安全工具 - 密钥和证书管理工具  
                native2ascii.exe        // Java国际化工具 - 将文本转化为 Unicode Latin-1。详情参考http://java.sun.com/javase/6/docs/technotes/tools/windows/native2ascii.html 
                rmic.exe                // 远程方法调用工具 - 生成远程对象的stubs and skeletons(存根和框架) 
                rmid.exe                // 远程方法调用工具 - Java 远程方法调用(RMI:Remote Method Invocation) 活化系统守护进程 
                rmiregistry.exe         // 远程方法调用工具 - Java 远程对象注册表 
                serialver.exe           // 远程方法调用工具 - 返回类的 serialVersionUID.
                tnameserv.exe           // Java IDL and RMI-IIOP 工具 - Provides access to the naming service.  
                idlj.exe                // Java IDL and RMI-IIOP 工具 - 生产映射到OMG IDL接口可以使Java应用程序使用CORBA的.java文件 
                orbd.exe                // Java IDL and RMI-IIOP 工具 - 为客户可以在CORBA环境下透明的定位和调用服务器的稳定的对象提供支持 
                servertool.exe          // Java IDL and RMI-IIOP 工具 - 为应用程序提供易于使用的接口用于注册，注销，启动，关闭服务器 
                pack200.exe             // Java 部署工具 - 使用java gzip压缩工具将JAR文件转换为压缩的pack200文件，生产打包文件是高度压缩的JAR包，可以直接部署，减少下载时间 
                unpack200.exe           // Java 部署工具 - 解包pack200文件为JARs  
                htmlconverter.exe       // Java 插件工具 - Java Plug-in HTML转换器 htmlconverter -gui 可以启动图形界面 
                javaws.exe              // Java web 启动工具 - Java web 启动命令行工具 
                jvisualvm.exe           // Java 故障检修，程序概要分析，监视和管理工具 - 一个图形化的Java虚拟机，不说了 大家研究一下就发现太酷了.这是想了解JVM的人的神器http://java.sun.com/javase/6/docs/technotes/guides/visualvm/index.html
                jconsole.exe            // Java 故障检修，程序概要分析，监视和管理工具 -java监视台和管理控制台，图形界面的功能太强大了，运行一下就知道 ，不想多说，看了就知道 
                schemagen.exe           // Java web 服务工具 - Java构架的XML Schema生成器 
                wsgen.exe               // Java web 服务工具 - 生成 JAX-WS 
                wsimport.exe            // Java web 服务工具 - 生成 JAX-WS 
                xjc.exe                 // Java web 服务工具 - 绑定编译器  
                jps.exe                 // 监视工具 - JVM Process Status 进程状态工具。列出目标系统的HotSpot JJVM , 监视Java虚拟机的性能，不支持Windows 98 和Windows ME 平台 
                jstat.exe               // 监视工具 - 按照命令行的具体要求记录和收集一个JVM的性能数据 
                jstatd.exe              // 监视工具 - JVM jstat 的守护进程 
                jinfo.exe               // 故障检测和修理工具 - 配置或打印某个Java进程VM flag 
                jhat.exe                // 故障检测和修理工具 - 堆储存查看器 
                jmap.exe                // 故障检测和修理工具 - Java内存图 
                jsadebugd.exe           // 故障检测和修理工具 - Java 的 Serviceability Agent Debug的守护进程 
                jstack.exe              // 故障检测和修理工具 - Java堆栈跟踪 
                jrunscript.exe          // Java脚本工具 - 运行脚本
            lib                         // Java开发工具要用的一些库文件，有包含了支持JDK工具的非核心类库tool.jar，dt.jar 归档的 BeanInfo 文件,用于告诉IDE这样显示java组件怎样让开发者在自己的应用程序中用户化它们 
                dt.jar                  // 包含了Swing包，是运行环境的类库。目前的发展趋势是Java越来越少的用作GUI开发，所以这个类库基本不会用到了
                tools.jar               // 工具类库，bin目录下的可执行程序，好多都会用到这个类库。比如javac[.exe]，javadoc[.exe]等
            jre                         // JDK使用的Java运行环境（JRE）的根目录，这个运行环境实现了Java平台
                bin                     // 可以认为就是jvm 包含了java运行所需要的可执行文件，比如java[.exe]
                                        // Java平台所要用的工具和库的可执行文件这些可执行文件和 /jdk1.7.0_21/bin相同的。这个路径不需要设置 PATH 环境变量  //Java 启动器工具充当了应用程序启动器(覆盖了1.1版本的JDK推出的旧版本JRE工具) 
                    client              // 包含Java Hotspot(Java性能引擎) Client Virtual Machine 客户虚拟机要用的DLL文件 
                    server              // 包含Java Hotspot(Java性能引擎) Server Virtual Machine 服务器虚拟机要用的DLL文件 ----JDK 比 JRE C:\Program Files\Java\jre7\bin多一个server端的java虚拟机。即这个folder “Server” 不存在于JRE下。
                lib                     // jvm工作所需要的类库 包含了运行时依赖的java类库和动态链接库（.so或.dll或.dylib）
                    amd64               // 包含了程序运行所需的动态链接库 
                    rt.jar              // Java运行时类库(java核心APIRunTime类)包括java.lang，java.io，java.net，java.util等
                                        // java.lang  Java语言包，这个包下的文件不需要显式import。包括：Object类，数据类型相关的类（String，Long，Byte），Class类，线程相关类Thread，异常类Throwable，等。
                                        // java.io    I/O操作相关的类。包括：文件类File，FileReader，FileWriter，输入输出流InputStream/OutputStream，等。
                                        // java.net   网络相关类。包括：http连接类HttpURLConnection，socket类，等。
                                        // java.util  工具类。包括：数据结构相关的类ArrayList、Hashmap，日期类Date，随机数类Random，等 
                    charsets.jar        // 字符转换类库 
                    ext                 // 默认的Java平台扩展安装环境 
                    ext\localedata.jar  // ava.text 和 java.util包要用到的地区数据  
                    security            // 包含安全管理文件，有安全规则(java.policy)和安全属性文件(java.security) 
                    applet              // Java applets 要的Jar包，可以放到lib/applet/目录,可以节省 applet 类装载器从本地文件系统装载 大的applets 所需的applet类时间,减少从网上下载具有相同的保护的时间
                    fonts               // 包含平台所需的TrueType字体文件
            db                          // 纯Java开发的数据库 Apache Derby，是一个开源的100%Java开发的关系数据库
                                        // 有关 Java DB 的信息，请参见 http://developers.sun.com/prodtech/javadb/
                                        // 有关 Derby 的文档，请参见：http://db.apache.org/derby/manuals/index.html
            src.zip                     // Java类库源码，包括了rt.jar库中的关键部分；除了Java类库，还包含了启动器（launcher）的源码（C语言实现）
            include                     // C 语言头文件 支持 用Java本地接口和Java虚拟机接口 来本机代码编程 .h头文件，C语言开发时用到的头文件。比如jni.h是开发jni程序时必须引用的头文件
            ↥

        配置3个环境变量(系统变量)：
            JAVA_HOME：C:\Program Files\Java\jdk-17.0.2  
            Path：;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
            CLASSPATH：.;%JAVA_HOME%\bin;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
                // dt.jar：运行环境类库，主要是Swing包，这一点通过用压缩软件打开dt.jar也可以看到。如果在开发时候没有用到Swing包，那么可以不用将dt.jar添加到CLASSPATH变量中
                // tools.jar：工具类库，它跟我们程序中用到的基础类库没有关系。我们注意到在Path中变量值bin目录下的各个exe工具的大小都很小，一般都在27KB左右，这是因为它们实际上仅仅相当于是一层代码的包装，这些工具的实现所要用到的类库都在tools.jar中，用压缩软件打开tools.jar,你会发现有很多文件是和bin目录下的exe工具相对性的


        xxxx> javac –version
        xxxx> java –version

【1】 Hello World!
    demo/
    demo/src
    demo/src/HelloWorld.java ▾ 创建一个HelloWorld类
        ↧public class HelloWorld {
            public static void main(String[] args){
                System.out.println("Hello World!");
            }
        }↥
    demo/src> javac HelloWorld.java  // 编译程序
    demo/src> java HelloWorld        // 运行程序
    
【1】 接口服务
    新建一个动态web工程

【1】 嵌入式






[1] IDE
    配置JDK HOME
        将JDK的类库全部引用进来，供开发使用
        
    mac下的IntelliJ IDEA为例，看一下都有那些类：










===-