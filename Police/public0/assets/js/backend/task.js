define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'task/index' + location.search,
                    add_url: 'task/add',
                    edit_url: 'task/edit',
                    del_url: 'task/del',
                    multi_url: 'task/multi',
                    import_url: 'task/import',
                    table: 'item',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'type', title: __('Type'), searchList: {"任务清单":__('任务清单'),"督察信息":__('督察信息'),"反诈宣传":__('反诈宣传'),"违法记录":__('违法记录'),"人员拍摄":__('人员拍摄'),"车辆拍摄":__('车辆拍摄'),"系统消息":__('系统消息'),"清查记录":__('清查记录')}, formatter: Table.api.formatter.normal},
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {field: 'user_id', title: __('User_id')},
                        {field: 'private', title: __('Private'), searchList: {"是":__('是'),"否":__('否')}, formatter: Table.api.formatter.normal},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});