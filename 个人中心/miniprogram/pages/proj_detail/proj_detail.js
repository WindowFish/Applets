// pages/proj_detail/proj_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      usImage:"../../images/avatar.jpg",
      name:"WindowFish",
      sex:"男"
  },
  changeImg(){
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType:['origin',"compressed"],
      sourceType:['album','camera'],
      success:res=>{
          var imagFile = res.tempFilePaths;
          that.setData({usImage:imagFile})
      },
      complete: (res) => {},
    })
  }
  ,
  changeInfo(){
          wx.navigateTo({
            url: "../proj_modify/proj_modify?username="+  encodeURIComponent(this.data.name)+"&gender="+encodeURIComponent(this.data.sex)})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  backToPerson(){
     var prvPage= getCurrentPages();
     var page = prvPage[prvPage.length-2];
     var usImage = this.data.usImage;
     page.setData({personPic:usImage})
      wx.navigateBack()
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