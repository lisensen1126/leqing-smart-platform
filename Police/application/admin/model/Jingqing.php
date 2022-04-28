<?php

namespace app\admin\model;

use think\Model;


class Jingqing extends Model
{

    

    

    // 表名
    protected $name = 'jingqing';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type1_text',
        'type2_text',
        'type3_text',
        'type4_text',
        'state_text'
    ];
    

    
    public function getType1List()
    {
        return ['调度指令' => __('调度指令'), '警情联动' => __('警情联动')];
    }

    public function getType2List()
    {
        return ['一般' => __('一般'), '紧急' => __('紧急')];
    }

    public function getType3List()
    {
        return ['需反馈' => __('需反馈'), '仅签到' => __('仅签到')];
    }

    public function getType4List()
    {
        return ['民生' => __('民生'), '涉黄' => __('涉黄'), '涉外' => __('涉外'), '刑事' => __('刑事'), '其他' => __('其他')];
    }

    public function getStateList()
    {
        return ['已派送' => __('已派送'), '未派送' => __('未派送'), '已完结' => __('已完结')];
    }


    public function getType1TextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type1']) ? $data['type1'] : '');
        $list = $this->getType1List();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getType2TextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type2']) ? $data['type2'] : '');
        $list = $this->getType2List();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getType3TextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type3']) ? $data['type3'] : '');
        $list = $this->getType3List();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getType4TextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type4']) ? $data['type4'] : '');
        $list = $this->getType4List();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public function paichusuo()
    {
        return $this->belongsTo('Paichusuo', 'paichusuo', 'id', [], 'LEFT')->setEagerlyType(0);
    }
    public function admin()
    {
        return $this->belongsTo('Admin', 'admin_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


}
