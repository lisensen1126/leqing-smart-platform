$(function () {
	
	var tcListRemote =function (){
		var act=$("#act").val();
    	$.ajax({
            url: Jhelper.path+'/auth/tcList',
            type: 'POST',
            dataType: 'json',
            data: {
                'act': act,
            }
        }).done(function (data) {
        	if (data.ag != null){
        		var ag = data.ag;
        		var _agv = ag.split(",");
        		$("#team_1>span").html(data.agpv+'<br />推荐号码');
        		$("#team_1>div>span:eq(0)").html(_agv[0]);
        		$("#team_1>div>span:eq(1)").html(_agv[1]);
        	}else{
        		$("#team_1>span").html("------<br />推荐号码");
        		$("#team_1>div>span:eq(0)").html("?");
        		$("#team_1>div>span:eq(1)").html("?");
        	}
        	if (data.bg != null){
        		var bg = data.bg;
        		var _bgv = bg.split(",");
        		$("#team_2>span").html(data.bgpv+'<br />推荐号码');
        		$("#team_2>div>span:eq(0)").html(_bgv[0]);
        		$("#team_2>div>span:eq(1)").html(_bgv[1]);
        	}else{
        		$("#team_2>span").html("------<br />推荐号码");
        		$("#team_2>div>span:eq(0)").html("?");
        		$("#team_2>div>span:eq(1)").html("?");
        	}
        	if (data.cg != null){
        		var cg = data.cg;
        		var _cgv = cg.split(",");
        		$("#team_3>span").html(data.cgpv+'<br />推荐号码');
        		$("#team_3>div>span:eq(0)").html(_cgv[0]);
        		$("#team_3>div>span:eq(1)").html(_cgv[1]);
        	}else{
        		$("#team_3>span").html("------<br />推荐号码");
        		$("#team_3>div>span:eq(0)").html("?");
        		$("#team_3>div>span:eq(1)").html("?");
        	}
        	if(data.alist.length > 0){
        		var alist_v=data.alist;
        		var tbody = "";
        		$.each(alist_v,function(n,v){
        			var trs = "";
        			var ck = "";
        			if(v.draw == 1){
        				ck = '中'
    					trs += "<tr class='over_td'><td><span>"+v.tp+"</span></td><td><span>"+v.tcode+"</span></td><td><span>"+ck+"</span></td></tr>";
        			}else if(v.draw == 2){
        				trs += "<tr><td>"+v.tp+"</td><td>"+v.tcode+"</td><td>--</td></tr>";
        			}else{
						trs += "<tr><td>"+v.tp+"</td><td>"+v.tcode+"</td><td></td></tr>";
					}
        			tbody += trs;
        		});
        		$("#team_1_tb > tbody > tr").remove();
        		$("#team_1_tb > tbody").append(tbody);
        	}
        	if(data.blist.length > 0){
        		var blist_v=data.blist;
        		var tbody = "";
        		$.each(blist_v,function(n,v){
        			var trs = "";
        			var ck = "";
        			if(v.draw == 1){
        				ck = '中'
    					trs += "<tr class='over_td'><td><span>"+v.tp+"</span></td><td><span>"+v.tcode+"</span></td><td><span>"+ck+"</span></td></tr>";
        			}else if(v.draw == 2){
        				trs += "<tr><td>"+v.tp+"</td><td>"+v.tcode+"</td><td>--</td></tr>";
        			}else{
						trs += "<tr><td>"+v.tp+"</td><td>"+v.tcode+"</td><td></td></tr>";
					}
        			tbody += trs;
        		});
        		$("#team_2_tb > tbody > tr").remove();
        		$("#team_2_tb > tbody").append(tbody);
        	}
        	if(data.clist.length > 0){
        		var clist_v=data.clist;
        		var tbody = "";
        		$.each(clist_v,function(n,v){
        			var trs = "";
        			var ck = "";
        			if(v.draw == 1){
        				ck = '中'
    					trs += "<tr class='over_td'><td><span>"+v.tp+"</span></td><td><span>"+v.tcode+"</span></td><td><span>"+ck+"</span></td></tr>";
        			}else if(v.draw == 2){
        				trs += "<tr><td>"+v.tp+"</td><td>"+v.tcode+"</td><td>--</td></tr>";
        			}else{
						trs += "<tr><td>"+v.tp+"</td><td>"+v.tcode+"</td><td></td></tr>";
					}
        			tbody += trs;
        		});
        		$("#team_3_tb > tbody > tr").remove();
        		$("#team_3_tb > tbody").append(tbody);
        	}
        	
        });
    }
	
	$("#team_1").click(function(){
		$("#team_1").addClass("over_bg");
		$("#team_2").removeClass("over_bg");
		$("#team_3").removeClass("over_bg");
		$("#team_1_tb").show();
		$("#team_2_tb").hide();
		$("#team_3_tb").hide();
	});
	$("#team_2").click(function(){
		$("#team_1").removeClass("over_bg");
                $("#team_2").addClass("over_bg");
                $("#team_3").removeClass("over_bg");
		$("#team_1_tb").hide();
		$("#team_2_tb").show();
		$("#team_3_tb").hide();
	});
	$("#team_3").click(function(){
		$("#team_1").removeClass("over_bg");
                $("#team_2").removeClass("over_bg");
                $("#team_3").addClass("over_bg");
		$("#team_1_tb").hide();
		$("#team_2_tb").hide();
		$("#team_3_tb").show();
	});
	
	tcListRemote();
	setInterval(function () {
		tcListRemote();
    }, 3000);
	
	
});
