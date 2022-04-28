<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Xiaoxi extends Api
{


    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    //全部
    public function All(){
       $this->model = new \app\admin\model\Xiaoxi;
        $Xiaoxilist = $this->model::all();
        return json($Xiaoxilist);
    }

}
