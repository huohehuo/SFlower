
var app = getApp()
Page({
  data: {
    pingmuwidth: 0,
    bigpic:"http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/6f6f44eb405dfa758037fec20bd66ecb.png",
  },

  onLoad() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pingmuwidth: res.windowWidth
        })
      }
    })
  },

})
