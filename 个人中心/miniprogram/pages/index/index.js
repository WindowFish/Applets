Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosePic:"",
  },
  navTo(){
    // navigateTo不能定想在tabbar上的定想
      wx.navigateTo({
        url: '../detail/detail?id=1',
      })
  }
  ,
  reTo(){
    // 跳转到某个页面结束所有的页面且不能返回
    wx.redirectTo({
      url: '../detail/detail?id=2',
    })
  },
  reL(){
    // 无法返回
     wx.reLaunch({
       url: '../detail/detail?id=3',
     })
  }
  ,
  choImage(){
    var that = this;
     wx.chooseImage({
       count:9,
       sizeType:['origin',"compressed"],
       sourceType:['album','camera'],
       success:res=>{
          const tempFilePath = res.tempFilePaths;
          console.log(tempFilePath)
          that.setData({choosePic:tempFilePath})
       },
       complete: (res) => {},
     })
  }
,
choAddress(){
   wx.chooseAddress({
     success:res=>{
        console.log(res.userName);
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.telNumber)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
      },
     complete: (res) => {},
   })
}
,
makPho(){
    wx.makePhoneCall({
      phoneNumber: '13535172734',
      success(res){
            console.log(res)
      }
    })
}
,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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