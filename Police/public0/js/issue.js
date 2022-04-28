$(function () {

	var _surplusSeconds = 0;  //距离当前截止的秒数
    var _issue_timmer = null; //动态显示剩余时间

    var drawListRemote =function (){
    	$.ajax({
            url: Jhelper.path+'/findDrawList',
            type: 'POST',
            dataType: 'json',
            data: {
                'gameId': 10,
            }
        }).done(function (data) {
        	 if (data.vp.length > 0) {
        		 var issueName = data.vp;//最新开奖的一期
        		 $("#sellissue_vp").html(issueName);
        		 var opc_v = data.vcode;
        		 var _aWinCodes = opc_v.split(",");
        		 var wcode_info='';
        		 for (var i = 0; i < _aWinCodes.length; i++) {
        			 wcode_info +='<li>'+_aWinCodes[i]+'</li>';
        		 }
        		 $("#drew_code>ul").html(wcode_info);
        		 var issTimePv=$("#Issue_hid").val();
        		 if(issueName != issTimePv){
					 clearInterval(_issue_timmer);
					 _issue_timmer = null;
					 setTimeout(function () {
						sellIssueRemote();
					}, 1200);
        		 }
        	 }
        });
    }
    
    var sellIssueRemote = function(){
    	$.ajax({
            url: Jhelper.path+'/findIssueReTime',
            type: 'POST',
            dataType: 'json',
            data: {
                'gameId': 10,
            }
        }).done(function (data) {
        	 if (data.pv.length > 0) {
        		 $("#Issue_hid").val(data.pv);
        		 _surplusSeconds = data.remain;
        		 _fnChangeTime();
                 _issue_timmer = window.setInterval(_fnChangeTime, 1000);
        	 }
        	 drawListRemote();
        });
    }
    
    var _fnChangeTime = function () {
        var _nCurrentDate = 0;
        var _nCurrentHour = 0;
        var _nCurrentMinute = 0;
        var _nCurrentSecond = 0;
        if (_surplusSeconds != null && _surplusSeconds != undefined && _surplusSeconds >= 0) {
            _nCurrentDate = Jhelper.fun.parseInt(_surplusSeconds / 86400, 10);
            _nCurrentHour = Jhelper.fun.parseInt(_surplusSeconds % 86400 / 3600, 10);
            _nCurrentMinute = Jhelper.fun.parseInt(_surplusSeconds % 86400 % 3600 / 60, 10);
            _nCurrentSecond = Jhelper.fun.parseInt(_surplusSeconds % 86400 % 3600 % 60, 10);
            var _content = "";
            _content += _nCurrentMinute + ":" + convert(_nCurrentSecond);
            $("#iss_timer>span:eq(0)").html(convert(_nCurrentMinute));
            $("#iss_timer>span:eq(1)").html(convert(_nCurrentSecond));
            _surplusSeconds -= 1;
            if (_surplusSeconds < 0) {
                clearInterval(_issue_timmer);
                _issue_timmer = null;
                setTimeout(function () {
                    sellIssueRemote();
                }, 1200);
            }
        }
    };
    
    var convert = function (nCode) {
        if (nCode.toString().length === 1) {
            return "0" + nCode.toString();
        } else {
            return nCode.toString();
        }
    };
    
    sellIssueRemote();
    
    //定时器查询开奖公告
    setInterval(function () {
        drawListRemote();
    }, 15000);
});