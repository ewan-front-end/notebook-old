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
            <span>M 2021.11.21 18:57</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>IOS</h1><strong>IOS</strong>
</div>
<div class="static-content">



<pre class="code-block">
<span class="h2 bg3 cf"> cordova项目IOS端运行 </span>
依赖：百度云/Mac/cordova-ios-shell.zip
1 demo/
2 demo/iOS
3 demo/www
4 解压 cordova-ios-shell.zip 到 demo/ios/ 
5 把h5项目打包人代码放置 demo/www/
6 vscode 打开 demo
7 demo/www/index.html 插入 &lt;script src=“cordova.js”&gt;&lt;/script&gt;
8 demo/ios&gt; cordova build ios
9 Xcode &gt; open a project &gt; 
	demo/ios/platforms/ios
	选择设备
	run &gt;
</pre>




创建AppID(应用ID非AStoreID)

开发者账号
https://developer.apple.com/  导航 Account 进入，登录自己的开发者帐号

## 申请iOS开始证书
- 流程
    通过keychain生产一个CSR文件 > 提交给苹果的证书认证中心进行签名[Apple Worldwide Developer Relations Certification Authority(WWDR)] > 下载并安装使用产生一个私钥
- 数字证书私钥查询





## 数字签名原理
[对称加密]() [非对称加密]() [摘要运算]()

假设现在有通信双方 A 和 B ，现在 A 向 B 发消息
两者之间使用两套非对称加密机制。





    非对称加密算法 RSA 的数学原理
        1、选两个质数 p 和 q，相乘得出一个大整数n，例如 p = 61，q = 53，n = pq = 3233
        2、选 1-n 间的随便一个质数e，例如 e = 17
        3、经过一系列数学公式，算出一个数字 d，满足：
    　　　　a.通过 n 和 e 这两个数据一组数据进行数学运算后，可以通过 n 和 d 去反解运算，反过来也可以。
    　　　　b.如果只知道 n 和 e，要推导出 d，需要知道 p 和 q，也就是要需要把 n 因数分解。




XCode App 签名
    哈希算法     私钥 
    信息摘要  >  摘要加密  >  数字签名

申请iOS开始证书
    keychain
    CSR文件   >  提交给苹果的证书认证中心进行签名  >  苹果官网下载并安装使用
                                                   私钥
                                                   签名


iOS系统原本就持有WWDR的公钥

===-


## APP签名

- 快捷查看系统中能用来对代码进行签名的证书
> security find-identity -v -p codesigning

- 对未签名app手动签名
> codesign -s 'iPhone Developer: Yongjun Ma (5R2CR73PQ7)' TXChatParent.app
> 注: xx.app文件是xx.ipa文件修改扩展名,xx.ipa.zip解压后包含的xx.app文件

- 对已签名app重新签名
> codesign -f -s 'iPhone Developer: Yongjun Ma (5R2CR73PQ7)' TXChatParent.app

- 查看指定app的签名信息
> codesign -vv -d /Users/apple/genPackage/IOS_Parent/Payload/TXChatParent.app

- 验证签名文件的完整性
> codesign --verify /Users/apple/genPackage/IOS_Parent/Payload/TXChatParent.app

## 证书、签名、私钥、描述文件的一句话描述
1. 证书分两种：开发者证书、发布者证书。前者开发时使用，后者发布使用
2. 模拟器调试无需代码签名；真机调试需开发者证书代码签名；发布时需发布证书签名
3. 代码签名需要：证书+私钥，缺一不可
4. 真机调试时要求在设备上安装描述文件（provision profile），该文件包含信息：调试者证书，授权调试设备清单，应用ID。一个应用对应一个描述文件。






## MobileProvision更新
> 更换开发者开发证书后，如何更新xxxx.mobileprovision文件 [MobileProvision更新](https://www.jianshu.com/p/32aaee0639fe)
- mobileProvision文件的存放位置
    1. Xcode中显示的 mobile provision 文件
    2. Device，与Mac连接的真机
- 清除
    1. 使用命令行工具清空Xcode中显示的provision文件
        cd ~/Library/MobileDevice/Provisioning\ Profiles/    
        rm -rf *.mobileprovision
    2. 删除手机设备中的 mobileprovision 文件
        在Xcode 中，依次打开 Window > Devices， 选择连接的手机，右键单击“Show Pvovisioning Profiles”，删除里面不需要的mobileprovision文件
- 添加
    1. 从苹果开发者账号上，下载provision文件，双击安装，既可以安装到Xcode中，同时，也会安装到设备中。
    2. 同时，在Xcode上，登录开发者账号，下载最新的，可用的mobileprovision文件。
- 导出
    > Xcode > Window > Devices， 选择连接的手机，右键单击“Show Pvovisioning Profiles”，选择列表里未过期的右键 导出

- 查看
    > 通过shell命令查看：security cms -D -i xxxx.mobileprovision






const md5 = require("md5")








</div>