<?php
namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 签到接口
 */
class Signtype extends Api
{

    protected $noNeedLogin = ['*'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

    //获取列表
    public function Index(){
        $Signtype = new \app\admin\model\Signtype;
        $res=$Signtype->all();

        if($res){  
            $ajax = $res;
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
        return;     
    } 
    //获取列表
    public function Organ(){
        $Organ = new \app\admin\model\Organ;
        $res=$Organ->all();

        if($res){  
            $ajax = $res;
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
        return;     
    } 
    //获取列表
    public function Depart(){
        $Depart = new \app\admin\model\Depart;
        $res=$Depart
        ->with(['organ'])
        ->select();

        if($res){  
            $ajax = $res;
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
        return;     
    } 
    //获取列表
    public function Paichusuo(){
        $Paichusuo = new \app\admin\model\Paichusuo;
        $res=$Paichusuo->all();

        if($res){  
            $ajax = $res;
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
        return;     
    } 

}