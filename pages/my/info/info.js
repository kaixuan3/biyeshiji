
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
    this.setData({
      userData: app.globalData.userData
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
  nameChange: function (e) {
    var userData = this.data.userData
    userData.real_name = e.detail.value
    this.setData({
      userData: userData
    })
  },
  mobileChange: function (e) {
    var userData = this.data.userData
    userData.c_phone = e.detail.value
    this.setData({
      userData: userData
    })
  },
  clickSex: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        if (res.tapIndex == 0) {
          var userData = that.data.userData
          userData.c_sex = "M"
          that.setData({
            userData: userData
          })
        } else if (res.tapIndex == 1) {
          var userData = that.data.userData
          userData.c_sex = "F"
          that.setData({
            userData: userData
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  bindDateChange: function (e) {
    var userData = this.data.userData
    userData.c_birthdate = e.detail.value
    this.setData({
      userData: userData
    })
  },
  addressChange: function (e) {
    var userData = this.data.userData
    userData.address = e.detail.value
    this.setData({
      userData: userData
    })
  },
  submit: function () {
    if (this.data.userData.real_name == null || this.data.userData.real_name.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的姓名',
        showCancel: false
      })
      return
    }
    if (this.data.userData.c_phone == null || this.data.userData.c_phone.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的手机号',
        showCancel: false
      })
      return
    }
    if (this.data.userData.c_phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位手机号',
        showCancel: false
      })
      return
    }
    if (this.data.userData.c_birthdate == null || this.data.userData.c_birthdate.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择你的出生日期',
        showCancel: false
      })
      return
    }
    if (this.data.userData.c_sex == null || this.data.userData.c_sex.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择你的性别',
        showCancel: false
      })
      return
    }
    if (this.data.userData.address == null || this.data.userData.address.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入你的地址',
        showCancel: false
      })
      return
    }
    var data = {
      real_name: this.data.userData.real_name,
      c_phone: this.data.userData.c_phone,
      c_sex: this.data.userData.c_sex,
      c_birthdate: this.data.userData.c_birthdate,
      address: this.data.userData.address,
      openid: app.globalData.userData.wxa_openid
    }
    var that = this
    // 获取列表
    request.request(api.UpdateInfo, data).then(function (res) {
      app.globalData.userData.real_name = that.data.userData.real_name
      app.globalData.userData.c_phone = that.data.userData.c_phone
      app.globalData.userData.c_birthdate = that.data.userData.c_birthdate
      app.globalData.userData.c_sex = that.data.userData.c_sex
      app.globalData.userData.address = that.data.userData.address
      wx.showToast({
        title: '修改成功',
        mask: true
      })
      wx.setStorageSync("refresh", "1")
      setTimeout(function () {
        wx.navigateBack({

        })
      }, 2000)
    })
  }
})