Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    responseContent:"",
    talkStyle1:"none",
    talkStyle2:"none"
    
  },
  // 失去焦点获取输入框内容 
  getCurrentValue(options){
        var sendMSG = options.detail.value
        // 把每次输入的内容都集合到一个数组中
        // var cureentValueArr = [];
        // cureentValueArr.push(sendMSG)
        // console.log(cureentValueArr.length)
        this.setData({content:sendMSG})
  },
  // 点击按钮发送给后端
  sendMsg(){
          var cureentValue = this.data.content;
          var that = this;
          var talkStyle1;
          var talkStyle2;
          wx.onSocketOpen((result) => {
                  console.log("开启成功");
                  // 发消息给服务器
                  wx.sendSocketMessage({
                    data: cureentValue,
                  })
                
          })  
          // 接收服务器返回来的内容
          wx.onSocketMessage(res=>{ 
             var responseContent =JSON.parse(res.data).content
              that.setData({responseContent:responseContent})
              //  看是不是空值或""
                var responseContent = this.data.responseContent
                if(responseContent==null || responseContent==""){
                           talkStyle2 ="none"
                }else{
                           talkStyle2="block"
                }
                that.setData({talkStyle2:talkStyle2})
          })
          // 开启连接url地址
          wx.connectSocket({
              url: 'ws://localhost:3000',
            })
          wx.onSocketClose(function(res){
            console.log("WebSocket 已关闭！")
          })
          // 判断返回的内容是不是空的或输入的内容是不是空的
          if(cureentValue==null || cureentValue==""){
                     talkStyle1 ="none"
          }else{
                     talkStyle1="block"
          }
          this.setData({talkStyle1:talkStyle1})



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