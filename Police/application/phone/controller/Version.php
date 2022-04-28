<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 版本接口
 */
class Version extends Api
{

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['Index'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

    //最新版本
    public function Index(){
        $version = new \app\admin\model\Version;
        $res=$version->limit(1)->order("id desc")->select();
        return json($res[0]);
    }


}
