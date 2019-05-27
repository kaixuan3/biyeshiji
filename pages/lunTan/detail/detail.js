
const app = getApp()
var api = require("../../../utils/api.js")
var request = require("../../../utils/request.js")
var util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    replypostList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var screenWidth = wx.getSystemInfoSync().windowWidth // 获取图片显示宽度
    var screenHeight = wx.getSystemInfoSync().windowHeight // 获取屏幕的高度

    var publishHeight = 50;
    var listHeight = screenHeight - publishHeight
    this.setData({
      publishHeight: publishHeight,
      listHeight: listHeight,
    })


    this.setData({
      id: options.id
    })
    this.getDetail()
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
    var isReply = wx.getStorageSync("isReply")
    if (isReply == "1") {
      this.getDetail()
      wx.removeStorageSync("isReply")
    }
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
  clickReply: function () {
    wx.navigateTo({
      url: '../reply/reply?id=' + this.data.id,
    })
  },
  getDetail() {
    var that = this
    var data = {
      post_id: this.data.id
    }
    if (!app.globalData.userData) {
      data.openid = app.globalData.userData.wxa_openid
    }
    request.request(api.GetPostDetail, data).then(function (res) {
      that.setData({
        item: res.data,
        replypostList: res.data.replypostlist
      })
    })
  }
})