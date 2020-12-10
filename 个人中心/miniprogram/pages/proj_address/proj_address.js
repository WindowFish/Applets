// pages/proj_address/proj_address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        useInfo:{ 
          phone:"",
          countrycode:"",
          address:"",
          area:"",
          code:"",
          name:"" }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goAdd(){
  var that = this;
    wx.chooseAddress({
      success:res=>{
        var cName = res.cityName;
        var uName =res.userName; 
        var postCode =res.postalCode;
        var countyName = res.countyName;
        var detailInfo =res.detailInfo;
        var telNumber = res.telNumber;
        var nationalCode =res.nationalCode;
        console.log(nationalCode)
        that.setData({
          "useInfo.phone":telNumber,
          "useInfo.countrycode":nationalCode,
          "useInfo.name":uName,"useInfo.address":detailInfo
          ,"useInfo.code":postCode,"useInfo.area":cName
      })
  
      },  
      complete: (res) => {},
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