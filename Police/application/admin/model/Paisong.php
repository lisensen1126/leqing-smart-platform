<?php

namespace app\admin\model;

use think\Model;


class Paisong extends Model
{

    

    

    // 表名
    protected $name = 'paisong';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'jieshoutime_text',
        'jiuweitime_text',
        'fankuitime_text',
        'state_text'
    ];
    

    
    public function getStateList()
    {
        return ['派送' => __('派送'), '接收' => __('接收'), '反馈' => __('反馈'), '已完结' => __('已完结')];
    }


    public function getJieshoutimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['jieshoutime']) ? $data['jieshoutime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getJiuweitimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['jiuweitime']) ? $data['jiuweitime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getFankuitimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['fankuitime']) ? $data['fankuitime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    protected function setJieshoutimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setJiuweitimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setFankuitimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


    public function jingqing()
    {
        return $this->belongsTo('Jingqing', 'jingqing_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
    public function user()
    {
        return $this->belongsTo('User', 'user_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
