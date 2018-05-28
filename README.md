# weixin-demo
资讯类微信小程序的设计与实现，基础是学习了慕课网上的电影资讯微信小程序

后台数据调用的是豆瓣和百度的api,豆瓣api更改为：http://t.yushu.im/wiki/?title=apiv2 ，不过只有在不设置APPID的情况下可以使用

啦啦啦，我想去嵩山少林学武功~~~   </br>

文件页面结构：
![image](https://github.com/bellee/weixin-demo/blob/master/readme_add_pic/weixin-pic1.png)

用到的api和组件
![image](https://github.com/bellee/weixin-demo/blob/master/readme_add_pic/weixin-pic2.png)

template电影页面示例：
![image](https://github.com/bellee/weixin-demo/blob/master/readme_add_pic/winxin-pic3.png)

四个主页面：首页 书籍页面 音乐页面 电影页面 


![image](https://github.com/bellee/weixin-demo/blob/master/readme_add_pic/weixin-pic4.jpg)


四个子页面： 书籍详情页 电影list 电影搜索页 电影详情页


![image](https://github.com/bellee/weixin-demo/blob/master/readme_add_pic/weixin-pic5.jpg)


食用提示：
clone此项目，在微信开发者工具里直接打开

在整个项目中也遇到很多的坑：

1、微信小程序不运行在浏览器，所以不能操作Dom，也没有document、window对象。

2、给视图绑定数据时，只有事件绑定、wx:key、wx:for-index、wx:for-item，直接绑定，不需要{{}}，其它绑定都要在{{}}里绑定。

3、app.json里的pages，最好是按照，层级顺序进行配置，要不然可能不会跳转。

4、content-type 默认为 'application/json';但是如果你在程序中这样写的话是获取不到数据的，只有写成’’,才行，到底是什么原因不得而知。
