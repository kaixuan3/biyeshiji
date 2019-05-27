//app.js

var request = require('/utils/request.js');
var api = require('/utils/api.js');

App({
  onLaunch: function () {
    var that = this

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.getMyAuth(res.code)
      }
    })
  },
  getType() {
    var that = this
    var data = {

    }
    request.request(api.GetGoodsType, data).then(function (res) {
      that.globalData.typeList = res.data
    })
  },
  // 获取用户授权信息
  getMyAuth(code) {
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.getMyUserInfo(code)
          that.getType()
        } else {
          wx.redirectTo({
            url: '/pages/register/auth/auth',
          })
        }
      }
    })
  },
  // 获取用户信息
  getMyUserInfo(code) {
    var that = this
    wx.getUserInfo({
      success: res => {
        // 发送登陆请求
        that.postLogin(code, res)
        // 保存用户信息
        that.saveUserInfo(res)
      }
    })
  },
  // 发送登陆接口
  postLogin(code, res) {
    var that = this
    // 构建登陆参数 wx.login给的code和wx.getSetting给的昵称
    var data = {
      code: code,
      // username: encodeURIComponent(res.userInfo.nickName),
      username: res.userInfo.nickName,
      userphoto: res.userInfo.avatarUrl,
    }
    // 发起登陆请求
    request.request(api.Login, data).then(function (res) {
      that.globalData.userData = res.data
      wx.setStorage({
        key: 'isLogin',
        data: '1',
      })
      // this.globalData.wxa_openid = res.usIernfo.wxa_openid
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (that.userInfoReadyCallback) {
        that.userInfoReadyCallback(res)
      }
    }, function (res) {
      if (res.success == false) {
        that.globalData.isHaveIssue = true
      }
      if (that.userInfoReadyCallback) {
        that.userInfoReadyCallback(res)
      }
    })
  },
  // 保存用户信息
  saveUserInfo(res) {
    // 可以将 res 发送给后台解码出 unionId
    this.globalData.userInfo = res.userInfo
  },
  bangding: function () {
    var that = this
    var openid = wx.getStorageSync("openid")
    if (openid && that.globalData.userData) {
      var data = {
        parent_openid: openid,
        openid: that.globalData.userData.wxa_openid,
      }
      request.request(api.Bangding, data).then(function(res) {

      })
    }
  },
  globalData: {
    userInfo: null,
    userData: null
  }
})