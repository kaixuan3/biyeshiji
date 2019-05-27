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
    user: "",
    mobile: "",
    name: "",
    pwd: "",
    rPwd: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  userChange: function (e) {
    this.setData({
      user: e.detail.value
    })
  },
  mobileChange: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  nameChange: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 日期选择事件
  bindDateChange: function (e) {
    this.setData({
      birthdate: e.detail.value
    })
  },
  clickSex: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.setData({
            sex: 'M'
          })
        } else if (res.tapIndex == 1) {
          that.setData({
            sex: 'F'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  pwdChange: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  rPwdChange: function(e) {
    this.setData({
      rPwd: e.detail.value
    })
  },
  login: function() {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  addressChange: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  return_home: function () {
    wx.setStorageSync("refresh", "1")
    wx.switchTab({
      url: '../../jianzhi/home/home',
    })
  },
  submit: function() {
    if (this.data.user == null || this.data.user.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的学号',
        showCancel: false
      })
      return
    }
    if (this.data.mobile == null || this.data.mobile.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的手机号',
        showCancel: false
      })
      return
    }
    if (this.data.mobile.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位手机号',
        showCancel: false
      })
      return
    }
    if (this.data.name == null || this.data.name.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的姓名',
        showCancel: false
      })
      return
    }
    if (this.data.birthdate == null || this.data.birthdate.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择你的出生日期',
        showCancel: false
      })
      return
    }
    if (this.data.sex == null || this.data.sex.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择你的性别',
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
    if (this.data.rPwd == null || this.data.rPwd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请再次输入你的密码',
        showCancel: false
      })
      return
    }
    if (this.data.rPwd != this.data.pwd) {
      wx.showModal({
        title: '提示',
        content: '两次输入密码不一致',
        showCancel: false
      })
      return
    }
    if (this.data.address == null || this.data.address.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的地址',
        showCancel: false
      })
      return
    }
    var data = {
      account: this.data.user,
      real_name: this.data.name,
      c_phone: this.data.mobile,
      c_sex: this.data.sex,
      c_birthdate: this.data.birthdate,
      address: this.data.address,
      password: this.data.pwd,
      openid: app.globalData.userData.wxa_openid
    }
    var that = this
    // 获取列表
    request.request(api.Register, data).then(function (res) {
      wx.setStorageSync("Login", "2")
      app.globalData.userData.real_name = that.data.name
      app.globalData.userData.c_phone = that.data.mobile
      app.globalData.userData.account = that.data.user
      app.globalData.userData.password = that.data.pwd
      app.globalData.userData.c_birthdate = that.data.birthdate
      app.globalData.userData.c_sex = that.data.sex
      app.globalData.userData.address = that.data.address
      app.globalData.userData.is_zhuce = "1"
      that.setData({
        success: true
      })
    })
  }
})