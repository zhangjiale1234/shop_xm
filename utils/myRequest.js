let baseURL = 'https://api.zbztb.cn/api/public/v1'
//封装request对象
// export const getData = (obj) => {
//   return new Promise((resolve, rej) => {
//     //页面刷新开始加载
//     wx.showLoading({
//       title: '加载中',
//     })
//     wx.request({
//       //把对象解构出来
//       ...obj,
//       url: baseURL + obj.url,
//       success: (res) => {
//         resolve(res)
//       },
//       fail: (err) => {
//         rej(err)
//       },
//       //加载完成后停止加载
//       complete: () => {
//         wx.hideLoading()
//         wx.stopPullDownRefresh()
//       }
//     })

//   })
// }
//最终需要进行导出
export const getData = (obj)=>{
  return new Promise((ressolv,reject)=>{
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      ...obj,
      url: baseURL+obj.url,
      //成功时的回调，对应then
      success:(res=>{
        ressolv(res)
      }),
      //失败时的回调，对应catch
      fail:(err=>{
        reject(err)
      }),
      //加载完成时候的回调
        complete: () => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  })

}