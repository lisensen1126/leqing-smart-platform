<?php

namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 示例接口
 */
class Paisong extends Api
{

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['*'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

    //根据用户查询最新
    public function Index(){
        $Paisong = new \app\admin\model\Paisong;
        // $data['user_id'] = $_GET['userid'];
        // $data['type1']  = $_GET['type1'];
        $res=$Paisong
        ->with(['user','jingqing'])
        ->where("user_id = ".$_GET['userid']." and type1 = '".$_GET['type1']."'")
        ->order("createtime desc")
        ->select(); 
        // return json($res);
        if($res){
            // $jingqingids=array();
            // //变为已经送达
            // $Paisong->save([
            //     'seeswitch'  => '1',
            // ],['user_id' => $_GET['userid']]);
            // //查询对应的警情数据，填充
            // for($i=0;$i<count($res);$i++){
            //     $jingqingids[$i] = $res[$i]['jingqing_id']; 
            // }
            // $jingqing = new \app\admin\model\Jingqing;
            // $list = $jingqing->all($jingqingids);
            return json($res);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '无新派送';
            return json($ajax);
        }
        return;     
    }

    //根据用户查询未读
    public function Neww(){
        $Paisong = new \app\admin\model\Paisong;
        $data['paisong.user_id'] = $_GET['userid'];
        // $data['state'] = $_GET['userid'];
        $data['paisong.state']  = "派送";
        // $data['state']  = array('neq',"已完结");
        $res=$Paisong
        ->with(['user','jingqing'])
        ->where($data)->order("createtime desc")->select(); 
        // return json($res);
        if($res){
            $jingqingids=array();
            //变为已经送达
            $Paisong->save([
                'state'  => '已读',
            ],['user_id' => $_GET['userid'],
            'state' =>'派送']);

            // //查询对应的警情数据，填充
            // for($i=0;$i<count($res);$i++){
            //     $jingqingids[$i] = $res[$i]['jingqing_id'];
            //     // //查询用户id
            //     // $jingqing = new \app\admin\model\Jingqing;
            //     // $resjingqing = $jingqing->where("id=".$res[$i]['jingqingid'])->select();
            //     // $res[$i]['title'] = $resjingqing[0]['title'];   
            //     // $res[$i]['content'] = $resjingqing[0]['content'];   
            //     // $res[$i]['lng'] = $resjingqing[0]['lng'];   
            //     // $res[$i]['lat'] = $resjingqing[0]['lat'];   
            //     // $res[$i]['jingqingtype'] = $resjingqing[0]['type']; 
            //     // $res[$i]['leibie'] = $resjingqing[0]['leibie']; 
            //     // $res[$i]['address'] = $resjingqing[0]['address'];   
            //     // $res[$i]['timeadd'] = $resjingqing[0]['timeadd'];   
            //     // $res[$i]['jingqingtype'] = $resjingqing[0]['type1'];    
            // }
            // $jingqing = new \app\admin\model\Jingqing;
            // $list = $jingqing->all($jingqingids);
            return json($res);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '无新派送';
            return json($ajax);
        }
        return;     
    }
    //根据用户查询派送，反馈后没有
    public function Map(){
        $Paisong = new \app\admin\model\Paisong;
        $data['paisong.user_id'] = $_GET['userid'];
        // $data['state'] = $_GET['userid'];
        $data['paisong.state']  = array('in',["派送","已读","接收","就位"]);
        // $data['state']  = array('neq',"已完结");
        $res=$Paisong
        ->with(['user','jingqing'])
        ->where($data)->order("createtime desc")->select(); 
        // return json($res);
        if($res){
            $jingqingids=array();
            //变为已经送达
            $Paisong->save([
                'state'  => '已读',
            ],['user_id' => $_GET['userid'],
            'state' =>'派送']);

            // //查询对应的警情数据，填充
            // for($i=0;$i<count($res);$i++){
            //     $jingqingids[$i] = $res[$i]['jingqing_id'];
            //     // //查询用户id
            //     // $jingqing = new \app\admin\model\Jingqing;
            //     // $resjingqing = $jingqing->where("id=".$res[$i]['jingqingid'])->select();
            //     // $res[$i]['title'] = $resjingqing[0]['title'];   
            //     // $res[$i]['content'] = $resjingqing[0]['content'];   
            //     // $res[$i]['lng'] = $resjingqing[0]['lng'];   
            //     // $res[$i]['lat'] = $resjingqing[0]['lat'];   
            //     // $res[$i]['jingqingtype'] = $resjingqing[0]['type']; 
            //     // $res[$i]['leibie'] = $resjingqing[0]['leibie']; 
            //     // $res[$i]['address'] = $resjingqing[0]['address'];   
            //     // $res[$i]['timeadd'] = $resjingqing[0]['timeadd'];   
            //     // $res[$i]['jingqingtype'] = $resjingqing[0]['type1'];    
            // }
            // $jingqing = new \app\admin\model\Jingqing;
            // $list = $jingqing->all($jingqingids);
            return json($res);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '无新派送';
            return json($ajax);
        }
        return;     
    }
   
    //按照userid和jingqingid查询
    public function Paisong(){
        $Paisong = new \app\admin\model\Paisong;
        $data['user_id'] = $_GET['userid'];
        $data['jingqing_id'] = $_GET['jingqingid'];
        $res=$Paisong->order("id desc")->limit(1)->where($data)->select(); 
        if($res){  
            $ajax = $res[0];
            return json($ajax);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '错误';
            return json($ajax);
        }
        return;     
    } 

    //按照jingqingid查询
    public function Jingqing(){
        $Paisong = new \app\admin\model\Paisong;
        $data['jingqingid'] = $_GET['jingqingid'];
        $res=$Paisong->order("paisongid desc")->where($data)->select(); 
        if($res){  
            $ajax = $res;
            return json($ajax);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '错误';
            return json($ajax);
        }
        return;     
    }  

    //上传图片
    public function Update(){
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');

        
        
        // 移动到框架应用根目录/public/uploads/ 目录下
        if($file){
            $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
            $params = array(

            'imagewidth'  => $info['imagewidth'],
            'imageheight' => $info['imageheight'],

        );
        // if (in_array($info['type'], ['image/gif', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/png', 'image/webp']) || in_array($info['suffix'], ['gif', 'jpg', 'jpeg', 'bmp', 'png', 'webp'])) {
        //     $this->thumb_image($params);
        // }

        if($params['imagewidth'] > $ratio){
            $width = $params['imagewidth'] / $ratio;
            $height = $params['imageheight'] / $ratio;
            $pathname = $params['url'];
            $file = $this->file;
            $image = \think\Image::open($file);
            $image->thumb(1000,1000)->save('.' . $pathname);
            $image_root_path = ROOT_PATH . '/public' . $pathname;
            $params['imagewidth'] = $width;
            $params['imageheight'] = $height;
            $params['filesize'] = filesize($image_root_path);
        }


            if($info){
                // 成功上传后 获取上传信息
                $ajax['statuss']  = 1;
                $ajax['msg']  = $info->getSaveName();
                return json($ajax);
                // // 输出 jpg
                // echo $info->getExtension();
                // // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
                // echo $info->getSaveName();
                // // 输出 42a79759f284b767dfcb2a0197904287.jpg
                // echo $info->getFilename(); 
            }else{
                // 上传失败获取错误信息
                $ajax['statuss']  = 1;
                $ajax['msg']  = $file->getError();
                return json($ajax);
            }
        }

        // //上传图片
        // $upload = new \Think\Upload();// 实例化上传类
        // $upload->maxSize   =     9145728 ;// 设置附件上传大小
        // $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        // $upload->saveName = array('date','Y-m-d-H-m-s'.rand(1, 1000)); 
        // $upload->rootPath  =      './uploads/'; // 设置附件上传根目录
        // // 上传单个文件 
        // $info   =   $upload->uploadOne($_FILES['image']);
        // if(!$info) {// 上传错误提示错误信息
        //     //$this->error($upload->getError());
        //     $ajax['status']  = -1;
        //     $ajax['msg']  = $upload->getError();
        //     return json($ajax);
        // }else{// 上传成功 获取上传文件信息
        //      //echo $info['savepath'].$info['savename'].$info['exts'];
        //     $ajax['status']  = 1;
        //     $ajax['msg']  = $info['savepath']."/".$info['savename'].$info['exts'];
        //     return json($ajax);
        // }

        


    }

    /**
     * 等比压缩上传的图片，覆盖原图
     * @Author: ELK
     * @Date: 2022-1-10 16:10:28
     * @param array $params 上传图片信息
     * @param int $ratio 压缩比例
    */
    public function thumb_image(&$params,$ratio = 10)
    {
        if($params['imagewidth'] > $ratio){
            $width = $params['imagewidth'] / $ratio;
            $height = $params['imageheight'] / $ratio;
            $pathname = $params['url'];
            $file = $this->file;
            $image = \think\Image::open($file);
            $image->thumb(1000,1000)->save('.' . $pathname);
            $image_root_path = ROOT_PATH . '/public' . $pathname;
            $params['imagewidth'] = $width;
            $params['imageheight'] = $height;
            $params['filesize'] = filesize($image_root_path);
        }
    }

    /**
     * 等比压缩上传的图片，单独创建
     * @Author: ELK
     * @Date: 2022-1-10 16:10:28
     * @param array $params 上传图片信息
     * @param int $ratio 期望压缩比例
     */
    public function add_thumb_image(&$params,$ratio = 10)
    {
        if($params['imagewidth'] > $ratio){
            $width = $params['imagewidth'] / $ratio;
            $height = $params['imageheight'] / $ratio;
            // 修改存储图片路径
            $params['url'] = $pathname = str_replace('.','_thumb.',$params['url']);
            $params['filename'] = str_replace('.','_thumb.',$params['filename']);
            $file = $this->file;
            $image = \think\Image::open($file);
            $image->thumb(1000,1000)->save('.' . $pathname);
            $image_root_path = ROOT_PATH . '/public' . $pathname;
            $params['imagewidth'] = $width;
            $params['imageheight'] = $height;
            $params['filesize'] = filesize($image_root_path);
        }
    }
    
    //用户签收/就位/反馈
    public function Edit(){
        $Paisong = new \app\admin\model\Paisong;
        // $data['id'] = $_GET['id'];
        $data['state'] = $_GET['content'];
        if($_GET['content']=="签收")$data['jieshoutime'] = time();
        if($_GET['content']=="就位")$data['jiuweitime'] = time();
        if($_GET['content']=="反馈"){
            $data['fankuitime'] = time();
            $data['fankui'] = $_GET['fankui'];
            $data['image'] = $_GET['image'];
        }
        $res=$Paisong->save($data,['id' => $_GET['id']]); 

        $res=$Paisong->find( $_GET['id']);     
        if($res){  
            $ajax  = $res;
            return json($ajax);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '修改失败';
            return json($ajax);
        }
        return;     
    } 

    

    //根据用户查询
    public function User(){
        $Paisong = new \app\admin\model\Paisong;
        $data['userid'] = $_GET['userid'];
        $res=$Paisong->order("timepaisong desc")->where($data)->select();   
        if($res){ 
            for($i=0;$i<count($res);$i++){
                //查询用户id
                $jingqing = new \app\admin\model\Jingqing;
                $resjingqing = $jingqing->where("id=".$res[$i]['jingqingid'])->select();
                $res[$i]['title'] = $resjingqing[0]['title'];   
                $res[$i]['content'] = $resjingqing[0]['content'];   
                $res[$i]['lng'] = $resjingqing[0]['lng'];   
                $res[$i]['lat'] = $resjingqing[0]['lat'];   
                $res[$i]['jingqingtype'] = $resjingqing[0]['type']; 
                $res[$i]['leibie'] = $resjingqing[0]['leibie']; 
                $res[$i]['address'] = $resjingqing[0]['address'];   
                $res[$i]['timeadd'] = $resjingqing[0]['timeadd'];   
            }
            $ajax = $res;
            return json($ajax);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '无新派送';
            return json($ajax);
        }
        return;     
    }
    //获取信息
    public function Find(){
        $Paisong = new \app\admin\model\Paisong;
        $data['id'] = $_GET['id'];
        $res=$Paisong->where($data)->select(); 
        if($res){  
            $ajax = $res[0];
            $ajax['status']  = 1;
            $ajax['msg']  = 'success';
            return json($ajax);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '错误';
            return json($ajax);
        }
        return;     
    } 
    //登录
    public function Login(){
        $Paisong = new \app\admin\model\Paisong;
        $data['Paisongname'] = $_GET['Paisongname'];
        $data['password'] = $_GET['password'];
        $res=$Paisong->where($data)->select(); 
        if($res){  
            $ajax = $res[0];
            $ajax['status']  = 1;
            $ajax['msg']  = 'success';
            return json($ajax);
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
        return;     
    }    

    //新增派送
    public function Add(){
        $usernames = $_GET['usernames'];
        $namelist = explode(",",$usernames);
        for($i=0;$i<count($namelist)-1;$i++){
            //查询用户id
            $user = new \app\admin\model\User;
            $resuser = $user->where("name='".$namelist[$i]."'")->select();
            if($resuser){
                //查询是否已经派送给此人
                $Paisong = new \app\admin\model\Paisong;
                $data['userid'] = $resuser[0]['id'];
                $data['jingqingid'] = $_GET['jingqingid'];
                $data['jingqingtype'] = $_GET['jingqingtype'];
                //$resupaisong = $Paisong->where($data)->select();
                // var_dump($resupaisong);
                //增加派送记录
                //if($resupaisong){}else{
                $data['realname'] = $namelist[$i];          
                $data['timepaisong'] =  date("Y-m-d H:i:s",time());
                $Paisong ->add($data);  
                //} 
            }
        }
        // for($i=0;$i<count($namelist)-1;$i++){
        //  //查询用户id
        //  $user = new \app\admin\model\User;
        //  $resuser = $user->where("name='".$namelist[$i]."'")->select();
        //  if($resuser){
        //      //查询是否已经派送给此人
        //      $Paisong = new \app\admin\model\Paisong;
        //      $data['userid'] = $resuser[0]['id'];
        //      $data['jingqingid'] = $_GET['jingqingid'];
        //      $resupaisong = $Paisong->where($data)->select();
        //      //var_dump($resupaisong);
        //      //增加派送记录
        //      if($resupaisong){}else{
        //          $data['name'] = $namelist[$i];          
           //       $data['timepaisong'] =  date("Y-m-d H:i:s",time());
           //       $Paisong ->add($data);  
        //      }   
        //  }
            
            
        // }
        //警情变为已派送
        $jingqing = new \app\admin\model\Jingqing;
        $dataj['state'] = "已派送";
        $dataj['id'] = $_GET['jingqingid'];
        $dataj['time'] = date("Y-m-d H:i:s",time());
        $jingqing->save($dataj);
        
        //return json($ajax);
  //    $Paisong2 = new \app\admin\model\Paisong;
        // $data2['Paisongname'] = $_GET['Paisongname'];
        // $res2=$Paisong2->where($data2)->select(); 
        // if($res2){
        //  $ajax['status']  = -1;
        //  $ajax['msg']  = '电话存在';
        //  return json($ajax);
        // }else{
        //  $Paisong = new \app\admin\model\Paisong;
        //  $Paisong ->creat();
        //  $res=$Paisong->add(); 
        //  if($res){  
        //      $ajax['status']  = 1;
        //      $ajax['msg']  = '注册成功';
        //      return json($ajax);
        //  }else{
        //      $ajax['status']  = -1;
        //      $ajax['msg']  = '注册失败';
        //      return json($ajax);
        //  }
        // }        
    } 

}
