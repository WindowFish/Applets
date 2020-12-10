
var num = 0,
 result = 0,
 numshow = "0";
var operate = 0; //判断输入状态的标志 
var calcul = 0; //判断计算状态的标志 
var quit = 0; //防止重复按键的标志 
Page({
  data: {
    id9: "9",
    id8: "8",
    id7: "7",
    id6: "6",
    id5: "5",
    id4: "4",
    id3: "3",
    id2: "2",
    id1: "1",
    id0: "0",
    screenData: "0",
    logs: [],
    param1:0,
    sign:"+",
    param2:0,
    result111:0
  },
  clickBtn: function (event) {
    var str = this.data.screenData; //获得当前显示数据 
    var idValue = event.currentTarget.id;
    // 对结果str判断，如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值;
    // operate==0就是没有输入，就可以输入
    str = (str != "0") ? ((operate == 0) ? str : "") : "";
    str = str + String(idValue); //给当前值追加字符 
    this.setData({ "screenData": str }); //刷新显示 
    operate = 0; //重置输入状态 
    quit = 0; //重置防止重复按键的标志 
  },
  //小数点事件
  dot: function (event) {
    var str = this.data.screenData; //获得当前显示数据 
    str = (str != "0") ? ((operate == 0) ? str : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0"; 
    for (var i = 0; i <= str.length; i++) { //判断是否已经有一个点号 
      if (str.substr(i, 1) == ".") return false; //如果有则不再插入 
    }
    str = str + ".";
    this.setData({ "screenData": str }); //刷新显示 
    operate = 0;
  },
  del: function () { 
    //退格 
    var str = this.data.screenData; //获得当前显示数据 
    str = (str != "0") ? str : "";
    str = str.substr(0, str.length - 1);
    str = (str != "") ? str : "0";
    this.setData({ "screenData": str }); //刷新显示 
  },
  clearscreen: function () { //清除数据 
    num = 0;
    result = 0;
    numshow = "0";
    this.setData({ "screenData": 0 });
  },
  plus: function () { //加法 
    this.calculate(); //调用计算函数 
    operate = 1; //更改输入状态 
    calcul = 1; //更改计算状态为加 
  },
  minus: function () { //减法 
    this.calculate();
    operate = 1;
    calcul = 2;
  },
  times: function () { //乘法 
    this.calculate();
    operate = 1;
    calcul = 3;
  },
  divide: function () { //除法 
    this.calculate();
    operate = 1;
    calcul = 4;
  },
  persent: function () { //求余 
    this.calculate();
    operate = 1;
    calcul = 5;
  },
  equal: function () {
    this.calculate(); //等于 
    operate = 1;
    num = 0;
    result = 0;
    numshow = "0";
  },
  calculate: function () {
    var  that = this;
    numshow = this.data.screenData; //获得当前显示数据 
    if (num != 0 && quit != 1) { //判断前一个运算数是否为零以及防重复按键的状态 
      switch (calcul) { //判断要输入状态 
        case 1: result = Number(num) + Number(numshow);
          this.data.logs.push(num + "+" + numshow + "=" + result);
          wx.setStorageSync("calclogs", this.data.logs);
          that.setData({param1:Number(num),param2:Number(numshow),
            sign:"+",result111:result
          })
          break; //计算"+" 
        case 2: result = Number(num) - Number(numshow);
          this.data.logs.push(num + "-" + numshow + "=" + result);
          wx.setStorageSync("calclogs", this.data.logs);
          that.setData({param1:Number(num),param2:Number(numshow),
            sign:"-",result111:result
          })
          break; //计算"-" 
        case 3:
          result = num * numshow;
          this.data.logs.push(num + "*" + numshow + "=" + result);
          wx.setStorageSync("calclogs", this.data.logs);
          that.setData({param1:Number(num),param2:Number(numshow),
            sign:"*",result111:result
          })
          break;
        case 4: if (numshow != 0) { result = num / numshow; } else {
          wx.showToast({
            title: '被除数不能为零！',
            icon: 'success',
            duration: 1000
          })
        }
          this.data.logs.push(num + "/" + numshow + "=" + result); //向logs数组的末尾添加一行
          that.setData({param1:num,param2:Number(numshow),
            sign:"÷",result111:result
          })
          wx.setStorageSync("calclogs", this.data.logs);
          break;
        case 5: result = num % numshow;
          this.data.logs.push(num + "%" + numshow + "=" + result);
          wx.setStorageSync("calclogs", this.data.logs);
          break;
      }
      quit = 1; //避免重复按键 
    }
    else {
      result = numshow;
    }
    numshow = String(result);
    this.setData({ "screenData": numshow });
    num = result; //存储当前值 
  },

  history: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  }

})
