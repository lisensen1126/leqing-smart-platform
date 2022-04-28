<?php

namespace app\admin\model;

use think\Model;


class Renwu extends Model
{

    

    

    // 表名
    protected $name = 'renwu';
    
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
        return ['类别1' => __('类别1'), '类别2' => __('类别2'), '类别3' => __('类别3')];
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
