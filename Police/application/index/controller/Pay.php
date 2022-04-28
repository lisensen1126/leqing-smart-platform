<?php

namespace app\index\controller;


use app\common\controller\Frontend;

class Pay extends Frontend
{

    public function index()
    {
        echo \addons\epay\library\Service::submitOrder("0.01", "1234567", "wechat", "1fen", "http://www.changliukeji.com/vote/player/notify", "http://www.changliukeji.com/vote/player/2.html", "mp");
        $params = [
            'amount'=>"0.01",
            'orderid'=>"1234567",
            'type'=>"wechat",
            'title'=>"1fen",
            'notifyurl'=>"http://www.changliukeji.com/vote/player/notify",
            'returnurl'=>"http://www.changliukeji.com/vote/player/2.html",
            'method'=>"mp",
            'openid'=>"osaMo61Zs6VHX0UodNc0ITFx5xtk",
            'auth_code'=>"1234"
        ];
        echo \addons\epay\library\Service::submitOrder($params);
    }

}
