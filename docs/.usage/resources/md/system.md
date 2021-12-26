
===+
#### Chrome
浏览器调试移动端网页：chrome://inspect/#devices

#### HTML
[指南](https://www.cnblogs.com/axl234/p/5084917.html)
meta
// 用户缩放页面
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
// 特定内容格式化检测：电话号码，邮箱，地址
<meta name="format-detection" content="telephone=no,email=no,adress=no" />
// 当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari
<meta name="apple-mobile-web-app-capable" content="yes" />
// 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式 可选default、black、black-translucent
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
// viewport模板 - 通用
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="format-detection" content="telephone=no">
        <meta name="format-detection" content="email=no">
        <title>标题</title>
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        内容
    </body>
</html>
// viewport模板 - target-densitydpi=device-dpi，android 2.3.5以下版本不支持
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi"><!-- width取值与页面定义的宽度一致 -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="format-detection" content="telephone=no">
        <meta name="format-detection" content="email=no">
        <title>标题</title>
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        内容
    </body>
</html>

## 常见问题
移动端字体
移动端字号单位 
===-