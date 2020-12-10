Page({
  data: {
      src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      danumList:[
        {text:"第1",color:"red",time:1},
        {text:"第2",color:"red",time:2},
        {text:"第3",color:"yellow",time:3}],
        video_info_list:[
            {"id":1,"title":"海边随拍","times":1232345645675,
             "video_url":"https://bpic.588ku.com/video_listen/588ku_preview/20/09/11/14/34/37/video5f5b1a7d7d4ee.mp4"
            },
            {
                "id":2,"title":"城市美拍","times":6732345645675,
                "video_url":"https://bpic.588ku.com/video_listen/588ku_preview/20/07/27/14/16/53/video5f1e7155b6678.mp4"  
            },
            {
                "id":3,"title":"携手相爱","times":3432345645675,
                "video_url":"https://bpic.588ku.com/video_listen/588ku_preview/20/07/16/16/11/24/video5f100bac7cacb.mp4"  
            }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindInputBlur(e){
      this.sendMessage = e.detail.value
  }
  ,
  bindSendNum(){
        this.videoContext.sendDanmu({
            text:this.sendMessage,
            color:"grey"
        })
  },
  bindGetLocation(){
      var that = this
       wx.chooseVideo({
           sourceType:["album","camera"],
           maxDuration:60,
           camera:"back",
           success:res=>{
                this.setData({src:res.tempFilePath})
           }
       })
  },  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  sendMessage:"",
  videoContext:null,
  onReady:function () {
        this.videoContext = wx.createVideoContext("myVideo")
        //  拉取腾旭的在线视频
        // const tvContent =requirePlugin("tencentvideo");
        // var myvideo = tvContent.getTxvContext('txv1') ;
        // myvideo.play()
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