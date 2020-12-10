var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  data: {
       allFoodsIn:[], 

  },
  onLoad: function (options) {
        qqmapsdk = new QQMapWX({
          key: 'VL3BZ-MMOLJ-IBAFS-KPYMI-RRS57-SMF7U'
      });
  },
  onReady: function () {

  },
  search1(){
    var that = this;
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        // 初始化获取到周边所有的酒店的信息包括经度和纬度
          var allFoodsIn = res.data;
          that.setData({allFoodsIn:allFoodsIn})
      },
    })
  }
  
})