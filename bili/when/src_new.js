var tid = 1
var areaName = ''
var dat = new Array()
var areaId = ''
var k, b
dat = []

function showList(o) {
  hideList("dropdown-content" + o.id);
  document.getElementById("dropdown-" + o.id).classList.toggle("show");
}

function changeTo(o) {
  if (areaId != '') {
    document.getElementById(areaId).style.background = ''
    document.getElementById(areaId).style.color = ''
    document.getElementById(tid).style.background = ''
    document.getElementById(tid).style.color = ''
  }
  areaId = o.parentNode.id.replace(/[^0-9]/ig, "")
  areaName = document.getElementById(areaId).innerHTML + " → " + o.innerHTML
  tid = o.id
  document.getElementById("type-hint").innerHTML = areaName
  //document.getElementById("submit").inneropenDropdown.style.background = ""HTML = "<div><button onclick=\"buttonClick()\" class=\"btn submit-btn\">预测</button></div>"
  document.getElementById("submit").style.display = "";
  document.getElementById(areaId).style.background = '#1f75cf'
  document.getElementById(areaId).style.color = '#fff'
  document.getElementById(tid).style.background = '#1f75cf'
  document.getElementById(tid).style.color = '#fff'
}

function hideList(option) {
  var dropdowns = document.getElementsByClassName("dropdown-content");

  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.id != option) {
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    hideList("");
  }
}
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});
Highcharts.dateFormat('%m-%d %H:%M')


function buttonClick() {
	buttonClick24()
	buttonClick25()
	buttonClick27()
	buttonClick47()
	buttonClick28()
	buttonClick29()
	buttonClick30()
	buttonClick31()
	buttonClick54()
	buttonClick59()
	buttonClick130()
	buttonClick17()
	buttonClick19()
	buttonClick65()
	buttonClick121()
	buttonClick136()
	buttonClick171()
	buttonClick172()
	buttonClick173()
	buttonClick71()
	buttonClick131()
	buttonClick137()
    buttonClick185()
    buttonClick187()
    buttonClick32()
    buttonClick33()
    buttonClick51()
    buttonClick152()

    buttonClickOld()
}
function buttonClickOld() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/" + tid + ".json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/" + tid + "_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]) {
            line[1] = [prediction, aid]
          }
          document.getElementById("prediction").innerHTML =
            '您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
          Highcharts.chart('container', {
            title: {
              text: areaName
            },
            chart: {
              zoomType: 'x',
              height: 600,
              width: 840
            },
            xAxis: {
              title: {
                text: '过审时间',
                style: {
                  fontSize: "18px",
                }
              },
              min: line[0][0],
              max: Math.max(line[1][0], prediction),
              type: 'datetime',
              minTickInterval: 100,
              dateTimeLabelFormats: {
                day: '%H:%M'
              }
            },
            yAxis: {
              title: {
                text: ''
              },
              min: line[0][1],
              max: Math.max(line[1][1], aid),
              labels: {
                formatter: function() {
                  return this.value
                }
              }
            },
            tooltip: {
              formatter: function() {
                var d = new Date(this.x);
                var s = '<b>' + d.toLocaleString() + '</b>';
                s += '<br/><span style="color:' + 'black' + '">' + 'av' +
                  this.point.y.toFixed(0) + ' </span>';
                return s;
              }
            },
            series: [{
              name: '实际',
              color: 'red',
              type: 'scatter',
              events: {
                click: function(e) {
                  window.open("https://www.bilibili.com/video/av" + e.point.y);
                }
              },
              data: dat
            }, {
              name: '拟合',
              color: 'blue',
              type: 'spline',
              marker: {
                enabled: false
              },
              data: line
            }, {
              name: '预测',
              color: 'orange',
              type: 'scatter',
              marker: {
                symbol: 'square',
                radius: 10
              },
              data: [
                [prediction, aid]
              ]
            }]
          });
        } else {
          alert("网络异常，请稍后再试")
          return
        }
      })
    } else {
      alert("网络异常，请稍后再试")
      return
    }
  })
  String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
      return result;
    }
    var data = arguments;
    if (arguments.length == 1 && typeof(args) == "object") {
      data = args;
    }
    for (var key in data) {
      var value = data[key];
      if (undefined != value) {
        result = result.replace("{" + key + "}", value);
      }
    }
    return result;
  }
}
function buttonClick24() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/24.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/24_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]) {
            line[1] = [prediction, aid]
          }
          document.getElementById("prediction24").innerHTML =
            '您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (动画 → MAD·AMV)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {
          alert("网络异常，请稍后再试")
          return
        }
      })
    } else {
      alert("网络异常，请稍后再试")
      return
    }
  })
  String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
      return result;
    }
    var data = arguments;
    if (arguments.length == 1 && typeof(args) == "object") {
      data = args;
    }
    for (var key in data) {
      var value = data[key];
      if (undefined != value) {
        result = result.replace("{" + key + "}", value);
      }
    }
    return result;
  }
}
function buttonClick25() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/25.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/25_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction25").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (动画 → MMD·3D)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick27() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/27.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/27_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction27").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (动画 → 综合)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick47() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/47.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/47_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction47").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (动画 → 短片·手书·配音)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick28() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/28.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/28_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction28").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (音乐 → 原创音乐)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick29() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/29.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/29_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction29").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (音乐 → 三次元音乐)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick30() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/30.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/30_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction30").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (音乐 → VOCALOID·UTAU)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick31() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/31.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/31_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction31").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (音乐 → 翻唱)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick54() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/54.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/54_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction54").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (音乐 → OP/ED/OST)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick59() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/59.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/59_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction59").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (音乐 → 演奏)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick130() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/130.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/130_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction130").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (音乐 → 音乐选集)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick17() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/17.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/17_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction17").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → 单机联机)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick19() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/19.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/19_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction19").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → Mugen)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick65() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/65.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/65_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction65").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → 网络游戏)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick121() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/121.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/121_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction121").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → GMV)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick136() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/136.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/136_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction136").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → 音游)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick171() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/171.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/171_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction171").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → 电子竞技)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick172() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/172.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/172_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction172").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → 手机游戏)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick173() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/173.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/173_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction173").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (游戏 → 桌游棋牌)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick71() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/71.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/71_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction71").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (娱乐 → 综艺)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick131() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/131.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/131_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction131").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (娱乐 → Korea相关)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick137() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/137.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/137_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction137").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (娱乐 → 明星)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick185() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/185.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/185_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction185").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (电视剧 → 国产剧)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick187() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/187.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/187_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction187").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (电视剧 → 海外剧)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick32() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/32.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/32_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction32").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (番剧 → 完结动画)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick33() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/33.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/33_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction33").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (番剧 → 连载动画)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick51() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/51.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/51_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction51").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (番剧 → 资讯)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick152() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/152.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/152_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]){line[1] = [prediction, aid];}
          document.getElementById("prediction152").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (番剧 → 官方延伸)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
