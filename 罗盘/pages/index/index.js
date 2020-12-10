Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: {}
  },
  animation: null,
  x1:0,
  x2:0,
  angle:0,
  onLoad: function (options) {
        this.animation = wx.createAnimation({
          delay: 1000,
          timingFunction:'ease'
        })
  },
  // 按下的时候触发
  start(options){
      // 获取按下时的x轴的位置
      this.x1 = options.changedTouches[0].clientX;
      console.log(this.x1)
  },
  // 松开的时候触发
  end(options){
      // 获取松手时的x轴的位置
      this.x2 = options.changedTouches[0].clientX;;
      if(this.x1<this.x2){
        // 顺时针
         this.angle=this.angle+80;
      }else{
        // 逆时针
        this.angle=this.angle-80;
      }
      this.setData({animation:this.animation.rotate(this.angle).step().export()})
 },
  rotate(){
      this.setData({animation:
      this.animation.rotate(Math.random()*720-360).step().export()
      })
  }
  ,
  scale(){
      this.setData({animation:this.animation.scale(Math.random()*2).step().export()})
  },
  translate(){
      this.setData({animation:this.animation.translate(Math.random()*100-50,Math.random()*100-50).step().export()})
  },
  skew(){
      this.setData({animation:this.animation.skew(Math.random()*90,Math.random()*90).step().export()})
  },
  roateAndScale(){
      this.animation.rotate(Math.random()*720-360)
      this.animation.scale(Math.random()*2).step();
      this.setData({animation:this.animation.export()})
  },
  roateThenScale(){
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.animation.scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
    
  } ,
  all(){
    this.animation.rotate(Math.random() * 720 - 360)
    this.animation.scale(Math.random() * 2)
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  allOrder(){
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.animation.scale(Math.random() * 2).step()
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  reset1(){
     this.animation.rotate(0).scale(1).translate(0,0).skew(0,0).step({duration:0})
      this.setData({animation:this.animation.export()})
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