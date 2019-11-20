// pages/my/my.js

import{
  ClassicModel
} from '../../models/classic.js'

const classicModer=new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 新版本使用button来弹窗 让用户主动点击button 弹出授权框
      this.userAuthorized()
      this.getMyFavor()

  },
  userAuthorized(){
   wx.getSetting({
     success:data=>{
       if(data.authSetting['scope.userInfo']){
        wx.getUserInfo({
          success:data=>{
            console.log(data)
              this.setData({
                authorized:true,
                userInfo:data.userInfo
              })
            console.log(this.data.userInfo)
          }
        })
       }
     }
   })
  },
  getUserInfo(event){
    // console.log(event)
  },
  onGetUserInfo(event){
    const userInfo=event.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo,
        authorized:true
      })
    }
    
  },

  getMyFavor(){
    classicModer.getMyFavor(res=>{
      this.setData({
        classics:res
      })
    })
    console.log(this.data.classics)
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