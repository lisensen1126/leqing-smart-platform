define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'weifa1/index' + location.search,
                    add_url: 'weifa1/add',
                    edit_url: 'weifa1/edit',
                    del_url: 'weifa1/del',
                    multi_url: 'weifa1/multi',
                    import_url: 'weifa1/import',
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
                        {field: 'type2', title: __('Type2'), searchList: {"民生":__('民生'),"涉黄":__('涉黄'),"涉外":__('涉外'),"刑事":__('刑事')}, formatter: Table.api.formatter.normal},
                        // {field: 'text', title: __('Text'), operate: 'LIKE'},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'shenhe', title: __('Shenhe'), searchList: {"待审核":__('待审核'),"通过":__('通过'),"拒绝":__('拒绝')}, formatter: Table.api.formatter.normal},
                        {field: 'result', title: __('Result'), operate: 'LIKE'},
                        {field: 'score', title: __('Score')},
                        {field: 'privateswitch', title: __('Privateswitch'), table: table, formatter: Table.api.formatter.toggle},
                        {field: 'user.nickname', title: __('User.nickname'), operate: 'LIKE'},
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