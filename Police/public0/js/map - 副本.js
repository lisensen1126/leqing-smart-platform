var jingqings = [];
var users = [];
var selectedusers = [];//选中的人员id列表
var selectedUserDic = new Array();//选中的人员字典
var peopleShow = 1;
var markers = [];
var currentjingqing = -1;//当前选中的警情id
var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

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
  +"&type="+type+"&organname1="+organname1+"&organname2="+organname2+"&realname="+realname
  +"&mapin="+usermapin+"&isonline="+isonline;
    console.log(url);
    $.get(url, function(result){
      console.log(result);
      for (var i = 0;i<result.length;i++) {
        value = result[i];
        selectedUserDic[value['id']]=value['name'];
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
        selectedUserDic[value['userid']]=value['realname'];
      }
      showSelectedUser(); 
    });
}
//用户marker点击
function markerUserClick(e) {
  console.log(e.target.content);
  userinfoShow(e.target.content);
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
  +"&content="+$("#content").val()
  +"&address="+$("#address").val()
  +"&type1="+$("#type1").val()
  +"&type2="+$("#type2").val()
  +"&type3="+$("#type3").val()
  +"&image="+$("#image").val()
  +"&video="+$("#video").val()
  +"&lng="+$("#lng").val()
  +"&lat="+$("#lat").val()
  +"&paichusuo="+$("#paichusuo").val();
  console.log(url);
  $.get(url, function(result){
      console.log(result);
      currentjingqing = -1;
      // $("#title").text("标题：");
      // $("#content").text("内容：");
      log.info(result.msg);
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
  var usernames = "";
  for (var key in selectedUserDic) {
  　　var item = selectedUserDic[key];
    usernames += item+",";
  }

  var url = "/Api/Paisong/Add?"
  +"&jingqingid="+currentjingqing['id']
  +"&title="+$("#title").val()
  +"&content="+$("#content").val()
  +"&address="+$("#address").val()
  +"&type="+$("#type").val()
  +"&type2="+$("#type2").val()
  +"&lng="+$("#lng").val()
  +"&lat="+$("#lat").val()
  +"&usernames="+usernames;
  console.log(url);
  $.get(url, function(result){
      console.log(result);
      currentjingqing = -1;
      $("#title").text("标题：");
      $("#content").text("内容：");
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
    jingqings = result;
    //map.clearMap( );
    showListJingqing();
    showMapJingqing();
    // showMapUser();
    // showListUser();
  });
}

//列表显示警情
function showListJingqing(){
  result=jingqings;
  $("#jingqinglist").empty();
  for (var i = 0;i<result.length;i++) {
    var value = result[i];
    $("#jingqinglist").append("<tr onclick='jingqingclick("+i+")'><td>"+value.title+"</td><td>"+value.content+"</td><td>"+value.timeadd+"</td></tr>");
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
  +"&type="+type+"&organname1="+organname1+"&organname2="+organname2+"&realname="+realname
  +"&mapin="+usermapin+"&isonline="+isonline;
  console.log(url);
  $.get(url, function(result){
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
    if(value.type == "警察"&&value.state=="空闲"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/jingcha1.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }
    if(value.type == "警察"&&value.state=="执勤"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/jingcha.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }
    if(value.type == "保安"&&value.state=="空闲"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/baoan1.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }
    if(value.type == "保安"&&value.state=="执勤"){
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),    // 图标尺寸
        image: '/img/baoan.png',  // Icon的图像
        imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
      });
    }

    var marker = new AMap.Marker({
      position: [value.lng, value.lat],
      offset: new AMap.Pixel(-10, -10),
      title: value.name,
      icon: icon
    });
    marker.content=value;
    marker.on('click', markerUserClick);
    //marker.emit('click', {target: marker});
    infoWindow.close();
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
    var online = "offline";
    if(value.state =="执勤")online = "online";
    $("#userlist").append("<tr class='"+online+"' onclick='userclick("+i+")'><td><input disabled=true type='checkbox' /></td><td>"+value.name+"</td><td>"+value.type+"</td><td>"+value.state+"</td></tr>");
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
  $("#content").text("内容："+jingqings[i]['content']);
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