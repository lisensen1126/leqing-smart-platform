<?php

namespace app\api\controller;

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
    protected $noNeedRight = ['*'];

    

    //  var url = "/Api/Baoming/Add?"+"&renwu_id="+{$renwu_id} +"&userids="+userids;
    public function Add(){

        $userids = $_GET['userids'];
        $useridlist = explode(",",$userids);
        $count = 0;
        for($i=0;$i<count($useridlist)-1;$i++){
            $Baoming = new \app\admin\model\Baoming;
            $Baoming->renwu_id = $_GET["renwu_id"];
            $Baoming->user_id = $useridlist[$i];
            $res = $Baoming->where(['renwu_id'=>$_GET["renwu_id"],'user_id'=>$useridlist[$i]])->select();
            if($res){
                // echo "cunzai";
            }else{
                $res = $Baoming->save(); 
                $count++; 
            }

            
        }

            $ajax['status']  = 1;
            $ajax['msg']  = '成功派送'.$count.'条';
            return json($ajax);
    }

    // //按照jingqingid查询
    // public function Jingqing(){
    //     $Paisong = new \app\admin\model\Paisong;
    //     $data['jingqing_id'] = $_GET['jingqingid'];
    //     $res=$Paisong
    //     ->with(['jingqing','user'])
    //     ->order("id desc")->where($data)->select(); 
    //     if($res){  
    //         $ajax = $res;
    //     }else{
    //         $ajax['status']  = -1;
    //         $ajax['msg']  = '错误';
    //     }
    //     return json($ajax);    
    // } 
    // //按照id查询
    // public function Find(){
    //     $Paisong = new \app\admin\model\Paisong;
    //     $data['paisong.id'] = $_GET['id'];
    //     $res=$Paisong
    //     ->with(['jingqing','user'])
    //     ->order("id desc")->where($data)->select(); 
    //     if($res){  
    //         $ajax = $res[0];
    //     }else{
    //         $ajax['status']  = -1;
    //         $ajax['msg']  = '错误';
    //     }
    //     return json($ajax);    
    // } 

    // //列表
    // public function Index(){
    //     $Paisong = new \app\admin\model\Paisong;
    //     if($_GET['mapin']=="true"){
    //         $data['lng'] = array('between',array($_GET['lngmin'],$_GET['lngmax']));
    //         $data['lat'] = array('between',array($_GET['latmin'],$_GET['latmax'])); 
    //     }       
    //     //$data['state'] = "未派送";
    //     if(isset($_GET['type1']))$data['type1'] = array('like','%'.$_GET['type1'].'%');
    //     if(isset($_GET['title']))$data['title'] = array('like','%'.$_GET['title'].'%');     
    //     // $data['stoptime'] = array('egt', time());
    //     $res=$Paisong->where($data)->limit(100)->order("id")->select();
    //     if($res){               
    //         $ajax  = $res;
    //     }else{
    //         $ajax['status']  = -1;
    //         $ajax['msg']  = '失败';
    //     }
    //     return json($ajax);
    // } 
    // //按照jingqingid完结
    // public function Complete(){
    //     $Paisong = new \app\admin\model\Paisong;
    //     $data['state'] = "已完结";
    //     $data['result'] = $_GET['content'];
    //     $data['id'] = $_GET['jingqingid'];
    //     $res=$Paisong->save($data); 
    //     if($res){  
    //         $ajax['status']  = 1;
    //         $ajax['msg']  = '成功';
    //         $this->ajaxReturn($ajax);
    //     }else{
    //         $ajax['status']  = -1;
    //         $ajax['msg']  = '已经完结';
    //         $this->ajaxReturn($ajax);
    //     }
    //     return;     
    // }  
    // //在线
    // public function Online(){
    //     $Paisong = new \app\admin\model\Paisong;
    //     if($_GET['mapin']=="true"){
    //         $data['lng'] = array('between',array($_GET['lngmin'],$_GET['lngmax']));
    //         $data['lat'] = array('between',array($_GET['latmin'],$_GET['latmax'])); 
    //     }       
    //     //$data['state'] = "未派送";
    //     $data['state']  = array('neq',"已完结");
    //     if(isset($_GET['type1']))$data['type1'] = array('like','%'.$_GET['type1'].'%');
    //     if(isset($_GET['title']))$data['title'] = array('like','%'.$_GET['title'].'%');     
    //     // $data['stoptime'] = array('egt', time());
    //     $res=$Paisong->where($data)->limit(100)->order("id desc")->select();
    //     if($res){               
    //         $ajax  = $res;
    //         $this->ajaxReturn($ajax);
    //     }else{
    //         $ajax['status']  = -1;
    //         $ajax['msg']  = '失败';
    //         $this->ajaxReturn($ajax);
    //     }
    // } 

   
    // //列表
    // public function All(){
    //    $this->model = new \app\admin\model\Paisong;
    //     $jingqinglist = $this->model::all();
    //     return json($jingqinglist);
    // } 


    // //接收上传图片
    // public function File(){
    //     //var_dump($_FILES);
    //     //上传图片
    //     $upload = new \Think\Upload();// 实例化上传类
    //     $upload->maxSize   =     12000000 ;// 设置附件上传大小
    //     $upload->exts      =     array('mp4', 'jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
    //     $upload->saveName = array('date','Y-m-d-H-m-s'.rand(1, 1000)); 
    //     $upload->rootPath  =      './Uploads/'; // 设置附件上传根目录            
    //     $info   =   $upload->uploadOne($_FILES['photo']);// 上传单个文件 
    //     if(!$info) {// 上传错误提示错误信息
    //         $ajax['status']  = -1;
    //         $ajax['msg']  = $upload->getError();
    //         $this->ajaxReturn($ajax);
    //         $this->error('增加失败:'.$upload->getError());
    //     }else{// 上传成功 获取上传文件信息
    //         $image = M('image');
    //         $data['url']=$info['savepath']."/".$info['savename'].$info['exts'];
    //         $res = $image->add($data);
    //         $ajax['status']  = 1;
    //         $ajax['msg']  = '成功';
    //         $ajax['url']  = $info['savepath']."/".$info['savename'].$info['exts'];
    //         $this->ajaxReturn($ajax);
    //     }
    // }

    // /**
    //  * 测试方法
    //  *
    //  * @ApiTitle    (测试名称)
    //  * @ApiSummary  (测试描述信息)
    //  * @ApiMethod   (POST)
    //  * @ApiRoute    (/api/demo/test/id/{id}/name/{name})
    //  * @ApiHeaders  (name=token, type=string, required=true, description="请求的Token")
    //  * @ApiParams   (name="id", type="integer", required=true, description="会员ID")
    //  * @ApiParams   (name="name", type="string", required=true, description="用户名")
    //  * @ApiParams   (name="data", type="object", sample="{'user_id':'int','user_name':'string','profile':{'email':'string','age':'integer'}}", description="扩展数据")
    //  * @ApiReturnParams   (name="code", type="integer", required=true, sample="0")
    //  * @ApiReturnParams   (name="msg", type="string", required=true, sample="返回成功")
    //  * @ApiReturnParams   (name="data", type="object", sample="{'user_id':'int','user_name':'string','profile':{'email':'string','age':'integer'}}", description="扩展数据返回")
    //  * @ApiReturn   ({
    //      'code':'1',
    //      'msg':'返回成功'
    //     })
    //  */

    // /**
    //  * 无需登录的接口
    //  *
    //  */
    // public function test1()
    // {
    //     $data["aaa"] = "111";
    //     return json($data);
    //     // $this->success('返回成功', ['action' => 'test1']);
    // }

    // /**
    //  * 需要登录的接口
    //  *
    //  */
    // public function test2()
    // {
    //     $this->success('返回成功', ['action' => 'test2']);
    // }

    // /**
    //  * 需要登录且需要验证有相应组的权限
    //  *
    //  */
    // public function test3()
    // {
    //     $this->success('返回成功', ['action' => 'test3']);
    // }

}
