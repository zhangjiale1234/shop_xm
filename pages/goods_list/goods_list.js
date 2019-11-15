// pages/goods_list/goods_list.js
import {
  getData
} from '../../utils/myRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //一页商品的数据
    goodsList: [],
    pagenum: 1,
    pagesize: 5,
    query: '',
    cid: '',
    total: 0
  },
  //封装函数
  init(obj){
    getData({
      url: '/goods/search',
      data: {
        ...obj
      }
    }).then(res => {
      this.setData({
        goodsList: res.data.message.goods,
        total: res.data.message.total
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let {
      pagenum,
      pagesize
    } = this.data
    //结构出接收的参数
    let {
      cid,
      query
    } = options
    this.setData({
      query,
      cid,
    })
    let data = {
      cid,
      query,
      pagesize,
      pagenum
    }
    this.init(data)
    // getData({
    //   url: '/goods/search',
    //   data: {
    //     pagenum,
    //     pagesize,
    //     cid,
    //     query
    //   }
    // }).then(res => {
    //   this.setData({
    //     goodsList: res.data.message.goods,
    //     total: res.data.message.total
    //   })
    // })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      //刷新重置pagenum
      pagenum: 1,
      //把数组变成空
      goodsList: []
    })
    //对象解构
    let {
      pagenum,
      pagesize,
      cid,
      query
    } = this.data
    let data = {
      pagenum,
      pagesize,
      cid,
      query
    }
    console.log(data)
    this.init(data)
    // getData({
    //   url: '/goods/search',
    //   data: {
    //     pagenum,
    //     pagesize,
    //     cid,
    //     query
    //   }
    // }).then(res => {
    //   this.setData({
    //     goodsList: res.data.message.goods,
    //     total: res.data.message.total
    //   })
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function() {
    let {
      pagenum,
      pagesize,
      cid,
      query,
      total
    } = this.data
    this.setData({
      pagenum: ++pagenum
    })
    console.log(pagenum)
    if (pagenum <= Math.ceil(total / pagesize)) {
      getData({
        url: '/goods/search',
        data: {
          pagenum: ++pagenum,
          pagesize,
          cid,
          query
        }
      }).then(res => {
        console.log(pagenum)
        this.setData({
          goodsList: [...this.data.goodsList, ...res.data.message.goods]
        })
      })
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'success',
        duration: 2000
      })
    }

  }
})