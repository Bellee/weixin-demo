Page({
  data: {
    //"username": "admin",
    //"password": "123456"
    phone: '',
    password: ''
  },

 onLoad:function(option){
   wx.request({
     url: "http://111.231.78.161:80/ajaxLogin",
     data: {
       "username":"admin",
       "password":"123456"
     },
     method:'POST',
    header: { 
        "Content-Type": "application/x-www-form-urlencoded"
         },
     success: function (res) {
       console.log(res)
     }
   })
 },


  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面 
      

      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })

      wx.navigateTo({
        url: '../index/index'
      })  
      
    }
  }
}) 