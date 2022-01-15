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
            <span>M 2022.01.15 14:21</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Dart</h1><strong>Dart</strong>
</div>
<div class="static-content">



<pre class="code-block">
<span class="h2 bg3 cf"> Dart Web开发环境配置 </span>
    <a href="https://dartpad.dartlang.org/" target="_blank">DartPad体验和运行</a>
    1. 安装Dart
        命令安装
            管理员cmd安装<a href="https://chocolatey.org/" target="_blank">chocolatey</a>
            <span class="block-command">xxxx</span> @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
            <span class="block-command">xxxx</span> choco install dart-sdk
                Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y
        <a href="http://www.gekorm.com/dart-windows/" target="_blank">下载安装</a> 以管理员身份运行 检查是否将Dart SDK的bin目录加入环境变量：系统变量 &gt; Path：C:\Program Files\Dart\dart-sdk\bin
        <span class="block-command">xxxx</span> dart --version

    2. 下载开发工具
        <span class="block-command">xxxx</span> pub global activate webdev
        <span class="block-command">xxxx</span> pub global activate stagehand 
        系统变量 &gt; Path：C:\Users\new\AppData\Local\Pub\Cache\bin
    3. 创建Dart Web项目
        <span class="block-command">dart-demo</span> stagehand web-simple
        <span class="block-command">dart-demo</span> pub get

        <span class="block-command">dart-demo</span> webdev serve <span class="comment">// 运行项目</span>
        <span class="block-command">dart-demo</span> dart2js -O2 -o test.js test.dart <span class="comment">// 将dart文件编译转为js文件 <a href="https://webdev.dartlang.org/tools/dart2js" target="_blank">更多参数和复杂用法命令</a></span>


<span class="h2 bg3 cf"> 移动应用开发<a href="https://flutterchina.club/" target="_blank">Flutter</a> </span>
    <a href="https://flutterchina.club/setup-windows/" target="_blank">Windows</a>
        下载安装<a href="https://docs.flutter.dev/development/tools/sdk/releases#windows" target="_blank">Flutter SDK</a>

</pre>

</div>