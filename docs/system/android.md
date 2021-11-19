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
            <span>M 2021.11.19 15:34</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Android</h1><strong>Android</strong>
</div>
<div class="static-content">



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


# 打开项目

<pre class="code-block"><div class="form-elements">Android Studio &gt; File &gt; Open &gt; D:\Ewan\Hello\cordova\demo\platforms\android\app
<span class="drop-down"><i>app</i></span> <span class="drop-down"><i class="Edited">Nexus 6 </i></span>  ▶
</div></pre>






</div>