import * as echarts from '../../ec-canvas/echarts';
var barec = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ecLine:{
      onInit: function (canvas, width, height) {
        barec = echarts.init(canvas, null, {
         width: width,
         height: height
        });
        canvas.setChart(barec);
        return barec;
       }
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
    setTimeout(this.getData, 500);
  },
  getData(){
    wx.showLoading({
     title: '加载中...',
    })
     wx.request({
      url: 'https://api.jisuapi.com/weather/query?appkey=6fec8280dcf3da94',
      method:'POST',
      data:{
        city:"广州"
      },
      header:{
        "Content-type":"application/x-www-form-urlencoded"
     },
      success:function(res){
        var heightTemp = [];
        var daily =res.data.result.daily
        for(var i=0;i<=daily.length-1;i++){
          heightTemp[i]=daily[i].day.temphigh;
          console.log(heightTemp[i])
        }
       barec.setOption({
        xAxis: [
         {
          type: 'value',
          scale: true,
         }
        ],
        yAxis: [
         {
          type: 'value',
          scale: true,
          axisLabel: {
           formatter: '{value} m'
          }
         }
        ],
        series: [{
         name: '学生',
         data:heightTemp,
         type: 'scatter',
         markArea: {
          silent: true,
          itemStyle: {
           normal: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed'
           }
          },
          data: [[{
           name: '教室',
           xAxis: '0',
           yAxis: '0'
          }, {
           xAxis: '20',
           yAxis: '20'
          }]]
         }
        }]
       })
       wx.hideLoading(); 
      },
     })
   }



})