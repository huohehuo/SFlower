var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

    },
    
    about: function (e) {
         common.showModal('插花设计，分享你我');
    },
    scanSide:function(e){
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          console.log(res)
          common.showModal('扫码获取：'+res.result);
        }
      })
    }

})