const app = getApp()
var api = require("../../../utils/api.js")
var request = require("../../../utils/request.js")
var util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      good_id: options.id
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
  // 输入框失去焦点时触发，event.detail = {value, cursor}
  bindblur: function (event) {
    this.setData({
      remark: event.detail.value
    })
  },
  // 当键盘输入时，触发 input 事件，event.detail = {value, cursor}
  bindinput: function (event) {
    this.setData({
      remark: event.detail.value
    })
  },
  // 点击完成时， 触发 confirm 事件，event.detail = {value: value}
  bindconfirm: function (event) {
    this.setData({
      remark: event.detail.value
    })
  },
  // 
  clickCommit: function () {
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
      good_id: this.data.good_id,
      content: this.data.remark
    }
    request.request(api.AddLiuYan, data).then(function (res) {
      wx.navigateBack({

      })
    })
  }
})