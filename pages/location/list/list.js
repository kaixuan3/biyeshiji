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
    var listWidth = screenWidth - 20
    var listHeight = screenHeight - publishHeight
    this.setData({
      publishHeight: publishHeight,
      listWidth: listWidth,
      listHeight: listHeight,
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
  clickPublish: function () {
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  getList: function () {
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid
    }
    request.request(api.GetAddressList, data).then(function (res) {
      that.setData({
        list: res.data
      })
    })
  }
})