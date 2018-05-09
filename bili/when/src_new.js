var tid = 1
var areaName = ''
var dat = new Array()
var areaId = ''
var k, b , prediction
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
	document.getElementById("hidden").innerText ="0";
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
    buttonClick83()
    buttonClick145()
    buttonClick146()
    buttonClick147()
    buttonClick39()
    buttonClick95()
    buttonClick96()
    buttonClick98()
    buttonClick122()
    buttonClick124()
    buttonClick176()
    buttonClick22()
    buttonClick26()
    buttonClick126()
    buttonClick127()
    buttonClick20()
    buttonClick154()
    buttonClick156()
    buttonClick157()
    buttonClick158()
    buttonClick159()
    buttonClick164()
    buttonClick21()
    buttonClick75()
    buttonClick76()
    buttonClick138()
    buttonClick161()
    buttonClick162()
    buttonClick163()
    buttonClick174()
    buttonClick175()
    buttonClick166()
    buttonClick153()
    buttonClick168()
    buttonClick169()
    buttonClick170()
    buttonClick37()
    buttonClick178()
    buttonClick179()
    buttonClick180()
    buttonClick85()
    buttonClick86()
    buttonClick182()
    buttonClick183()
    buttonClick184()
	document.getElementById("count123").style.display = "inline";
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
            '您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (动画 → MAD·AMV)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction));
		  document.getElementById("hidden24").innerText = prediction;
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
		  document.getElementById("hidden25").innerText = prediction;
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
		  document.getElementById("hidden27").innerText = prediction;
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
		  document.getElementById("hidden47").innerText = prediction;
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
		  document.getElementById("hidden28").innerText = prediction;
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
		  document.getElementById("hidden29").innerText = prediction;
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
		  document.getElementById("hidden30").innerText = prediction;
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
		  document.getElementById("hidden31").innerText = prediction;
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
		  document.getElementById("hidden54").innerText = prediction;
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
		  document.getElementById("hidden59").innerText = prediction;
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
		  document.getElementById("hidden130").innerText = prediction;
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
		  document.getElementById("hidden17").innerText = prediction;
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
		  document.getElementById("hidden19").innerText = prediction;
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
		  document.getElementById("hidden65").innerText = prediction;
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
		  document.getElementById("hidden121").innerText = prediction;
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
		  document.getElementById("hidden136").innerText = prediction;
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
		  document.getElementById("hidden171").innerText = prediction;
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
		  document.getElementById("hidden172").innerText = prediction;
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
		  document.getElementById("hidden173").innerText = prediction;
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
		  document.getElementById("hidden71").innerText = prediction;
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
		  document.getElementById("hidden131").innerText = prediction;
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
		  document.getElementById("hidden137").innerText = prediction;
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
		  document.getElementById("hidden185").innerText = prediction;
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
		  document.getElementById("hidden187").innerText = prediction;
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
		  document.getElementById("hidden32").innerText = prediction;
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
		  document.getElementById("hidden33").innerText = prediction;
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
		  document.getElementById("hidden51").innerText = prediction;
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
		  document.getElementById("hidden152").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick83() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/83.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/83_model.json", function(result2, status) {
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
          document.getElementById("prediction83").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (电影 → 其他国家)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden83").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick145() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/145.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/145_model.json", function(result2, status) {
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
          document.getElementById("prediction145").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (电影 → 欧美电影)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden145").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick146() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/146.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/146_model.json", function(result2, status) {
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
          document.getElementById("prediction146").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (电影 → 日本电影)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden146").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick147() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/147.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/147_model.json", function(result2, status) {
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
          document.getElementById("prediction147").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (电影 → 国产电影)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden147").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick39() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/39.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/39_model.json", function(result2, status) {
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
          document.getElementById("prediction39").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (科技 → 演讲· 公开课)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden39").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick95() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/95.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/95_model.json", function(result2, status) {
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
          document.getElementById("prediction95").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (科技 → 数码)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden95").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick96() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/96.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/96_model.json", function(result2, status) {
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
          document.getElementById("prediction96").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (科技 → 星海)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden96").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick98() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/98.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/98_model.json", function(result2, status) {
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
          document.getElementById("prediction98").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (科技 → 机械)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden98").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick122() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/122.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/122_model.json", function(result2, status) {
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
          document.getElementById("prediction122").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (科技 → 野生技术协会)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden122").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick124() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/124.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/124_model.json", function(result2, status) {
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
          document.getElementById("prediction124").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (科技 → 趣味科普人文)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden124").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick176() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/176.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/176_model.json", function(result2, status) {
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
          document.getElementById("prediction176").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (科技 → 汽车)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden176").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick22() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/22.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/22_model.json", function(result2, status) {
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
          document.getElementById("prediction22").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (鬼畜 → 鬼畜调教)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden22").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick26() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/26.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/26_model.json", function(result2, status) {
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
          document.getElementById("prediction26").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (鬼畜 → 音MAD)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden26").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick126() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/126.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/126_model.json", function(result2, status) {
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
          document.getElementById("prediction126").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (鬼畜 → 人力VOCALOID)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden126").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick127() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/127.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/127_model.json", function(result2, status) {
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
          document.getElementById("prediction127").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (鬼畜 → 教程演示)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden127").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick20() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/20.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/20_model.json", function(result2, status) {
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
          document.getElementById("prediction20").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (舞蹈 → 宅舞)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden20").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick154() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/154.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/154_model.json", function(result2, status) {
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
          document.getElementById("prediction154").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (舞蹈 → 三次元舞蹈)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden154").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick156() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/156.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/156_model.json", function(result2, status) {
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
          document.getElementById("prediction156").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (舞蹈 → 舞蹈教程)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden156").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick157() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/157.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/157_model.json", function(result2, status) {
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
          document.getElementById("prediction157").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (时尚 → 美妆)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden157").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick158() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/158.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/158_model.json", function(result2, status) {
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
          document.getElementById("prediction158").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (时尚 → 服饰)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden158").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick159() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/159.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/159_model.json", function(result2, status) {
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
          document.getElementById("prediction159").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (时尚 → 资讯)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden159").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick164() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/164.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/164_model.json", function(result2, status) {
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
          document.getElementById("prediction164").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (时尚 → 健身)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden164").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick21() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/21.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/21_model.json", function(result2, status) {
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
          document.getElementById("prediction21").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 日常)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden21").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick75() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/75.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/75_model.json", function(result2, status) {
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
          document.getElementById("prediction75").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 动物圈)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden75").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick76() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/76.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/76_model.json", function(result2, status) {
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
          document.getElementById("prediction76").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 美食圈)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden76").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick138() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/138.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/138_model.json", function(result2, status) {
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
          document.getElementById("prediction138").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 搞笑)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden138").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick161() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/161.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/161_model.json", function(result2, status) {
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
          document.getElementById("prediction161").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 手工)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden161").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick162() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/162.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/162_model.json", function(result2, status) {
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
          document.getElementById("prediction162").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 绘画)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden162").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick163() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/163.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/163_model.json", function(result2, status) {
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
          document.getElementById("prediction163").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 运动)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden163").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick174() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/174.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/174_model.json", function(result2, status) {
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
          document.getElementById("prediction174").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → 其他)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden174").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick175() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/175.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/175_model.json", function(result2, status) {
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
          document.getElementById("prediction175").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (生活 → ASMR)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden175").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick166() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/166.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/166_model.json", function(result2, status) {
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
          document.getElementById("prediction166").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (广告 → 广告)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden166").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick153() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/153.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/153_model.json", function(result2, status) {
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
          document.getElementById("prediction153").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (国创 → 国产动画)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden153").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick168() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/168.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/168_model.json", function(result2, status) {
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
          document.getElementById("prediction168").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (国创 → 国产原创相关)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden168").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick169() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/169.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/169_model.json", function(result2, status) {
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
          document.getElementById("prediction169").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (国创 → 布袋戏)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden169").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick170() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/170.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/170_model.json", function(result2, status) {
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
          document.getElementById("prediction170").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (国创 → 资讯)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden170").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick37() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/37.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/37_model.json", function(result2, status) {
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
          document.getElementById("prediction37").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (纪录片 → 人文·历史)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden37").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick178() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/178.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/178_model.json", function(result2, status) {
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
          document.getElementById("prediction178").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (纪录片 → 科学·探索·自然)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden178").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick179() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/179.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/179_model.json", function(result2, status) {
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
          document.getElementById("prediction179").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (纪录片 → 军事)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden179").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick180() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/180.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/180_model.json", function(result2, status) {
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
          document.getElementById("prediction180").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (纪录片 → 社会·美食·旅行)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden180").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick85() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/85.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/85_model.json", function(result2, status) {
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
          document.getElementById("prediction85").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (影视 → 短片)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden85").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick86() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/86.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/86_model.json", function(result2, status) {
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
          document.getElementById("prediction86").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (影视 → 特摄)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden86").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick182() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/182.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/182_model.json", function(result2, status) {
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
          document.getElementById("prediction182").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (影视 → 影视杂谈)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden182").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick183() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/183.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/183_model.json", function(result2, status) {
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
		  document.getElementById("prediction183").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (影视 → 影视剪辑)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden183").innerText = prediction;
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function buttonClick184() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/184.json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/184_model.json", function(result2, status) {
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
		  document.getElementById("prediction184").innerHTML ='您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审 (影视 → 预告·资讯)'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
		  document.getElementById("hidden184").innerText = prediction;
		  document.getElementById("hidden").innerText ="1";
        } else {alert("网络异常，请稍后再试");return}})} else {alert("网络异常，请稍后再试");return}})
  String.prototype.format = function(args) {var result = this;if (arguments.length < 1) {return result;}var data = arguments;if (arguments.length == 1 && typeof(args) == "object") {data = args;}for (var key in data) {var value = data[key];if (undefined != value) {result = result.replace("{" + key + "}", value);}}return result;}
}
function mean(a){
     var sum=eval(a.join("+"));
     return sum/a.length;
}
function stdDev(a){
     var m=mean(a);   //此处要用到 mean 函数
     var sum=0;
     var l=a.length;
     for(var i=0;i<l;i++){
         var dev=a[i]-m;
         sum+=(dev*dev);
     }
     return Math.sqrt(sum/(l-1));
}
function formatSeconds(value) { 
    var theTime = parseInt(value);// 需要转换的时间秒 
    var theTime1 = 0;// 分 
    var theTime2 = 0;// 小时 
    var theTime3 = 0;// 天
    if(theTime > 60) { 
        theTime1 = parseInt(theTime/60); 
        theTime = parseInt(theTime%60); 
        if(theTime1 > 60) { 
            theTime2 = parseInt(theTime1/60); 
            theTime1 = parseInt(theTime1%60); 
            if(theTime2 > 24){
                //大于24小时
                theTime3 = parseInt(theTime2/24);
                theTime2 = parseInt(theTime2%24);
            }
        } 
    } 
    var result = '';
    if(theTime > 0){
        result = ""+parseInt(theTime)+"秒";
    }
    if(theTime1 > 0) { 
        result = ""+parseInt(theTime1)+"分"+result; 
    } 
    if(theTime2 > 0) { 
        result = ""+parseInt(theTime2)+"小时"+result; 
    } 
    if(theTime3 > 0) { 
        result = ""+parseInt(theTime3)+"天"+result; 
    }
    return result; 
}
function count() {
var end = document.getElementById("hidden").innerText;
if (end == 1){
var hidden24 = document.getElementById("hidden24").innerText;
var hidden25 = document.getElementById("hidden25").innerText;
var hidden27 = document.getElementById("hidden27").innerText;
var hidden47 = document.getElementById("hidden47").innerText;
var hidden28 = document.getElementById("hidden28").innerText;
var hidden29 = document.getElementById("hidden29").innerText;
var hidden30 = document.getElementById("hidden30").innerText;
var hidden31 = document.getElementById("hidden31").innerText;
var hidden54 = document.getElementById("hidden54").innerText;
var hidden59 = document.getElementById("hidden59").innerText;
var hidden130 = document.getElementById("hidden130").innerText;
var hidden17 = document.getElementById("hidden17").innerText;
var hidden19 = document.getElementById("hidden19").innerText;
var hidden65 = document.getElementById("hidden65").innerText;
var hidden121 = document.getElementById("hidden121").innerText;
var hidden136 = document.getElementById("hidden136").innerText;
var hidden171 = document.getElementById("hidden171").innerText;
var hidden172 = document.getElementById("hidden172").innerText;
var hidden173 = document.getElementById("hidden173").innerText;
var hidden71 = document.getElementById("hidden71").innerText;
var hidden131 = document.getElementById("hidden131").innerText;
var hidden137 = document.getElementById("hidden137").innerText;
var hidden185 = document.getElementById("hidden185").innerText;
var hidden187 = document.getElementById("hidden187").innerText;
var hidden32 = document.getElementById("hidden32").innerText;
var hidden33 = document.getElementById("hidden33").innerText;
var hidden51 = document.getElementById("hidden51").innerText;
var hidden152 = document.getElementById("hidden152").innerText;
var hidden83 = document.getElementById("hidden83").innerText;
var hidden145 = document.getElementById("hidden145").innerText;
var hidden146 = document.getElementById("hidden146").innerText;
var hidden147 = document.getElementById("hidden147").innerText;
var hidden39 = document.getElementById("hidden39").innerText;
var hidden95 = document.getElementById("hidden95").innerText;
var hidden96 = document.getElementById("hidden96").innerText;
var hidden98 = document.getElementById("hidden98").innerText;
var hidden122 = document.getElementById("hidden122").innerText;
var hidden124 = document.getElementById("hidden124").innerText;
var hidden176 = document.getElementById("hidden176").innerText;
var hidden22 = document.getElementById("hidden22").innerText;
var hidden26 = document.getElementById("hidden26").innerText;
var hidden126 = document.getElementById("hidden126").innerText;
var hidden127 = document.getElementById("hidden127").innerText;
var hidden20 = document.getElementById("hidden20").innerText;
var hidden154 = document.getElementById("hidden154").innerText;
var hidden156 = document.getElementById("hidden156").innerText;
var hidden157 = document.getElementById("hidden157").innerText;
var hidden158 = document.getElementById("hidden158").innerText;
var hidden159 = document.getElementById("hidden159").innerText;
var hidden164 = document.getElementById("hidden164").innerText;
var hidden21 = document.getElementById("hidden21").innerText;
var hidden75 = document.getElementById("hidden75").innerText;
var hidden76 = document.getElementById("hidden76").innerText;
var hidden138 = document.getElementById("hidden138").innerText;
var hidden161 = document.getElementById("hidden161").innerText;
var hidden162 = document.getElementById("hidden162").innerText;
var hidden163 = document.getElementById("hidden163").innerText;
var hidden174 = document.getElementById("hidden174").innerText;
var hidden175 = document.getElementById("hidden175").innerText;
var hidden166 = document.getElementById("hidden166").innerText;
var hidden153 = document.getElementById("hidden153").innerText;
var hidden168 = document.getElementById("hidden168").innerText;
var hidden169 = document.getElementById("hidden169").innerText;
var hidden170 = document.getElementById("hidden170").innerText;
var hidden37 = document.getElementById("hidden37").innerText;
var hidden178 = document.getElementById("hidden178").innerText;
var hidden179 = document.getElementById("hidden179").innerText;
var hidden180 = document.getElementById("hidden180").innerText;
var hidden85 = document.getElementById("hidden85").innerText;
var hidden86 = document.getElementById("hidden86").innerText;
var hidden182 = document.getElementById("hidden182").innerText;
var hidden183 = document.getElementById("hidden183").innerText;
var hidden184 = document.getElementById("hidden184").innerText;
// 计算均值 mean
var evgtime = [hidden24,hidden25,hidden27,hidden47,hidden28,hidden29,hidden30,hidden31,hidden54,hidden59,hidden130,hidden17,hidden19,hidden65,hidden121,hidden136,hidden171,hidden172,hidden173,hidden71,hidden131,hidden137,hidden32,hidden33,hidden51,hidden152,hidden83,hidden145,hidden146,hidden147,hidden39,hidden95,hidden96,hidden98,hidden122,hidden124,hidden176,hidden22,hidden26,hidden126,hidden127,hidden20,hidden154,hidden156,hidden157,hidden158,hidden159,hidden164,hidden21,hidden75,hidden76,hidden138,hidden161,hidden162,hidden163,hidden174,hidden175,hidden166,hidden153,hidden168,hidden169,hidden170,hidden37,hidden178,hidden179,hidden180,hidden85,hidden86,hidden182,hidden183,hidden184];

alert("平均值："+Highcharts.dateFormat('%y-%m-%d %H:%M', mean(evgtime))+"\n最小值："+Highcharts.dateFormat('%y-%m-%d %H:%M', Math.min(...evgtime))+"\n最大值："+Highcharts.dateFormat('%y-%m-%d %H:%M', Math.max(...evgtime))+"\n(不计算电视剧)");
//alert("平均值："+Highcharts.dateFormat('%y-%m-%d %H:%M', Math.min(...evgtime)));
}
else{alert("请等待页面加载完毕...");}
}