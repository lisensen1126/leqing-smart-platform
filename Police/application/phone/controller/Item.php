<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Item extends Api
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
    public function index(){
        $Item = new \app\admin\model\Item;
        if(isset($_GET['type']))$data['paisong_id'] = $_GET['paisong_id'];
        $res=$Item->where($data)->order("id")->select();
        if($res){               
            $ajax  = $res;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);
    } 
    //列表
    public function List(){

        $User = new \app\admin\model\User;
        $user = $User->find($_GET['userid']);

        $Item = new \app\admin\model\Ducha;

        if($_GET['content'] == '系统消息'){
            $Item= new \app\admin\model\Xiaoxi;
            // $Xiaoxilist = $Xiaoxi->where("status = 'normal'")->select();
            // return json($Xiaoxilist);
        }else if($_GET['content'] == '学习管理'){
            $Item = new \app\admin\model\Xuexi;              
        }
        // echo " groups like '%,".$user['group_id'].",%' OR organs like '%,".$user['organ_id'].",%' OR departs like '%,".$user['depart_id'].",%'  ";
        $res = $Item->where(" groups like '%,".$user['group_id'].",%' OR organs like '%,".$user['organ_id'].",%' OR departs like '%,".$user['depart_id'].",%'  ")->select();

        if($res){               
            $ajax  = $res;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);  
        
    } 
    
}
