const app = getApp()
var api = require("../../../utils/api.js")
var request = require("../../../utils/request.js")
var util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var screenWidth = wx.getSystemInfoSync().windowWidth // 获取图片显示宽度
    var screenHeight = wx.getSystemInfoSync().windowHeight // 获取屏幕的高度

    var publishHeight = 50;
    var listHeight = screenHeight
    var bottomLeftWidth = screenWidth - 100 - 20
    this.setData({
      listHeight: listHeight,
      bottomLeftWidth: bottomLeftWidth
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickDianZan: function (e) {
    if (!app.globalData.userData) {
      wx.showModal({
        title: '提示',
        content: '你还没有登录,是否去登录?',
        cancelText: '继续逛逛',
        confirmText: '去登录',
        success: function (res) {
          if (res.confirm == true) {
            wx.switchTab({
              url: '../../geRen/home/home',
            })
          }
        }
      })
      return
    }
    var that = this
    var item = e.currentTarget.dataset.item
    var data = {
      openid: app.globalData.userData.wxa_openid,
      post_id: item.id,
      reply_type: "2",
    }
    if (item.dianzan_flag == true) {
      data.reply_type = "3"
    } else {
      data.reply_type = "2"
    }
    request.request(api.AddReplyPost, data).then(function (res) {
      that.getList()
    })
  },
  clickDetail: function (e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../detail/detail?id=' + item.id,
    })
  },
  getList: function () {
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
      is_ziji: "1"
    }

    request.request(api.GetPostList, data).then(function (res) {
      that.setData({
        list: res.data
      })
    }, function (res) {
      that.setData({
        list: []
      })
    })
  }
})