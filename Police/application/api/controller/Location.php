<?php

namespace app\api\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Location extends Api
{

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['index', 'sign','File','Add','Find','Jingqing','Jiangli'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

 
    //列表
    public function index(){
        $Location = new \app\admin\model\Location;
        if(isset($_GET['paisong_id']))$data['paisong_id'] = $_GET['paisong_id'];
        $res=$Location->where($data)->order("id")->select();
        if($res){               
            $ajax  = $res;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);
    } 
    //列表
    public function sign(){
        $Location = new \app\admin\model\Location;
        if(isset($_GET['sign_id']))$data['sign_id'] = $_GET['sign_id'];
        $res=$Location->where($data)->order("id")->select();
        if($res){               
            $ajax  = $res;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);
    } 
    
}
