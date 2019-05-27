const app = getApp()
var api = require("../../../utils/api.js")
var request = require("../../../utils/request.js")
var util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: '',
    title: '',
    type: '',
    images: [],
    typeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeList = app.globalData.typeList
    var typeName = []
    var typeID = []
    for (var i = 0; i < typeList.length; i++) {
      var item = typeList[i]
      typeName.push(item.name)
      typeID.push(item.id)
    }
    this.setData({
      typeName: typeName,
      typeID: typeID,
      typeList: typeList
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
  chooseImage(e) {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res)
        that.setData({
          images: [res.tempFilePaths[0]]
        })
      }
    })
  },
  bindconTitle: function (event) {
    this.setData({
      title: event.detail.value
    })
  },
  bindconPirce: function (event) {
    this.setData({
      price: event.detail.value
    })
  },
  bindconType: function (event) {
    this.setData({
      type: event.detail.value
    })
  },
  typeChange: function (event) {
    var type = this.data.typeName[event.detail.value]
    var typeid = this.data.typeID[event.detail.value]
    this.setData({
      typeIndex: event.detail.value,
      type: type,
      selectID: typeid,
    })
  },
  removeImage: function () {
    this.setData({
      images: []
    })
  },
  bindinput: function (event) {
    this.setData({
      remark: event.detail.value
    })
  },

  clickCommit: function () {
    if (this.data.title == null || this.data.title.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入物品名称',
        showCancel: false
      })
      return
    }
    if (this.data.type == null || this.data.type.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入物品类型',
        showCancel: false
      })
      return
    }
    if (this.data.price == null || this.data.price.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入物品参考价格',
        showCancel: false
      })
      return
    }
    if (this.data.remark == null || this.data.remark.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入物品简介',
        showCancel: false
      })
      return
    }
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
      name: that.data.title,
      price: that.data.price,
      good_type: that.data.selectID,
      description: that.data.remark
    }

    var list = that.data.images[0].split(".")
    var name = "file." + list.slice(list.length - 1, list.length)
    wx.uploadFile({
      url: api.AddGoods,
      filePath: that.data.images[0],
      name: name,
      formData: data,
      success(res) {
        wx.showToast({
          title: '发布成功',
          mask: true
        })
        setTimeout(function () {
          wx.navigateBack({

          })
        }, 2000)
      }
    })

    // request.request(api.AddGoods, data).then(function (res) {
    //   wx.showToast({
    //     title: '发布成功',
    //     mask: true
    //   })
    //   setTimeout(function () {
    //     wx.navigateBack({

    //     })
    //   }, 2000)
    // })
  }
})