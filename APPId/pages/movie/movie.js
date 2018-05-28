// pages/movie/movie.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPanelShow:false
  },

  onLoad:function(event){
    var inTheatersUrl = app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣top250");
  },

  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category
     //url: 'more-movie/more-movie'
    })
  },

  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId
        
    })
  },

  getMovieListData: function (url, settedKey, categoryTitle){
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        "content-type": ""
      },
      success: function (res) {
        //sucess
        console.log(res);
        that.processDoubanData(res.data, settedKey, categoryTitle);

      },
      fail: function () {
        //fail
        console.log(error);
      }
       
    })
  } ,

  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true,
      searchResult:{}
    })
  },


 onCancelImgTap:function(event){
   this.setData({
     containerShow: true,
     searchPanelShow: false
   })
 },

 onBindChange:function(event){
   var text = event.detail.value;
   var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
   this.getMovieListData(searchUrl, "searchResult", "");
 },



  processDoubanData:function(moviesDouban,settedKey,categoryTitle){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6)+"...";
      }
      var temp = {
        title:title,
        average:subject.rating.average,
        coverageUrl: subject.images.large,
        movieId:subject.id,
        stars:util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var readyData = {};

    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies:movies
    }
    //console.log(readyData);
    this.setData(readyData);
  }  
}) 