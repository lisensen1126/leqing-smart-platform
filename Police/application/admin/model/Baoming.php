<?php

namespace app\admin\model;

use think\Model;


class Baoming extends Model
{

    

    

    // 表名
    protected $name = 'baoming';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'status_text'
    ];
    

    
    public function getStatusList()
    {
        return ['normal' => '通过', 'hidden' => '拒绝', 'baoming' => '报名'];
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
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
