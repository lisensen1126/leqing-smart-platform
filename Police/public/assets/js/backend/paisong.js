define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'paisong/index' + location.search,
                    add_url: 'paisong/add',
                    edit_url: 'paisong/edit',
                    del_url: 'paisong/del',
                    multi_url: 'paisong/multi',
                    import_url: 'paisong/import',
                    table: 'paisong',
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
                        {field: 'jingqing.title', title: __('Jingqing.title'), operate: 'LIKE'},
                        {field: 'user.nickname', title: __('User.nickname'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'fankuitime', title: __('Fankuitime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'state', title: __('State'), searchList: {"派送":__('派送'),"接收":__('接收'),"反馈":__('反馈')}, formatter: Table.api.formatter.normal},
                        {field: 'fankui', title: __('Fankui'), operate: 'LIKE'},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'seeswitch', title: __('Seeswitch'), operate: 'LIKE', table: table, formatter: Table.api.formatter.toggle},
                        {field: 'result', title: __('Result'), operate: 'LIKE'},
                        {field: 'score', title: __('Score')},
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