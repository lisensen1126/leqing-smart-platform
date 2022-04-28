<?php

namespace app\api\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Demo extends Api
{

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['*'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

    /**
     * 派送
     */
    public function baomingadd()
    {
        $user_id = $this->request->param('user_id', 0);
        $depart_id = $this->request->param('depart_id', 0);
        $organ_id = $this->request->param('organ_id', 0);
        $group_id = $this->request->param('group_id', 0);
        $renwu_id = $this->request->param('renwu_id', 0);
        // $renwu_id = Session::get('renwu_id');;
        // $this->view->assign("renwu_id", $renwu_id);
        // if ($this->request->isAjax()) {
            if($user_id >0){
                $baoming = new \app\admin\model\Baoming;
                $baoming->user_id     = $user_id;
                $baoming->renwu_id    = $renwu_id;
                $baoming->save();              
            }else if($depart_id >0){
                $user = new \app\admin\model\User;
                $userlist = $user->where('depart_id', $depart_id)->select();
                // return json($userlist);
                for($i=0;$i<count($userlist);$i++){
                    $baoming = new \app\admin\model\Baoming;
                    $baoming->user_id     = $userlist[$i]['id'];
                    $baoming->renwu_id    = $renwu_id;
                    $baoming->save();      
                }
    
            }
            
            // $this->success();

        // }
        // return $this->view->fetch();

        
    }

    /**
     * 测试方法
     *
     * @ApiTitle    (测试名称)
     * @ApiSummary  (测试描述信息)
     * @ApiMethod   (POST)
     * @ApiRoute    (/api/demo/test/id/{id}/name/{name})
     * @ApiHeaders  (name=token, type=string, required=true, description="请求的Token")
     * @ApiParams   (name="id", type="integer", required=true, description="会员ID")
     * @ApiParams   (name="name", type="string", required=true, description="用户名")
     * @ApiParams   (name="data", type="object", sample="{'user_id':'int','user_name':'string','profile':{'email':'string','age':'integer'}}", description="扩展数据")
     * @ApiReturnParams   (name="code", type="integer", required=true, sample="0")
     * @ApiReturnParams   (name="msg", type="string", required=true, sample="返回成功")
     * @ApiReturnParams   (name="data", type="object", sample="{'user_id':'int','user_name':'string','profile':{'email':'string','age':'integer'}}", description="扩展数据返回")
     * @ApiReturn   ({
         'code':'1',
         'msg':'返回成功'
        })
     */
    public function test()
    {
        $this->success('返回成功', $this->request->param());
    }

    /**
     * 无需登录的接口
     *
     */
    public function test1()
    {
        $data["aaa"] = "111";
        return json($data);
        // $this->success('返回成功', ['action' => 'test1']);
    }

    /**
     * 需要登录的接口
     *
     */
    public function test2()
    {
        $this->success('返回成功', ['action' => 'test2']);
    }

    /**
     * 需要登录且需要验证有相应组的权限
     *
     */
    public function test3()
    {
        $this->success('返回成功', ['action' => 'test3']);
    }

}
