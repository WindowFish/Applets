// pages/proj_modify/proj_modify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     username:"",
      sex:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var username = decodeURIComponent(options.username);
     var sex = decodeURIComponent(options.gender)
     this.setData({username:username,sex:sex})

  },
  formSumbit(option){
    var name = option.detail.value.name;
    var sex =option.detail.value.radio;
    // 获取当前页面栈，所经历的跳转栈
    // __route__: "pages/proj_detail/proj_detail"
    // __route__: "pages/proj_modify/proj_modify"
    var page = getCurrentPages();
    var prePage = page[page.length-2];
    prePage.setData({
        name:name,
        sex:sex
    })
    // 返回去第一个页面
    wx.navigateBack()
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