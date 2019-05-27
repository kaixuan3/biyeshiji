const app = getApp()

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST", judgeLogin = false, isShowLoading = true) {

  return new Promise(function (resolve, reject) {
    console.log("请求接口:" + url + "请求数据:")
    console.log(data)
    if (isShowLoading == true) {
      wx.showLoading({
        title: '请稍候',
        mask: true,
      })
    }
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 200) {
          if (res.data.success == true) {
            console.log("请求成功,返回数据:")
            console.log(res)
            resolve(res.data)
          } else {
            console.log('请求错误:')
            console.log(res)
            reject(res.data)
          }
        } else {

        }
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '网络错误,请稍后再试',
          showCancel: false,
        })
      }
    })
  });
}

module.exports = {
  request,
}