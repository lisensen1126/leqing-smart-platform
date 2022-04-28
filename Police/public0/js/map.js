var jingqings = [];
var users = [];
var selectedusers = [];//选中的人员id列表
var selectedUserDic = new Array();//选中的人员字典
var peopleShow = 1;
var markers = [];
var currentjingqing = -1;//当前选中的警情id



//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "https://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}

//关闭信息窗体
function closeInfoWindow() {
    map.clearInfoWindow();
}
// var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

// $('img').click(function () {
//     //获取图片路径
//     var imgsrc = $(this).attr("src");
//     console.log(imgsrc);
//     var opacityBottom = '<div class="opacityBottom" style = "display:none"><img class="bigImg" src="' + imgsrc + '"></div>';
//     $(document.body).append(opacityBottom);
//     toBigImg();//变大函数

// });

// function toBigImg() {
//     $(".opacityBottom").addClass("opacityBottom");//添加遮罩层
//     $(".opacityBottom").show();
//     $("html,body").addClass("none-scroll");//下层不可滑动
//     $(".bigImg").addClass("bigImg");//添加图片样式
//     $(".opacityBottom").click(function () {//点击关闭
//         $("html,body").removeClass("none-scroll");
//         $(".opacityBottom").remove();
//     });
//     }

//地图初始化
var map = new AMap.Map("container", {
  resizeEnable: true,
  center: [120.986678, 28.112493],//地图中心点
  zoom: 13 //地图显示的缩放级别
}); 
var mouseTool = new AMap.MouseTool(map);
map.on("moveend",getbounds);
map.clearMap( );  
  getPeople();  
  getJingqing();
function hello(){
  map.clearMap( );  
  getPeople();  
  getJingqing();
  url = "/Api/User/online";
    console.log(url);
    $.get(url, function(result){
      console.log(result); 
    });
}
// hello();
var t1 = window.setInterval(hello,10000);

map.on('click',function(e){
  console.log(e.lnglat);
  document.getElementById('lng').value=e.lnglat.lng;
  document.getElementById('lat').value=e.lnglat.lat;
  regeoCode(e.lnglat);
    // document.getElementById('coordinate').value = e.lnglat;
    // regeoCode();
})  ;
var geocoder = new AMap.Geocoder({
    city: "0577", //城市设为北京，默认：“全国”
    radius: 1000 //范围，默认：300
});
var marker = new AMap.Marker();;
function regeoCode(lnglat) {    
    geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete'&&result.regeocode) {
            var address = result.regeocode.formattedAddress;
            // alert(address);
            document.getElementById('address').value=address;
        }else{
            log.error('根据经纬度查询地址失败')
        }
    });
}
//地图框选
function drawRectangle () {
  $("#jingqinginfo").hide();
    mouseTool.rectangle({
      strokeColor:'gray',
      strokeOpacity:0.5,
      strokeWeight: 1,
      fillColor:'gray',
      fillOpacity:0.5,
      // strokeStyle还支持 solid
      strokeStyle: 'solid',
      // strokeDasharray: [30,10],
    })
     
   
}
mouseTool.on('draw', function(event) {
  console.log(event.obj.getBounds().northeast+"-"+event.obj.getBounds().southwest);
  setTimeout(function (){
    getKuangPeople(event.obj);
  }, 30);
  setTimeout(function (){
    mouseTool.close(true);;
  }, 300);
  $("#jingqinginfo").show();
  //log.info('覆盖物对象绘制完成');
})

