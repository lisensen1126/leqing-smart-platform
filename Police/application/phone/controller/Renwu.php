<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Renwu extends Api
{

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['*'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

 
    // //列表报名的
    // public function List(){
    //     $baoming = new \app\admin\model\Baoming;
    //     $res=$baoming
    //     ->with(['user','renwu'])
    //     ->where("baoming.user_id = ".$_GET['userid'])
    //     ->order("id desc")
    //     ->select(); 
    //     if($res){               
    //         $ajax  = $res;
    //     }else{
    //         $ajax['status']  = -1;
    //         $ajax['msg']  = '失败';
    //     }
    //     return json($ajax);
    // } 
    //
    public function List(){
        $User = new \app\admin\model\User;
        $user = $User->find($_GET['userid']);

        $Baoming = new \app\admin\model\Baoming;
        $resbaoming = $Baoming->where(" user_id = ".$_GET['userid'])->select();
        
// return json($resbaoming[0]['renwu_id']);
        $renwuids = ",";
        $num = count($resbaoming);        //count最好放到for外面，可以让函数只执行一次 
        for($i=0;$i<$num;$i++){
          $renwuids = $renwuids.$resbaoming[$i]['renwu_id'].",";
          // echo($resbaoming[0]['renwu_id']);
        }
        // return json($renwuids);


        $Renwu = new \app\admin\model\Renwu;
        $resrenwu = $Renwu->where(" groups like '%,".$user['group_id'].",%' OR organs like '%,".$user['organ_id'].",%' OR departs like '%,".$user['depart_id'].",%'  ")->order("id desc")->select();
        $num = count($resrenwu);        //count最好放到for外面，可以让函数只执行一次 
        for($i=0;$i<$num;$i++){
            $Baoming = new \app\admin\model\Baoming;
            $resbaoming = $Baoming->where(" user_id = ".$_GET['userid']." and renwu_id = ".$resrenwu[$i]["id"])->select();
            if($resbaoming){
                // echo $resbaoming[0]["status"];
                $resrenwu[$i]['status'] = $resbaoming[0]["status"];
            }else{
                $resrenwu[$i]['status'] = "未报名";
            }
            
            // if(){
            //     $resrenwu[$i]['status'] = 
            // }
          // $renwuids = $renwuids.$resrenwu[$i]['renwu_id'].",";
          // echo($resbaoming[0]['renwu_id']);
        }
        if($resrenwu){               
            $ajax  = $resrenwu;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);
    } 
    
}
