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
    var viewWidth = wx.getSystemInfoSync().windowWidth
    var viewHeight = wx.getSystemInfoSync().windowHeight
    var ratio = 200 / 200 //图片的真实宽高比例
    var width = viewWidth / 3
    var height = width / ratio
    // 然后存储图片的宽高值
    var image = {
      width: width,
      height: height
    }
    this.setData({
      images: image,
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
  /***************获取个人信息逻辑*****************/
  getUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: true
      })
      this.getUserData()
    } else {

    }
  },
  getUserData: function () {
    var that = this
    wx.login({
      success: res => {
        app.getMyAuth(res.code)
        app.userInfoReadyCallback = res => {
          if (res.success == false) {
            that.setData({
              isHaveIssue: true
            })
            return
          }
          this.setData({
            userData: res.data,
            hasUserInfo: true
          })
          app.bangding()
          wx.switchTab({
            url: '../../jiaoyi/home/home',
          })
        }
      }
    })
  },
})