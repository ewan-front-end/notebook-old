[上一级](../)




# 用户
git config --global user.name "wanyuaning" //用户名和邮箱地址是本地git客户端的一个变量,每次commit都会用用户名和邮箱纪录。github的contributions统计就是按邮箱来统计的
git config --global user.email wanyuaning@163.com
git config --list .  // 查看
# 工作
git config user.name "ewanq"
git config user.email ewanoo@163.com




```
配置用户名与邮箱
用户名和邮箱地址是本地git客户端的一个变量,每次commit都会用用户名和邮箱纪录。github的contributions统计就是按邮箱来统计的
查看
git config user.name
git config user.email
修改
用户级别                                    系统级别              库级别
git config --global user.name "username"   git config --system   git config
git config --global user.email "email"     git config --system   git config
~/.gitconfig                               /etc/gitconfig        项目.git文件夹下


修改git提交记录的邮箱(变基过程)
1. 打开提交记录
  git rebase -i                   // 最近一条
  git rebase -i "your commit id"  // 指定某一条记录

2. git commit --amend
3. 退出变基
git rebase --continue
 




❶ git init 
❷ curl -u 'wanyuaning' https://api.github.com/user/repos -d '{"name":"demo"}'    Wanyuaning... ...   user/repos  orgs/wmgcuan/repos
❸ git remote add github https://github.com/wanyuaning/demo.git   wanyuaning/demo.git   wmgcuan/demo.git
❹ git push github master:master
------------------------------------------------------------------------

GIT仓库
 $ cat .gitignore 
node_modules
*.[oa]   忽略所有以 .o 或 .a 结尾的文件
*~        忽略所有以波浪符结尾的文件
npm-debug.log.*
.vscode

 非Git目录 
git init

 克隆已有仓库 
git clone [url]
```

