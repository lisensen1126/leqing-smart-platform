<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Weifa extends Api
{


    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    //增加
    public function Add(){
       //  $weifa = $_GET["title"];
       //  if($weifa == "人员拍摄"){
       //      $weifa = new \app\admin\model\Weifa; 
       // }else if($weifa == "车辆拍摄"){
       //      $weifa = new \app\admin\model\Cheliang;
       // }else {
       //      $weifa = new \app\admin\model\Weifa;
       // }
        $weifa = new \app\admin\model\Weifa; 
        $weifa->title = $_GET["title"];
        $weifa->text = $_GET["content"];
        $weifa->address = $_GET["address"];
        $weifa->type1 = $_GET["type1"];
        $weifa->type2 = $_GET["type2"];
        $weifa->image = $_GET["image"];
        // $weifa->videoimage = $_GET["video"];
        // $weifa->lng = $_GET["lng"];
        // $weifa->lat = $_GET["lat"];
        $weifa->privateswitch = $_GET["privateswitch"];
        $weifa->paichusuo_id = $_GET["paichusuo_id"];
        $weifa->user_id = $_GET["user_id"];
        $res = $weifa->save();  
        if($res){
            $ajax['statuss']  = 1;
            $ajax['msg']  = '成功';
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
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
