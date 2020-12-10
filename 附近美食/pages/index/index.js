var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude:null,
    latitude:null,
    scale:16,
    controls:null,
    markers:null,
    mapw:0,
    maph:"100%",
     // 获取到的值全部的获取到 周边美食地理位置
    log:[],
    lat:[],
    polyline:null,
  },

onLoad: function (options) {
    // 初始化腾讯地图api
    qqmapsdk = new QQMapWX({
      key: 'VL3BZ-MMOLJ-IBAFS-KPYMI-RRS57-SMF7U'
    })
  },
onReady: function () {
 // 获取当前位置
 var that = this;
 wx.getLocation({
     type:"gcj02" ,
     success:res=>{
         // 获取当前的经度和纬度
         var longitude = res.longitude;
         var latitude = res.latitude;
         // 获取当前位置的标志点,赋值给markets
         var markers = [];
         var markersInfo={
           iconPath: '../../static/currentLocation.png',
           id: 0,
           latitude:latitude,
           longitude:longitude,
           width: 30,
           height: 30,
           title:"广交院南校区"
         }
         // 初始化当地所在位置的地点markers
         
         // 周边10个美食区的地点markers
         qqmapsdk.search({
          keyword: '美食',  //搜索关键词
          success:res=>{
            var log = [];
            var lat = [];
            for(var i=0;i<=res.data.length-1;i++){
              var longitude=res.data[i].location.lng
              var latitude=res.data[i].location.lat    
               log[i] = longitude;
               lat[i]= latitude;
               markersInfo={
                iconPath: '../../static/foods.png',
                id:i+1,
                latitude: lat[i],
                longitude:log[i],
                width: 30,
                height: 30,
                title:"美食"
               
        
              }
              markers.push(markersInfo)
              console.log(markersInfo)
               that.setData({markers:markers})
            }   
          
          }
      })  
      markers.push(markersInfo)
      that.setData({latitude:latitude,longitude:longitude,markers:markers})
     }
 })
 // 设置地图的宽度和高度
 wx.getSystemInfo({
   success: res=> {
         var width = res.windowWidth+'px';
         that.setData({mapw:width})
 
   },
 })


 }
,
})