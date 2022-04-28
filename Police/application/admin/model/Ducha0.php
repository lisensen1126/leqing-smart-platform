<?php

namespace app\admin\model;

use think\Model;


class Ducha extends Model
{

    

    

    // 表名
    protected $name = 'ducha';
    
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
        return ['normal' => __('Normal'), 'hidden' => __('Hidden')];
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


    public function organ()
    {
        return $this->belongsTo('Organ', 'organ_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function depart()
    {
        return $this->belongsTo('Depart', 'depart_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
