var audioCtx=null
Page({
  data: {
    tab:0,
    current_topic:0,
    swiper_info:[
      {"id":0,"images_url":"../../images/music_swiper1.jpg"},
      {"id":1,"images_url":"../../images/music_swiper2.jpg"},
      {"id":2,"images_url":"../../images/music_swiper3.jpg"}],
      music_lists:[
        {"id":0,"img_url":"../../images/music_list_1.jpg"
        ,"content":"紫罗兰"},
        {"id":2,"img_url":"../../images/music_list_2.jpg"
        ,"content":"五月之歌"},
        {"id":3,"img_url":"../../images/music_list_3.jpg"
        ,"content":"菩提树"},
        {"id":4,"img_url":"../../images/music_list_4.jpg"
        ,"content":"音乐颂"},
        {"id":5,"img_url":"../../images/music_list_5.jpg"
        ,"content":"安魂曲"},
        {"id":6,"img_url":"../../images/music_list_6.jpg"
        ,"content":"摇篮曲"}],
       playList:[
            {"id":1,"title":"钢琴协奏曲", "singer":"肖邦",
            "src":"http://mp3.9ku.com/hot/2009/08-27/186947.mp3",
            "coverImageUrl":"../../images/start1.jpg"},
            {"id":2,"title":"奏鸣曲", "singer":"莫扎克",
            "src":"http://mp3.9ku.com/hot/2012/08-10/470122.mp3",
            "coverImageUrl":"../../images/start3.jpg"},
            {"id":3,"title":"欢乐颂", "singer":"贝多芬",
            "src":"http://mp3.9ku.com/hot/2013/12-16/574160.mp3",
            "coverImageUrl":"../../images/start2.jpg"},
            {"id":4,"title":"爱之梦", "singer":"李斯特",
            "src":"http://mp3.9ku.com/hot/2006/08-08/77240.mp3",
            "coverImageUrl":"../../images/start4.jpg"}],
       play:{
              currentTime:"00:00",
              duration:"00:00",
              percent:0,
              title:"",
              signer:"",
              coverImageUrl:""
          },
                  // 一开始就是暂停的
                  // 点击以后就开始  
                  state:"paused",
                  playIndex:0,
  },      
  // 点击顶部标题展示对应的主题swiper 即使改变swiper的current属性
  show_topic(option){
        this.setData({current_topic:option.currentTarget.id})
  }
,
// 滑动每个swiper下的主题的时候都会对应的跳转到对应的顶部的主题
// 即使在swiper上绑定bindchange事件
changTab(option){
       this.setData({tab:option.detail.current})
}
,
// 音乐推荐下拉出发 scroll-view
scroll(e){
      // console.log(e)
}
,
// 音乐推荐下拉出发 按钮组
btn_item(){
      // console.log("按钮")
}
,
// 点击热门音乐下的某个标题就会触发事件
music_current_item(e){
      // console.log("热门")
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
           this.audioCtx = wx.createInnerAudioContext();
           var that =this;
      //     播放错误的时候就调用
           this.audioCtx.onError(function(){
                  console.log("播放失败"+that.audioCtx.src)
           })
       // 结束的时候就调用实现自动下一首
           this.audioCtx.onEnded(function(){
                   that.next();     
          })
      //     在开始播放的时候调用
          this.audioCtx.onPlay(function(){
                console.log("开始咯")  
          })
      //      自动更新播放速度
          this.audioCtx.onTimeUpdate(function(){
            that.setData({
            'play.currentTime':that.formatTime(that.audioCtx.currentTime) ,
             'play.duration':that.formatTime (that.audioCtx.duration),
             'play.percent':(that.audioCtx.currentTime
              /that.audioCtx.duration * 100)
             })
         })   
         this.setMusic(0);      
},
 //      格式化时间
 formatTime(time){
      var minute = Math.floor(time/60)%60;
      var second = Math.floor(time)%60;
      return (minute<10?'0'+minute:minute)+':'+
      (second<10?'0'+second:second)
  }
,
setMusic(index){
                 console.log(index)
                 var music=this.data.playList[index];
                 this.audioCtx.src = music.src;
                 this.setData({
                       playIndex:index,
                       "play.title":music.title,
                       "play.signer":music.singer,
                       "play.coverImageUrl":music.coverImageUrl,
                       "play.currentTime":"00:00",
                       "play.duration":'00:00', 
                       'play.percent':0
                 })    
}
,
play(){
                  this.audioCtx.play();
                  this.setData({state:"running"});
                
},
pause(){
                  this.audioCtx.pause()
                  this.setData({state:"paused"})
},
next(){
      var index = this.data.playIndex>=this.data.playList.length-1?
      0 : this.data.playIndex+1;
     this.setMusic(index);
      // 如果是播放状态就要它一直播放
      //  否者就要是为停止状态的话就不要立即播放
      if(this.data.state==="running"){
             this.play();
      }      
},
sliderChange(e){
       var currentValue = e.detail.value;
      //  console.log(currentValue)
      //  当前值乘总的再除/100
       var time =currentValue*this.audioCtx.duration/100
       this.audioCtx.seek(time);
},
changePage(){
            console.log("changePage")
}
,
changePlay(e){
      // console.log(e.currentTarget.dataset.index);
      this.setMusic(e.currentTarget.dataset.index);
      this.play();
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