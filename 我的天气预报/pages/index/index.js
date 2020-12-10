import * as echarts from '../../ec-canvas/echarts';
let chart = null; 
function initChart(canvas,width,height){
    chart = echarts.init(canvas, null, {
     width: width,
     height: height
    });
    canvas.setChart(chart);
    return chart;
}
Page({
  data: {
    // swiper的current
    current:0,
    // scroll-view下的tab
    tab:0,
    // 获取输入的内容
    searchValue:"",
    // 初始化未来所有信息(不包括图片)
    InitFutureTempInfo:[],
    // 初始化今天的天气信息
    InitTodayTemp:[], 
//    初始化图片和信息
    timeAndWindInfo:[],
    // 所有图
    allpic:[{img:"/static/2.png"}],
    ec: {
        onInit: initChart
    },
  },
//  点击scroll中元素下面swipter会变
  seeDetailInfo(option){
         var currentIndex = option.currentTarget.dataset.id;
         this.setData({current:currentIndex})
  },
//   滑动下面swiper上面的scroll会改变class样式
  changeSwiper(option){
          var currentIndex = option.detail.current;
          this.setData({tab:currentIndex})
  },
// 获取输入内容
getContent(option){
      var currentContent = option.detail.value;
      this.setData({searchValue:currentContent})
} ,
//收索框校验
search(){
       var inputValue = this.data.searchValue
       var isChinese = this.goCheckCity(inputValue);
       if(isChinese){
            // 如果用户输入的是中文就继续校验有没有找到这个城市
            // 通过请求的api返回的结果来校验，如果返回的api是空
            // 那么inp就提示用户（无该城市信息）
           this.getSearchTemp(inputValue)
       }else{
            //   如果不是中文就提示用户输入信息非法
            wx.showToast({
              title: '输入内容非法',
              duration:4000,
              image:"../../static/error.png"
            })
       }
},
// 检查输入内容
goCheckCity(inputValue){
          var reg=  /^[\u4E00-\u9FA5]+$/;
          if (!reg.test(inputValue)){
                  return false ;
            } else {
                return true ;
            }
}
,
// 输入收索框获取城市信息
getSearchTemp(inputValue){
        var that = this;
        wx.request({
             url: 'https://api.jisuapi.com/weather/query?appkey=6fec8280dcf3da94',
              method:'POST',
              header:{
                "Content-type":"application/x-www-form-urlencoded"
             },
               data:{
                  city:inputValue
                } ,
                success:res=>{
                // res.data.msg
                // 如果城市不存在 输出城市不存在 存在输出ok
                if(res.data.msg=="ok"){
                    //  获取数据渲染
                    var InitTodayTemp = [];  
                    var result =res.data.result
                    InitTodayTemp[0] = result.city;
                    InitTodayTemp[1] = result.temp;
                    InitTodayTemp[2] = result.weather;
                    InitTodayTemp[3] =result.winddirect;
                    InitTodayTemp[4]  =result.windpower;
                    InitTodayTemp[5] = result.aqi.aqi
                    InitTodayTemp[6] = result.aqi.quality
                    InitTodayTemp[7]  =result.week;
                    InitTodayTemp[8] = result.templow;
                    InitTodayTemp[9] = result.temphigh;
                    InitTodayTemp[10]= result.index[6].ivalue
                    InitTodayTemp[11]=result.index[3].ivalue
                    InitTodayTemp[12]=result.date
                    var allTemp = res.data.result.daily
                    InitTodayTemp[13]=allTemp[0].sunrise
                    InitTodayTemp[14]=allTemp[0].sunset
                    // 初始化图片 和未来6天信息(包含今天)
                    this.initPicAndInfo(allTemp)
                    that.setData({InitTodayTemp:InitTodayTemp})
                }else{
                    // 提示用户该城市不存在
                    wx.showToast({
                      title: '该城市不存在',
                      duration:4000,
                       image:"../../static/error.png"
                    })
                }     
           }
    })
},
// 初始化获得城市天气，默认是广州
InitGetTemp(){
      var that = this;
        // 初始化获取今天和未来6天的城市天气信息渲染到页面
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
                var InitTodayTemp = [];  
                var result =res.data.result
                InitTodayTemp[0] = result.city;
                InitTodayTemp[1] = result.temp;
                InitTodayTemp[2] = result.weather;
                InitTodayTemp[3] =result.winddirect;
                InitTodayTemp[4]  =result.windpower;
                InitTodayTemp[5] = result.aqi.aqi
                InitTodayTemp[6] = result.aqi.quality
                InitTodayTemp[7]  =result.week;
                InitTodayTemp[8] = result.templow;
                InitTodayTemp[9] = result.temphigh;
                InitTodayTemp[10]= result.index[6].ivalue
                InitTodayTemp[11]=result.index[3].ivalue
                InitTodayTemp[12]=result.date
                var allTemp = res.data.result.daily
                InitTodayTemp[13]=allTemp[0].sunrise
                InitTodayTemp[14]=allTemp[0].sunset
                // 初始化图片 和未来6天信息(包含今天)
                this.initPicAndInfo(allTemp)
                that.setData({InitTodayTemp:InitTodayTemp})
          }
    })
},
// 初始化图片和未来6天信息
initPicAndInfo(allTemp){
    var timeAndWindInfo = allTemp;
    //  通过数字获取对应的图片
  var img1 ="/static/"+timeAndWindInfo[0].day.img+".png";
  var img2 ="/static/"+timeAndWindInfo[1].day.img+".png";
  var img3 ="/static/"+timeAndWindInfo[2].day.img+".png";
  var img4 ="/static/"+timeAndWindInfo[3].day.img+".png";
  var img5 ="/static/"+timeAndWindInfo[4].day.img+".png";
  var img6 ="/static/"+timeAndWindInfo[5].day.img+".png";
  var img7 ="/static/"+timeAndWindInfo[6].day.img+".png";
    // 把图片放回去
   timeAndWindInfo[0].day.img = img1;
   timeAndWindInfo[1].day.img = img2;
   timeAndWindInfo[2].day.img = img3;
   timeAndWindInfo[3].day.img = img4;
   timeAndWindInfo[4].day.img = img5;
   timeAndWindInfo[5].day.img = img6;
   timeAndWindInfo[6].day.img = img7;
   // 在页面加载的时候就获取到7天的最高温度和最低温度变化
    // x轴的渲染
    for(var i=1;i<=timeAndWindInfo.length-1;i++){
            var weeks=timeAndWindInfo[i].week;
    }
    //   y轴的渲染

    this.setData({timeAndWindInfo:timeAndWindInfo})  
},
  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {
        //   页面加载的时候就获取到数据渲染到页面中
        this.InitGetTemp();
    
  },
  onReady:function(){
      // 初始化获取广州的7天的温度最高温最低温信息
      // 耗时操作
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
        console.log(res.data.result.daily)

        var heightTemp = [];
        var lowTemp  = [];
        var currentDay = [];
        var daily =res.data.result.daily
        for(var i=0;i<=daily.length-1;i++){
          heightTemp[i]=daily[i].day.temphigh;
          lowTemp[i]=daily[i].night.templow;
          currentDay[i]=daily[i].week
        }
       chart.setOption({
          tooltip: {
            trigger: 'axis'
        },
          grid:{
            height:100
            },
          legend: {
            textStyle:{
              color: '#ffffff'//字体颜色
          },
            data: ['最高气温', '最低气温']
        },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data:currentDay,
              axisLine:{
                lineStyle:{
                    color:'#FFFFFF',
                }
            }

          },
           yAxis: {
              type: 'value',
               axisLine:{
                lineStyle:{
                    color:'#FFFFFF',
                }
            },
               axisLabel: {
               formatter: '{value} °C',
                textStyle: {
                  fontSize : 9   //更改坐标轴文字大小
                }
            }
        },
       series: [
          //  最高气温
            {
                name: '最高气温',
                type: 'line',
                data: heightTemp,       
            },
          //   最低气温
            {
                name: '最低气温',
                type: 'line',
                data: lowTemp,
            } ]
         }
       )
       wx.hideLoading(); 
      },
     })
   }

})