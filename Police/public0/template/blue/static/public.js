$(function(){
// ����������ʾ ����
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
// ѡ�
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




navMouseleave('.y_dhqy','.y_dhqynone');//����������ʾ ����

tab('#y_lpdtpc_nav1 ul li','ul.y_lpdtpc_pc1','data-id');//¥����ҳ¥�̶�̬
/*tab('#y_lploatjg_nav ul li','.y_center_end3','data-id');//¥����ҳ ͬ��λ¥��*/
tab('.countR_box ul li','.bus_tab_box','data-id');//¥����ҳ ������
// tab('.y_lphxcent_list_h ul li','data-id');//¥����ҳ �����л�
    // '.y_lphxcent_list_ul ul'
// tab('#y_right ul li','#y_lphx_list ul','data-id');//¥�̻��� �����л�



});

// �������л�
var txt = $('.y_dhqytpo').find('span').text();

// ѡ��Ч��
$.each($('.y_dhqynone a'),function(k,v){
    var that = $(this);
    var title = that.text();
    if(title == txt){
        that.addClass('on');
    }
})
// ����¼�
$('.aera_btn dl dd').on('click',function(){
    var that = $(this);
    var oid = that.attr('data-id')
    that.addClass('on').siblings().removeClass('on');
    $('.inl').hide();
    $('#'+oid).show();
})
$('.aera_btn dl dd').eq(0).click();




