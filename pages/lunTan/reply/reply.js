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
    this.setData({
      post_id: options.id
    })
    var type = options.type
    if (type == '1') {
      this.setData({
        type: "1"
      })
    }
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
    console.log(event)
    this.setData({
      remark: event.detail.value
    })
  },
  // 当键盘输入时，触发 input 事件，event.detail = {value, cursor}
  bindinput: function (event) {
    console.log(event)
    this.setData({
      remark: event.detail.value
    })
  },
  // 点击完成时， 触发 confirm 事件，event.detail = {value: value}
  bindconfirm: function (event) {
    console.log(event)
    this.setData({
      remark: event.detail.value
    })
  },
  // 
  clickCommit: function () {
    var that = this
    if (this.data.type == "1") {
      var data = {
        openid: app.globalData.userData.wxa_openid,
        yiyuan_id : this.data.post_id,
        comment : this.data.remark
      }
      request.request(api.AddComment, data).then(function (res) {
        wx.setStorageSync("isReply", "1")
        wx.navigateBack({

        })
      })
    } else {
      var data = {
        openid: app.globalData.userData.wxa_openid,
        post_id: this.data.post_id,
        reply_type: "1",
        reply_content: this.data.remark
      }
      request.request(api.AddReplyPost, data).then(function (res) {
        wx.setStorageSync("isReply", "1")
        wx.navigateBack({

        })
      })
    }
  }
})