手把手完成商业级社交App开发，进阶Android高级工程
https://coding.imooc.com/class/390.html?utm_term=android%20gradle%E9%85%8D%E7%BD%AE&utm_campaign=SEM&utm_medium=64&_channel_track_key=bnxm5kUk&utm_source=szjineng2&utm_content=20220218&bd_vid=9152022734962051126




SDK Location 里没有JDK location






















完全卸载Android Studio
    1.C:\Users\用户名\.gradle
    2.C:\Users\用户名\AndroidStudioProjects
    3.C:\Users\用户名\AppData\Local\Google\AndroidStudio4.1
    4.C:\Users\用户名\AppData\Roaming\Google
安装Android Studio
    安装部署JDK开发环境 // Android Studio安装后自带jre(Android Studio/jre)
        如果想要使用自己安装的jre
        下载jdk：http://www.oracle.com/technetwork/java/javase/downloads/index.html  Downloads/Java Platform (JDK) 10

        配置3个环境变量(系统变量)：
            JAVA_HOME：C:\Program Files\Java\jdk-17.0.2
            Path：;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
            CLASS_PATH：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;

        验证：java –version、javac –version

    配置Gradle

    gradle-wrapper.properties文件，将distributionUr由原先使用的网络资源

distributionUrl=https\://services.gradle.org/distributions/gradle-5.6.4-all.zip

换成使用本地的

distributionUrl=file:///C:/Users/new/.gradle/wrapper/dists/gradle-4.1-all.zip

file:///C:/Users/Administrator/.gradle/wrapper/dists/gradle-6.5-bin.zip












===+
【1】IOS打包
    【5】生成描述文件

    【5】构建项目到平台
        cordova build ios


【1】Android打包
    【5】生成Android证书
        3►demo/◄ > shift + 右键 > 在此处打开Powershell窗口        
        demo> keytool -genkey -alias 1►rj_alias◄ -keyalg RSA -keysize 2048 -validity 36500 -keystore rj.keystore
            交互详情 ▾
            ↧输入密钥库口令: 2►123456◄ // 默认密码 000000
            再次输入新口令: 2►123456◄
            您的名字与姓氏是什么?
            [Unknown]:  ewan
            您的组织单位名称是什么?
            [Unknown]:  a
            您的组织名称是什么?
            [Unknown]:  a
            您所在的城市或区域名称是什么?
            [Unknown]:  a
            您所在的省/市/自治区名称是什么?
            [Unknown]:  a
            该单位的双字母国家/地区代码是什么?
            [Unknown]:  ch
            CN=ewan, OU=a, O=a, L=a, ST=a, C=a是否正确?
            [否]:  y↥
    【5】构建项目到平台
        cordova build android

    【5】打包android平台
        Android Studio 打开构建好的codova android平台
            菜单Build > Generate Signed Bundle/APK...
            选取 API > [Next]
                Key store path: 3►demo\rj.keystore◄
                Key store password: 2►123456◄ 
                Key alias: 1►rj_alias◄
                Key password: 2►123456◄
                [Next]
                    debug   // 打包到：platforms/android/app/release/
                    release // 打包到：platforms/android/app/release/
                    [Finish]
                        等待...  

===-







