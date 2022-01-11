
===+
[##] Dart Web开发环境配置
    [DartPad体验和运行](https://dartpad.dartlang.org/)
    1. 安装Dart
        命令安装
            管理员cmd安装[chocolatey](https://chocolatey.org/)
            xxxx> @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
            xxxx> choco install dart-sdk
                Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y
        [下载安装](http://www.gekorm.com/dart-windows/) 以管理员身份运行 检查是否将Dart SDK的bin目录加入环境变量：系统变量 > Path：C:\Program Files\Dart\dart-sdk\bin
        xxxx> dart --version

    2. 下载开发工具
        xxxx> pub global activate webdev
        xxxx> pub global activate stagehand 
        系统变量 > Path：C:\Users\new\AppData\Local\Pub\Cache\bin
    3. 创建Dart Web项目
        dart-demo> stagehand web-simple
        dart-demo> pub get

        dart-demo> webdev serve // 运行项目
        dart-demo> dart2js -O2 -o test.js test.dart // 将dart文件编译转为js文件 [更多参数和复杂用法命令](https://webdev.dartlang.org/tools/dart2js)


[##] 移动应用开发[Flutter](https://flutterchina.club/)
    [Windows](https://flutterchina.club/setup-windows/)
        下载安装[Flutter SDK](https://docs.flutter.dev/development/tools/sdk/releases#windows)

===-