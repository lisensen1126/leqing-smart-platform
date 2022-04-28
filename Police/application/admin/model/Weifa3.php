<?php

namespace app\admin\model;

use think\Model;


class Weifa3 extends Model
{

    

    

    // 表名
    protected $name = 'weifa';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type1_text',
        'type2_text',
        'shenhe_text'
    ];
    

    
    public function getType1List()
    {
        return ['违法举报' => __('违法举报'), '人员拍摄' => __('人员拍摄'), '车辆拍摄' => __('车辆拍摄')];
    }

    public function getType2List()
    {
        return ['民生' => __('民生'), '涉黄' => __('涉黄'), '涉外' => __('涉外'), '刑事' => __('刑事')];
    }

    public function getShenheList()
    {
        return ['待审核' => __('待审核'), '通过' => __('通过'), '拒绝' => __('拒绝')];
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


    public function getShenheTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['shenhe']) ? $data['shenhe'] : '');
        $list = $this->getShenheList();
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
