import * as echarts from '../../ec-canvas/echarts';
let chart = null;
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    //折线图标题
    title: {
      text: '未来七天温度统计',
      left: 'center'
    },
    // 折线图线条的颜色
    color: ["#37A2DA"],
    // 折线图的线条代表意义
    legend: {
      itemWidth:5,//小圆点的宽度
      itemGap:25,
      selectedModel:'single',//折线可多选
      inactiveColor:'#87CEEB',
      data: [
          {
            name: '浏览未来七天天气',
            icon: 'circle',
            textStyle: {
              color: '#000000',
            }
          }, 
      ],
      bottom: 0,
      left: 30,
      z: 100
    },
    // 刻度
    grid: {
      containLabel: true
    },
    // 悬浮图标
    tooltip: {
      show: true,
      trigger: 'axis',
      position: function (pos, params, dom, rect, size) {
        var obj = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // x的数据要渲染
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine:{//y轴坐标是否显示
        show:false
      },
      axisTick:{//y轴刻度小标是否显示
        show:false
      }
    },
    series: [
      {
      name: '浏览未来七天天气',
      type: 'line',
      // 设置折线是否平滑
      smooth: false,
      data: [18, 36, 65, 30, 78, 40, 33]
      },
      ]
  };
  chart.setOption(option);
  return chart;
}
Page({
  data: {
    ec: {
      onInit: initChart
    },
    cityname:"",
    week:"",
    day:"",
    temp:"",
    weather:"",
    templow:"",
    temphigh:"",
    winddirect:"",
    windpower:"",
    findcity:"",
    imagPic:'../../static/1.png',
  //  点击按钮时获取未来天气的信息,初始化的也查询出来存放到这里
    futrueTemp:[],
    // 点击按钮时获取未来天气的图片,初始化的也查询出来存放到这里
    futruePic:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //  初始化就指定一个地点的天气
      this.getInitWeather();
  },
  // 初始化指定内容api
  getInitWeather(){
    var that = this;
      wx.request({
              url: 'https://api.jisuapi.com/weather/query?appkey=6fec8280dcf3da94',
              method:'POST',
              header:{
                "Content-type":"application/x-www-form-urlencoded"
             },
              data:{
                  city:"广州" 
                } ,
                success:res=>{
                  var result =res.data.result
                  var city  = result.city;
                  var week  =result.week;
                  var day = result.date;
                  var temp = result.temp;
                  var weather = result.weather;
                  var templow = result.templow;
                  var temphigh = result.temphigh;
                  var winddirect  =result.winddirect;
                  var windpower  =result.windpower;
                  var allTemp = res.data.result.daily
                  // 初始化图片
                  var imageID= result.img;
                 this.changeImage(imageID)
                 this.initFutureDayPic(allTemp);
                  that.setData({cityname:city,week:week,day:day,
                    temp:temp,weather:weather,templow:templow,
                    temphigh:temphigh,winddirect:winddirect,
                    windpower:windpower,futrueTemp:allTemp  
                  })
               }
         })
  },
  // 获取内容
  getInput(options){
      var findcity = options.detail.value;
      this.setData({findcity:findcity})
  },
  // 点击查询触发
  search(){
    // 先配置域名在小程序开法文档中配置
    // https://api.jisuapi.com
    var that = this;
    var findcity = that.data.findcity;
    // 1.验证是不是为空如果为空就提示它输入框不能为空且return
    // 2.输入的一定要是中文
    // 3.如果不为空验证输入的城市是不是存在,如果不存在那么就提示输入的城市无法找到
  
     wx.request({
       url: 'https://api.jisuapi.com/weather/query?appkey=6fec8280dcf3da94',
       method:"POST",
      //  要是在data中传递参数获取不到数据那么就必须要设置
      //  header才可以获取到数据
       header:{
          "Content-type":"application/x-www-form-urlencoded"
       },
       data:{
         city:findcity
       },
       success:res=>{
        //  格式化输出 
          var result =res.data.result
          var city  = result.city;
          var week  =result.week;
          var day = result.date;
          var temp = result.temp;
          var weather = result.weather;
          var templow = result.templow;
          var temphigh = result.temphigh;
          var winddirect  =result.winddirect;
          var windpower  =result.windpower;
          var imageID= result.img;
      // 每一个image数字都对应一张图片
          that.changeImage(imageID);
        // 获取未来6天的天气 0(是今天的)
        // 把值赋值给futrueTemp到其他页面调用
          var allTemp = res.data.result.daily
          this.initFutureDayPic(allTemp);
          that.setData({cityname:city,week:week,day:day,
            temp:temp,weather:weather,templow:templow,
            temphigh:temphigh,winddirect:winddirect,
            windpower:windpower,futrueTemp:allTemp
          })
       }
     })
  },
  // 初始化给未来6天都加图片
  initFutureDayPic(allTemp){
    var futruePic =[];
     futruePic[0]="/static/"+allTemp[1].day.img+".png"
     futruePic[1]="/static/"+allTemp[2].day.img+".png"
     futruePic[2]="/static/"+allTemp[3].day.img+".png"
     futruePic[3]="/static/"+allTemp[4].day.img+".png"
     futruePic[4]="/static/"+allTemp[5].day.img+".png"
     futruePic[5]="/static/"+allTemp[6].day.img+".png" 
     this.setData({futruePic:futruePic})  
  }
  ,
  changeImage(imagId){
             var currentImage = "/static/"+imagId+".png"
              this.setData({imagPic:currentImage})
  },


})