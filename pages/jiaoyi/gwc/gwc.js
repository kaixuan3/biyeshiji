const app = getApp()
var api = require("../../../utils/api.js")
var request = require("../../../utils/request.js")
var util = require("../../../utils/util.js")
var encrypt = require("../../../utils/encrypt/encrypt.js")

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

    var rightWidth = screenWidth - 90
    this.setData({
      rightWidth: rightWidth,
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
  clickItem: function (e) {
    var item = e.currentTarget.dataset.item
    var listJson = JSON.stringify(item)
    let mode64 = encrypt.encode(listJson)
    let modeEncode = encodeURIComponent(mode64)
    wx.navigateTo({
      url: '../detail/detail?item=' + modeEncode,
    })
  },
  getList: function () {
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
    }
    request.request(api.GetCollectionList, data).then(function (res) {
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