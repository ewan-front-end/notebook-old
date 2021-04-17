```

&#32; == 普通的英文半角空格

&#160; == &nbsp; == &#xA0; == no-break space （普通的英文半角空格但不换行）

&#12288; == 中文全角空格 （一个中文宽度）

&#8194; == &ensp; == en空格 （半个中文宽度）

&#8195; == &emsp; == em空格 （一个中文宽度）

&#8197; == 四分之一em空格 （四分之一中文宽度）
```
　
<!-- layout:start:class2 -->
<!-- col:24 -->
|　　缩进(全角空格"　")
<!-- layout:end -->

<!-- layout:start:class2 -->
<!-- col:6 -->
  |&thinsp;|&#8201;|&#x2009;
<!-- col:6 -->
  |&nbsp;|&#160;|&#xA0;
<!-- col:6 -->
  |&ensp;|&#8194;|&#x2002;
<!-- col:6 -->
  |&emsp;|&#8195;|&#x2003;
  一个中文宽度&#12288;一个中文宽度&#12288;一个中文宽度&#12288;
  半个中文宽度&#8194;半个中文宽度&#8194;半个中文宽度&#8194;
  一个中文宽度&#8195;一个中文宽度&#8195;一个中文宽度&#8195;
  四分之一中文宽度&#8197;四分之一中文宽度&#8197;四分之一中文宽度&#8197;
<!-- layout:end -->

<!-- layout:start -->
<!-- col:6 -->
  |&amp;thinsp;|&amp;#8201;|&amp;#x2009;
<!-- col:6 -->
  |&amp;nbsp;|&amp;#160;|&amp;#xA0;
<!-- col:6 -->
  |&amp;ensp;|&amp;#8194;|&amp;#x2002;
<!-- col:6 -->
  |&amp;emsp;|&amp;#8195;|&amp;#x2003;
<!-- layout:end -->

<!-- layout:start:class1 -->
<!-- col:4 -->
  <h1>一级标</h1>
<!-- col:4 -->
  <h2>二级标</h2>
<!-- col:4 -->
  <h3>三级标</h3>
<!-- col:4 -->
  <h4>四级标</h4>
<!-- col:4 -->
  <h5>五级标</h5>
<!-- col:4 -->
  <h6>六级标</h6>
<!-- layout:end -->

<!-- layout:start -->
<!-- col:4 -->
  # 一级标
<!-- col:4 -->
  ## 二级标
<!-- col:4 -->
  ### 三级标
<!-- col:4 -->
  #### 四级标
<!-- col:4 -->
  ##### 五级标
<!-- col:4 -->
  ###### 六级标 
<!-- layout:end -->

<!-- layout:start:class2 -->
<!-- col:6 -->
  <strong>这是加粗的文字</strong>
<!-- col:6 -->
  <em>这是倾斜的文字</em>
<!-- col:6 -->
  <strong><em>这是斜体加粗的文字</em></strong>
<!-- col:6 -->
  <del>这是加删除线的文字</del>
<!-- layout:end -->

<!-- layout:start -->
<!-- col:6 -->
  **这是加粗的文字**
<!-- col:6 -->
  *这是倾斜的文字*
<!-- col:6 -->
  ***这是斜体加粗的文字***
<!-- col:6 -->
  ~~这是加删除线的文字~~
<!-- layout:end -->

<!-- layout:start:class3 -->
<!-- col:8 -->
  <font face=“微软雅黑”>字体</font>
<!-- col:8 -->
  <font font size=5>字号</font>
<!-- col:8 -->
  <font color=red>颜色</font>
<!-- layout:end -->

<!-- layout:start -->
<!-- col:8 -->
  &lt;font face=“微软雅黑”&gt;字体&lt;/font&gt;
<!-- col:8 -->
  &lt;font font size=5&gt;字号&lt;/font&gt;
<!-- col:8 -->
  &lt;font color=red&gt;颜色&lt;/font&gt;
<!-- layout:end -->





>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
---
----
***
*****
```
>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
---
----
***
*****
```


![图片alt](图片地址 ''图片title'')

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

![blockchain](./timg.jpg "图片名称")


[超链接名](超链接地址 "超链接title")<br>
[简书](http://jianshu.com)
[百度](http://baidu.com)<br>
<a href="http://baidu.com" target="_blank">新窗口百度</a>










