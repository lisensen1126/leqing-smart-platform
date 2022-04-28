define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'sign/index' + location.search,
                    add_url: 'sign/add',
                    edit_url: 'sign/edit',
                    del_url: 'sign/del',
                    multi_url: 'sign/multi',
                    import_url: 'sign/import',
                    table: 'sign',
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
                        {field: 'user.nickname', title: __('姓名'), operate: 'LIKE'},
                        {field: 'signtype.name', title: __('Signtype.name'), operate: 'LIKE'},
                        {field: 'length', title: __('Length')},
                        {field: 'starttime', title: __('Starttime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'endtime', title: __('Endtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {
                            field: 'statistics', title: __('轨迹'), operate: false, formatter: function (value, row, index) {
                                return '<a href="' + "sign/trace?sign_id=" + row['id'] + '" class="btn btn-xs btn-info btn-dialog" title="轨迹[' + row['title'] + ']" data-area=\'["95%","95%"]\'><i class="fa fa-bar-chart"></i></a>';
                            }
                        },
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