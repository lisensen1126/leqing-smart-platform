<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 信息管理
 *
 * @icon fa fa-circle-o
 */
class Diaodu extends Backend
{
    
    /**
     * Task模型对象
     * @var \app\admin\model\Task
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Task;
        $this->view->assign("typeList", $this->model->getTypeList());
        $this->view->assign("privateList", $this->model->getPrivateList());
    }

    public function import()
    {
        parent::import();
    }

    public function index()
    {
        parent::index();
        $this->assign('item',"调度指令");
        $this->assign('model',"Diaodu");
        $jingqing = M('jingqing');
        $jingqinglist=$jingqing->select(); 
        $this->assign('jingqinglist',$jingqinglist);
        $Organ = M('Organ');
        $data1['level']='一级';
        $res1=$Organ->where($data1)->select(); 
        $this->assign('organname1',$res1);

        $data2['level']='二级';
        $res2=$Organ->where($data2)->select(); 
        $this->assign('organname2',$res2);

        // $data3['level']='一级';
        // $res3=$Organ->where($data3)->select(); 
        // $this->assign('paichusuo',$res3);

        
        if(IS_POST){
            $Jingqing = M('Jingqing');
            if($Jingqing->create()){
                $Jingqing->type="调度指令";
                $resjingqing = $Jingqing->add(); 
                //echo $resjingqing; 
                if($resjingqing){
                    $usernames = $_POST['usernames'];
                    $namelist = explode(",",$usernames);
                    // var_dump($namelist);
                    for($i=0;$i<count($namelist)-1;$i++){
                        //查询用户id
                        $user = M('user');
                        $resuser = $user->where("name='".$namelist[$i]."'")->select();
                        if($resuser){
                            //查询是否已经派送给此人
                            $Paisong = M('Paisong');
                            $data['userid'] = $resuser[0]['id'];
                            $data['jingqingid'] = $resjingqing;
                            $resupaisong = $Paisong->where($data)->select();
                            // var_dump($resupaisong);
                            //增加派送记录
                            if($resupaisong){}else{
                                $data['realname'] = $namelist[$i];          
                                $data['jingqingtype'] = $_POST['jingqingtype'];         
                                $data['timepaisong'] =  date("Y-m-d H:i:s",time());
                                $Paisong ->add($data);  
                            }   
                        }
                    }
                    $this->redirect('/Home/Diaodu/Index');
                }else{
                    $this->error('失败');
                }
            }else{
                    $this->error('失败');
            }
        }else{
            $this->display();
        }
    }

    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    

}
