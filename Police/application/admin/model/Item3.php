<?php

namespace app\admin\model;

use think\Model;


class Item3 extends Model
{

    

    

    // 表名
    protected $name = 'item';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type_text',
        'status_text'
    ];
    

    
    public function getTypeList()
    {
        return ['督察信息' => __('督察信息'), '反诈宣传' => __('反诈宣传'), '清查记录' => __('清查记录')];
    }

    public function getStatusList()
    {
        return ['hidden' => __('Hidden'), 'normal' => __('Normal')];
    }


    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
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


    public function paichusuo()
    {
        return $this->belongsTo('Paichusuo', 'paichusuo_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
