<?php

namespace app\phone\controller;



use app\common\controller\Api;



/**

 * 手机接口

 */

class User extends Api

{



    protected $noNeedLogin = ['*'];

    // 无需鉴权的接口,*表示全部

    protected $noNeedRight = ['test2'];



    



    

    //获取信息

    public function Find(){

        $User = new \app\admin\model\User;

        $data['user.id'] = $_GET['userid'];

        $res=$User

        ->with(['group','organ','depart','paichusuo'])

        ->where($data)->select(); 

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

    //登录

    public function Login(){

        $User = new \app\admin\model\User;

        $data['username'] = $_GET['username'];

        $data['password'] = $_GET['password'];

        $res=$User->where($data)->select(); 

        if($res){  

            if($res[0]['verification']=="通过"){
                // if($res[0]['token'] ==1){
                //     $ajax['statuss']  = -3;

                //     $ajax['msg']  = '以在其他设备登陆，请在其他设备退出！';

                //     return json($ajax);
                // }else{
                    $ajax = $res[0];

                    $ajax['statuss']  = 1;

                    $ajax['msg']  = 'success';

                    $User = new \app\admin\model\User;
                    $User->save(['token'=> 1],['id'=>$res[0]['id']]);

                    return json($ajax);    
                // }

                  

            }else{

                $ajax['statuss']  = -1;

                $ajax['msg']  = '请等待认证';

                return json($ajax);

            }



            

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '用户不存在或者密码不正确';

            return json($ajax);

        }

        return;     

    }    
    //登录

    public function Logout(){

        $User = new \app\admin\model\User;
        $res = $User->save(['token'=> 0],['id'=>$_GET['userid']]);
        if($res){  
                    $ajax = $res[0];

                    $ajax['statuss']  = 1;

                    $ajax['msg']  = 'success';

                    

                    return json($ajax);    

                  

            }else{

                $ajax['statuss']  = -1;

                $ajax['msg']  = "失败";

                return json($ajax);

            }




    }    



    //注册

    public function Regist(){

        $User2 = new \app\admin\model\User;

        $data2['username'] = $_GET['username'];

        $res2=$User2->where($data2)->select(); 

        if($res2){

            $ajax['statuss']  = -1;

            $ajax['msg']  = '电话存在';

            return json($ajax);

        }else{

            $User = new \app\admin\model\User;

            $data['username'] = $_GET['username'];

            $data['nickname'] = $_GET['nickname'];

            $data['password'] = $_GET['password'];

            $data['group_id'] = $_GET['group_id'];

            $data['organ_id'] = $_GET['organ_id'];

            $data['depart_id'] = $_GET['depart_id'];

            $data['paichusuo_id'] = $_GET['paichusuo_id'];

            $data['mobile'] = $_GET['mobile'];

            $data['avatar'] = $_GET['avatar'];
            $data['status'] = "hidden";

            $res=$User->save($data); 

            if($res){  

                $ajax['statuss']  = 1;

                $ajax['msg']  = '注册成功，请等待审核。';

                return json($ajax);

            }else{

                $ajax['statuss']  = -1;

                $ajax['msg']  = '注册失败';

                return json($ajax);

            }

        }       

    } 



    //详情

    public function Detail(){

        $User = new \app\admin\model\User;

        $data['id'] = $_GET['id'];

        $res=$User->where($data)->select(); 

        if($res){ 

            $ajax = $res[0];

            $ajax['statuss']  = 1;

            $ajax['msg']  = 'success';

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '无此用户';

            return json($ajax);

        }

        return;     

    }



    //认证

    public function Access(){

        $User = new \app\admin\model\User;

        $data['id'] = $_GET['id'];

        $data['auth'] = "已认证";

        $res=$User->save($data); 

        if($res){  

            $ajax['statuss']  = 1;

            $ajax['msg']  = '成功';

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '失败';

            return json($ajax);

        }

        return;     

    } 

    //拒绝

    public function refuse(){

        $User = new \app\admin\model\User;

        $data['id'] = $_GET['id'];

        $data['auth'] = "未认证";

        $res=$User->save($data); 

        if($res){  

            $ajax['statuss']  = 1;

            $ajax['msg']  = '成功';

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '失败';

            return json($ajax);

        }

        return;     

    } 



    //忘记密码

    public function Forget(){

        $User2 = new \app\admin\model\User;

        $data2['username'] = $_GET['phone'];

        $res2=$User2->where($data2)->select(); 

        if($res2){

            $User = new \app\admin\model\User;

            $data['id'] = $res2[0]['id'];

            $data['password'] = $_GET['password'];

            $res=$User->save($data); 

            // if($res){  

                $ajax['statuss']  = 1;

                $ajax['msg']  = '修改成功';

                return json($ajax);

            // }else{

            //  $ajax['statuss']  = -1;

            //  $ajax['msg']  = '修改失败';

            //  return json($ajax);

            // }

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '用户不存在';

            return json($ajax);

        }

        return;     

    } 



    //修改密码

    public function Change(){

        $User2 = new \app\admin\model\User;

        $data2['id'] = $_GET['userid'];

        $data2['password'] = $_GET['password1'];

        $res2=$User2->where($data2)->select(); 

        if($res2){

            $User = new \app\admin\model\User;

            $data['id'] = $res2[0]['id'];

            $data['password'] = $_GET['password2'];

            $res=$User->save($data); 

            // if($res){  

                $ajax['statuss']  = 1;

                $ajax['msg']  = '修改成功';

                return json($ajax);

            // }else{

            //  $ajax['statuss']  = -1;

            //  $ajax['msg']  = '修改失败';

            //  return json($ajax);

            // }

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '用户不存在，或者密码不正确';

            return json($ajax);

        }

        return;     

    } 





    //修改

    public function Edit(){

        $User = new \app\admin\model\User;

        $data['id'] = $_GET['id'];

        $data['username'] = $_GET['username'];

        $data['password'] = $_GET['password'];

        $data['realname'] = $_GET['realname'];

        $res=$User->save($data); 

        if($res){  

            $ajax['statuss']  = 1;

            $ajax['msg']  = '修改成功';

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '修改失败';

            return json($ajax);

        }

        return;     

    } 

//根据userid奖励

    public function Score(){

        $User = new \app\admin\model\User; // 实例化User对象

        $User->where('id='.$_GET['userid'])->setInc('score',100); // 用户的积分加3

        $User->save($data); 

        // if($res){  

            $ajax['statuss']  = 1;

            $ajax['msg']  = '成功';

            return json($ajax);

        // }else{

        //  $ajax['statuss']  = -1;

        //  $ajax['msg']  = '修改失败';

        //  return json($ajax);

        // }

        return;     

    } 

    //根据警情id，获取派送人员列表

    public function Jingqing(){

        $Paisong = M('Paisong');

        $respaisong = M('Paisong')->where("jingqingid=".$_GET['jingqingid'])->select();     

        $userids=array();

        $num = count($respaisong);        

        for($i=0;$i<$num;$i++){

            $userids[$i]    = $respaisong[$i]['userid'];

        }

        $User = new \app\admin\model\User;

        $data['id']  = array('in',$userids);

        $res=$User->where($data)->select();         

        if($res){  

            $ajax = $res;

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '错误';

            return json($ajax);

        }

        return;     

    } 



    //

    public function Test(){

        echo "0";

        return;     

    } 



    //删除

    public function Delete(){

        $this->assign('item',"用户");

        $this->assign('model',"User");

        $User = new \app\admin\model\User;

        $res=$User->delete($_GET['id']);   

        if($res){

            $this->success('删除成功', '/Home/User/Index');

        }else{

            $this->error('删除失败');

        }

    }

    //修改

    public function Phonetype(){

        $User = new \app\admin\model\User;

        $data['id'] = $_GET['useridid'];

        $data['phonetype'] = $_GET['phonetype'];

        $res=$User->save($data); 

        if($res){  

            $ajax['statuss']  = 1;

            $ajax['msg']  = '修改成功';

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '修改失败';

            return json($ajax);

        }

        return;     

    } 

     //上传图片

    public function Update(){



        //上传图片

        $upload = new \Think\Upload();// 实例化上传类

        $upload->maxSize   =     9145728 ;// 设置附件上传大小

        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型

        $upload->saveName = array('date','Y-m-d-H-m-s'.rand(1, 1000)); 

        $upload->rootPath  =      './Uploads/'; // 设置附件上传根目录

        // 上传单个文件 

        $info   =   $upload->uploadOne($_FILES['image']);

        if(!$info) {// 上传错误提示错误信息

            //$this->error($upload->getError());

            $ajax['statuss']  = -1;

            $ajax['msg']  = $upload->getError();

            return json($ajax);

        }else{// 上传成功 获取上传文件信息

             //echo $info['savepath'].$info['savename'].$info['exts'];

            $ajax['statuss']  = 1;

            $ajax['msg']  = $info['savepath']."/".$info['savename'].$info['exts'];

            return json($ajax);

        }



        





    }



    

    //根据机构获取用户信息

    public function Organ(){

        $User = new \app\admin\model\User;

        if($_GET['organname1'])$data['organname1'] = array('like','%'.$_GET['organname1'].'%');

        if($_GET['organname2'])$data['organname2'] = array('like','%'.$_GET['organname2'].'%');

        $data['type'] = array('in',array('警察','保安'));

        $res=$User->where($data)->select(); 

        if($res){  

            $ajax = $res;

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '错误';

            return json($ajax);

        }

        return;     

    } 

    //根据一级单位获取用户信息

    public function Organ1(){

        $User = new \app\admin\model\User;

        $data['organname1'] = $_GET['name'];

        $res=$User->where($data)->select(); 

        if($res){  

            $ajax = $res;

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '错误';

            return json($ajax);

        }

        return;     

    } 

    //根据二级单位获取用户信息

    public function Organ2(){

        $User = new \app\admin\model\User;

        $data['organname2'] = $_GET['name'];

        $res=$User->where($data)->select(); 

        if($res){  

            $ajax = $res;

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '错误';

            return json($ajax);

        }

        return;     

    } 





    //根据机构获取用户信息

    public function Jigou(){

        $User = new \app\admin\model\User;

        if($_GET['organname1'])$data['organname1'] = array('like','%'.$_GET['organname1'].'%');

        if($_GET['organname2'])$data['organname2'] = array('like','%'.$_GET['organname2'].'%');

        $data['type'] = array('in',array('警察','保安'));

        $res=$User->where($data)->select(); 

        if($res){  

            $ajax = $res;

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '错误';

            return json($ajax);

        }

        return;     

    } 



    //定位

    public function Location(){

        $User = new \app\admin\model\User;

        $data['id'] = $_GET['userid'];

        $data['lat'] = $_GET['lat'];

        $data['lng'] = $_GET['lng'];

        $res=$User->save($data); 

        if($res){  

            $ajax['statuss']  = 1;

            $ajax['msg']  = '修改成功';

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '修改失败';

            return json($ajax);

        }

        return;     

    } 



    //获取用户信息

    public function Online(){

        $User = new \app\admin\model\User;

        // if(isset($_GET['lngmin']))

        $data['lng'] = array('between',array($_GET['lngmin'],$_GET['lngmax']));

        $data['lat'] = array('between',array($_GET['latmin'],$_GET['latmax']));

        $data['type'] = array('in',array('警察','保安'));

        $res=$User->where($data)->select(); 

        if($res){  

            $ajax = $res;

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '错误';

            return json($ajax);

        }

        return;     

    } 



    //按照姓名查询

    public function Realname(){

        $User = new \app\admin\model\User;

        if($_GET['mapin']=="true"){

            $data['lng'] = array('between',array($_GET['lngmin'],$_GET['lngmax']));

            $data['lat'] = array('between',array($_GET['latmin'],$_GET['latmax'])); 

        }  

        if($_GET['isonline']=="true"){

            $data['state'] = "执勤";

        }  

        if($_GET['type'])$data['type'] = array('like','%'.$_GET['type'].'%');

        if($_GET['realname'])$data['name'] = array('like','%'.$_GET['realname'].'%');

        if($_GET['organname1'])$data['organname1'] = array('like','%'.$_GET['organname1'].'%');

        if($_GET['organname2'])$data['organname2'] = array('like','%'.$_GET['organname2'].'%');

        $data['type'] = array('in',array('警察','保安'));

        $res=$User->where($data)->select(); 

        if($res){  

            $ajax = $res;

            return json($ajax);

        }else{

            $ajax['statuss']  = -1;

            $ajax['msg']  = '错误';

            return json($ajax);

        }

        return;     

    } 



   



}