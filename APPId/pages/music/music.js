// pages/music/music.js
var app=getApp();

Page({
  data: {
  dbMusic:{}
  },
  onLoad: function (options) {
    var songid = Math.random()*1000+82200;
    var itMusic = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id=87757&&num=10";
    this.getMusicListBook(itMusic);
  },

  getMusicListBook:function(url){
    var that=this;
    wx.request({
      url: url,
      data: {
      },
      header: {
        'content-type': '' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.processDoubanData(res.data);
      }
    })
  },

  processDoubanData:function(musicDouBan){
    var dbMusic=[];
    musicDouBan=musicDouBan.result;
    for(var index in musicDouBan.list){
      var music = musicDouBan.list[index];
      var temp = {
        title:music.title,
        author:music.author,
        language:music.language,
        pic:music.pic_big,
        publishtime:music.publishtime
      };

      dbMusic.push(temp);

    }

    
    console.log(musicDouBan);
    console.log(dbMusic);
    this.setData({
      dbMusic: dbMusic
    });
    
  }
})