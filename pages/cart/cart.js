// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carArr: [],
    totalMomey: 0,
    totalCount: 0,
    checkAll: false,
    adress:{}
  },
  //判断是否全选
  isChecked(){
    let {
      checkAll
    } = this.data
    //判断全选
    setTimeout(() => {
      if (this.data.carArr.length === this.data.totalCount) {
        this.setData({
          checkAll: true
        })
      }
      else {
        this.setData({
          checkAll: false
        })
      }
    }, 0)
  },
  //点击结算按钮
  closeAccounts(){
    let { totalCount, adress } = this.data
    //判断一下是否有勾选商品,和是否有地址
    if (totalCount === 0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
      })
    }
    else if (!adress.userName) {
      wx.showToast({
        title: '请选择收货人地址',
      })
    }
    else{
      // wx.
      wx.navigateTo({
        url: '/pages/close/close',
      })
    }

  },
  //改变增减减少按钮
  headNumberChange(e) {
    console.log(e)
    //获取到需要用到的参数
    let {
      num,
      index
    } = e.target.dataset
    //更新视图整个更新
    let {
      carArr
    } = this.data
    //点击时候加减操作
    this.data.carArr[index].count += num
    //点击减少的时候做判断
    if (this.data.carArr[index].count <= 1 && num === -1) {
      //等于1在点击减少的时候就重置为1，在给出提示
      carArr[index].count = 1
      this.setData({
        carArr
      })
      wx.showModal({
        title: '提示',
        content: '是否要删除该商品',
        success: (res) => {
          if (res.confirm) {
            //点击确定后直接删除。记得用上箭头函数
            carArr.splice(index, 1)
            this.updataCart(carArr)
          } else if (res.cancel) {
            //点取消后 重置为1
            carArr[index].count = 1
            this.setData({
              carArr
            })
            this.updataCart(carArr)
          }
        }
      })
    }


    //更新视图
    this.updataCart(carArr)
  },
  //点击收货地址
  address(){
  
    wx.getSetting({
      success:(res)=> {
         console.log(res.authSetting);
        console.log(res.authSetting['scope.address'])
        if (res.authSetting['scope.address'] === false){
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
            }
          })
        }
        else{
          wx.chooseAddress({
            success: (res) => {
              console.log(res)
              let {
                provinceName,cityName, countyName, detailInfo,
                userName, telNumber
              } =  res
              let adressNew = `${provinceName}${cityName}${countyName}${detailInfo}`
              //更新到视图
              this.setData({
                adress:{
                  adressNew,
                  userName, telNumber
                }
              })
              let adress = {
                adressNew,
                userName, telNumber
              }
              //更新到本地存储
              wx.setStorageSync('adress', adress)
            }
          })
        }
      }
    })
  },
  //改变选框
  headleCheckbox(e) {
    //点击选框后，让他的状态取反就
    let index = e.target.dataset.index
    let {
      carArr,
      checkAll
    } = this.data
    //点击全选框后取反
    carArr[index].car_checked = !carArr[index].car_checked
    //判断是否全选
    this.isChecked()
    this.updataCart(carArr)
  },
  //改变全选框
  checkAll() {
    let { carArr} = this.data
   //不能使用解构解构出，因为每次点击重新解构。然后导致结果每次都是true变成flase
   this.data.checkAll = !this.data.checkAll
    carArr.forEach(e=>{
      e.car_checked = this.data.checkAll
    })
    this.updataCart(carArr)
  },

  //更新本地存储和视图的操作
  updataCart(carArr) {
    //总价格
    let totalMomey = 0;
    //总件数
    let totalCount = 0;
    carArr.forEach(e => {
      //价格，件数累加
      if (e.car_checked) {
        //每遍历一次，就判断一下，如果car_checked为选中，就执行下面的代码
        totalMomey += e.goods_price * e.count
        //选中状态
        totalCount++
      }
    })
    //更新视图
    this.setData({
      carArr,
      totalMomey,
      totalCount
    })
    //修改本地存储的数据
    wx.setStorage({
      key: 'carArr',
      data: carArr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let carArr = wx.getStorageSync('carArr') || []
   let adress =  wx.getStorageSync('adress')||{}
   this.setData({
     adress
   })
   //判断是否全选
    this.isChecked()
    this.updataCart(carArr)
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