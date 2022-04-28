<?php

namespace app\admin\model;

use think\Model;


class Location extends Model
{

    

    

    // 表名
    protected $name = 'location';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];
    

    







    public function user()
    {
        return $this->belongsTo('User', 'user_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function paisong()
    {
        return $this->belongsTo('Paisong', 'paisong_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function sign()
    {
        return $this->belongsTo('Sign', 'sign_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
