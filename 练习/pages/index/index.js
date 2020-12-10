Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:"相等",
    param1:0,
    param2:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getParam1(option1){
    var param1 =Number(option1.detail.value)
       this.setData({param1:param1})
  },
  getParam2(option2){
    var param2 = Number(option2.detail.value)
    this.setData({param2:param2})
  },
Compare(){
      if(this.data.param1>this.data.param2){
        this.setData({result:'参数1大于参数2'})
    }else if(this.data.param1<this.data.param2){
    this.setData({result:'参数1小于参数2'})
    }else{
    this.setData({result:'参数1等于参数2'})
    }

}
  ,
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