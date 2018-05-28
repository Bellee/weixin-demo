// pages/read/read.js
 
var app  = getApp();
Page({
  data: {
  dbBooks:{}
  },
 
  onLoad: function (options) {
    var itBook = app.globalData.doubanBase+"/v2/book/search?q=python&fields=id,title"+"?start=0&count=6";
   // var itBook = app.globalData.doubanBase + "v2/book/18";
     this.getBookListData(itBook);
  },

  /*onTap:function (event) {
      wx.switchTab({
        url: "../music/music"
      });
    },*/



  onLookTap:function(event){
    var bookId = event.currentTarget.dataset.bookid;
    console.log(bookId);
    wx.navigateTo({
      url: 'read-detail/read-detail?id='+bookId
    })
  },

  getBookListData:function(url){
    var that=this;
    wx.request({
      url: url,
      data: {
      },
      header: {
        'content-type': '' // 默认值
      },
      success: function (res) {
       console.log(res)
       that.processDoubanData(res.data);
      }
    })
  },

  processDoubanData: function(booksDouBan){
    var dbBooks=[];
   // console.log(booksDouBan.books);
    for (var idx in booksDouBan.books){
      var book = booksDouBan.books[idx];
      var title = book.title;
      var summary = book.summary;
      if(summary.length>=70){
        summary=summary.substring(0,70)+'...';
      }

      var temp={
        title:title,
        summary:summary,
        price:book.price,
        author:book.author[0],
        image:book.images.large,
        publisher:book.publisher,
        bookId:book.isbn
      } 
      dbBooks.push(temp);
    // console.log(dbBooks);
    }
    this.setData({
      dbBooks: dbBooks
    });
  } 
})