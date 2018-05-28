// pages/read/read-detail/read-detail.js

var bookData = require('../read.js');
var app = getApp();
Page({
  data: {
    dbBooks: {}
  },
  onLoad: function (options) {
    var bookId = options.id;
   // console.log(bookId);

    var itBook = app.globalData.doubanBase + "/v2/book/isbn/"+bookId;
   // var itBook = "http://111.231.78.161:80?id=" + bookId;
    this.getBookListData(itBook);
    //console.log(itBook);
  },


  getBookListData: function (url) {
    var that = this;
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

  processDoubanData: function (booksDouBan) {
    var dbBooks = [];
    // console.log(booksDouBan.books);
    

      var temp = {
        title: booksDouBan.title,
        summary: booksDouBan.summary,
        price: booksDouBan.price,
        author: booksDouBan.author[0],
        image: booksDouBan.images.large,
        publisher: booksDouBan.publisher,
        bookId: booksDouBan.id
      }
      dbBooks.push(temp);
      console.log(dbBooks);
  
    this.setData({
      dbBooks: dbBooks
    });
  }
   
})