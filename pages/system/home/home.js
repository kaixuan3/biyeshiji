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
  clickPublish: function (){
    if (!app.globalData.userData) {
      wx.showModal({
        title: '提示',
        content: '你还没有登录,是否去登录?',
        cancelText: '继续逛逛',
        confirmText: '去登录',
        success: function (res) {
          if (res.confirm == true) {
            wx.switchTab({
              url: '../../geRen/home/home',
            })
          }
        }
      })
      return
    }
    if (app.globalData.userData.is_zhuce == "0") {
      this.isRegister()
      return
    }
    var login = wx.getStorageSync("Login")
    if (login != 2) {
      wx.showModal({
        title: '提示',
        content: '当前用户还未登录,登录后可使用相关功能',
        cancelText: "取消",
        confirmText: "登录",
        success: function (res) {
          if (res.cancel) {

          } else {
            wx.navigateTo({
              url: '../../register/login/login',
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
  isRegister: function () {
    wx.showModal({
      title: '提示',
      content: '当前用户还未注册,注册后可使用相关功能',
      cancelText: "取消",
      confirmText: "注册",
      success: function (res) {
        if (res.cancel) {

        } else {
          wx.navigateTo({
            url: '../../register/register/register',
          })
        }
      }
    })
  },
  getList: function () {
    var that = this
    var data = {
    }
    request.request(api.GetGongGao, data).then(function (res) {
      that.setData({
        list: res.data
      })
    })
  }
})