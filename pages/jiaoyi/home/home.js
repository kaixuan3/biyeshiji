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

    var imgWidth = screenWidth
    var imgHeight = imgWidth * 150 / 375

    var itemWidth = (screenWidth - 60) / 2
    var itemHeight = itemWidth

    var itemImgWidth = itemWidth / 3
    var itemImgHeight = itemImgWidth

    this.setData({
      imgWidth: imgWidth,
      imgHeight: imgHeight,
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      itemImgWidth: itemImgWidth,
      itemImgHeight: itemImgHeight
    })
    if (options.openid) {
      wx.setStorageSync('openid', options.openid)
      this.updatePoint(options.openid)
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          if (options.openid) {
            app.bangding()
            app.updatePoint2(options.openid)
          }
        } else {
          wx.redirectTo({
            url: '/pages/register/auth/auth',
          })
        }
      }
    })
  },
  updatePoint: function (openid) {
    var that = this
    var data = {
      openid: openid,
      description: "新用户浏览获得积分",
      point: "1"
    }
    request.request(api.SavePoint, data).then(function(res) {

    })
  },
  updatePoint: function (openid) {
    var that = this
    var data = {
      openid: openid,
      description: "新用户注册获得积分",
      point: "2"
    }
    request.request(api.SavePoint, data).then(function (res) {

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
  clickAll: function () {
    wx.navigateTo({
      url: '../list/list',
    })
  },
  clickPhone: function (e) {
    console.log(e)
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  clickPublish: function () {
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  getList: function () {
    var that = this
    var data = {
      isMore: "0"
    }
    request.request(api.GetGoodsList, data).then(function (res) {
      that.setData({
        list: res.data
      })
    })
  }
})