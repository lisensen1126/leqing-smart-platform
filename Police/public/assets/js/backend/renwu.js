define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'renwu/index' + location.search,
                    add_url: 'renwu/add',
                    edit_url: 'renwu/edit',
                    del_url: 'renwu/del',
                    multi_url: 'renwu/multi',
                    import_url: 'renwu/import',
                    table: 'renwu',
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
                        {field: 'type', title: '类别'},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'status', title: __('Status'), searchList: {"normal":__('Normal'),"hidden":__('Hidden')}, formatter: Table.api.formatter.status},
                        {field: 'admin.nickname', title: "发布者", operate: 'LIKE'},
                        {field: 'totalnum', title: "人数限制"},
                        // {
                        //     field: 'statistics', title: __('派送'), operate: false, formatter: function (value, row, index) {
                        //         return '<a href="#" onclick ="paisong('+row['id']+')" class="btn btn-xs btn-info btn-dialog" title="派送[' + row['id'] + ']" data-area=\'["95%","95%"]\'><i class="fa fa-bar-chart"></i></a>';
                        //     }
                        // },
                        {
                            field: 'statistics', title: '报名列表', operate: false, formatter: function (value, row, index) {
                                return '<a href="' + "baoming/index?renwu_id=" + row['id'] + '" class="btn btn-xs btn-info btn-dialog" title="报名列表[' + row['id'] + ']" data-area=\'["95%","95%"]\'><i class="fa fa-bar-chart"></i></a>';
                            }
                        },
                        // {
                        //     field: 'statistics', title: "权限", operate: false, formatter: function (value, row, index) {
                        //         return '<a href="' + "renwu/edit2?ids=" + row['id'] + '" class="btn btn-xs btn-info btn-dialog" title="权限[' + row['id'] + ']" data-area=\'["95%","95%"]\'><i class="fa fa-bar-chart"></i></a>';
                        //     }
                        // },
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