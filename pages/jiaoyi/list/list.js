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
    serachName: "",
    typeIndex: "0",
    type: "全部"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var screenWidth = wx.getSystemInfoSync().windowWidth // 获取图片显示宽度
    var screenHeight = wx.getSystemInfoSync().windowHeight // 获取屏幕的高度

    var searchBtnWidth = 60
    var inputhWidth = screenWidth - 30 - searchBtnWidth

    var itemWidth = (screenWidth - 60) / 2
    var itemHeight = itemWidth

    var itemImgWidth = itemWidth / 3
    var itemImgHeight = itemImgWidth

    this.setData({
      searchBtnWidth: searchBtnWidth,
      inputhWidth: inputhWidth,
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      itemImgWidth: itemImgWidth,
      itemImgHeight: itemImgHeight
    })
    this.getList()

    var typeList = app.globalData.typeList

    var typeName = ["全部"]
    var typeID = ["0"]

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
  nameChange: function (e) {
    this.setData({
      serachName: e.detail.value
    })
  },
  clickSearch: function () {
    this.getList()
  },
  typeChange: function (event) {
    var type = this.data.typeName[event.detail.value]
    var typeid = this.data.typeID[event.detail.value]
    this.setData({
      typeIndex: event.detail.value,
      type: type,
      selectID: typeid,
    })
    this.getList()
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
  getList: function () {
    var that = this
    var data = {
      isMore: "1",
      name: that.data.serachName,
      type_id: that.data.typeIndex
    }
    request.request(api.GetGoodsList, data).then(function (res) {
      that.setData({
        list: res.data
      })
    }, function(res) {
      that.setData({
        list: []
      })
    })
  }
})