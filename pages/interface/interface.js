var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
var app = getApp()
var grids = [
   {"name":"发送短信","ico":"sms.png","url":"../sendSms/sendSms"},
   {"name":"图片上传","ico":"pic.png","url":"../picasa/picasa"},
   {"name":"微信自动登录","ico":"autologin.png","url":"../sendSms/sendSms","click":"autuLogin"},
   {"name":"获取openid","ico":"openid.png","url":"../getOpenId/getOpenId"},
   {"name":"微信支付","ico":"pay.png","url":"../pay/pay"},
   {"name":"生成二维码","ico":"code.png","url":"code/code"},
   {"name":"登录","ico":"login.png","url":"../login/login"},
   {"name":"注册","ico":"reg.png","url":"../register/register"},
   
   {"name":"退出","ico":"logout.png","url":"../logout/logout"},
  //  { "name": "群聊", "ico": "liao.png", "url": "../interface/chatroom/chatroom" },
  
];
Page({    
    data: {        
        userInfo: {},
        grids: grids,
        imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/22/7aac40a640c1b6fe80856a3826195055.png',
          'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/22/7aac40a640c1b6fe80856a3826195055.png'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000
    
    },
    onLoad:function(){
        var that = this 
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    autuLogin:function(){
        common.showModal("App.js实现小程序访问则将数据写入系统User表，具体代码请查看App.js。")
    },
  goToLoaction: function () {
      //根据经纬度在地图上显示108.631905,21.971969
      wx.openLocation({
        longitude: 108.631905,
        latitude: 21.971969,
        address: "插花工艺设计",
        name: "达兴插花"
      })
    },
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    }
})