import { getData} from '../../utils/myRequest.js'
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab栏当前索引。默认为0
    currentIndex:0,
    //右侧的所有数据
    cateData:[],
    //右侧的某个数据
    rightData:[],
    //回到顶部
    goToTop:''
  },
  headleChage(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      goToTop:0,
      currentIndex: index,
      //点击的时候通过this去拿第index项 ，数据跟着索引去变
      rightData: this.data.cateData[index].children
    })
  },
  init(){
    getData({
      url: '/categories',
    }).then(res => {
      console.log(res)
      this.setData({
        cateData: res.data.message,
        //开始的时候默认展示第0项
        rightData: res.data.message[0].children
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //数据未回来时候提示加载中
    // wx.showLoading({
    //   title: '加载中',
    // })
    // getData({
    //   url:'/categories',
    // }).then(res=>{
    //   console.log(res)
    // })
   this.init()
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/categories',
    //   success:(res)=>{
    //     this.setData({
    //       cateData: res.data.message,
    //       //开始的时候默认展示第0项
    //       rightData:res.data.message[0].children
    //     })
    //   },
    //   //加载完毕后停止加载
      
    // })
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
    this.init()
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