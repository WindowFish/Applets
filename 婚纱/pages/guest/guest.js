// pages/guest/guest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker:{
      arr:["1","2","3","4","5","6"],
      index:0,
    }
  },
  // 选者的时候 picker
  GetChangePick(option){
          this.setData({"picker.index":option.detail.value})
  },
  submitForm(opton){
      var name = opton.detail.value.uname;
      var uphone = opton.detail.value.uphone;
 if (this.checkName(name) && this.checkPhone(uphone)) {
        // 这里其实是要和后台联合起来的
        // 把用户名和密码发到后台后台校验和发送到前台
        // 判断参数来个if
         wx.showToast({
           title: "提交成功",
           image:"../../images/success.png",
           duration:3000
         })
      }else{
            wx.showToast({
              title: "信息有误提交失败",
              image:"../../images/fail.png",
              duration:1500
            })
      }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 校验名字
  changeName(e){
       this.checkName(e.detail.value);
  },
  // 校验手机
  changePhone(e){
       this.checkPhone(e.detail.value);
  },
  checkName(values){
         var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
         return this.check(values,reg,"姓名输入错误");
  },
  checkPhone(values){
         var reg = /^(((13)|(15)|(17)|(18))\d{9})$/; 
         return this.check(values,reg,"手机号输入错误")
  }
,
check(values,reg,errMsg){
      if(!reg.test(values)){
           wx.showToast({
             title: errMsg,
              icon:"none",
              duration:1500
           })
           return false;
      }
      return true;
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