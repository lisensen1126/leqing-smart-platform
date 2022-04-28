define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'baoming/index' + location.search,
                    add_url: 'baoming/add?renwu_id = {$$renwu_id}',
                    edit_url: 'baoming/edit',
                    del_url: 'baoming/del',
                    multi_url: 'baoming/multi',
                    import_url: 'baoming/import',
                    table: 'baoming',
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
                        {field: 'text', title: __('Text'), operate: 'LIKE'},
                        {field: 'result', title: __('Result'), operate: 'LIKE'},
                        {field: 'score', title: __('Score'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'user.nickname', title: '姓名', operate: 'LIKE'},
                        {field: 'renwu.name', title: __('Renwu.name'), operate: 'LIKE'},
                        {field: 'state', title: '状态'},
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