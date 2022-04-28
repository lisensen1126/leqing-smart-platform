<?php

namespace app\admin\model;

use think\Model;


class Xuexi extends Model
{

    

    

    // 表名
    protected $name = 'xuexi';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type_text'
    ];
    

    
    public function getTypeList()
    {
        return ['反诈宣传' => __('反诈宣传'), '法律知识' => __('法律知识'), '警保规范' => __('警保规范')];
    }


    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function admin()
    {
        return $this->belongsTo('Admin', 'admin_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function paichusuo()
    {
        return $this->belongsTo('Paichusuo', 'paichusuo_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
