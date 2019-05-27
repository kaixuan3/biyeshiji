const app = getApp()
var api = require("../../utils/api.js")
var request = require("../../utils/request.js")
var util = require("../../utils/util.js")

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

    var topHeight = 80
    var scrollHeight = viewHeight - topHeight
    this.setData({
      topHeight: topHeight,
      scrollHeight: scrollHeight,
    })

    this.getList()
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
    return {
      title: 'retailStore',
      path: 'pages/jiaoyi/home/home?openid=' + app.globalData.userData.wxa_openid,
      success(res) {
        console.log(res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
      }
    }
  },
  getList: function () {
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
    }
    request.request(api.GetRoyaltiesList, data).then(function(res) {
      that.setData({
        list: res.data
      })
    }, function(res) {
      that.setData({
        list: []
      })
    })
  },
})