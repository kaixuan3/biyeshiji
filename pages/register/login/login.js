
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
    rPwd: "",
    pwd: "",
    rPwd: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData: app.globalData.userData,
      yPwd: app.globalData.userData.account
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
  yPwdChange: function (e) {
    this.setData({
      yPwd: e.detail.value
    })
  },
  pwdChange: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  rPwdChange: function (e) {
    this.setData({
      rPwd: e.detail.value
    })
  },
  return_home: function () {
    wx.setStorageSync("refresh", "1")
    wx.navigateBack({
      delta: 2
    })
  },
  submit: function () {
    if (this.data.yPwd == null || this.data.yPwd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的学号',
        showCancel: false
      })
      return
    }
    if (this.data.pwd == null || this.data.pwd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的密码',
        showCancel: false
      })
      return
    }
    if (this.data.pwd != app.globalData.userData.password) {
      wx.showModal({
        title: '提示',
        content: '密码输入错误',
        showCancel: false
      })
      return
    }
    wx.setStorageSync("Login", "2")
    wx.showToast({
      title: '登录成功',
      mask: true
    })
    setTimeout(function () {
      wx.navigateBack({
        
      })
    }, 2000)
  }
})