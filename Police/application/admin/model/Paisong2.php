<?php

namespace app\admin\model;

use think\Model;


class Paisong2 extends Model
{

    

    

    // 表名
    protected $name = 'paisong2';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'state_text'
    ];
    

    
    public function getStateList()
    {
        return ['报名' => __('报名'), '阅读' => __('阅读'), '接收' => __('接收'), '派送' => __('派送')];
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function user()
    {
        return $this->belongsTo('User', 'user_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function renwu()
    {
        return $this->belongsTo('Renwu', 'renwu_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
