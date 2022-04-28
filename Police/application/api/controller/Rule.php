<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\common\library\Ems;
use app\common\library\Sms;
use fast\Random;
use think\Config;
use think\Validate;

/**
 * 任务学习督察的权限接口
 */
class Rule extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = '*';

    public function _initialize()
    {

    }

    function check_str($str, $substr)
{
 $nums=substr_count($str,$substr);
 if ($nums>=1)
 {
  return true;
 }
 else
 {
  return false;
 }
}

    //获取任务、督察、学习的权限
    public function Node(){
        

        // return json($Nodes); 


        $type = $this->request->get('type');
        $id = $this->request->get('id');
        $Item = new \app\admin\model\Renwu;
        if($type=="xiaoxi")$Item = new \app\admin\model\Xiaoxi;
        if($type=="ducha")$Item = new \app\admin\model\Ducha;
        if($type=="xuexi")$Item = new \app\admin\model\Xuexi;
        $res = $Item->find($id);
        if($res){  
            $groups = $res['groups'];
            $organs = $res['organs'];
            $departs = $res['departs'];
            $Nodes = array();
            $Nodes[0]['id'] = 1001;
            $Nodes[0]['pId'] = 0;
            $Nodes[0]['name'] = "警察";
            if(strpos($groups, ',1,')!== false){
                $Nodes[0]['checked'] = true;    
            } 
            $Nodes[1]['id'] = 1002;
            $Nodes[1]['pId'] = 0;
            $Nodes[1]['name'] = "保安";

            if(strpos($groups, ',2,')!== false){
                $Nodes[1]['checked'] = true;    
            } 

            

            $Organ = new \app\admin\model\Organ;
            $reso=$Organ->All();

            $j = 2;
            $num = count($reso);        
            for($i=0;$i<$num;$i++){
                $Nodes[$j]['id'] = 2000+$reso[$i]['id'];
                $Nodes[$j]['pId'] = 1000+$reso[$i]['type_id'];
                $Nodes[$j]['name'] = $reso[$i]['name'];
                $a = ",".$reso[$i]['id'].",";
                if(strpos($organs, $a)!== false){
                    $Nodes[$j]['checked'] = true;    
                } 
                $j++;
            }

            $Depart = new \app\admin\model\Depart;
            $resd=$Depart->select();

             
            $num = count($resd);        
            for($i=0;$i<$num;$i++){
                $Nodes[$j]['id'] = $resd[$i]['id'];
                $Nodes[$j]['pId'] = 2000+$resd[$i]['organ_id'];
                $Nodes[$j]['name'] = $resd[$i]['name'];
                $a = ",".$resd[$i]['id'].",";
                if(strpos($departs, $a)!== false){
                    $Nodes[$j]['checked'] = true;    
                } 
                $j++;
            }

            $ajax = $Nodes;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '错误';
        }
        return json($ajax);      
    } 

    //机构查询
    public function Organ(){
        $Organ = new \app\admin\model\Organ;
        $data = [];
        if(isset($_GET['type_id']))$data['type_id'] = $_GET['type_id'];
        if(isset($_GET['id']))$data['id'] = $_GET['id'];
        $res=$Organ->where($data)->select(); 
        if($res){  
            $ajax = $res;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '错误';
        }
        return json($ajax);      
    } 
    //部门查询
    public function Depart(){
        $Depart = new \app\admin\model\Depart;
        $data = [];
        if(isset($_GET['organ_id']))$data['organ_id'] = $_GET['organ_id'];
        if(isset($_GET['id']))$data['id'] = $_GET['id'];
        $res=$Depart->where($data)->select(); 
        if($res){  
            $ajax = $res;
        }else{
            $ajax['status']  = -1;
            $ajax['msg']  = '错误';
        }
        return json($ajax);      
    } 
    /**
     * 定位时间大于10分钟，则不在线
     */
    public function online()
    {
        $User = new \app\admin\model\User;
        $data['status'] = 'status';
        $res=$User->where('logintime','<',time()-300)
        ->update([
            'status'  => 'hidden',
        ]);;
        return json($res);
    }
    



    /**
     * 修改任务的权限
     *

     */
    public function Rule()
    {
        $type = $this->request->get('type');
        $id = $this->request->get('id');
        $groups = $this->request->get('groups');
        $organs = $this->request->get('organs');
        $departs = $this->request->get('departs');
        $Item = new \app\admin\model\Renwu;
        if($type=="xiaoxi")$Item = new \app\admin\model\Xiaoxi;
        if($type=="Ducha")$Item = new \app\admin\model\Ducha;
        if($type=="xuexi")$Item = new \app\admin\model\xuexi;
        
        $res = $Item->save([
            'groups'  => $groups,
            'organs' => $organs,
            'departs' => $departs
        ],['id' => $id]);
        return json($res);
        // $this->success();
    }

    /**
     * 修改邮箱
     *
     * @ApiMethod (POST)
     * @param string $email   邮箱
     * @param string $captcha 验证码
     */
    public function changeemail()
    {
        $user = $this->auth->getUser();
        $email = $this->request->post('email');
        $captcha = $this->request->post('captcha');
        if (!$email || !$captcha) {
            $this->error(__('Invalid parameters'));
        }
        if (!Validate::is($email, "email")) {
            $this->error(__('Email is incorrect'));
        }
        if (\app\common\model\User::where('email', $email)->where('id', '<>', $user->id)->find()) {
            $this->error(__('Email already exists'));
        }
        $result = Ems::check($email, $captcha, 'changeemail');
        if (!$result) {
            $this->error(__('Captcha is incorrect'));
        }
        $verification = $user->verification;
        $verification->email = 1;
        $user->verification = $verification;
        $user->email = $email;
        $user->save();

        Ems::flush($email, 'changeemail');
        $this->success();
    }

    /**
     * 修改手机号
     *
     * @ApiMethod (POST)
     * @param string $mobile  手机号
     * @param string $captcha 验证码
     */
    public function changemobile()
    {
        $user = $this->auth->getUser();
        $mobile = $this->request->post('mobile');
        $captcha = $this->request->post('captcha');
        if (!$mobile || !$captcha) {
            $this->error(__('Invalid parameters'));
        }
        if (!Validate::regex($mobile, "^1\d{10}$")) {
            $this->error(__('Mobile is incorrect'));
        }
        if (\app\common\model\User::where('mobile', $mobile)->where('id', '<>', $user->id)->find()) {
            $this->error(__('Mobile already exists'));
        }
        $result = Sms::check($mobile, $captcha, 'changemobile');
        if (!$result) {
            $this->error(__('Captcha is incorrect'));
        }
        $verification = $user->verification;
        $verification->mobile = 1;
        $user->verification = $verification;
        $user->mobile = $mobile;
        $user->save();

        Sms::flush($mobile, 'changemobile');
        $this->success();
    }

    /**
     * 第三方登录
     *
     * @ApiMethod (POST)
     * @param string $platform 平台名称
     * @param string $code     Code码
     */
    public function third()
    {
        $url = url('user/index');
        $platform = $this->request->post("platform");
        $code = $this->request->post("code");
        $config = get_addon_config('third');
        if (!$config || !isset($config[$platform])) {
            $this->error(__('Invalid parameters'));
        }
        $app = new \addons\third\library\Application($config);
        //通过code换access_token和绑定会员
        $result = $app->{$platform}->getUserInfo(['code' => $code]);
        if ($result) {
            $loginret = \addons\third\library\Service::connect($platform, $result);
            if ($loginret) {
                $data = [
                    'userinfo'  => $this->auth->getUserinfo(),
                    'thirdinfo' => $result
                ];
                $this->success(__('Logged in successful'), $data);
            }
        }
        $this->error(__('Operation failed'), $url);
    }

    /**
     * 重置密码
     *
     * @ApiMethod (POST)
     * @param string $mobile      手机号
     * @param string $newpassword 新密码
     * @param string $captcha     验证码
     */
    public function resetpwd()
    {
        $type = $this->request->post("type");
        $mobile = $this->request->post("mobile");
        $email = $this->request->post("email");
        $newpassword = $this->request->post("newpassword");
        $captcha = $this->request->post("captcha");
        if (!$newpassword || !$captcha) {
            $this->error(__('Invalid parameters'));
        }
        if ($type == 'mobile') {
            if (!Validate::regex($mobile, "^1\d{10}$")) {
                $this->error(__('Mobile is incorrect'));
            }
            $user = \app\common\model\User::getByMobile($mobile);
            if (!$user) {
                $this->error(__('User not found'));
            }
            $ret = Sms::check($mobile, $captcha, 'resetpwd');
            if (!$ret) {
                $this->error(__('Captcha is incorrect'));
            }
            Sms::flush($mobile, 'resetpwd');
        } else {
            if (!Validate::is($email, "email")) {
                $this->error(__('Email is incorrect'));
            }
            $user = \app\common\model\User::getByEmail($email);
            if (!$user) {
                $this->error(__('User not found'));
            }
            $ret = Ems::check($email, $captcha, 'resetpwd');
            if (!$ret) {
                $this->error(__('Captcha is incorrect'));
            }
            Ems::flush($email, 'resetpwd');
        }
        //模拟一次登录
        $this->auth->direct($user->id);
        $ret = $this->auth->changepwd($newpassword, '', true);
        if ($ret) {
            $this->success(__('Reset password successful'));
        } else {
            $this->error($this->auth->getError());
        }
    }
}
