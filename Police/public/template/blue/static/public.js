$(function(){
// 导航区域显示 隐藏
function navMouseleave (id,id1){
 $(id).on({
        mouseover: function() {
           $(id1).show();
        },
        mouseleave: function() {
            $(id1).hide();
        }
    });
}
// 选项卡
function tab (name1,name2,name3){;
    $(name1).on('click',function(){
        $(name2).hide();
        var Idoption = $(this).attr(name3);
        $(name2+'['+name3+''+'='+ Idoption +']').show();
        $(this).addClass('on').siblings().removeClass('on');
    })
    $(name1).eq(0).addClass('on');
    $(name2).eq(0).show();
}




navMouseleave('.y_dhqy','.y_dhqynone');//导航区域显示 隐藏

tab('#y_lpdtpc_nav1 ul li','ul.y_lpdtpc_pc1','data-id');//楼盘首页楼盘动态
/*tab('#y_lploatjg_nav ul li','.y_center_end3','data-id');//楼盘首页 同价位楼盘*/
tab('.countR_box ul li','.bus_tab_box','data-id');//楼盘首页 计算结果
// tab('.y_lphxcent_list_h ul li','data-id');//楼盘首页 户型切换
    // '.y_lphxcent_list_ul ul'
// tab('#y_right ul li','#y_lphx_list ul','data-id');//楼盘户型 户型切换



});

// 国内外切换
var txt = $('.y_dhqytpo').find('span').text();

// 选中效果
$.each($('.y_dhqynone a'),function(k,v){
    var that = $(this);
    var title = that.text();
    if(title == txt){
        that.addClass('on');
    }
})
// 点击事件
$('.aera_btn dl dd').on('click',function(){
    var that = $(this);
    var oid = that.attr('data-id')
    that.addClass('on').siblings().removeClass('on');
    $('.inl').hide();
    $('#'+oid).show();
})
$('.aera_btn dl dd').eq(0).click();




