<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Message extends Api
{


    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    //userid的time以后的任务消息学习督察数量
    public function Count(){
        $User = new \app\admin\model\User;
        $user = $User->find($_GET['userid']);
        // echo $user;
        $Renwu = new \app\admin\model\Renwu;
        $count1 = $Renwu->where(" (groups like '%,".$user['group_id'].",%' OR organs like '%,".$user['organ_id'].",%' OR departs like '%,".$user['depart_id'].",%'  ) AND updatetime >= ".$_GET["createtime"])->count(); 
        $Ducha = new \app\admin\model\Ducha;
        $count2 = $Ducha->where(" (groups like '%,".$user['group_id'].",%' OR organs like '%,".$user['organ_id'].",%' OR departs like '%,".$user['depart_id'].",%'  ) AND updatetime >= ".$_GET["createtime"])->count();
        $Xuexi = new \app\admin\model\Xuexi;
        $count3 = $Xuexi->where(" (groups like '%,".$user['group_id'].",%' OR organs like '%,".$user['organ_id'].",%' OR departs like '%,".$user['depart_id'].",%'  ) AND updatetime >= ".$_GET["createtime"])->count();
        $Xiaoxi = new \app\admin\model\Xiaoxi;
        $count4 = $Xiaoxi->where(" (groups like '%,".$user['group_id'].",%' OR organs like '%,".$user['organ_id'].",%' OR departs like '%,".$user['depart_id'].",%'  ) AND updatetime >= ".$_GET["createtime"])->count(); 

        
            $ajax['statuss']  = $count1+$count2+$count3+$count4;
            $ajax['msg']  = '成功';
            return json($ajax);

    }

    //列表
    public function List(){
        $Item = new \app\admin\model\Weifa;
        $res=$Item
        ->with(['user','paichusuo'])
        ->where("weifa.".$_GET['type']." = '".$_GET['content']."' and user_id =".$_GET['userid'])
        ->order("id desc")
        ->select(); 
        if($res){               
            $ajax  = $res;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);
    } 

    //列表
    public function Index(){
        $Renyuan = new \app\admin\model\Renyuan;
        if($_GET['mapin']=="true"){
            $data['lng'] = array('between',array($_GET['lngmin'],$_GET['lngmax']));
            $data['lat'] = array('between',array($_GET['latmin'],$_GET['latmax'])); 
        }       
        //$data['state'] = "未派送";
        if(isset($_GET['type1']))$data['type1'] = array('like','%'.$_GET['type1'].'%');
        if(isset($_GET['title']))$data['title'] = array('like','%'.$_GET['title'].'%');     
        // $data['stoptime'] = array('egt', time());
        $res=$Renyuan->where($data)->limit(100)->order("id")->select();
        if($res){               
            $ajax  = $res;
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
        }
        return json($ajax);
    } 
    //按照weifaid完结
    public function Complete(){
        $Renyuan = new \app\admin\model\Renyuan;
        $data['state'] = "已完结";
        $data['result'] = $_GET['content'];
        // $data['id'] = $_GET['weifaid'];
        // $res=$Renyuan->save(); 
        $res=$Renyuan->save($data,['id' => $_GET['weifaid']]);
        if($res){  
            $ajax['statuss']  = 1;
            $ajax['msg']  = '成功';
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '已经完结';
            return json($ajax);
        }
        return;     
    }  
    //在线
    public function Online(){
        $Renyuan = new \app\admin\model\Renyuan;
        if($_GET['mapin']=="true"){
            $data['lng'] = array('between',array($_GET['lngmin'],$_GET['lngmax']));
            $data['lat'] = array('between',array($_GET['latmin'],$_GET['latmax'])); 
        }       
        //$data['state'] = "未派送";
        $data['state']  = array('neq',"已完结");
        if(isset($_GET['type1']))$data['type1'] = array('like','%'.$_GET['type1'].'%');
        if(isset($_GET['title']))$data['title'] = array('like','%'.$_GET['title'].'%');     
        // $data['stoptime'] = array('egt', time());
        $res=$Renyuan->where($data)->limit(100)->order("id desc")->select();
        if($res){               
            $ajax  = $res;
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
    } 

    //获取信息
    public function Find(){
        $Renyuan = new \app\admin\model\Renyuan;
        $data['id'] = $_GET['id'];
        $res=$Renyuan->where($data)->select(); 
        if($res){  
            $ajax = $res[0];
            $ajax['statuss']  = 1;
            $ajax['msg']  = 'success';
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '错误';
            return json($ajax);
        }
        return;     
    } 

    //列表
    public function All(){
       $this->model = new \app\admin\model\Renyuan;
        $weifalist = $this->model::all();
        return json($weifalist);
    } 


    //接收上传图片
    public function File(){
        //var_dump($_FILES);
        //上传图片
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     12000000 ;// 设置附件上传大小
        $upload->exts      =     array('mp4', 'jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->saveName = array('date','Y-m-d-H-m-s'.rand(1, 1000)); 
        $upload->rootPath  =      './Uploads/'; // 设置附件上传根目录            
        $info   =   $upload->uploadOne($_FILES['photo']);// 上传单个文件 
        if(!$info) {// 上传错误提示错误信息
            $ajax['statuss']  = -1;
            $ajax['msg']  = $upload->getError();
            return json($ajax);
            $this->error('增加失败:'.$upload->getError());
        }else{// 上传成功 获取上传文件信息
            $image = M('image');
            $data['url']=$info['savepath']."/".$info['savename'].$info['exts'];
            $res = $image->add($data);
            $ajax['statuss']  = 1;
            $ajax['msg']  = '成功';
            $ajax['url']  = $info['savepath']."/".$info['savename'].$info['exts'];
            return json($ajax);
        }
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
