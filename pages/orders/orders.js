// pages/orders/orders.js
import { getData} from '../../utils/myRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前选中
    currentActive:2,
    //tab栏数据
    tabSelect: [{
        content: '全部',
        type: 1
      },
      {
        content: '代付款',
        type: 1
      }, {
        content: '已付款',
        type: 1
      }, {
        content: '退款',
        type: 1
      }
    ],
    //订单列表
    ordersList:[]
  },
  //获取订单数据
  init(type){
    getData({
      url: '/my/orders/all',
      data: {
        type:type
      }
    }).then(res => {
      let { orders, count } = res.data.message
      //解构出订单数组和总数量
      this.setData({
        ordersList: orders.map(v => ({
          ...v,
          create_time: new Date((v.create_time * 1000)).toLocaleString()
        }))
      })
      console.log(orders)
    })
  },
  headleChangeTab(e){
    let index = e.target.dataset.index 
    this.setData({
      currentActive:index
    })
    //让tab和他的索引值关联起来
    let type = index+1
    this.init(type)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { type } = options
    this.init(type)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})