//获取框选的人员
function getKuangPeople(ask){
  
  type = $("#usertype").val();
  organname1 = $("#organname1").val();
  organname2 = $("#organname2").val();
  usermapin = true;
  isonline = false;
  lngmin = ask.getBounds().getSouthWest( ).getLng( );
  latmin = ask.getBounds().getSouthWest( ).getLat( );
  lngmax = ask.getBounds().getNorthEast( ).getLng( );
  latmax = ask.getBounds().getNorthEast( ).getLat( );

  url = "/Api/User/Realname?lngmin="+lngmin+"&latmin="+latmin+"&lngmax="+lngmax+"&latmax="+latmax
  +"&group_id="+type+"&organname1="+organname1+"&organname2="+organname2+"&realname="+realname
  +"&mapin="+usermapin+"&isonline="+isonline;
    console.log(url);
    $.get(url, function(result){
      console.log(result);

      for (var i = 0;i<result.length;i++) {
        value = result[i];
        selectedUserDic[value['id']]=value['nickname'];
      }
      showSelectedUser(); 
    });
}
//根据jingqingid获取派送列表
function getPaisong(jingqingid){  
  url = "/Api/Paisong/Jingqing?jingqingid="+jingqingid;
    console.log(url);
    $.get(url, function(result){
      console.log(result);
      for (var i = 0;i<result.length;i++) {
        value = result[i];
        selectedUserDic[value['user']['id']]=value['user']['nickname'];
      }
      showSelectedUser(); 
    });
}
//用户marker点击
function markerUserClick(e) {
  currente = e;
  infoWindowShow = 1;
  console.log(e.target.content);
  if(e.target.content.status == 'hidden'){
    online="离线"
  }else{
    online="在线"
  }
  //实例化信息窗体
  var title = e.target.content.nickname+'<span style="font-size:11px;color:#F00;">'+online+'</span>',
      content = [];
  content.push("<img style='margin-right:30px;' height=100 width=100 src='"+e.target.content.avatar+"'>单位:"+e.target.content.organ.name);
  content.push("部门:"+e.target.content.depart.name);
  content.push("电话："+e.target.content.mobile);
  content.push("<br><br><br>");
  var infoWindow = new AMap.InfoWindow({
      isCustom: true,  //使用自定义窗体
      content: createInfoWindow(title, content.join("<br/>")),
      // offset: new AMap.Pixel(16, -45)
  });
  // userinfoShow(e.target.content);
  infoWindow.open(map, map.getCenter());
  // infoWindow.setContent(e.target.content);
  // infoWindow.open(map, e.target.getPosition());
}
//警情marker点击
function markerJingqingClick(e) {
  console.log(e.target.content);
  currentjingqing = e.target.content;
  jingqinginfoShow(e.target.content);
}

function selectall(){
    $("tr input[type=checkbox]").prop("checked","checked");
  }
  function unselectall(){
    $("tr input[type=checkbox]").removeAttr("checked");
  }
//增加警情
function addjingqing(){
  var url = "/Api/Jingqing/Add?"
  +"&title="+$("#title").val()
  +"&content="+$("#c-content").val()
  +"&address="+$("#address").val()
  +"&type1="+$("#type1").val()
  +"&type2="+$("#type2").val()
  +"&type3="+$("#type3").val()
  +"&image="+$("#image").val()
  +"&video="+$("#video").val()
  +"&lng="+$("#lng").val()
  +"&lat="+$("#lat").val()
  +"&admin_id="+$("#admin_id").text()
  +"&paichusuo="+$("#paichusuo").val();
  console.log(url);
  $.get(url, function(result){
      console.log(result);
      currentjingqing = -1;
      // $("#title").text("标题：");
      // $("#content").text("内容：");
      alert(result.msg);
      log.info(result.msg);
      if(result.status==1){
          getJingqingClear();
          $("#jingqingaddpanel").hide();
      }
      // getJingqingClear();
      // alert("派送完成！");
  });
}

//派送
function paisong(){
  // if(currentjingqing<0){
  //   alert("请选择警情");
  //   return;
  // }
  var userids = "";
  console.log(selectedUserDic);
  for (var key in selectedUserDic) {
  　　var item = selectedUserDic[key];
    userids += key+",";
  }

  var url = "/Api/Paisong/Add?"
  +"&jingqing_id="+currentjingqing['id']
  +"&userids="+userids;
  console.log(url);
  $.get(url, function(result){
      console.log(result);
      // currentjingqing = -1;
      alert(result.msg);
      log.info(result.msg);
      if(result.status==1){
          $("#jingqinginfo").hide();
      }
      // $("#title").text("标题：");
      // $("#content").text("内容：");
      log.info(result.msg);
  });
}


// function checkjingqing(){
//   people = 0;
//   map.clearMap( ); 

//   $('#jigouselect').attr("disabled",true);
// }
// function checkuser(){
//   peopleShow = 1;
  
//   getPeople();
//   $('#jigouselect').attr("disabled",false);
// }
//$("#container").height($("#container").width()/2);


