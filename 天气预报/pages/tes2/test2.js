// pages/bar/index.js
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
    }
  },

  onReady: function() {

  }
})