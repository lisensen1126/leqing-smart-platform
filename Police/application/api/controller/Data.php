<?php

namespace app\api\controller;

use app\common\controller\Api;
/**
 * 示例接口
 */
class Data extends Api{
	    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['Users', 'Jingqing','Diaodu','Paichusuo','Type','Item'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

	//获取人数
    public function Users(){
    	$User = new \app\admin\model\User;

		$jingcha=$User->where("group_id = 1")->count();
		$baoan=$User->where("group_id = 2")->count();
		$jingchaOnline=$User->where("group_id = 1 and status = 'normal'")->count();
		$baoanOnline=$User->where("group_id = 2 and status = 'normal'")->count();
		$total=$jingcha+$baoan;
		$totalOnline=$jingchaOnline+$baoanOnline;

		$jingchabili = $jingchaOnline/$jingcha;
		$baoanbili = $baoanOnline/$baoan;
		$totalbili = $totalOnline/$total;
		$data['type'] = "警察";
		if($jingcha){  
			$ajax["total"]  = $total;	
			$ajax["jingcha"]  = $jingcha;
			$ajax["baoan"]  = $baoan;

			$ajax["totalOnline"]  = $totalOnline;	
			$ajax["jingchaOnline"]  = $jingchaOnline;
			$ajax["baoanOnline"]  = $baoanOnline;

			$ajax["jingchabili"]  = $jingchabili;
			$ajax["baoanbili"]  = $baoanbili;			
			$ajax["totalbili"]  = $totalbili;
			return json($ajax);
		}else{
			$ajax['status']  = -1;
			$ajax['msg']  = '失败';
			return json($ajax);
		}
    }
    //获取警情七天内
    public function Jingqing(){
    	$Jingqing =  new \app\admin\model\Jingqing;	
    	$res = array();
    	for($i = 0;$i<7;$i++){
    		$j=6-$i;
    		$start=strtotime(date('Y-m-d 00:00:00'))-86400*$j;
			$end=strtotime(date('Y-m-d 23:59:59'))-86400*$j;
			$data['createtime'] = array('between',array($start,$end));
			$data['type1'] = "警情联动";
	        $count = $Jingqing->where($data)->count();
	        $res[$i]["stock_name"] = date('m-d',strtotime(date('Y-m-d 00:00:00'))-86400*$j);
	        $res[$i]["market_capitalization"] = $count;
    	}
        return json($res);
    }
    //获取调度七天内
    public function Diaodu(){
    	$Jingqing =  new \app\admin\model\Jingqing;		
    	$res = array();
    	for($i = 0;$i<7;$i++){
    		$j=6-$i;
   			$start=strtotime(date('Y-m-d 00:00:00'))-86400*$j;
			$end=strtotime(date('Y-m-d 23:59:59'))-86400*$j;
			$data['createtime'] = array('between',array($start,$end));
			$data['type1'] = "调度指令";
	        $count = $Jingqing->where($data)->count();
	        $res[$i]["stock_name"] = date('m-d',strtotime(date('Y-m-d 00:00:00'))-86400*$j);
	        $res[$i]["market_capitalization"] = $count;
    	}
        return json($res);
    }
    //按照派出所获取数量
    public function Paichusuo(){
    	$result =  array();
    	// $paichusuos =  array("柳市镇","北白象镇","虹桥镇","磐石镇","淡溪镇","蒲岐镇","南岳镇","清江镇","南塘镇","芙蓉镇","雁荡镇","大荆镇","湖雾镇","仙溪镇");
    	$Paichusuo =  new \app\admin\model\Paichusuo;	
    	$resp =$Paichusuo->all();

    	$Jingqing =  new \app\admin\model\Jingqing;	
    	$num = count($resp);        //count最好放到for外面，可以让函数只执行一次 count统计数组中元素的个数。
		  //  echo "数组元素的个数{$num}<br/>"; //注意这里典型的双引号内用花括号包裹变量
		for($i=0;$i<$num;$i++){
		  // echo "{$i}==>{$arr[$i]}<br/>";  //注意php中双引号内使用花括号包裹变量的写法
		  	$res = $Jingqing->where("paichusuo= '".$resp[$i]['name']."'")->count();
		  	$result[$i]["name"] =$resp[$i]['name'];
		  	$result[$i]["num"] =$res;
        	
		}	
		return json($result);
    	
    }
    //按照类别获取数量
    public function Type(){
    	$result =  array();
    	$paichusuos =  array("民生","涉黄","涉外","刑事");
    	$Weifa =  new \app\admin\model\Weifa;	
    	$num = count($paichusuos);      
		for($i=0;$i<$num;$i++){
		  	$res = $Weifa->where("type2= '".$paichusuos[$i]."'")->count();
		  	$result[$i]["name"] =$paichusuos[$i];
		  	$result[$i]["num"] =$res;        	
		}	
		return json($result);
    	
    }
    //获取信息数量6月内
    public function Item(){
    	$item  =  new \app\admin\model\Weifa;		
    	$res = array();
    	for($i = 0;$i<7;$i++){
    // 	$firstday = date('Y-m-01', strtotime($date));
  		// $lastday = date('Y-m-d', strtotime("$firstday +1 month -1 day"));
    		$j=6-$i;
    		$k=$j-1;
   //  		$monthfirst=strtotime(date('Y-m-01 00:00:00'));
			// $start=strtotime("$monthfirst -".$j." month -0 day")/1000;
			// $end=strtotime("$monthfirst -".$k." month -0 day")/1000;
			// $data['createtime'] = array('between',array($start,$end));
			$start=strtotime(date('Y-m-d 00:00:00'))-86400*$i;
			$end=strtotime(date('Y-m-d 23:59:59'))-86400*$i;

			// echo $start;

			$data['type1'] = "人员拍摄";
	        $count = $item->where($data)->count();
	        $res[$i]["renyuan"] = $count;

	        $data['type1'] = "车辆拍摄";
	        $count = $item->where($data)->count();
	        $res[$i]["cheliang"] = $count;

	        $data['type1'] = "违法记录";
	        $count = $item->where($data)->count();
	        $res[$i]["weifa"] = $count;


	        $res[$i]["month"] = date('m-d',strtotime(date('Y-m-d 00:00:00'))-86400*$i);;
	        
    	}
        return json($res);
    }

    


}