// 搜索页面 单独加载效果
//创建一个弹出层,width 宽度，height 高度，url
function CreatePopLayerDiv(width,height,url){

    var Iheight=$(window).height(); 
    var Iwidth =$(window).width(); 
    var heights = height || 300; 
    var widths = width || 500; 
    var Oheight= (Iheight -heights) / 2; 
    var Owidth = (Iwidth - widths) /2;
    var div ='<div id="InDiv" style="width:'+Iwidth+'px;height:'+Iheight+'px;background:rgba(0,0,0,0.6);position:fixed;z-index:300;top:0;left:0;">';
        div+='<div id="offDiv" style="width:'+widths+'px;height:'+heights+'px;left:'+Owidth+'px;position:fixed;z-index:32;border-radius:5px;">';
        div+='<a id="AClose" class="y_close" href="javascript:;" onclick="btnCloses()"><img src="ico_close.png"/*tpa=http://www.aifangt.com/template/blue/static/ico_close.png*/ alt="" /></a>';
        div+='<div id="Content"></div>';
        div+='</div>';
        div+='</div>';
    $(document.body).append(div); 

    if(url != ""){ 
        $("#Content").load(url); 
    } 
} 
//移除弹出层 
function RemoveDiv(){
    $("#AClose").remove();
    $("#HTitle").remove();
    $("#offDiv").remove();
    $("#InDiv").remove();
}
function btnCloses(){ 
    RemoveDiv(); 
} 
$(function(){

    $("#puic_search").click(function(){
        CreatePopLayerDiv(1000,565,"http://www.aifangt.com/template/blue/static/info.php?fid=204"); //添加加载页面
        $('#offDiv').css({'top':'-565px'}).animate({top:'10%'});
    }); 
    $('#InDiv').on('click',function(){
        btnCloses();
    })
	
	$("#mynav_search").click(function(){
	    CreatePopLayerDiv(1000,565,"http://www.aifangt.com/template/blue/static/info.php?fid=204"); //添加加载页面
	    $('#offDiv').css({'top':'-565px'}).animate({top:'10%'});
	}); 
	$('#InDiv').on('click',function(){
	    btnCloses();
	})

    // //降价通知
    var w_title,w_id,w_url;                                             //为了这些变量在其它地方用；
    $('body').on('click','.pic_jjtz',function(){
        var $that = $(this);
      var url = $that.attr('data-url');
        CreatePopLayerDiv(452,357,url);                   //添加加载页面
        $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
        parent.w_title = $that.attr('data-name');                        //把楼盘名称传向父级
        parent.w_id = $that.attr('data-id');                             //把楼盘ID传向父级
        parent.w_url = $that.parent().attr('data-url');             //把楼盘图片url传向父级
        parent.w_module = $that.parent().attr('data-module');        //模块ID
        parent.w_headline = $that.find('.t').text();                           //报名标题
    });
    $('#InDiv').on('click',function(){
        btnCloses();
    })
	
	 var w_title,w_id,w_url;                                             //为了这些变量在其它地方用；
	$('body').on('click','.nav_bwzf',function(){
	    var $that = $(this);
	    CreatePopLayerDiv(452,300,"http://www.aifangt.com/info.php?fid=205");                   //添加加载页面
	    $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
	    parent.w_title = $that.attr('data-name');                        //把楼盘名称传向父级
	    parent.w_id = $that.attr('data-id');                             //把楼盘ID传向父级
	    parent.w_url = $that.parent().attr('data-url');             //把楼盘图片url传向父级
	    parent.w_module = $that.parent().attr('data-module');        //模块ID
	    parent.w_headline = $that.find('.t').text();                           //报名标题
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})
	
	var w_title,w_id,w_url;                                             //为了这些变量在其它地方用；
	$('body').on('click','.con_ljlq',function(){
	    var $that = $(this);
      var url = $that.attr('data-url');
        CreatePopLayerDiv(452,357,url);                   //添加加载页面
	    $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
	    parent.w_title = $that.attr('data-name');                        //把楼盘名称传向父级
	    parent.w_id = $that.attr('data-id');                             //把楼盘ID传向父级
	    parent.w_url = $that.parent().attr('data-url');             //把楼盘图片url传向父级
	    parent.w_module = $that.parent().attr('data-module');        //模块ID
	    parent.w_headline = $that.find('.t').text();                           //报名标题
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})
	
	var w_title,w_id,w_url;                                             //为了这些变量在其它地方用；
	$('body').on('click','.tjf_tj',function(){
	    var $that = $(this);
      var url = $that.attr('data-url');
        CreatePopLayerDiv(452,357,url);                   //添加加载页面
	    $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
	    parent.w_title = $that.attr('data-name');                        //把楼盘名称传向父级
	    parent.w_id = $that.attr('data-id');                             //把楼盘ID传向父级
	    parent.w_url = $that.parent().attr('data-url');             //把楼盘图片url传向父级
	    parent.w_module = $that.parent().attr('data-module');        //模块ID
	    parent.w_headline = $that.find('.t').text();                           //报名标题
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})
	
	var w_title,w_id,w_url;                                             //为了这些变量在其它地方用；
	$('body').on('click','.mynav_bcbm',function(){
	    var $that = $(this);
	    CreatePopLayerDiv(500,406,"http://www.aifangt.com/info.php?fid=206");                   //添加加载页面
	    $('#offDiv').css({'top':'-362px'}).animate({top:'20%'},500);
	    parent.w_title = $that.attr('data-name');                        //把楼盘名称传向父级
	    parent.w_id = $that.attr('data-id');                             //把楼盘ID传向父级
	    parent.w_url = $that.parent().attr('data-url');             //把楼盘图片url传向父级
	    parent.w_module = $that.parent().attr('data-module');        //模块ID
	    parent.w_headline = $that.find('.t').text();                           //报名标题
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})


    //楼盘首页 楼盘列表 >> 查看地图
    $('a.y_idckdt').on('click',function(){
        var lpjwd=$(this).attr('data-jwd');
        var lptitle=$(this).attr('data-title');
        var _pointx = lpjwd.split(',')[0];
        var _pointy = lpjwd.split(',')[1];
        if (lpjwd !=='') {
            window.open('/map/details#lat='+_pointy+'&lng='+_pointx+'&zoom=13&title='+lptitle+'');
        }else{
            /*调用方法*/
            var M = {};
            if(M.dialog1){
                return M.dialog1.show();
            }
            M.dialog1 = jqueryAlert({
                'content' : '暂无相关经纬度数据',
                'closeTime' : 2000,
            })
            $than.removeAttr('disabled');
            ControlSwitch = false;                  //开关为false
            return false;
        };
        
    })
})

// 有效期 时间加两个自然月
function getNextMonth(date) {
    var arr = date.split('/');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 2;  
    if (month2 > 13) {  
        year2 = parseInt(year2) + 1;
        if (parseInt(month)==11) {
            month2 = 1;
        }else if (parseInt(month)==12) {
            month2 = 2;
        };
    }  
    var day2 = day;  
    var days2 = new Date(year2, month2, 0);  
    days2 = days2.getDate();  
    if (day2 > days2) {  
        day2 = days2;  
    }  
    if (month2 < 10) {  
        month2 = '0' + month2;  
    }
    var t2 = year2 + '/' + month2 + '/' + day2;  
    return t2;  
} 
var myDate = new Date;
var year = myDate.getFullYear(); //获取当前时间年份
var yue = myDate.getMonth()+1;//获取当前时间月份
if (yue<10) {
    yue= '0' + yue; 
};
// 有效期时间 获取当前时间
var time = year+'/'+yue+'/01';
var time_yxq= year+'/'+yue+'/01-'+getNextMonth(time);

$('.w-commonality').html('（参考有效期：'+time_yxq+'）'); //有效期   调用方法在public.js
$('body').find('.w-commonality').html('（参考有效期：'+time_yxq+'）'); //有效期   调用方法在public.js












