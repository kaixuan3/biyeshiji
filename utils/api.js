
// 服务器地址
var ApiRoot = "http://10.3.147.225:8080/ZhiNengYingYaoSystem/"
// var ApiRoot = "http://127.0.0.1:8080/FxShopMallSystem/"
// var ApiRoot = "http://192.168.1.103:8082/ZhiNengYingYaoSystem/"

// 接口
module.exports = {
  ApiRoot: ApiRoot,
  Login: ApiRoot + "client_Api/login",  // 登陆接口 用code获取用户信息
  GetGongGao: ApiRoot + "client_Api/getNoticeList", // 获取系统公告
  GetGoodsList: ApiRoot + "client_Api/getGoodsList",  // 获取商品列表
  PublishGoods: ApiRoot + "client_Api/addGood", // 发布商品
  UpdateInfo: ApiRoot + "client_Api/updateUserInfo",  // 更新信息
  GetAddressList: ApiRoot + "order_Api/getOrderAddressList",  // 获取地址列表
  AddAddress: ApiRoot + "order_Api/addOrderAddress",  // 添加收货地址
  AddOrder: ApiRoot + "order_Api/addOrder", // 下订单接口
  GetOrderList: ApiRoot + "order_Api/getOrders",  // 获取订单列表
  AddGoods: ApiRoot + "client_Api/addGood",
  GetGoodsType: ApiRoot + "client_Api/getGoodTypeList", // 获取分类
  GetGoodsDetail: ApiRoot + "client_Api/getGoodsdetail",  // 获取商品详情
  AddCollection: ApiRoot + "client_Api/addCollection",  // 添加收藏
  GetCollectionList: ApiRoot + "client_Api/getGoodCollectList", // 获取收藏列表
  AddLiuYan: ApiRoot + "client_Api/addGoodLiuyan",  // 添加商品留言
  AddPost: ApiRoot + "client_Api/addPost", // 发帖接口
  AddReplyPost: ApiRoot + "client_Api/addReplyPost", // 回帖接口
  GetPostList: ApiRoot + "client_Api/getPostList", // 获取帖子列表
  GetPostDetail: ApiRoot + "client_Api/getPostInfo", // 获取帖子详情
  GetRoyaltiesList: ApiRoot + "client_Api/getXiaJiClientList", // 获取人脉
  Bangding: ApiRoot + "client_Api/bangding",  // 绑定
  GetPointList: ApiRoot + "client_Api/getFanxainList",  // 获取积分记录
  SavePoint: ApiRoot + "client_Api/savePoint",  // 保存积分
}

/**
  * 保存积分记录
  * @param openid 用户微信id
  * @param point 积分
  * @param description 积分获得原因描述
  * @param 
  */
// client_Api / savePoint

//   * 绑定上级用户
//   * @param openid
//     * @param parent_openid 上级id
// client_Api / bangding

/**
  * 返现记录列表接口
  * @param openid 微信用户id
  * 
  */
// client_Api / getFanxainList

/**
  * 发布商品信息
  * @param openid 微信用户id
  * @param name 商品名称
  * @param price 参考价格
  * @param description 商品描述
  * 
  */
// client_Api / addGood()

// order_Api / getOrders
/**
  * 获取下单列表接口
  * @param openid 微信用户id
  * @param state 0 全部； 1 已付款； 2 完成
  */

// order_Api / addOrder
/**
  * 下单接口
  * @param openid 微信用户id
  * @param good_id  商品id
  * @param order_money 订单金额
  * @param address_id   收货地址
  * 
  */

// order_Api / addOrderAddress
/**
  * 添加收货地址接口
  * @param openid 微信用户id
  * @param address 收货地址
  username
  mobile
  * 
  */

// order_Api / getOrderAddressList
/**
  * 获取自己的 收货地址列表
  * @param openid 微信用户id
  * 
  */

// client_Api / updateUserInfo
/**
  * 修改用户信息
  * @param openid
  * @param real_name 姓名
  * @param c_phone 手机号
  * @param c_sex 性别:M男；F女
  * @param c_birthdate 出生日期(yyyy-MM-dd)
  * @param address 住址
  * 
  */

// client_Api / addGood
/**
* 发布商品信息
* @param openid 微信用户id
* @param name 商品名称
* @param price 参考价格
* @param description 商品描述
* 
*/

/**
  * 修改用户密码
  * @param openid
  * @param password
  * 
  */
// client_Api/updatePassword

/**
  * 注册接口
  * @param openid
  * @param real_name 姓名
  * @param password 密码
  c_phone
  * 
  */
// client_Api / register
