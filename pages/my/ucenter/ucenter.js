const app = getApp()
var api = require("../../../utils/api.js")
var request = require("../../../utils/request.js")
var util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {},
    hasUserInfo: false,
    hiddenmodalput: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var viewWidth = wx.getSystemInfoSync().windowWidth
    var viewHeight = wx.getSystemInfoSync().windowHeight

    var contentItemWidth = (viewWidth - 60) / 2
    var contentItemHeight = contentItemWidth
    var contentY = (viewHeight - 200 - (contentItemHeight * 2) - 20) / 2

    var contentWidth = contentItemWidth * 2 + 20

    var contentItemImgWidth = contentItemWidth / 3.5
    var contentItemImgHeight = contentItemImgWidth

    this.setData({
      contentY: contentY,
      contentWidth: contentWidth,
      contentItemWidth: contentItemWidth,
      contentItemHeight: contentItemHeight,
      contentItemImgWidth: contentItemImgWidth,
      contentItemImgHeight: contentItemImgHeight,
    })

    if (app.globalData.userData) {
      this.setData({
        userData: app.globalData.userData,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            hasUserInfo: true
          })
          this.getUserData()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.userData) {
      this.setData({
        userData: app.globalData.userData
      })
    }
    var refresh = wx.getStorageSync("refresh")
    if (refresh == "1") {
      this.getUserData()
    }
    wx.removeStorageSync("refresh")
    var login = wx.getStorageSync("Login")
    this.setData({
      isLogin: login
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  clickJifen: function () {
    wx.navigateTo({
      url: '../../point/point',
    })
  },
  clickInfo: function() {
    wx.navigateTo({
      url: '../info/info',
    })
  },
  clickClass: function() {
    wx.navigateTo({
      url: '../../jiaoyi/order/order',
    })
  },
  clickTimeTable: function() {
    wx.navigateTo({
      url: '../../costs/costs',
    })
  },
  clickGrade: function() {
    wx.navigateTo({
      url: '../../location/list/list',
    })
  },
  clickNotice: function() {
    wx.navigateTo({
      url: '../../system/home/home',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: true
      })
      this.getUserData()
    }
  },
  getUserData: function() {
    var that = this
    wx.login({
      success: res => {
        app.getMyAuth(res.code)
        app.userInfoReadyCallback = res => {
          this.setData({
            userData: res.data,
            hasUserInfo: true
          })
        }
      }
    })
  },
})