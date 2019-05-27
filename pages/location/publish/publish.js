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

    var itemWidth = screenWidth - 20
    var leftWidth = 80
    var rightWidth = itemWidth - leftWidth - 10
    var publishHeight = 50;
    this.setData({
      itemWidth: itemWidth,
      leftWidth: leftWidth,
      rightWidth: rightWidth,
      publishHeight: publishHeight,
    })
    if (options.isEdit) {
      let modeEncode = options.item
      let modeDecode = decodeURIComponent(modeEncode)
      var item = JSON.parse(encrypt.decode(modeDecode))
      this.setData({
        name: item.receiver_name,
        mobile: item.receiver_phone,
        address: item.receiver_address,
        latitude: item.receiver_lat,
        longitude: item.receiver_lng,
        id: item.id,
        isEdit: "1"
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
  nameChange: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  mobileChange: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  clickAddress: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        if (res.errMsg == "chooseLocation:ok") {
          that.setData({
            address: res.address + res.name,
            latitude: res.latitude,
            longitude: res.longitude
          })
        } else {
        }
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  clickPublish: function () {
    if (this.data.name == null || this.data.name.length == 0) {
      wx.showToast({
        title: '请填写收货人姓名',
        mask: true,
        icon: "none"
      })
      return
    }
    if (this.data.mobile == null || this.data.mobile.length == 0) {
      wx.showToast({
        title: '请填写收货人手机号',
        mask: true,
        icon: "none"
      })
      return
    }
    if (this.data.mobile.length != 11) {
      wx.showToast({
        title: '请填写11位收货人手机号',
        mask: true,
        icon: "none"
      })
      return
    }
    if (this.data.address == null || this.data.address.length == 0) {
      wx.showToast({
        title: '请选择收货地址',
        mask: true,
        icon: "none"
      })
      return
    }
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
      address: this.data.address,
      username: this.data.name,
      mobile: this.data.mobile,
      lat: this.data.latitude,
      lng: this.data.longitude,
    }
    request.request(api.AddAddress, data).then(function (res) {
      wx.showToast({
        title: '添加成功',
        mask: true
      })
      setTimeout(function () {
        wx.navigateBack({

        })
      }, 1500)
    })
  }
})