### 开发操作 
```
git add ..  【取消:git reset HEAD b.txt】【查看跟踪状态:git status】
git commit -m '说明1'   【修正:git commit --amend -m '说明2'】【撤销:git reset --soft HEAD~】【撤消文件修改:git checkout -- b.txt】【撤消所有修改:git checkout . 】【提交信息:git log】
git push -u origin master:master   origin为关联的远库短名，master为分支名

git mv file_from file_to【rm+add】
git rm a.js 【已暂存文件:git rm <file> -f】
git add NEWNAME

git pull 【fetch +merge】

git fetch origin master:demo    在本地新建一个demo分支，并将远程origin仓库的master分支代码下载到本地demo分支
git merge demo                         合并demo分支到本地当前的master分支 【本地代码与demo分支比较:git diff demo】【删除temp分支:git branch -d demo】

 关联远程仓库 
关联一个远程仓库: 远程必须存在同名仓库，本地推送才能成功(如不存在，可考虑GitAPI[创建远程仓库])
git remote add github https://github.com/wanyuaning/gitdemo.git  // github为可自定义的简短名,默认origin
git remote add gitee https://gitee.com/wanyuaning/gitdemo.git

git remote                                   查看关联的远库名称(列表)
git remote -v                              查看关联的远库详细信息(列表)
git remote show gitee               查看关联的远库更多信息
git remote rm gitee                    删除关联的远程仓库
git remote rename github hub  重命名

 分支 
$ git branch -a                    查看分支
$ git branch iss53               新建分支
$ git checkout iss53           切换分支

 标签 
git tag
git tag -l 'v1.8.5*'
git push origin v1.8.5          提交标签

切换分支或标签
$ git checkout iss53           切换分支
$ git checkout v1.8.5

 场景                                                                         
项目关联到多个远程库 【项目名:tensorflow-demo】
 创建Github上的远程仓库   创建Gitee上的远程仓库 
curl 'https://api.github.com/user/repos' -u 'wanyuaning' -d '{"name":"tensorflow-demo"}'   // ❶使用[全局工具/curl]   ❷GitAPI[创建远程仓库]
curl 'https://gitee.com/api/v5/user/repos' -d '{"access_token":"1e5ac05ccc2e6136e41ba5e453d7968e","name":"tensorflow-demo","has_issues":"true","has_wiki":"true","can_comment":"true"}' -X POST --header 'Content-Type: application/json;charset=UTF-8'
 初始本地库 
git init 
 关联Github远程库   关联Gitee远程库 
git remote add github https://github.com/wanyuaning/tensorflow-demo.git 
git remote add gitee https://gitee.com/wanyuaning/tensorflow-demo.git 
git remote -v   // 查看关联的远程仓库的详细信息
 开发 
touch .gitignore README.md
git add . 
git commit -m 'readme'
git push github master:maste  // 提交到Github
git push gitee master:maste  // 提交到Gitee

项目关联到多个远程库 

Git API
Basic权限认证 账号和密码
SSH公钥 可以让你在你的电脑和码云通讯的时候使用安全连接
私人token 可以使用私人令牌访问 OpenAPI
github.com/Settings/ Developer settings/Personal access tokens/Generate new token: f325828e29f741e10b1b55473e63feffe575a94f
gitee.com/设置/安全设置/私人令牌: 1e5ac05ccc2e6136e41ba5e453d7968e

GitAPI[创建远程仓库]
github 交互密码方式
curl -u 'wanyuaning' https://api.github.com/user/repos -d '{"name":"仓库名"}'  新建到账号：user/repos  新建到组织：orgs/wmgcuan/repos   
github token方式
curl https://api.github.com/user/repos?access_token=f325828e29f741e10b1b55473e63feffe575a94f -d '{"name":"仓库名"}'
？
curl https://api.github.com/user/repos -H "Authorization:token f325828e29f741e10b1b55473e63feffe575a94f" -d '{"name":"仓库名"}'
码云 私人令牌方式
curl 'https://gitee.com/api/v5/user/repos' -d '{"access_token":"1e5ac05ccc2e6136e41ba5e453d7968e","has_issues":"true","has_wiki":"true","can_comment":"true","name":"仓库名"}' -X POST --header 'Content-Type: application/json;charset=UTF-8'
注[码云创建新库选项]




 注 
git reset 
HEAD~1的意思是上一个版本，也可以写成HEAD^，如果你进行了2次commit，想都撤回，可以使用HEAD~2
--soft       不删除工作空间改动代码，撤销commit，不撤销git add . 
--mixed    不删除工作空间改动代码，撤销commit，并且撤销git add . 操作这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。
--hard       删除工作空间改动代码，撤销commit，撤销git add . 注意完成这个操作后，就恢复到了上一次的commit状态。

git log
$ git log -p -2  最近两次提交
$ git log --stat  看到每次提交的简略的统计信息
$ git log --pretty=oneline/short/full/fuller   不同于默认格式的方式展示提交历史
$ git log --pretty=format:"%h - %an, %ar : %s"   定制要显示的记录格式

git push <远程主机名> <本地分支名>:<远程分支名>
git push origin master:master  将本地的master分支推送到origin主机的master分支
git push origin master               将本地的master分支推送到origin主机的master分支。如果后者不存在，则会被新建
git push origin :master              推送空本地分支到origin主机的master分支。相当于删除origin主机的master分支
git push origin                            将当前分支推送到origin主机的对应分支。当前分支与远程分支之间存在追踪关系
git push                                       当前分支只有一个追踪分支
git push -u origin master	     当前分支与多个主机存在追踪关系，使用-u选项指定一个默认主机

--set-upstream

git pull <远程主机名> <远程分支名>:<本地分支名>

码云创建新库选项
access_token	："1e5ac05ccc2e6136e41ba5e453d7968e"  用户授权码
name*:"仓库名" 仓库名称
description: "" 仓库描述
homepage: ""	 主页(eg: https://gitee.com)
has_issues: "true"	允许提Issue与否。默认: 允许(true)
has_wiki: "true"	 提供Wiki与否。默认: 提供(true)
can_comment: "true" 允许用户对仓库进行评论。默认： 允许(true)
auto_init: "false"	 值为true时则会用README初始化仓库。默认: 不初始化(false)
gitignore_template: "" Git Ingore模版
license_template: ""	 License模版
private: "false" 仓库公开或私有。默认: 公开(false)


未清理
Mac上Git配置与查询
项目/.git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/wanyuaning/gitdemo.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[user]
	name = ewanq  // git config user.name "ewanq" 
	email = ewanoo@163.com  // git config user.email ewanoo@163.com
全局
git config --global user.name "wanyuaning"
git config --global user.email wanyuaning@163.com
git config --list .  // 查看
git config user.name
远程通信帐户管理
git config --global credential.helper  方式查询
git config --global credential.helper ''  默认不保存，每次都要输入用户名和密码
git config --global credential.helper cache --timeout <seconds> 缓存时间
git config --global credential.helper store --file <path> 明文记录
默认`~/.git-credentials`
https://username%40163.com:password@github.com
git config --global credential.helper osxkeychain

切换Git帐户
1 vi .git-credentials 
2 编辑完帐户，esc > shift+: > wq
3 删除钥匙串里缓存列 


NPM包
账户 
u:wanyuaning  p:wanyuan...ew.. e:wanyuaning@163.com
组织：seahan、angg
规范
bin  可执行二进制文件
lib  javascript代码
doc  文档
test  单元测试用例
package.json  包描述
{
"name": "@angg/express"
"repository": { "type": "git", "url": "https://github.com/wmgcuan/express.git" },
"homepage": "https://github.com/wmgcuan/express",
"bugs": { "url": "https://github.com/wmgcuan/express/issues" }
}


发布 https://segmentfault.com/a/1190000009315989
1 $ npm adduser // 命令向导分别要求填入username/password/email,可通过 npm whoami 查看当前用户
2 $ npm publish --access public // npm publish 默认发布私有，所以会导致失败，如果是二次发布，则需先迭代version

多人发布
npm owner add <user> [<@scope>/]<pkg> # 将用户添加到包的所有者列表,如 npm owner add wanyuaning @angg/express>
npm owner rm <user> [<@scope>/]<pkg> # 从包的所有这列表中删除用户
npm owner ls [<@scope>/]<pkg> # 列出包的所有者


### Git命令
git branch
git checkout master
git status
git add .
git commit -m 'a'
git checkout master
git branch
git branch -D ewan_dev
git branch
git pull
git branch ewan_dev
git checkout ewan_dev
git status
git add .
git commit -m 'fix(View)' 
git push --set-upstream origin ewan_dev
```

