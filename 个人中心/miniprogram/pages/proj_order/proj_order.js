const db = wx.cloud.database({env:"demo02-n52qx"})
Page({
  data: {
    index:0,
    com:['顺丰','申通','圆通','韵达','天天'],
    company:['sf','sto','yt','yd','tt'],
    no:null,
    expressInfo:null,
    Nvalue:'',
    selectedItem:"顺丰",
    selectedNumber:0,
    showNumber:"",
    showCompany:""
  },
  changePick(options){
       var current = options.detail.value;
        // 获取选中的内容保存到data中后续查询要用到
 var currentValue=this.data.com[options.detail.value]
  this.setData({index:current,selectedItem:currentValue})
  },
  getNumber(options){
      var currentNumber = options.detail.value;
      this.setData({selectedNumber:currentNumber})
  },
  search(){  
    // console.log(this.data.selectedItem)
    var selectedNumber =this.data.selectedNumber;
    var that = this;
    if(selectedNumber==null || selectedNumber==""){
          wx.showToast({
            title: '请输入您的订单号',
            image:'../../images/failure.png'
          })
    }else{
          // 到数据库中查改订单号有没有，要是没有就提示查找不到订单号：
          db.collection('demo_finddeliveryfast').where({
            selectedNumber:selectedNumber
          }).get().then(res=>{
                console.log(res.data)
                if(res.data.length==0){ 
                     wx.showToast({
                       title: '订单号不正确',
                       image:'../../images/failure.png'
                     })
                }else{
                      var selectedItem =that.data.selectedItem;
                      // 数据库查询操作
                      db.collection('demo_finddeliveryfast').where({selectCompany:selectedItem}).
                      get().then(res=>{
                            var currentNumber ="您的订单号是："+ res.data[0].selectedNumber
                            var currentCompany = "派运公司是："+res.data[0].selectCompany
                            that.setData({showCompany:currentCompany,showNumber:currentNumber})
                      }).catch(err=>{
                          console.log(err)
                      })
                 
                }
          }).catch(err=>{
              console.log(err)
          })
         
    }
    
  
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