function jingqingToggle(){
  $("#jingqingliebiao").toggle();
}
function peopleToggle(){
  $("#userliebiao").toggle();
}
function getJingqingClear(){  
  
  map.clearMap();
  showMapUser();
  getJingqing();
}
function getPeopleClear(){
  map.clearMap();
  showMapJingqing();
  getPeople();
}
//查询警情
function getJingqing(){    
  // $("#peoplecheck").text("选择人员");
  // $("#th1").text("标题");
  // $("#th2").text("内容");
  lngmin = map.getBounds().getSouthWest( ).getLng( );
  latmin = map.getBounds().getSouthWest( ).getLat( );
  lngmax = map.getBounds().getNorthEast( ).getLng( );
  latmax = map.getBounds().getNorthEast( ).getLat( );
  type1 = $("#jingqingtype1").val();
  title = $("#jingqingtitle").val();
  mapin = $("#jingqingmapin").is(':checked');

  url = "/Api/Jingqing/Index?lngmin="+lngmin+"&latmin="+latmin+"&lngmax="+lngmax+"&latmax="+latmax
  +"&type1="+type1+"&title="+title+"&mapin="+mapin;
  console.log(url);
  $.get(url, function(result){
    console.log(result);
    jingqings = result;
    //map.clearMap( );
    showListJingqing();
    showMapJingqing();
    // showMapUser();
    // showListUser();
  });
}
//把时间戳转为为普通日期格式
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}

