//全屏切换
var qq = 0;
function quanping(){
//alert("1");
$("#head", parent.document).toggle();
$("#side", parent.document).toggle();

if(qq == 0){
  qq=1;
  $("#main").css('marginLeft',0);
  $("#iframe", parent.document).css("margin-left","0px");
  $("#frame", parent.document).css("padding-bottom","0px");
}else{
  qq=0;
  $("#main").css('marginLeft',0); 
  $("#iframe", parent.document).css("margin-left","200px");
  $("#frame", parent.document).css("padding-bottom","60px");
}
}
$(document).ready(function(){
$("#sid1 dd:eq(0)").css("background-color","#3368C4");
});

function add2(title, url) {
    $.jq_Panel({
        title: title,
        iframeWidth: 700,
        iframeHeight: 450,
        url: url
    });
}

//警情对话框隐藏
function jingqinginfoHide(){
  
  $("#jingqinginfo").hide();
}
//警情新增对话框显示
function jingqingaddShow(){
  $("#jingqinginfo").hide();
  $("#title").val('');
  $("#c-content").val('');
  $("#address").val('');
  $("#image").val('');
  $("#video").val('');
  $("#lng").val('');
  $("#lat").val('');
  $("#jingqingaddpanel").show();
}
//警情新增对话框隐藏
function jingqingaddHide(){
  
  $("#jingqingaddpanel").hide();
}
//把时间戳转为为普通日期格式
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}
//警情对话框显示
function jingqinginfoShow(jingqing){
  $("#jingqingaddpanel").hide();
  $("#jingqinginfotime").text(getLocalTime(jingqing['createtime']));
  $("#jingqinginfoname").text(jingqing['admin']['nickname']);
  $("#jingqinginfoaddress").text(jingqing['address']);
  $("#jingqinginfopaichusuo").text(jingqing['paichusuo']['name']);
  $("#jingqinginfocontent").text(jingqing['content']);
  $("#jingqinginfotype4").text(jingqing['type2']);
  $("#jingqinginfostate").text(jingqing['state']);
  console.log(jingqing['image'].length);
  if(jingqing['image'].length>3){
    $("#jingqinginfoimage").attr("src",jingqing['image']);
    $("#jingqinginfoimagea").attr("href",jingqing['image']);
  }else{
    $("#jingqinginfoimage").hide();
  }
  if(jingqing['videoimage'].length>3){
    var videoSrc = jingqing['videoimage'];//新的视频播放地址
   document.getElementById("jingqinginfovideo").src=videoSrc ;
   document.getElementById("jingqinginfovideo").play();
   $("#jingqinginfovideoa").attr("href",jingqing['videoimage']);
  }else{
    $("#jingqinginfovideo").hide();
  }
  

   
  clearPaisongUser();
  $("#jingqinginfo").show();
  getPaisong(jingqing['id']);
}
//用户对话框隐藏
function userinfoHide(){
  
  $("#userinfo").hide();
}
//用户对话框显示
function userinfoShow(user){
  $("#userinfoname").text(user['nickname']);
  $("#userinfotype").text(user['group']['name']);
  $("#userinfoimg").attr("src", user['avatar']);
  $("#userinfoorganname1").text(user['organ']['name']);
  $("#userinfoorganname2").text(user['depart']['name']);
  $("#userinfoonline").text(user['status']);
  $("#userinfoauth").text(user['validation']);
  $("#userinfophone").text(user['mobile']);
  $("#userinfoplace").text(user['zhudi']);
  $("#userinfo").show();
}
//新增item
function add(title, id) {
    $.jq_Panel({
        title: title,
        iframeWidth: 700,
        iframeHeight: 450,
        url: "/Home/Item/Add"
    });
}
//签到轨迹
function signtrace(title, id) {
    $.jq_Panel({
        title: title,
        iframeWidth: 700,
        iframeHeight: 450,
        url: "/Home/Sign/Trace?qiandaoid="+id
    });
}
//删除item
function access(id) {
    var url = "/Api/User/Access?id="+id;
    console.log(url);
    $.get(url, function(result){
      alert("成功");
      location.reload();
    });
    //alert(id);    
}
//删除item
function refuse(id) {
    var url = "/Api/User/Refuse?id="+id;
    console.log(url);
    $.get(url, function(result){
      alert("成功");
      location.reload();      
    });        
}
//删除user
function userdeletee(id) {
    var url = "/Api/User/Delete?id="+id;
    console.log(url);
    $.get(url, function(result){
      location.reload();
    });
    //alert(id);    
}
//删除某个对象
function deletesome(item,id) {
    var url = "/Api/"+item+"/Delete?id="+id;
    console.log(url);
    $.get(url, function(result){
      location.reload();
    });
    //alert(id);    
}
//删除item
function deletee(id) {
    var url = "/Api/Item/Delete?id="+id;
    console.log(url);
    $.get(url, function(result){
      location.reload();
    });
    //alert(id);    
}
//增加派送人员
function addPaisongUser(){
  var userid = $("#jingqingusers").val();
  var username = $("#jingqingusers").find("option:selected").text();
  // console.log(userid);
  // console.log(username);
  if(userid>0){
    selectedUserDic[userid]=username;
    showSelectedUser();
  }  
}
//增加派送机构人员
function addPaisongOrgan(){
  var organname1 = $("#jingqingorganname1").val();
  var organname2 = $("#jingqingorganname2").val();

  if(organname2){
    url = "/Api/User/Organ2?depart_id="+organname2;
    console.log(url);
    $.get(url, function(result){
      console.log(result);
      for (var i = 0;i<result.length;i++) {
        value = result[i];
        selectedUserDic[value['id']]=value['nickname'];
      }
      showSelectedUser(); 
    });
  }else{
    url = "/Api/User/Organ1?organ_id="+organname1;
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
  // console.log(userid);
  // console.log(username);
  
   
}
//清空派送人员
function clearPaisongUser(){
  selectedUserDic=new Array();
  showSelectedUser();  
}
//删除派送人员
function deleteSelectedUser(id){
  delete selectedUserDic[id];
  showSelectedUser();  
}
//显示派送人员
function showSelectedUser(){
  $("#selectedusers").empty();
  for (var key in selectedUserDic) {
  　　var item = selectedUserDic[key];
  // 　　console.log(key); 
  // 　　console.log(item); 
    $("#selectedusers").append("<button onclick='deleteSelectedUser("+key+")' class='am-btn am-btn-xs am-btn-default'>"+item+"<i class='am-icon-close'></i></button>");
  }
}



$(document).ready(function(){
  //用户一级单位变化
  $("#organname1").change(function(){
    //alert($("#organname1").val());
    $("#organname2").empty();
    $("#organname2").append("<option value=''>二级单位</option>");
    url = "/Api/Organ/organname2?organname1="+$("#organname1").val();
    console.log(url);
    $.get(url, function(result){
      console.log(result);
      for (var i = 0;i<result.length;i++) {
        $("#organname2").append("<option value='"+result[i]["name"]+"'>"+result[i]["name"]+"</option>");
      }
    });
    
  });
  //派送一级单位变化
  $("#jingqingorganname1").change(function(){
    //alert($("#organname1").val());
    $("#jingqingorganname2").empty();
    $("#jingqingorganname2").append("<option value=''>二级单位</option>");
    url = "ajax/depart?organ_id="+$("#jingqingorganname1").val();
    console.log(url);
    $.get(url, function(result){
      result=result['data'];
      console.log(result);
      for (var i = 0;i<result.length;i++) {
        $("#jingqingorganname2").append("<option value='"+result[i]["value"]+"'>"+result[i]["name"]+"</option>");
      }
    });
    $("#jingqingusers").empty();
    url = "/Api/User/Organ?organ_id="+$("#jingqingorganname1").val()+"&depart_id="+$("#jingqingorganname2").val();
    console.log(url);
    $.get(url, function(result){
      console.log(result);
      for (var i = 0;i<result.length;i++) {
        $("#jingqingusers").append("<option value='"+result[i]["id"]+"'>"+result[i]["nickname"]+"</option>");
      }
    });
    
  });
  //派送二级单位变化
  $("#jingqingorganname2").change(function(){
    $("#jingqingusers").empty();
    url = "/Api/User/Organ?organ_id="+$("#jingqingorganname1").val()+"&depart_id="+$("#jingqingorganname2").val();
    console.log(url);
    $.get(url, function(result){
      console.log(result);
      for (var i = 0;i<result.length;i++) {
        $("#jingqingusers").append("<option value='"+result[i]["id"]+"'>"+result[i]["nickname"]+"</option>");
      }
    });
    
  });

});

