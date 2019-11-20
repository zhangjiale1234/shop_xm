// pages/goods_detail/goods_detail.js
import { getData } from '../../utils/myRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //单个商品详情
    goods_detail: {}
  },
  headleImgChange(e) {
    let url = e.currentTarget.dataset.url
    console.log(url)
    //不知道如何退出
    wx.previewImage({
      current: url, // 当前显示图片的http链接,
      urls: [url]
    })
  },
  headleAddCart() {
    //点击加入购物车
    //把本地存储的数据拿出来
    let cartArr = wx.getStorageSync('carArr')||[]
    let {
      goods_small_logo,
      goods_price,
      goods_name,
      goods_id
    } = this.data.goods_detail
    console.log(cartArr)
    let index = cartArr.findIndex(e=>{
      return e.goods_id === this.data.goods_detail.goods_id
    })
    //判断商品是否在本地存储里面
    console.log(index)
    if (index === -1) {
      //如果不存在就是  新建
     
      cartArr.push({
        goods_small_logo,
        goods_price,
        goods_name,
        count: 1,
        goods_id,
        car_checked: true
      })
    }
    //如果存在叠加
    else {
      cartArr[index].count++
    }
    //在把数据存进本地存储中
    wx.setStorage({
      key: 'carArr',
      data: cartArr,
    })
  },
  headleJumpCart(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  headleStart() {
    //点击收藏。本地存储
    let value = wx.getStorage('goods_detail') || '[]'
    let arr = JSON.parse(value)
    arr.push(this.data.goods_detail)
    wx.setStorage({
      key: "goods_detail",
      data: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goods_id } = options
    getData({
      url: '/goods/detail',
      data: {
        goods_id,
      }
    }).then(res => {
      this.setData({
        goods_detail: res.data.message
      })
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

  }
})