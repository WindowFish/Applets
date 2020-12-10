// 第一步
var QQMapWX = require("../../libs/qqmap-wx-jssdk.js")
var qqmapsdk ; 
Page({
  data: {
    longitude:"113.353111",
    latitude:"23.183214",
    lat:"",
    log:"",
    markers:[
      { iconPath:'../../images/navi.png',id:0, width:50,
      height: 50, longitude:113.353111, latitude:23.183214}]
  },
  onLoad: function (options) {
        // 第二步
        qqmapsdk = new QQMapWX({
            key:"PKFBZ-GY2CO-LWWW3-SRZ3E-PUQ3O-B5BSV"
        })
  },
  makertap(e){
       var that = this;
        wx.openLocation({
          latitude: Number(that.data.latitude),
          longitude: Number(that.data.longitude),
          address:"广东交通职业技术学院南校区",
          name:"图书馆"
        })
  },
  getCurrentPlace(){
    var that = this; 
      wx.getLocation({
          type: 'gcj02',
          success(res){
              that.setData({lat:res.latitude,
                log:res.longitude })
          }
   })
  }
  ,
  onReady: function () {

  },


})