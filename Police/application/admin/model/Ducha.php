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
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'status_text'
    ];
    

    
    public function getStatusList()
    {
        return ['normal' => __('Normal'), 'hidden' => __('Hidden')];
    }
    public function getTypeList()
    {
        return ['脱岗' => __('脱岗'), '着装' => __('着装'), '违纪' => __('违纪')];
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function admin()
    {
        return $this->belongsTo('Admin', 'user_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