1. 从[Gralde官网](https://gradle.org/releases/)下载合适版本的 binary-only
2. 解压到xxxx/gradle-7.3.1
3. 添加系统变量 GRADLE_HOME:xxxx/gradle-7.3.1
4. 编辑环境变量 Path
    依赖 %JAVA_HOME%\bin
    依赖 %JAVA_HOME%\jre\bin
    添加 %GRADLE_HOME%\bin
















1. 构建项目到平台



# Android开发环境搭建
1. Android Studio
    官网：https://developer.android.com/studio?gclid=EAIaIQobChMIj9Hivamh8wIVBQyRCh1aXwdOEAAYASAAEgJyDPD_BwE&gclsrc=aw.ds  
    百度：Software/android/android-studio-2020.3.1.24-windows.exe
    Android Studio > Tools > SDK Manager > Android SDK Location: Edit > D:\AndroidSDK(参考Android SDK)

2. JDK 1.8.x(包含了Java的运行环境JVM、Java基础类库和Java工具)
    OpenJDK版本：https://adoptium.net/?variant=openjdk8&jvmVariant=hotspot 
    百度：Software/android/JDK/OpenJDK8U-jdk_x64_windows_hotspot_8u302b08.msi        
    环境变量 JAVA_HOME  C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot
    检测 $ jave -version

3. Android SDK

    Android Sdk
    ├ build-tools
    ├ emulator
    ├ extras
    ├ licenses
    ├ patcher
    ├ platforms
    │ ├ android-30
    │ └ android-12
    │   └ 下载的Android SDK Platform 31
    ├ platform-tools
    ├ skins
    ├ system-images  // 必须至少拥有一个软件包，才能在 Android 模拟器上运行相应版本
    │ ├ android-29
    │ └ android-30
    │   └ google_apis_playstore
    │     └ 这里放置下载解压好的模拟器 参考【模拟器安装】
    ├ tools
    └ .knownPackages

    方法一: 手动下载安装 
        百度：Software/android/SDK/SDK.zip 下载解压到任何位置如：D:\AndroidSDK
        百度：Software/android/模拟器/x86-30_r09-windows.zip 下载解压 x86 文件夹拷贝到 D:\AndroidSDK\system-images\android-30\
        环境变量 ANDROID_HOME  D:\AndroidSDK 

    方法二: AndroidStudio里SDK Manager安装
        Android Studio > Tools > SDK Manager > SDK Platforms > 【如下】 > Apply

        勾选 "Show Package Details"
        展开 Android 10 (Q) 选项 勾选：
        - Android SDK Platform 29
        - Intel x86 Atom_64 System Image (官方模拟器镜像文件，使用非官方模拟器不需要安装此组件)

        配置 ANDROID_HOME 环境变量                   配置 Path 环境变量                   ANDROID_SDK_ROOT C:\Users\new\AppData\Local\Android\Sdk      %ANDROID_SDK_ROOT%\tools\bin
                                                    %ANDROID_HOME%\platform-tools
                                                    %ANDROID_HOME%\emulator
                                                    %ANDROID_HOME%\tools
                                                    %ANDROID_HOME%\tools\bin
        更换完 ANDROID_HOME 环境变量要重新添加平台
        cordova platform remove android

    Error: Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
    > Installed Build Tools revision 31.0.0 is corrupted. Remove and install again using the SDK Manager. // 31版本构建工具已损坏
    原因：SDK构建工具31中缺少的两个文件：dx.bat、dx.jar
    解决：
        1. C:\Users\user\AppData\Local\Android\Sdk\build-tools\31.0.0\d8.bat 更名为 dx.bat
        2. C:\Users\user\AppData\Local\Android\Sdk\build-tools\31.0.0\lib\d8.jar 更名为 dx.jar

4. 模拟器安装(如果不用真机)
    AVD Manager安装：
        右上角设备下拉 > AVD Manager > Your Virtual Devices对话框 > Create Virtual Device... > Select Hardware对话框 > Phone选项卡 > 选择一款设备 > Next > System Image对话框 > Download
        会自动安装到：C:\Users\xxx\AppData\Local\Android\Sdk\system-images\android-30\google_apis_playstore\
    手动安装：
        如下载：https://dl.google.com/android/repository/sys-img/google_apis_playstore/x86-30_r09-windows.zip
        x86-30_r09-windows.zip 解压 x86 拷贝到 D:\AndroidSDK\system-images\android-30\google_apis_playstore\

        如下载：百度/Software/android/模拟器/x86_64-29_r08-windows.zip
        解压 x86_64 拷贝到 D:\AndroidSDK\system-images\android-29\default\

        如下载：百度/Software/android/模拟器/x86-30_r10.zip  
        解压x86 拷贝到 D:\AndroidSDK\system-images\android-30\google_apis\


# 创建JS/HTMLCordova应用
[Cordova](http://cordova.axuer.com/#getstarted)

    - 安装Cordova(依赖node/git) `$ npm install -g cordova`
    - 创建项目
        某目录> cordova create demo com.example.hello HelloWorld
        项目开始页面: www/index.html
        项目初始化: www/js/index.js 中 deviceready 事件

    - 添加平台
        某目录> cd demo
        demo> cordova platform add ios --save
        demo> cordova platform add android --save
        demo> cordova platform add browser --save
    - 删除平台

        demo> cordova platform ls  // 检查你当前平台设置状况
            已安装平台:
            android 9.1.0
            ios 6.2.0
            可用的平台:
            browser ^6.0.0
            electron ^1.0.0
            windows ^7.0.0

    - 启动/构建/测试APP
        demo> cordova run browser     // 启动 
        demo> cordova build           // 构建所有添加的平台 build包含同步(prepare)动作和打包(compile)动作
        demo> cordova build ios   

    - 移动平台环境搭建

        cordova在6.4.0（cordova-android在6.1.2）之后，会要求安装Gradle，基于Gradle来编译、打包android
        官网：https://gradle.org/releases/ 
        百度：Software/android/gradle-6.9.1-bin.zip
        环境变量：Path编辑添加 D:\xxx\gradle-6.9.1-bin\gradle-6.9.1\bin
        重启电脑
       
        demo> cordova requirements    // 检测你是否满足构建平台的要求
        demo> cordova emulate android // 模拟器启动APP
        demo> cordova run android     // 真机上测试APP

    - 调试
        chrome://inspect/#devices

    - 同步公共(/www)代码到平台
        demo> cordova prepare android
        demo> cordova prepare ios

    - 编译打包到平台
        demo> cordova compile android
        demo> cordova prepare ios


# vue3部署cordova
1. xxx> npm install -g cordova
2. 创建一个空项目 hello> cordova create demo // 命令选项：cordova help create
3. 添加一个平台 demo> cordova platform add android // 可以添加平台查看：cordova platform  
4. 运行App demo> cordova run android

# cordova真机运行vue项目出现空白页

# 打包APK
D:\SVN\_____base\GoPay\v3_gopay\platforms\android\app\build\outputs\apk\debug


# 打开项目
===+
[FORM_START]
Android Studio > File > Open > D:\Ewan\Hello\cordova\demo\platforms\android\app
▼app▼ ▼Nexus 6 (Edited) API 30▼  ▶
[FORM_END]
===-




