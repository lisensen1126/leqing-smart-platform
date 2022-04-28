<?php
namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 签到接口
 */
class Paichusuo extends Api
{

    protected $noNeedLogin = ['*'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['*'];

    //获取列表
    public function Index(){
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