Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  scroll(e){
        console.log(e)
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
          var audioContext=wx.createInnerAudioContext();
          // audioContext.src = "http://mp3.9ku.com/hot/2006/08-08/77240.mp3";
          // 当开始播放的时候
          audioContext.onPlay(function(){
                console.log("开始播放")
          })
          audioContext.onError(function(res){
             console.log(res.errCode); //错误码
             console.log(res.errMsg) //错误信息
          })
          // 开始播放
          audioContext.play();
  },
  slider1change(e){
      console.log(e)
  }
  ,
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