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
    var publishHeight = 50;
    var listHeight = screenHeight - publishHeight
    this.setData({
      rightWidth: rightWidth,
      publishHeight: publishHeight,
      listHeight: listHeight
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
    if (app.globalData.userData.c_username == null || app.globalData.userData.c_username.length == 0 || app.globalData.userData.c_phone == null || app.globalData.userData.c_phone.length == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未维护您的个人信息,是否去维护',
        success: function (res) {
          if (res.cancel) {

          } else {
            wx.navigateTo({
              url: '../../my/info/info',
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '../publish/publish',
    })
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
    request.request(api.GetGoodsList, data).then(function (res) {
      that.setData({
        list: res.data
      })
    }, function(res) {
      that.setData({
        list: []
      })
    })
  }
})