<?php

namespace app\admin\model;

use think\Model;


class Task extends Model
{

    

    

    // 表名
    protected $name = 'item';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type_text',
        'private_text'
    ];
    

    
    public function getTypeList()
    {
        return ['任务清单' => __('任务清单'), '督察信息' => __('督察信息'), '反诈宣传' => __('反诈宣传'), '违法记录' => __('违法记录'), '人员拍摄' => __('人员拍摄'), '车辆拍摄' => __('车辆拍摄'), '系统消息' => __('系统消息'), '清查记录' => __('清查记录')];
    }

    public function getPrivateList()
    {
        return ['是' => __('是'), '否' => __('否')];
    }


    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPrivateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['private']) ? $data['private'] : '');
        $list = $this->getPrivateList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
