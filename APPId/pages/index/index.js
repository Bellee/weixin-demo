//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    movies: {}
  },

  onLoad: function (options) {
    var itMusic = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=6";
    this.getMusicListBook(itMusic);
  },

  getMusicListBook: function (url) {
    var that = this;
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

  processDoubanData: function(moviesDouban){
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var summary = subject.summary;
      if (summary.length >= 100) {
        summary = summary.substring(0, 100) + "...";
      }
      var temp = {
        year:subject.year,
        title: subject.title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        summary:summary
      }
      movies.push(temp);
    }

   // console.log(moviesDouBan);
    console.log(movies);
    this.setData({
      movies: movies
    });

     

  },

  
})