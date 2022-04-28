<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 警情管理
 *
 * @icon fa fa-circle-o
 */
class Jingqing extends Backend
{
    
    /**
     * Jingqing模型对象
     * @var \app\admin\model\Jingqing
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Jingqing;
        $this->view->assign("type1List", $this->model->getType1List());
        $this->view->assign("type2List", $this->model->getType2List());
        $this->view->assign("type3List", $this->model->getType3List());
        $this->view->assign("type4List", $this->model->getType4List());
        $this->view->assign("stateList", $this->model->getStateList());
        // $auth = \app\admin\library\Auth::instance();
        $this->view->assign("admin_id", \think\Session::get('admin'));
        $paichusuo = new \app\admin\model\Paichusuo;
        $paichusuolist = $paichusuo->select();
        $this->view->assign("paichusuoList", $paichusuolist);
    }

    public function import()
    {
        parent::import();
    }

    // public function index()
    // {
    //     $category = new \app\common\model\Category;
    //     $categorylist = $category::all();
    //     $this->view->assign('categorylist',$categorylist);

    //     $this->view->assign('item',"调度指令");

    //     return $this->view->fetch();
    // }
    public function map()
    {
        $organ = new \app\admin\model\Organ;
        $organlist = $organ::all();
        $this->view->assign('organlist',$organlist);

        $this->view->assign('item',"调度指令");

        return $this->view->fetch();
    }
    public function online()
    {
        $organ = new \app\admin\model\Organ;
        $organlist = $organ::all();
        $this->view->assign('organlist',$organlist);

        $this->view->assign('item',"调度指令");

        return $this->view->fetch();
    }
    public function history()
    {
        $organ = new \app\admin\model\Organ;
        $organlist = $organ::all();
        $this->view->assign('organlist',$organlist);

        $this->view->assign('item',"调度指令");

        return $this->view->fetch();
    }
    public function charts()
    {
        return $this->view->fetch();
    }


    
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    

}