// ����ҳ�� ��������Ч��
//����һ��������,width ��ȣ�height �߶ȣ�url
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
//�Ƴ������� 
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
        CreatePopLayerDiv(1000,565,"http://www.aifangt.com/template/blue/static/info.php?fid=204"); //��Ӽ���ҳ��
        $('#offDiv').css({'top':'-565px'}).animate({top:'10%'});
    }); 
    $('#InDiv').on('click',function(){
        btnCloses();
    })
	
	$("#mynav_search").click(function(){
	    CreatePopLayerDiv(1000,565,"http://www.aifangt.com/template/blue/static/info.php?fid=204"); //��Ӽ���ҳ��
	    $('#offDiv').css({'top':'-565px'}).animate({top:'10%'});
	}); 
	$('#InDiv').on('click',function(){
	    btnCloses();
	})

    // //����֪ͨ
    var w_title,w_id,w_url;                                             //Ϊ����Щ�����������ط��ã�
    $('body').on('click','.pic_jjtz',function(){
        var $that = $(this);
      var url = $that.attr('data-url');
        CreatePopLayerDiv(452,357,url);                   //��Ӽ���ҳ��
        $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
        parent.w_title = $that.attr('data-name');                        //��¥�����ƴ��򸸼�
        parent.w_id = $that.attr('data-id');                             //��¥��ID���򸸼�
        parent.w_url = $that.parent().attr('data-url');             //��¥��ͼƬurl���򸸼�
        parent.w_module = $that.parent().attr('data-module');        //ģ��ID
        parent.w_headline = $that.find('.t').text();                           //��������
    });
    $('#InDiv').on('click',function(){
        btnCloses();
    })
	
	 var w_title,w_id,w_url;                                             //Ϊ����Щ�����������ط��ã�
	$('body').on('click','.nav_bwzf',function(){
	    var $that = $(this);
	    CreatePopLayerDiv(452,300,"http://www.aifangt.com/info.php?fid=205");                   //��Ӽ���ҳ��
	    $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
	    parent.w_title = $that.attr('data-name');                        //��¥�����ƴ��򸸼�
	    parent.w_id = $that.attr('data-id');                             //��¥��ID���򸸼�
	    parent.w_url = $that.parent().attr('data-url');             //��¥��ͼƬurl���򸸼�
	    parent.w_module = $that.parent().attr('data-module');        //ģ��ID
	    parent.w_headline = $that.find('.t').text();                           //��������
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})
	
	var w_title,w_id,w_url;                                             //Ϊ����Щ�����������ط��ã�
	$('body').on('click','.con_ljlq',function(){
	    var $that = $(this);
      var url = $that.attr('data-url');
        CreatePopLayerDiv(452,357,url);                   //��Ӽ���ҳ��
	    $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
	    parent.w_title = $that.attr('data-name');                        //��¥�����ƴ��򸸼�
	    parent.w_id = $that.attr('data-id');                             //��¥��ID���򸸼�
	    parent.w_url = $that.parent().attr('data-url');             //��¥��ͼƬurl���򸸼�
	    parent.w_module = $that.parent().attr('data-module');        //ģ��ID
	    parent.w_headline = $that.find('.t').text();                           //��������
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})
	
	var w_title,w_id,w_url;                                             //Ϊ����Щ�����������ط��ã�
	$('body').on('click','.tjf_tj',function(){
	    var $that = $(this);
      var url = $that.attr('data-url');
        CreatePopLayerDiv(452,357,url);                   //��Ӽ���ҳ��
	    $('#offDiv').css({'top':'-362px'}).animate({top:'30%'},500);
	    parent.w_title = $that.attr('data-name');                        //��¥�����ƴ��򸸼�
	    parent.w_id = $that.attr('data-id');                             //��¥��ID���򸸼�
	    parent.w_url = $that.parent().attr('data-url');             //��¥��ͼƬurl���򸸼�
	    parent.w_module = $that.parent().attr('data-module');        //ģ��ID
	    parent.w_headline = $that.find('.t').text();                           //��������
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})
	
	var w_title,w_id,w_url;                                             //Ϊ����Щ�����������ط��ã�
	$('body').on('click','.mynav_bcbm',function(){
	    var $that = $(this);
	    CreatePopLayerDiv(500,406,"http://www.aifangt.com/info.php?fid=206");                   //��Ӽ���ҳ��
	    $('#offDiv').css({'top':'-362px'}).animate({top:'20%'},500);
	    parent.w_title = $that.attr('data-name');                        //��¥�����ƴ��򸸼�
	    parent.w_id = $that.attr('data-id');                             //��¥��ID���򸸼�
	    parent.w_url = $that.parent().attr('data-url');             //��¥��ͼƬurl���򸸼�
	    parent.w_module = $that.parent().attr('data-module');        //ģ��ID
	    parent.w_headline = $that.find('.t').text();                           //��������
	});
	$('#InDiv').on('click',function(){
	    btnCloses();
	})


    //¥����ҳ ¥���б� >> �鿴��ͼ
    $('a.y_idckdt').on('click',function(){
        var lpjwd=$(this).attr('data-jwd');
        var lptitle=$(this).attr('data-title');
        var _pointx = lpjwd.split(',')[0];
        var _pointy = lpjwd.split(',')[1];
        if (lpjwd !=='') {
            window.open('/map/details#lat='+_pointy+'&lng='+_pointx+'&zoom=13&title='+lptitle+'');
        }else{
            /*���÷���*/
            var M = {};
            if(M.dialog1){
                return M.dialog1.show();
            }
            M.dialog1 = jqueryAlert({
                'content' : '������ؾ�γ������',
                'closeTime' : 2000,
            })
            $than.removeAttr('disabled');
            ControlSwitch = false;                  //����Ϊfalse
            return false;
        };
        
    })
})

// ��Ч�� ʱ���������Ȼ��
function getNextMonth(date) {
    var arr = date.split('/');  
    var year = arr[0]; //��ȡ��ǰ���ڵ����  
    var month = arr[1]; //��ȡ��ǰ���ڵ��·�  
    var day = arr[2]; //��ȡ��ǰ���ڵ���  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //��ȡ��ǰ�����е��µ�����  
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
var year = myDate.getFullYear(); //��ȡ��ǰʱ�����
var yue = myDate.getMonth()+1;//��ȡ��ǰʱ���·�
if (yue<10) {
    yue= '0' + yue; 
};
// ��Ч��ʱ�� ��ȡ��ǰʱ��
var time = year+'/'+yue+'/01';
var time_yxq= year+'/'+yue+'/01-'+getNextMonth(time);

$('.w-commonality').html('���ο���Ч�ڣ�'+time_yxq+'��'); //��Ч��   ���÷�����public.js
$('body').find('.w-commonality').html('���ο���Ч�ڣ�'+time_yxq+'��'); //��Ч��   ���÷�����public.js












