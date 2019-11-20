// pages/close/close.js
import { getData } from '../../utils/myRequest.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfo:{},
    carArr:[],
    totalMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到收货人信息和商品信息
    const personalInfo =  wx.getStorageSync('adress')
    const carArr = wx.getStorageSync('carArr')
    
    this.setData({
      personalInfo, carArr
    })
    let totalMoney = 0
    //累加有的数量
    carArr.forEach(e=>{
      if (e.car_checked){
        totalMoney += e.count * e.goods_price
      }
    })
    //更新视图
    this.setData({
      totalMoney
    })
  },
  getToken(){
    let { totalMoney, personalInfo, carArr} = this.data
    //先过滤出被选中的商品。然后在用map重构数组里面的东西
    const goods = carArr.filter(v => v.car_checked).map(e=>{
        return {
          goods_id:e.goods_id,
          goods_number: e.count,
          goods_price: e.goods_price
        }
    })
    console.log(goods)
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求,获取用户个人信息
          wx.getUserInfo({
            success:  (result)=> {
              //成功后解构出来
              let {
                encryptedData, rawData, iv, signature,
              } = result
              //调用登录接口
               getData({
                url: '/users/wxlogin',
                method:'post',
            //传参
            data:{
              encryptedData, rawData, iv, signature,
              code:res.code
            }
          }).then(result=>{
            //成功后把token 存进本地存储
            wx.setStorageSync('token', result.data.message.token)
            //创建订单
            getData({
              url:'/my/orders/create',
              method:'post',
              data:{
                order_price: totalMoney,
                consignee_addr: personalInfo.adressNew,
                goods
              }
            }).then(result2=>{
              let {order_number} = result2.data.message
              //预订单
              getData({
                url: '/my/orders/req_unifiedorder',
                method:'post',
                data:{
                  order_number,
                }
              }).then(result3=>{
                console.log(result3)
                let {pay} = result3.data.message
                //微信支付回调
                wx.requestPayment({
                  ...pay,
                  success(result4) {
                    console.log(result4)
                    // if (result4.errMsg === 'requestPayment:ok'){
                      getData({
                        url:'/my/orders/chkOrder',
                        method:'post',
                        data:{
                          order_number
                        }
                      }).then(result5=>{
                        console.log(result5)
                        wx.showToast({
                          title: '支付成功',
                        })
                        //把购物车里面的数据过滤掉
                      const newCart = carArr.filter(e => !e.car_checked)
                        wx.setStorageSync('carArr', newCart)
                        wx.navigateTo({
                          url: '/pages/orders/orders?type=3',
                        })
                      })
                    // }
                   },
                  fail(err) {
                    console.log(err)
                   }
                })
              })
            })
          })
          }
          })
         
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
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
