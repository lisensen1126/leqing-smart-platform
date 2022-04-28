define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'xuexi/index' + location.search,
                    add_url: 'xuexi/add',
                    edit_url: 'xuexi/edit',
                    del_url: 'xuexi/del',
                    multi_url: 'xuexi/multi',
                    import_url: 'xuexi/import',
                    table: 'xuexi',
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
                        {field: 'type', title: __('Type'), searchList: {"反诈宣传":__('反诈宣传'),"法律知识":__('法律知识'),"警保规范":__('警保规范')}, formatter: Table.api.formatter.normal},
                        {field: 'admin.nickname', title: "发布者", operate: 'LIKE'},
                        {field: 'paichusuo.name', title: __('Paichusuo.name'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
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