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
    list: [],
    selectIndex: 0,
    type: "0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let modeEncode = options.item
    let modeDecode = decodeURIComponent(modeEncode)
    var data = JSON.parse(encrypt.decode(modeDecode))

    if (options.id) {
      this.setData({
        type: "1",
        id: options.id
      })
    }

    var screenWidth = wx.getSystemInfoSync().windowWidth // 获取图片显示宽度
    var screenHeight = wx.getSystemInfoSync().windowHeight // 获取屏幕的高度

    var topRightWidth = screenWidth - 30 - 80

    var publishHeight = 50;
    var listHeight = screenHeight - publishHeight
    this.setData({
      publishHeight: publishHeight,
      listHeight: listHeight,
      topRightWidth: topRightWidth,
      data: data
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
    this.getDetail()
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
  pickerChange: function (e) {
    var addressData = this.data.list[e.detail.value]
    this.setData({
      selectIndex: e.detail.value,
      addressData: addressData,
      addressID: addressData.id
    })
  },
  clickAddres: function () {
    if (this.data.list.length == 0) {
      wx.navigateTo({
        url: '../../location/publish/publish',
      })
    }
  },
  getList: function () {
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid
    }
    request.request(api.GetAddressList, data).then(function (res) {
      var list = res.data
      var addressData = list[0]
      var range = []
      for (var i = 0; i < list.length; i++) {
        var item = list[i]
        var str = item.username + "," + item.mobile + "," + item.address
        range.push(str)
      }
      that.setData({
        addressData: addressData,
        list: res.data,
        range: range,
        addressID: addressData.id
      })
    })
  },
  clickShouCang: function () {
    var isJieBang = this.data.data.is_shoucang
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
      good_id: that.data.data.id,
      isJieBang: isJieBang
    }
    request.request(api.AddCollection, data).then(function (res) {
      that.getDetail()
    })
  },
  clickPhone: function (e) {
    console.log(e)
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  clickPinglun: function () {
    if (app.globalData.userData.c_username == null || app.globalData.userData.c_username.length == 0 || app.globalData.userData.c_phone == null || app.globalData.userData.c_phone.length == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未维护您的个人信息,是否去维护',
        success: function (res) {
          if (res.cancel) {

          } else {
            wx.switchTab({
              url: '../../my/ucenter/ucenter',
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '../reply/reply?id=' + this.data.data.id,
    })
  },
  getDetail: function () {
    var that = this
    var data = {
      openid: app.globalData.userData.wxa_openid,
      good_id: this.data.data.good_id
    }
    request.request(api.GetGoodsDetail, data).then(function (res) {
      var data = res.data
      var isSelf = false
      if (data.openid != null && app.globalData.userData.wxa_openid == data.openid) {
        isSelf = true
      }
      that.setData({
        data: res.data,
        isSelf: isSelf
      })
    })
  },
  clickPublish: function () {
    if (this.data.type=="1") {
      this.delOrder()
      return
    }
    if (this.data.isSelf == true) {
      this.canclePublish()
      return
    }
    this.submitOrder()
  },
  delOrder:function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该订单记录?',
      success: function (res) {
        if (res.cancel) {

        } else {
          var data = {
            openid: app.globalData.userData.wxa_openid,
            order_id: that.data.id,
          }
          request.request(api.DelOrder, data).then(function (res) {
            wx.showToast({
              title: '删除订单成功',
              mask: true
            })
            setTimeout(function () {
              wx.navigateBack({

              })
            }, 1500)
          })
        }
      }
    })
  },
  canclePublish:function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消该商品的发布?',
      success: function (res) {
        if (res.cancel) {

        } else {
          var data = {
            openid: app.globalData.userData.wxa_openid,
            good_id: that.data.data.id,
          }
          request.request(api.DelGoods, data).then(function (res) {
            wx.showToast({
              title: '取消发布成功',
              mask: true
            })
            setTimeout(function () {
              wx.navigateBack({

              })
            }, 1500)
          })
        }
      }
    })
  },
  submitOrder: function () {
    var that = this

    if (this.data.list.length == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未添加收货地址,是否去添加',
        success: function (res) {
          if (res.cancel) {

          } else {
            wx.navigateTo({
              url: '../../location/publish/publish',
            })
          }
        }
      })
      return
    }
    var text = '确定要提交订单,并支付金额' + that.data.data.price + "元"
    var order_money = that.data.data.price
    var pay_type = "1"
    wx.showActionSheet({
      itemList: ['现金购买', '积分兑换'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          
        } else if (res.tapIndex == 1) {
          text = '确定要提交订单,并使用' + that.data.data.point + '积分兑换'
          order_money = that.data.data.point
          pay_type = "2"
        } else {
          return
        }
        wx.showModal({
          title: '提示',
          content: text,
          success: function (res) {
            if (res.cancel) {

            } else {
              var data = {
                openid: app.globalData.userData.wxa_openid,
                good_id: that.data.data.id,
                address_id: that.data.addressID,
                pay_type: pay_type,
                order_money: order_money,
              }
              request.request(api.AddOrder, data).then(function (res) {
                if (that.data.data.is_shoucang == "1") {
                  that.clickShouCang()
                }
                wx.showToast({
                  title: '下单成功',
                  mask: true
                })
                setTimeout(function () {
                  wx.navigateBack({

                  })
                }, 1500)
              }, function (res) {
                wx.showModal({
                  title: '提示',
                  content: res.data,
                  showCancel: false
                })
              })
            }
          }
        })
      }
    })
  },
})