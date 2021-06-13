<div class="extend-header">
<div class="info">
<a class="back" href="./">上一级</a>
<div class="mini">
<span>2021.01.02</span>
</div>
</div>
<div class="content">


</div>
</div>
<div class="content-header">
<h1>Android</h1>
</div>


# Android开发环境搭建

JDK安装包 | Android SDK
Eclipse 或 Android Studio


```
1. JDK包 下载[INFOB/android01(width:500px;left:-120px)] 安装 系统环境变量[INFOB/android02(width:750px;left:-220px)] 
3. 下载安装Eclipse[INFOB/android03(width:250px;left:-120px)]
4. Android SDK 下载[INFOB/android04(width:250px;left:-120px)]
    安装 会自动关联JDK安装 安装地址: D:\sdk\ (新建了sdk文件夹)
    启动 SDK Manager 下载安装可选工具
      下载不了平台工具的问题:
        代理软件Chrome49_v2016.1.1.7z https://github.com/comeforu2012/truth/wiki/ChromePlus  下载 解压 agent文件夹 以管理员身份运行goagnt.exe 弹出黑色命令提示符窗 代理地址127.0.0.1:8087
        Android sdk manager 左上tools菜单 options选项 
        HTTP Proxy Server：127.0.0.1 
        HTTP Proxy Port：8087 
        关闭设置窗口
      Download interrupted: peer not authenticated
        HTTP Proxy Server：mirrors.neusoft.edu.cn
        HTTP Proxy Port：80
        选中 Force https://… sources to be fetched using http://…」复选框
        关闭设置窗口 重新选择 Install
      还是不行 管理员身份修改C:\WINDOWS\system32\drivers\etc\hosts
        #==== Android SDK更新列表地址
        203.208.46.146  dl.google.com
        203.208.46.146  dl-ssl.google.com
        #====
      下载离线包[ciDETAIL/android011(width:400px;left:-150px)] 解压文档到指定目录 需新建缺失的 platforms，docs，samples，usb_driver，market_licensing 目录
        把android开头 > platforms/
        把goole_apis开头 > add-ons/
        把market_licensing-r01.zip解压 > market_licensing/
        把tools_r07-windows.zip解压 > tools/（先清空）
        把docs-2.2_r01-linux.zip解压 > docs
        把samples-2.2_r01-linux.zip和samples-2.1_r01-linux.zip解压 > samples/
        把usb_driver_r03-windows.zip解压 > usb_driver/

    系统环境变量：
        ANDROID_SDK_HOME: D:\sdk\
        Path: 追加 ;% ANDROID_SDK_HOME%\platform-tools;% ANDROID_SDK_HOME%\tools
    命令检测Android SDK是否安装成功：adb version
    
5. 为Eclipse安装ADT插件（Android Development Tools）以支持Android开发
    打开Eclipse软件
    Help > Install New Sofeware...
    [Add]  
      Name: ADT  
      Location: h-ttp://dl-ssl.google.com/android/eclipse/  
      [OK]
    勾选要安装的工具 [Next]

[android01][http://www.oracle.com/technetwork/java/javase/downloads/index.html
            jdk-15.0.1_windows-x64_bin.exe]
[android02][            
            JAVA_HOME:  C:\Program Files\Java\jdk-15.0.1                    可以 %JAVA_HOME% 作为JDK安装目录的统一引用路径
            Path:       ;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin                追加 
            CLASSPATH:  .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar  程序所需要的类或者包 "."表示当前目录]
[android03][http://www.eclipse.org/downloads/]
[android04][http://www.androiddevtools.cn/
            Android SDK 工具 > SDK Tools
            installer_r24.4.1-windows.exe]
[android011][百度云：Software/android开发环境包win64-2014-6-1.rar] 
```

[!“adb”不是内部或外部命令](platform-tools/复制adb.exe，AdbWinApi.dll，AdbWinUsbApi.dll 到 C:\用户\new 目录下.)
[!启动 Android Studio 时，每次都 Missing SDK](Android Studio安装目录/bin/idea.properties 末尾添加： disable.android.first.run=true 保存 重启Android Studio) 

# 第一个应用
创建AVG官方模拟器

# 谷歌api的安装包
Android SDK Tools, revision 10	                    http://dl-ssl.google.com/android/repository/tools_r10-windows.zip
Android SDK Platform-tools, revision 3	            http://dl-ssl.google.com/android/repository/platform-tools_r03-windows.zip
Android SDK Docs for Android API 11, revision1	    http://dl-ssl.google.com/android/repository/docs-3.0_r01-linux.zip
Android SDK Platform 3.0, revision 1	              http://dl-ssl.google.com/android/repository/android-3.0_r01-linux.zip
Android SDK Platform 2.3.3._r1 Revision 1	          http://dl-ssl.google.com/android/repository/android-2.3.3_r01-linux.zip
Android SDK Platform 2.3.1_r2 Revision 2(Obsolete)	http://dl-ssl.google.com/android/repository/android-2.3.1_r02-linux.zip
Android SDK Platform 2.2_r1 Revision 2	            http://dl-ssl.google.com/android/repository/android-2.2_r02-windows.zip
Android SDK Platform 2.1_r2 Revision 2	            http://dl-ssl.google.com/android/repository/android-2.1_r02-windows.zip
Android SDK Platform 1.6_r2 Revision 3	            http://dl-ssl.google.com/android/repository/android-1.6_r03-windows.zip
Android SDK Platform 1.5_r3 Revision 4	            http://dl-ssl.google.com/android/repository/android-1.5_r04-windows.zip
Android SDK Samples for Android API 11, revision1	  http://dl-ssl.google.com/android/repository/samples-3.0_r01-linux.zip
Android SDK Samples for Android API 10, revision1	  http://dl-ssl.google.com/android/repository/samples-2.3.3_r01-linux.zip
Android SDK Samples for Android API 9, revision1	  http://dl-ssl.google.com/android/repository/samples-2.3_r01-linux.zip
Android SDK Samples for Android API 8, revision1	  http://dl-ssl.google.com/android/repository/samples-2.2_r01-linux.zip
Android SDK Samples for Android API 7, revision1	  http://dl-ssl.google.com/android/repository/samples-2.1_r01-linux.zip
Android + Google APIs, API 11, revision 1	          http://dl-ssl.google.com/android/repository/google_apis-11_r01.zip
Android + Google APIs, API 10, revision 1	          http://dl-ssl.google.com/android/repository/google_apis-10_r01.zip
Android + Google APIs, API 9, revision 2	          http://dl-ssl.google.com/android/repository/google_apis-9_r02.zip
Android + Google APIs, API 8, revision 2	          http://dl-ssl.google.com/android/repository/google_apis-8_r02.zip
Android + Google APIs, API 7, revision 1	          http://dl-ssl.google.com/android/repository/google_apis-7_r01.zip
Android + Google APIs, API 4, revision 2	          http://dl-ssl.google.com/android/repository/google_apis-4_r02.zip
Android + Google APIs, API 3, revision 3	          http://dl-ssl.google.com/android/repository/google_apis-3-r03.zip
Google USB Driver package, revision 4	              https://dl-ssl.google.com/android/repository/usb_driver_r04-windows.zip

# Android开发环境包
https://pan.baidu.com/s/1eQGJqi2 
https://pan.baidu.com/s/1eQGJqi2
