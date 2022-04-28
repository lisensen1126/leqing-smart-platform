define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'weifa/index' + location.search,
                    add_url: 'weifa/add',
                    edit_url: 'weifa/edit',
                    del_url: 'weifa/del',
                    multi_url: 'weifa/multi',
                    import_url: 'weifa/import',
                    table: 'weifa',
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
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {field: 'type1', title: __('Type1'), searchList: {"违法举报":__('违法举报'),"人员拍摄":__('人员拍摄'),"车辆拍摄":__('车辆拍摄')}, formatter: Table.api.formatter.normal},
                        {field: 'type2', title: __('Type2'), operate: 'LIKE'},
                        {field: 'text', title: __('Text'), operate: 'LIKE'},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), searchList: {"normal":__('Normal'),"hidden":__('Hidden')}, formatter: Table.api.formatter.status},
                        {field: 'result', title: __('Result'), operate: 'LIKE'},
                        {field: 'score', title: __('Score')},
                        {field: 'privateswitch', title: __('Privateswitch'), table: table, formatter: Table.api.formatter.toggle},
                        {field: 'user.nickname', title:"发布者", operate: 'LIKE'},
                        {field: 'paichusuo.name', title: __('Paichusuo.name'), operate: 'LIKE'},
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