var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({
  data: {
    picwidth:0,
    systemInfo: {},
    navbar: ['推荐', '新作','今日'],
    currentNavbar: '0',
    swipers: [],
    list: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/6f6f44eb405dfa758037fec20bd66ecb.png',
      'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/6f6f44eb405dfa758037fec20bd66ecb.png',
          ],
    hot_last_id: 0,
    latest_list: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/6f6f44eb405dfa758037fec20bd66ecb.png',              'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/6f6f44eb405dfa758037fec20bd66ecb.png',
      'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/840f38d64039941680c59e0e2db2a0bf.png',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/6f6f44eb405dfa758037fec20bd66ecb.png',
      'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/6f6f44eb405dfa758037fec20bd66ecb.png',
      'http://bmob-cdn-14674.b0.upaiyun.com/2017/10/25/840f38d64039941680c59e0e2db2a0bf.png',
    ],
    latest_last_id: 0,
    today_pic:"",
    today_text_1:"",
    today_text_2:"",
    today_text_3:"",
  },

  onLoad() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          picwidth: res.windowWidth/2-2,
          systemInfo: res
        })
      }
    })
    this.getBmobData()
    this.getSwipers()
    this.pullUpLoad()
  },
  getBmobData:function(){
    wx.hideNavigationBarLoading()
    
    var that = this
    var PicRes = Bmob.Object.extend("pic_res");
    var query = new Bmob.Query(PicRes);
    // 查询所有数据
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        var allpic = [];
        var listpic = [];
        var newpic = [];
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if ("推荐" === object.get('type')) {
            allpic.unshift(object.get("picfile").url);
          }
          if ("热门" === object.get('type')) {
            listpic.unshift(object.get("picfile").url);
          }
          if ("新作" === object.get('type')) {
            newpic.unshift(object.get("picfile").url);
          }
          if ("今日语1" === object.get('type')) {
            that.setData({
              today_text_1: object.get("text")
            })
          }
          if ("今日语2" === object.get('type')) {
            that.setData({
              today_text_2: object.get("text")
            })
          }
          if ("今日语3" === object.get('type')) {
            that.setData({
              today_text_3: object.get("text")
            })
          }
          if ("今日" === object.get('type')) {
            that.setData({
              today_pic: object.get("picfile").url
            })
          }
          // console.log(object.id + ' - ' + object.get('type'));
          // console.log("网址：" + object.get("picfile").url);
        }
        that.setData({
          swipers: allpic,
          list: listpic,
          latest_list: newpic,
        })
            wx.stopPullDownRefresh()
      },
      error: function (error) {
            wx.stopPullDownRefresh()
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  /**
   * 点击跳转详情页
   */
  onItemClick(e) {
    var targetUrl = api.PAGE_WORK
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl + '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * 切换 navbar
   */
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
      this.pullUpLoadLatest()
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
   
    switch (this.data.currentNavbar) {
      case '0':
        this.getBmobData()
        this.pullUpLoad()
        break
      case '1':
        this.getBmobData()
        this.pullUpLoadLatest()
        break
      case '2':
        wx.stopPullDownRefresh()
        break
    }
  },

  // /**
  //  * [推荐]上拉刷新
  //  */
  pullUpLoad() {
    wx.showNavigationBarLoading()
    this.getBmobData()
    // api.get(api.HOST_IOS + api.HOT + '?last_id=' + this.data.hot_last_id)
    //   .then(res => {
    //     this.setData({
    //       list: this.data.list.concat(res.data.list),
    //       hot_last_id: res.data.last_id
    //     })
    //     wx.hideNavigationBarLoading()
    //     wx.stopPullDownRefresh()
    //   })
  },

  // /**
  //  * [最新]上拉刷新
  //  */
  // pullUpLoadLatest() {
  //   wx.showNavigationBarLoading()
  //   api.get(api.HOST_IOS + api.LATEST + '?last_id=' + this.data.latest_last_id)
  //     .then(res => {
  //       this.setData({
  //         latest_list: this.data.latest_list.concat(res.data.list),
  //         latest_last_id: res.data.last_id
  //       })
  //       wx.hideNavigationBarLoading()
  //       wx.stopPullDownRefresh()
  //     })
  // }
})
