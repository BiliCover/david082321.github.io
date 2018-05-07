var tid = 1
var areaName = ''
var dat = new Array()
var areaId = ''
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

function linearModel(p1, p2) {
  var model = new Object
  model.k = (p2[1] - p1[1]) / (p2[0] - p1[0])
  model.b = p1[1] - model.k * p1[0]
  model.getValue = function(x) {
    return model.k * x + model.b
  }
  model.getError = function(x, y) {
    return Math.abs(model.k * x + model.b - y)
  }
  return model
}

function randomInteger(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}

function RANSC(pts) {
  var bestScore = 4294967295
  var best_ninliers = 0
  var bestModel
  var len = pts.length
  threshold = 100
  for (var i = 0; i < len - 1; ++i) {
    p1 = pts[i]
    for (var j = i; j < len; ++j) {
      p2 = pts[j]
      if (p2[0] == p1[0]) {
        continue
      }
      var currentModel = linearModel(p1, p2)
      var currentScore = 0
      for (var k = 0; k < len; ++k) {
        var currentError = currentModel.getError(pts[k][0], pts[k][1])
        if (currentError < threshold) {
          currentScore += currentError
        } else {
          currentScore += Math.sqrt(currentError * threshold)
        }
      }
      if (currentScore < bestScore) {
        bestScore = currentScore
        bestModel = currentModel
      }
    }
  }
  return bestModel
}

function getData(page) {
  return $.ajax({
    url: "https://api.bilibili.com/archive_rank/getarchiverankbypartion?callback=onBack&type=jsonp&tid=" + tid + "&ps=50&pn=" + page,
    dataType: 'jsonp',
    crossDomain: true,
    timeout: 1000,
    type: "get"
  })
}
function buttonClick() {
  buttonClickAll(1)
  buttonClickAll(24)
  buttonClickAll(25)
  buttonClickAll(27)
  buttonClickAll(47)
  buttonClickAll(3)
  buttonClickAll(28)
  buttonClickAll(29)
  buttonClickAll(30)
  buttonClickAll(31)
  buttonClickAll(54)
  buttonClickAll(59)
  buttonClickAll(130)
  buttonClickAll(4)
  buttonClickAll(17)
  buttonClickAll(19)
  buttonClickAll(65)
  buttonClickAll(121)
  buttonClickAll(136)
  buttonClickAll(171)
  buttonClickAll(172)
  buttonClickAll(173)
  buttonClickAll(5)
  buttonClickAll(71)
  buttonClickAll(131)
  buttonClickAll(137)
  buttonClickAll(11)
  buttonClickAll(185)
  buttonClickAll(187)
  buttonClickAll(13)
  buttonClickAll(32)
  buttonClickAll(33)
  buttonClickAll(51)
  buttonClickAll(152)
  buttonClickAll(23)
  buttonClickAll(83)
  buttonClickAll(145)
  buttonClickAll(146)
  buttonClickAll(147)
  buttonClickAll(36)
  buttonClickAll(39)
  buttonClickAll(95)
  buttonClickAll(96)
  buttonClickAll(98)
  buttonClickAll(122)
  buttonClickAll(124)
  buttonClickAll(176)
  buttonClickAll(119)
  buttonClickAll(22)
  buttonClickAll(26)
  buttonClickAll(126)
  buttonClickAll(127)
  buttonClickAll(129)
  buttonClickAll(20)
  buttonClickAll(154)
  buttonClickAll(156)
  buttonClickAll(155)
  buttonClickAll(157)
  buttonClickAll(158)
  buttonClickAll(159)
  buttonClickAll(164)
  buttonClickAll(160)
  buttonClickAll(21)
  buttonClickAll(75)
  buttonClickAll(76)
  buttonClickAll(138)
  buttonClickAll(161)
  buttonClickAll(162)
  buttonClickAll(163)
  buttonClickAll(174)
  buttonClickAll(175)
  buttonClickAll(165)
  buttonClickAll(166)
  buttonClickAll(167)
  buttonClickAll(153)
  buttonClickAll(168)
  buttonClickAll(169)
  buttonClickAll(170)
  buttonClickAll(177)
  buttonClickAll(37)
  buttonClickAll(178)
  buttonClickAll(179)
  buttonClickAll(180)
  buttonClickAll(181)
  buttonClickAll(85)
  buttonClickAll(86)
  buttonClickAll(182)
  buttonClickAll(183)
  buttonClickAll(184)
}


function buttonClickAll(tid) {
  $.when(getData(1), getData(2))
    .done(function() {
      dat = []
      for (k = 0; k < arguments.length; ++k) {
        archives = arguments[k][0]['data']['archives']
        for (i in archives) {
          dat.push([Date.parse(new Date(archives[i]['create'])), archives[i]['aid']])
        }
      }
      //document.getElementById("demo2").innerHTML = JSON.stringify(dat);
      dat.sort()
      var model = RANSC(dat)
      var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
      var prediction = (aid - model.b) / model.k
      var len = dat.length
      var line = [
        [dat[0][0], model.getValue(dat[0][0])],
        [dat[len - 1][0], model.getValue(dat[len - 1][0])]
      ]
      if (prediction > line[1][0]) {
        line[1] = [prediction, aid]
      }
      document.getElementById(tid).innerHTML =
        '您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
    })
    .fail(function() {
      console.log('failed!')
      alert("无法获取稿件数据，请检查网络连接")
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