//列表显示警情
function showListJingqing(){
  result=jingqings;
  $("#jingqinglist").empty();
  for (var i = 0;i<result.length;i++) {
    var value = result[i];
    $("#jingqinglist").append("<tr onclick='jingqingclick("+i+")'><td>"+value.title+"</td><td>"+value.address+"</td><td>"+getLocalTime(value.createtime)+"</td></tr>");
    //console.log(value);<td><a href ='/Home/Jingqing/Edit?id="+value.id+"'>详情</a></td>
  } 
}
//地图显示警情
function showMapJingqing(){
  result=jingqings;
  
  for (var i = 0;i<result.length;i++) {
    var value = result[i];
    if(value['type1']=="警情联动"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/event.png',  // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }else{
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/event1.png',  // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }
    var marker = new AMap.Marker({
      position: [value.lng, value.lat],
      title: value.title,
      icon:icon
    });
    //给marker添加点击事件
    marker.content=value;
    marker.on('click', markerJingqingClick);
    map.add(marker);
    marker.setLabel({
      offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
      content: value.title, //设置文本标注内容
      direction: 'bottom' //设置文本标注方位
    });
    markers.push(marker);
  } 
   //  $("#title").text(jingqings[0]['title']);
   // $("#content").text(jingqings[0]['content']);   
   
}




//查询人员
function getPeople(){
  lngmin = map.getBounds().getSouthWest( ).getLng( );
  latmin = map.getBounds().getSouthWest( ).getLat( );
  lngmax = map.getBounds().getNorthEast( ).getLng( );
  latmax = map.getBounds().getNorthEast( ).getLat( );
  type = $("#usertype").val();
  organname1 = $("#organname1").val();
  organname2 = $("#organname2").val();
  realname = $("#realname").val();
  usermapin = $("#usermapin").is(':checked');
  isonline = $("#isonline").is(':checked');

  url = "/Api/User/Realname?lngmin="+lngmin+"&latmin="+latmin+"&lngmax="+lngmax+"&latmax="+latmax
  +"&group_id="+type+"&organname1="+organname1+"&organname2="+organname2+"&realname="+realname
  +"&mapin="+usermapin+"&isonline="+isonline;
  console.log(url);
  $.get(url, function(result){
    console.log(result);
    users = result;
    //map.clearMap( );
    showMapUser();
    showListUser(); 
    // showListJingqing();
    // showMapJingqing();    
  });
}

//地图上显示人员
function showMapUser(){
  userlist = users;
  for (var i = 0;i<userlist.length;i++) {
    var value = userlist[i];
    var online = "offline";
    if(value.state =="执勤")online = "online";
    //console.log(value);
    // 创建 AMap.Icon 实例：
    if(value.group_id == "1"&&value.status=="hidden"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/jingcha1.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }
    if(value.group_id == "1"&&value.status=="normal"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/jingcha.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }
    if(value.group_id == "2"&&value.status=="hidden"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/baoan1.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }
    if(value.group_id == "2"&&value.status=="normal"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/baoan.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }

    var marker = new AMap.Marker({
      position: [value.lng, value.lat],
      offset: new AMap.Pixel(-10, -10),
      title: value.nickname,
      icon: icon
    });
    marker.content=value;
    // marker.setLabel({
    //   offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
    //   content: value.nickname, //设置文本标注内容
    //   direction: 'bottom' //设置文本标注方位
    // });
    marker.on('click', markerUserClick);
    //marker.emit('click', {target: marker});
    // infoWindow.close();
    //console.log(value);
    map.add(marker);
    // marker.setLabel({
    //   offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
    //   content: value.name,
    //   direction: 'bottom' //设置文本标注方位
    // });          
  } 
}
//列表上显示人员
function showListUser(){
  userlist = users;
  $("#userlist").empty();
  for (var i = 0;i<userlist.length;i++) {
    var value = userlist[i];
    var online = "离线";
    if(value.status =="normal")online = "在线";
    $("#userlist").append("<tr class='"+online+"' onclick='userclick("+i+")'><td><input disabled=true type='checkbox' /></td><td>"+value.nickname+"</td><td>"+value.group.name+"</td><td>"+online+"</td></tr>");
    //console.log(value);          
  } 
}

// function getJigou(name){
//   map.clearMap( );
//   //console.log("/Api/User/Jigou?name="+$('#jigouselect').val());
//   $.get("/Api/User/Jigou?name="+name, function(result){
//     users = result;
//     $("#userlist").empty();
//     selectedusers = [];
//     for (var i = 0;i<result.length;i++) {
//       var value = result[i];
//       // console.log(value.lat);
//       // 创建 AMap.Icon 实例：
//       var online = "offline";
//       if(value.state =="执勤")online = "online";
//         $("#userlist").append("<tr class='"+online+"'  onclick='userclick("+i+")'><td><input disabled=true type='checkbox' /></td><td>"+value.name+"</td><td>"+value.type+"</td><td></td></tr>");
//       if(value.type == "警察"){
//         var icon = new AMap.Icon({
//           size: new AMap.Size(30, 30),    // 图标尺寸
//           image: '/img/jingcha.png',  // Icon的图像
//           // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
//           imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
//         });
//         var marker = new AMap.Marker({
//           position: [value.lng, value.lat],
//           offset: new AMap.Pixel(-10, -10),
//           title: value.name,
//           icon: icon
//         });
//         // console.log(icon);
//         map.add(marker);
//         marker.content=value.name+"<br>"+value.type+"<br>单位："+value.organname+"<br>驻派地："+value.place+"<br>电话："+value.phone;
//           marker.on('click', markerClick2);
//           //marker.emit('click', {target: marker});
//           infoWindow.close();
//        marker.setLabel({
//           offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
//           content: value.name,
//           direction: 'bottom' //设置文本标注方位
//         });
       
//       }
//       if(value.type == "保安"){
//         var icon = new AMap.Icon({
//           size: new AMap.Size(30, 30),    // 图标尺寸
//           image: '/img/baoan.png',  // Icon的图像
//           // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
//           imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
//         });
//         var marker = new AMap.Marker({
//           position: [value.lng, value.lat],
//           offset: new AMap.Pixel(-10, -10),
//           title: value.name,
//           icon: icon
//         });
//         // console.log(icon);
//         map.add(marker);
//         marker.content=value.name+"<br>"+value.type+"<br>单位："+value.organname+"<br>驻派地："+value.place+"<br>电话："+value.phone;
//           marker.on('click', markerClick2);
//           //marker.emit('click', {target: marker});
//           infoWindow.close();
//         infoWindow.close();
//         marker.setLabel({
//           offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
//           content: value.name,
//           direction: 'bottom' //设置文本标注方位
//         });
       
//       }
      
      
//     }     
//   });
// }

//   //marker点击事件
//  function markerClick(e) {
//   currentjingqing = jingqings[e.target.getTitle()]['id'];
//   console.log(currentjingqing);
//   $("#title").text("标题："+jingqings[e.target.getTitle()]['title']);
//   $("#content").text("内容："+jingqings[e.target.getTitle()]['content']);
//   var lng = jingqings[e.target.getTitle()]['lng']; //经度范围[121.138398, 121.728226]
//   var lat = jingqings[e.target.getTitle()]['lat']; //纬度范围[30.972688, 31.487611]
//   map.setCenter([lng, lat]); //设置地图中心点
//   map.setZoom(15); //设置地图层级
// } 
function jingqingclick(i){
  currentjingqing = jingqings[i]['id'];
  console.log(currentjingqing);
    $("#title").text("标题："+jingqings[i]['title']);
  $("#c-content").text("内容："+jingqings[i]['content']);
  var lng = jingqings[i]['lng']; //经度范围[121.138398, 121.728226]
  var lat = jingqings[i]['lat']; //纬度范围[30.972688, 31.487611]
  map.setCenter([lng, lat]); //设置地图中心点
  map.setZoom(15); //设置地图层级
}  
function userclick(i){
  currenuser = users[i]['id'];
  console.log(currenuser);
  //   $("#title").text("标题："+jingqings[i]['title']);
  // $("#content").text("内容："+jingqings[i]['content']);
  var lng = users[i]['lng']; //经度范围[121.138398, 121.728226]
  var lat = users[i]['lat']; //纬度范围[30.972688, 31.487611]
  map.setCenter([lng, lat]); //设置地图中心点
  map.setZoom(15); //设置地图层级
  // Array.prototype.remove = function(val) { 
  //   var index = this.indexOf(val); 
  //   if (index > -1) { 
  //     this.splice(index, 1); 
  //   } 
  // };
  // console.log(i);
  // //alert("11");
  // //console.log($("#userlist tr").eq(i).find('input').prop("checked"));
  // if ($("#userlist tr").eq(i).find('input').prop("checked")) {
  //     $("#userlist tr").eq(i).find('input').prop("checked", false);
  //     selectedusers.remove(i);
  // } else {
    
  //     $("#userlist tr").eq(i).find('input').prop("checked", 'checked');
  //     //console.log($("#userlist tr").eq(i).find('input').prop("checked"));
  //     selectedusers.push(i);
  // }
  // console.log(selectedusers);
  // var usernames = "";
  // for (j=0;j<selectedusers.length;j++) {
  //     usernames += users[selectedusers[j]]['name']+",";
  // }
  // // console.log(selectedusers);
  // // console.log(usernames);
  // $("#usernames").val(usernames);
}  
//map.on("zoomend",getbounds);


function getbounds(e){
if($('#jigouselect').val()=="all"){
    map.clearMap( );
    getPeople();
  }
//console.log(map.getBounds().toString());
// if(peopleShow == 1){
  
//   if($('#jigouselect').val()=="all"){
//     map.clearMap( );
//     getPeople();
//   }
  
// }else{
//   map.clearMap( );
//   getJingqing();
// }
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

// //搜索用户
//   function search(){
//     if($("#dituxuanren").prop("checked")){
//       lngmin = map.getBounds().getSouthWest( ).getLng( );
//       latmin = map.getBounds().getSouthWest( ).getLat( );
//       lngmax = map.getBounds().getNorthEast( ).getLng( );
//       latmax = map.getBounds().getNorthEast( ).getLat( );
//     }

//     usertype = $("#usertype").val();
//     realname = $("#realname").val();
//     organname1 = $("#organname1").val();
//     organname2 = $("#organname2").val();
//     var url = "/Api/User/Realname?usertype="+usertype+"&realname="+realname+"&organname1="+organname1+"&organname2="+organname2;
//     console.log(url);
//     $.get(url, function(result){
//       users = result;
//       console.log(result);
//       map.clearMap( );
//       showMapUser(result);  

    
//     });
//   }

  // //表格和地图显示用户
  // function showMapUser(result){
  //   $("#userlist").empty();
  //   for (var i = 0;i<result.length;i++) {
  //     var value = result[i];
  //     var online = "offline";
  //     if(value.state =="执勤")online = "online";
  //       $("#userlist").append("<tr class='"+online+"' onclick='userclick("+i+")'><td><input disabled=true type='checkbox' /></td><td>"+value.name+"</td><td>"+value.type+"</td><td>"+value.signtime+"</td></tr>");
  //       console.log(value.lat);
  //       // 创建 AMap.Icon 实例：
  //       if(value.type == "警察"){
  //         var icon = new AMap.Icon({
  //           size: new AMap.Size(30, 30),    // 图标尺寸
  //           image: '/img/jingcha.png',  // Icon的图像
  //           // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
  //           imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
  //         });
  //       }else{
  //         var icon = new AMap.Icon({
  //           size: new AMap.Size(30, 30),    // 图标尺寸
  //           image: '/img/baoan.png',  // Icon的图像
  //           // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
  //           imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
  //         });
  //       }
  //         var marker = new AMap.Marker({
  //           position: [value.lng, value.lat],
  //           offset: new AMap.Pixel(-10, -10),
  //           title: value.name,
  //           icon: icon
  //         });
  //         marker.content=value.name+"<br>"+value.type+"<br>单位："+value.organname+"<br>驻派地："+value.place+"<br>电话："+value.phone;
  //         marker.on('click', markerClick);
  //         //marker.emit('click', {target: marker});
  //         infoWindow.close();
  //         console.log(value);
  //         map.add(marker);
  //         marker.setLabel({
  //           offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
  //           content: value.name,
  //           direction: 'bottom' //设置文本标注方位
  //         });          
  //     } 

  // }