```
【h3 ch|版本对比】
git diff                                   查看尚未暂存的文件更新了哪些部分
git diff filename                          查看尚未暂存的某个文件更新了哪些
------------------------------------------------------------------------------------------
git diff –cached                           查看已经暂存起来的文件和上次提交的版本之间的差异
git diff –cached filename                  查看已经暂存起来的某个文件和上次提交的版本之间的差异
------------------------------------------------------------------------------------------
git diff 1ce40c9 d63e74c                   查看某两个版本之间的差异
git diff 1ce40c9:filename d63e74c:filename 查看某两个版本的某个文件之间的差异

【h3 ch|版本穿梭】
1 [b6 cf|git log] 日志  
  commit 859e11ac647310dc3edd24324b892e249bcd3d41
  Author: ewan <wane@qq.com>
  Date:   Fri Nov 20 20:26:38 2020 +0800
  [b6 cf|git log --pretty=oneline] 一行日志
  859e11ac647310dc3edd24324b892e249bcd3d41 提交说明
  [b6 cf|git reflog]    HEAD@｛0｝:版本穿梭时需要移动的步数
  [b ci|859e11a] HEAD@{1}: commit: 提交说明
2 [b3 cf|git reset --hard [b ci|859e11a]]  基于索引值的操作【推荐】
  [b3 cf|git reset –hard  HEAD^] （向后穿梭一步）  [b3 cf|git reset --hard HEAD^^^] (^符号有几个回退几步)  使用^符号：只能向后穿梭
  [b3 cf|git reset  --hard HEAD~1]  (波浪线后面跟后退步数)  使用~符号

【h3 cg|在签出前,请清理存储库工作树】
1 [b|先暂存改动]
  git stash 【查看 git stash  show】  //将修改存储到暂存区，工作区会删除这些修改
    [beBOX
    可以切换分支 git checkout <feture_branch>
    可以拉取操作 git pull]
  git stash pop //取出修改
  git add .

2 [b|放弃本地修改，直接覆盖]
  git reset --hard
  git pull

```





