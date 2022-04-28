<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use app\admin\controller\localup\Service;
use \think\Session;
/**
 * 报名管理
 *
 * @icon fa fa-circle-o
 */
class Baoming extends Backend
{
    
    /**
     * Baoming模型对象
     * @var \app\admin\model\Baoming
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();

        $this->model = new \app\admin\model\Baoming;
        $this->view->assign("statusList", $this->model->getStatusList());
    }

    public function import()
    {
        parent::import();
    }

    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    

    /**
     * 查看
     */
    public function index()
    {
        $renwu_id = $this->request->param('renwu_id', 0);
        $this->view->assign("renwu_id", $renwu_id);
        Session::set('renwu_id',$renwu_id);
        
        //当前是否为关联查询
        $this->relationSearch = true;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $list = $this->model
                    ->with(['user','renwu'])
                    ->where($where)
                    ->where("renwu_id = ".$renwu_id)
                    ->order($sort, $order)
                    ->paginate($limit);

            foreach ($list as $row) {
                $row->visible(['id','text','result','score','createtime','state','status']);
                $row->visible(['user']);
                $row->getRelation('user')->visible(['nickname']);
                $row->visible(['renwu']);
                $row->getRelation('renwu')->visible(['name']);
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 派送
     */
    public function add()
    {
        $user_id = $this->request->param('user_id', 0);
        $depart_id = $this->request->param('depart_id', 0);
        $organ_id = $this->request->param('organ_id', 0);
        $group_id = $this->request->param('group_id', 0);

        $renwu_id = Session::get('renwu_id');;
        $this->view->assign("renwu_id", $renwu_id);

        $organ = new \app\admin\model\Organ;
        $organlist = $organ::all();
        $this->view->assign('organlist',$organlist);

        
        if ($this->request->isAjax()) {
            // return json( $this->request);
            if($user_id >0){
                $baoming = new \app\admin\model\Baoming;
                $list = $baoming->all(['user_id'=>$user_id,'renwu_id'=>$renwu_id]);
                if(count($list)<=0){
                    $baoming = new \app\admin\model\Baoming;
                    $baoming = new \app\admin\model\Baoming;
                    $baoming->user_id     = $user_id;
                    $baoming->renwu_id    = $renwu_id;
                    $baoming->save();     
                }
                            
            }
            else if($depart_id >0){
                $user = new \app\admin\model\User;
                $userlist = $user->where('depart_id = '. $depart_id)->select();
                // return json($userlist);
                for($i=0;$i<count($userlist);$i++){
                    $baoming = new \app\admin\model\Baoming;
                    $list = $baoming->all(['user_id'=>$userlist[$i]['id'],['renwu_id']=>$renwu_id]);
                    if(count($list)<=0){
                        $baoming = new \app\admin\model\Baoming;
                        $baoming->user_id     = $userlist[$i]['id'];
                        $baoming->renwu_id    = $renwu_id;
                        $baoming->save();          
                    }

                    
                }
    
            }
            else  if($organ_id >0){
                $user = new \app\admin\model\User;
                $userlist = $user->where('organ_id = '. $organ_id)->select();
                // return json($userlist);
                for($i=0;$i<count($userlist);$i++){
                    $baoming = new \app\admin\model\Baoming;
                    $list = $baoming->all(['user_id'=>$userlist[$i]['id'],['renwu_id']=>$renwu_id]);
                    if(count($list)<=0){
                        $baoming = new \app\admin\model\Baoming;
                        $baoming->user_id     = $userlist[$i]['id'];
                        $baoming->renwu_id    = $renwu_id;
                        $baoming->save();          
                    }    
                }
    
            }
            else  if($group_id >0){
                $user = new \app\admin\model\User;
                $userlist = $user->where('group_id = '. $group_id)->select();
                // return json($userlist);
                for($i=0;$i<count($userlist);$i++){
                    $baoming = new \app\admin\model\Baoming;
                    $list = $baoming->all(['user_id'=>$userlist[$i]['id'],['renwu_id']=>$renwu_id]);
                    if(count($list)<=0){
                        $baoming = new \app\admin\model\Baoming;
                        $baoming->user_id     = $userlist[$i]['id'];
                        $baoming->renwu_id    = $renwu_id;
                        $baoming->save();          
                    }    
                }
    
            }
            
            $this->success();

        }
        return $this->view->fetch();

        
    }

}
