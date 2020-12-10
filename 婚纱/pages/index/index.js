
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bgm:null,
  music_url:"http://mp3.9ku.com/hot/2009/08-27/186947.mp3",
  music_coverImageUrl:"https://ss1.bdstatic.com/0cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2604472403,4161925654&fm=26&gp=0.jpg",
  onReady: function () {
        // 开始就唱歌
        this.bgm =wx.getBackgroundAudioManager();
        this.bgm.title = "mary me";
        this.bgm.epname = "wedding";
        this.bgm.singer = 'siger';
        this.bgm.converImgUrl = this.music_coverImageUrl;
        this.bgm.src = this.music_url;
  },
  // 点击有上方的图片就开始播放和结束播放
  play(){
       var isPlayingMusic;
       if(this.data.isPlayingMusic){
         this.bgm.pause()
         isPlayingMusic = false;
       }else{
          this.bgm.play()
          isPlayingMusic = true;
       }
       this.setData({isPlayingMusic:isPlayingMusic})
  }
  ,
  // 打电话给新郎
  callGroom(){
     wx.makePhoneCall({
       phoneNumber: "13535172734",
       success(res){
          console.log("ok"+res)
       },
       fail(res){
        console.log("fail"+res)
       }
     })
  },
  // 打电话给新娘
  callBride(){
        wx.makePhoneCall({
          phoneNumber: '18923749352',
          success(res){
            console.log("ok"+res)
         },
          fail(res){
          console.log("fail"+res)
         }
        })
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