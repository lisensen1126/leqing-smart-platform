<?php



namespace app\phone\controller;



use app\common\controller\Api;



/**

 * 示例接口

 */

class Location extends Api

{



    //如果$noNeedLogin为空表示所有接口都需要登录才能请求

    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求

    //如果接口已经设置无需登录,那也就无需鉴权了

    //

    // 无需登录的接口,*表示全部

    protected $noNeedLogin = ['*'];

    // 无需鉴权的接口,*表示全部

    protected $noNeedRight = ['test2'];



    //增加

    public function Add(){

        $Location = new \app\admin\model\Location;

        $Location->user_id = $_GET["userid"];

        $Location->paisong_id = $_GET["paisongid"];

        $Location->sign_id = $_GET["qiandaoid"];

        $Location->lat = $_GET["lat"];

        $Location->lng = $_GET["lng"];
        $Location->height = $_GET["height"];
        $Location->speed = $_GET["speed"];
        $Location->angle = $_GET["angle"];

        $Location->address = $_GET["address"];

        $res = $Location->save();  


        $User = new \app\admin\model\User;
        $data['address'] = $_GET['address'];
        $data['lat'] = $_GET["lat"];
        $data['lng'] = $_GET["lng"];
        $data['logintime'] = time();
        $res=$User->save($data,['id' => $_GET['userid']]); 

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

    public function index(){

        $Location = new \app\admin\model\Location;

        if(isset($_GET['paisong_id']))$data['paisong_id'] = $_GET['paisong_id'];

        $res=$Location->where($data)->order("id")->select();

        if($res){               

            $ajax  = $res;

        }else{

            $ajax['status']  = -1;

            $ajax['msg']  = '失败';

        }

        return json($ajax);

    } 

    //列表

    public function List(){

        $Location = new \app\admin\model\Location;

        $res=$Location

        ->with(['user','sign','paisong'])

        ->where("location.".$_GET['type']." = ".$_GET['id'])

        ->order("createtime desc")

        ->select(); 

        if($res){               

            $ajax  = $res;

        }else{

            $ajax['status']  = -1;

            $ajax['msg']  = '失败';

        }

        return json($ajax);

    } 

    

}

