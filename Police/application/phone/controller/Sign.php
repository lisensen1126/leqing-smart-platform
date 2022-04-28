<?php
namespace app\phone\controller;

use app\common\controller\Api;

/**
 * 签到接口
 */
class Sign extends Api
{

    protected $noNeedLogin = ['User','Sign','Out','Online','Complete','Find'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

    //按照用户获取列表
    public function User(){
        $Sign = new \app\admin\model\Sign;
        $data['user_id'] = $_GET['userid'];
        $res=$Sign->with(['user','signtype'])->where($data)->order('id desc')->select();

        if($res){  
            $ajax = $res;
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }
        return;     
    } 

    //签到
    public function Sign(){
        $Sign = new \app\admin\model\Sign;
        $User = new \app\admin\model\User;

        $Sign->save(['endtime'=> time()],['endtime'=>0]);

        $res = $User->find($_GET['userid']);
        // return json($res);
        if($res['status'] == 'normal'){ 
            $ajax['statuss']  = -2;
            $ajax['msg']  = '失败,请勿重复签到';
            return json($ajax);
        }
        
        $Sign = new \app\admin\model\Sign;
        $Sign->user_id     = $_GET['userid'];
        $Sign->signtype_id     = $_GET['signtypeid'];
        $Sign->starttime     = time();
        $ress=$Sign->save();       
// return json($ress);
        
        $data['status']="normal";
        $data['signtype_id']=$_GET['signtypeid'];
        $data['sign_id']=$Sign->id; 
        $data['signtime']=time();
        $res = $User->save($data,['id' => $_GET['userid']]);
        if($res){ 
            // return json($Sign);
            // echo $Sign->id; 
            $ajax['statuss']  = 1;
            $ajax['msg']  = $Sign->id; 
            return json($ajax);
        }else{
            $ajax['statuss']  = -1;
            $ajax['msg']  = '失败';
            return json($ajax);
        }

        
    }   
        


    //签退
    public function Out(){
        $user = new \app\admin\model\User;
        $resu = $user->find($_GET['userid']);
        // return json($resu);
        // $datau['id'] = $_GET['userid'];
        $datau['sign_id']=-1;
        $datau['signtype_id']=-1;
        $datau['signtime']=-1;
        $datau['status'] = "hidden";
        $location = new \app\admin\model\Location;

        $resl = $location->where("sign_id = ".$resu['sign_id'])->select();

        $sum =0;
        for($i=0;$i<count($resl)-1;$i++){
            $lng1 = $resl[$i]['lng'];   
            $lat1 = $resl[$i]['lat'];
            $lng2 = $resl[$i+1]['lng']; 
            $lat2 = $resl[$i+1]['lat'];
            $EARTH_RADIUS = 6378137;
            $radLat1 = $this->rad($lat1);
            $radLat2 = $this->rad($lat2);
            $a = $radLat1 - $radLat2;
            $b = $this->rad($lng1) - $this->rad($lng2);
            $s = 2 * asin(sqrt(pow(sin($a / 2), 2) + cos($radLat1) * cos($radLat2) * pow(sin($b / 2), 2)));
            $s = $s * $EARTH_RADIUS;
            $s = round($s * 1) / 1;
            $sum += $s;
        }
        // echo($sum);
        // echo($resu['length']);
        $datau['length'] = $resu['length']+$sum;
        $user->save($datau,['id' => $_GET['userid']]);


        $Sign = new \app\admin\model\Sign;
        // $data['id'] = $resu[0]['signid'];       
        $data['endtime'] = time();
        $data['length'] = $sum ;
        $res=$Sign->save($data,['id' => $resu['sign_id']]);

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
    /**
     * 根据经纬度算距离，返回结果单位是m，先纬度，后经度
     * @param $lat1
     * @param $lng1
     * @param $lat2
     * @param $lng2
     * @return float|int
     */
    public function GetDistance($lat1, $lng1, $lat2, $lng2)
    {
        $EARTH_RADIUS = 6378137;

        $radLat1 = $this->rad($lat1);
        $radLat2 = $this->rad($lat2);
        $a = $radLat1 - $radLat2;
        $b = $this->rad($lng1) - $this->rad($lng2);
        $s = 2 * asin(sqrt(pow(sin($a / 2), 2) + cos($radLat1) * cos($radLat2) * pow(sin($b / 2), 2)));
        $s = $s * $EARTH_RADIUS;
        $s = round($s * 10000) / 10000;

        return $s;
    }

    private function rad($d)
    {
        return $d * M_PI / 180.0;
    }
}