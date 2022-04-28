<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Baoming extends Api
{

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['*'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

 
    //列表
    public function Find(){
        $Baoming = new \app\admin\model\Baoming;
        $res=$Baoming
        ->with(['user','renwu'])
        ->where("baoming.user_id = ".$_GET['userid']." and renwu_id = ".$_GET['renwuid'])
        ->order("id desc")
        ->select(); 
        if($res){               
            $ajax  = $res[0];
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);
    } 
    //增加,修改报名的内容
    public function Add(){
       //  $Baoming = $_GET["title"];
       //  if($Baoming == "人员拍摄"){
       //      $Baoming = new \app\admin\model\Weifa; 
       // }else if($Baoming == "车辆拍摄"){
       //      $Baoming = new \app\admin\model\Cheliang;
       // }else {
       //      $Baoming = new \app\admin\model\Weifa;
       // }
       
        $renwu = new \app\admin\model\Renwu;
        $renwu = $renwu->get(['id' => $_GET["renwuid"]]);
        $totalnum = $renwu->totalnum;

        $Baoming = new \app\admin\model\Baoming;
        $list = $Baoming->all(['renwu_id'=>$_GET["renwuid"],'state'=>'报名']);
        if(count($list)<$totalnum){
            $Baoming = new \app\admin\model\Baoming;
            $count = $Baoming->where('user_id = '.$_GET["userid"].' and renwu_id = '.$_GET["renwuid"])->count();
            // echo $count;
            if($count<= 0){
                $Baoming = new \app\admin\model\Baoming;
                $res = $Baoming->save([
                    'text'  => $_GET["text"],
                    'renwu_id'  => $_GET["renwuid"],
                    'user_id'  => $_GET["userid"],
                    'state' => '报名'
                ]);
                if($res){
                    $ajax['statuss']  = 1;
                    $ajax['msg']  = '成功';
                    return json($ajax);
                }else{
                    $ajax['statuss']  = -1;
                    $ajax['msg']  = '失败';
                    return json($ajax);
                } 
                
            }else{
                $ajax['statuss']  = -2;
                $ajax['msg']  = '失败，已经报名';
                return json($ajax);
            }               
        }else{
            $ajax['statuss']  = -3;
                $ajax['msg']  = '人数已满';
                return json($ajax);
        }



        return json(count($list));

        
    }
    // //增加,修改报名的内容
    // public function Add(){
    //    //  $Baoming = $_GET["title"];
    //    //  if($Baoming == "人员拍摄"){
    //    //      $Baoming = new \app\admin\model\Weifa; 
    //    // }else if($Baoming == "车辆拍摄"){
    //    //      $Baoming = new \app\admin\model\Cheliang;
    //    // }else {
    //    //      $Baoming = new \app\admin\model\Weifa;
    //    // }
       
    //     $renwu = new \app\admin\model\Renwu;
    //     $renwu = $renwu->get(['id' => $_GET["renwuid"]]);
    //     $totalnum = $renwu->totalnum;

    //     $Baoming = new \app\admin\model\Baoming;
    //     $list = $Baoming->all(['renwu_id'=>$_GET["renwuid"],'state'=>'报名']);
    //     if(count($list)<$totalnum){
    //         $Baoming = new \app\admin\model\Baoming;
    //         $res = $Baoming->save([
    //             'text'  => $_GET["text"],
    //             'state' => '报名'
    //         ],['id' => $_GET["baomingid"]]);;  
    //         if($res){
    //             $ajax['statuss']  = 1;
    //             $ajax['msg']  = '成功';
    //             return json($ajax);
    //         }else{
    //             $ajax['statuss']  = -1;
    //             $ajax['msg']  = '失败';
    //             return json($ajax);
    //         }    
    //     }else{
    //         $ajax['statuss']  = -3;
    //             $ajax['msg']  = '人数已满';
    //             return json($ajax);
    //     }



    //     return json(count($list));

        
    // }
    
}
