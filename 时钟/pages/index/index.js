Page({

  data: {
    
  },

  width:0,
  height:0,
  timer:null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          wx.getSystemInfo({
                success:res=>{
                      var width=res.windowWidth
                      var height= res.windowHeight
                       this.width =width;
                       this.height=height 
                }
          })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
        // 将角度转换为弧度
        const D6 = 6 * Math.PI / 180
        const D30 = 30 * Math.PI / 180
        const D90 = 90 * Math.PI / 180
        // 创建CanvasContext
         var ctx = wx.createCanvasContext('myCanvas')
          // 计算表盘半径，留出 30px 外边距
            var width = this.width
            var height = this.height
            var radius = width / 2 - 30
            draw()
            this.timer = setInterval(draw, 1000)
            function draw(){
              ctx.translate(width/2,height/2)
               // 绘制表盘
              drawClock(ctx, radius)
              // 绘制指针
              drawHand(ctx, radius)
              // 执行绘制
              ctx.draw()
            }
            function drawClock(ctx, radius) {

              // 绘制大圆
              ctx.setLineWidth(2)  // 设置线条的粗细，单位px
              ctx.beginPath()      // 开始一个新路径
              ctx.arc(0, 0, radius, 0, 2 * Math.PI, true)
              ctx.stroke()
        
              // 绘制中心圆
              ctx.setLineWidth(1)
              ctx.beginPath()
              ctx.arc(0, 0, 8, 0, 2 * Math.PI, true) // 半径8px
              ctx.stroke()
        
              // 绘制大刻度盘
              ctx.setLineWidth(5)
              for (var i = 0; i < 12; ++i) {
                // 以原点为中心顺时针旋转（多次调用旋转的角度会叠加）
                ctx.rotate(D30) // 360 / 12 = 30
                ctx.beginPath()
                ctx.moveTo(radius, 0)
                ctx.lineTo(radius - 15, 0) // 大刻度长度15px
                ctx.stroke()
              }
        
              // 绘制小刻度盘
              ctx.setLineWidth(1)
              for (var i = 0; i < 60; ++i) {
                ctx.rotate(D6) // 360 / 60 = 6
                ctx.beginPath()
                ctx.moveTo(radius, 0)
                ctx.lineTo(radius - 10, 0) // 小刻度盘长度10px
                ctx.stroke()
              }
        
              // 绘制文本
              ctx.setFontSize(20)         // 字号
              ctx.textBaseline = 'middle' // 文本上下居中
        
              // 文本距离时钟中心点半径
              var r = radius - 30
        
              for (var i = 1; i <= 12; ++i) {
                // 利用三角函数计算文本坐标
                var x = r * Math.cos(D30 * i - D90)
                var y = r * Math.sin(D30 * i - D90)
                if (i > 10) { // 调整 11 和 12 的位置
                  // 在画布上绘制文本 fillText(文本, 左上角x坐标, 左上角y坐标)
                  ctx.fillText(i, x - 12, y)
                } else {
                  ctx.fillText(i, x - 6, y)
                }
              }
            }
        
            // 绘制指针
            function drawHand(ctx, radius) {
              var t = new Date()     // 获取当前时间
              var h = t.getHours()   // 小时
              var m = t.getMinutes() // 分
              var s = t.getSeconds() // 秒
              h = h > 12 ? h - 12 : h // 将24小时制转化为12小时制
              
              // 时间从3点开始，逆时针旋转90度，指向12点
              ctx.rotate(-D90)
        
              // 绘制时针
              ctx.save() // 记录旋转状态
              ctx.rotate(D30 * (h + m / 60 + s / 3600))
              ctx.setLineWidth(6)
              ctx.beginPath()
              ctx.moveTo(-20, 0) // 线条起点（针尾留出20px）
              ctx.lineTo(radius / 2.6, 0) // 线条长度
              ctx.stroke()
              ctx.restore() // 恢复旋转状态，避免旋转叠加
        
              // 绘制分针
              ctx.save()
              ctx.rotate(D6 * (m + s / 60))
              ctx.setLineWidth(4)
              ctx.beginPath()
              ctx.moveTo(-20, 0)
              ctx.lineTo(radius / 1.8, 0)
              ctx.stroke()
              ctx.restore()
        
              // 绘制秒针
              ctx.save()
              ctx.rotate(D6 * s)
              ctx.setLineWidth(2)
              ctx.beginPath()
              ctx.moveTo(-20, 0)
              ctx.lineTo(radius / 1.6, 0)
              ctx.stroke()
              ctx.restore()
            }
          },
          // 页面卸载，清除画布绘制定时器
          onUnload: function () {
            clearInterval(this.timer)
          }
})