var jingqings = [];
var users = [];
var selectedusers = [];//选中的人员id列表
var selectedUserDic = new Array();//选中的人员字典
var peopleShow = 1;
var markers = [];
var currentjingqing = -1;//当前选中的警情id
var currentpaisongid = -1;//当前选中的paisongid
var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

//地图初始化
// var map = new AMap.Map("container", {
//   resizeEnable: true,
//   center: [116.397428, 39.90923],
//   // center: [120.986678, 28.112493],//地图中心点
//   zoom: 17 //地图显示的缩放级别
// }); 
var map = new AMap.Map("container", {
  resizeEnable: true,
  center: [120.986678, 28.112493],//地图中心点
  zoom: 13 //地图显示的缩放级别
}); 
var mouseTool = new AMap.MouseTool(map);





var marker;
var lineArr = [[120.971,28.12892],[120.971,28.13],[120.971,28.15]];

//根据qiandaoid获取定位列表
function guiji(qiandaoid){
  
  url = "/Api/Location/Sign?qiandaoid="+qiandaoid;
  console.log(url);
  lineArr = Array();
  map.clearMap();
  $.get(url, function(result){
    console.log(result);
    for (var i = 0;i<result.length;i++) {
      lineArr[i] = Array();
      lineArr[i][0] = result[i]['lng'];
      lineArr[i][1] = result[i]['lat'];
            
    } 
    //console.log(lineArr);
    var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/Public/img/baoan.png',  // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    marker = new AMap.Marker({
      map: map,
      position: [120.971,28.12892],
      icon: icon,
      offset: new AMap.Pixel(-25, -25),
      autoRotation: true,
    });
    marker.on('moving', function (e) {
    passedPolyline.setPath(e.passedPath);
});
    //绘制轨迹
    var polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        showDir:true,
        strokeColor: "#28F",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
    });
    var passedPolyline = new AMap.Polyline({
      map: map,
      // path: lineArr,
      strokeColor: "#AF5",  //线颜色
      // strokeOpacity: 1,     //线透明度
      strokeWeight: 6,      //线宽
      // strokeStyle: "solid"  //线样式
    });
    map.setFitView();
    startAnimation();
      
  });
}












function startAnimation () {
    marker.moveAlong(lineArr, 2000);
}

function pauseAnimation () {
    marker.pauseMove();
}

function resumeAnimation () {
    marker.resumeMove();
}

function stopAnimation () {
    marker.stopMove();
}

function getbounds(e){
if($('#jigouselect').val()=="all"){
    //map.clearMap( );
    getPeople();
  }
}


$(document).ready(function(){
$("#jigouselect").change(function(){
  if($('#jigouselect').val()=="all"){
    getPeople();
  }else{
    getJigou($('#jigouselect').val());
  }
  //alert($('#jigouselect').val());
  
});
});
