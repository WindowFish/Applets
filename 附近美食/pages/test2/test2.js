var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  data: {
    longitude:null,
    latitude:null,
    markers:null,
    scale:18,
    mapw:null,
    maph:"100%",
    controls:null,
    polyline:null,
    searchContent:''
  },
onLoad: function (options) {
        // 初始化腾讯地图api
        qqmapsdk = new QQMapWX({
             key:'VL3BZ-MMOLJ-IBAFS-KPYMI-RRS57-SMF7U'
        })
        // 获取到设备的宽度和高度赋值给地图
        var that = this
        wx.getSystemInfo({
             success:res=>{
                    var width = res.windowWidth+'px';
                    that.setData({mapw:width})
             }
        })
        // 初始化获取到当前的地理位置
        wx.getLocation({
            type:"gcj02" , 
            success:res=>{
              var latitude= res.latitude
              var longitude=res.longitude
              // 设立标识物
              var markers = [];
              // 当前位置的标识物 id=0
              var markerinfo = {
                    iconPath: '../../static/currentLocation.png',
                    id: 0,
                    latitude:latitude,
                    longitude:longitude,
                    title:"当前所在的位置",
                    width: 30,
                    height: 30,
              }
              // 获取附近的所有的美食店信息设置marker
              qqmapsdk.search({
                keyword: '美食',  
                success:res=>{
                    for(var i =0;i<=res.data.length-1;i++){
                         //  纬度
                          var lat=res.data[i].location.lat;
                          // 经度
                          var lng = res.data[i].location.lng
                          // 美食街的名字
                         var title= res.data[i].title
                          markers[1+i] ={
                            iconPath: '../../static/foods.png',
                            id: i+1,
                            latitude:lat,
                            longitude:lng,
                            title:title,
                            width: 30,
                            height: 30,
                          }
                    }
                    that.setData({markers:markers})
                }
              })
              markers.push(markerinfo)
              that.setData({latitude:latitude,longitude:longitude,markers:markers})
            }
        })
        // 初始化control
         var control=[{    
            id:1,//必须要加id才能触发此事件
            iconPath:"../../static/foodControl.jpg",
            position:{
                left:20,
                top:20,
                width:50,
                height:50
            },
            clickable: true
          }]
        this.setData({controls:control})
},
// 点击control图片触发
controltap(){
  
}
,
// 点击标记物触发
markertap(option){
  // var content = option.markerId+"";
  //    wx.showtoast({
  //      title: content
  //    })
},
// 在地图上移动时触发
bindregionchange(){
}
,
// 获取输入框信息 
getContent(option){
    var content = option.detail.value;
    this.setData({searchContent:content})
},
// 点击按钮获取输入信息去实现城市检索
searchEnd(){
    var latitude =this.data.latitude;
    var longitude = this.data.longitude
     var content = this.data.searchContent;
     var that = this;
     qqmapsdk.geocoder({
        address: content,
        success:res=>{
          var longitudeEnd = res.result.location.lng;
          var latitudeEnd=res.result.location.lat
          var title = res.result.title;
          // 设立目的地标识点
          var markerinfo = {
                iconPath: '../../static/currentLocation.png',
                id: 11,
                latitude:latitudeEnd,
                longitude:longitudeEnd,
                title:"目的地:"+title,
                width: 30,
                height: 30,
          }
          var markers = this.data.markers;
          markers.push(markerinfo)
          this.setData({markers:markers})
            // 用户输入目的地指定方向城市线索
             var polyline=[{
              points:[{
                  longitude: longitude,
                  latitude:latitude
                },
                {
                  longitude:longitudeEnd ,
                  latitude:latitudeEnd,

              }],
                color:"#FF0000DD",
                width: 2,
                dottedLine: true
            }]  
            that.setData({polyline:polyline})
        },
          fail: function(error) {
            console.error(error);
          }
     })
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