// pages/movie/more-movie/more-movie.js

var app = getApp();//引用全局变量
var util = require('../../../utils/util.js');
Page({
  data: {
    movies:{},
    navigateTitle:"",
    requestUrl:"",
    totalCount:""
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle= category;
    var dataUrl = "";
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase+"/v2/movie/in_theaters";
      break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
      break;
      case "豆瓣top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
      break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
    //console.log(category);

  },

  onScrollLower:function(event){
   // console.log("加载更多");
   var nextUrl = this.data.requestUrl+"?start"+this.data.totalCount+"&count=20";
   util.http(nextUrl, this.processDoubanData);

  },

  processDoubanData:function(moviesDouban){
    //console.log(data);
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    this.data.totalCount += 20;
     this.setData({
       movies:movies
     });
  },
  

  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success:function(res){
        //success
      }
    })
  },

  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
    url: '../movie-detail/movie-detail?id='+movieId
      //url: '../../music/music'
    })
  },
})