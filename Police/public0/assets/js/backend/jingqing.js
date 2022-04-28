define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'jingqing/index' + location.search,
                    add_url: 'jingqing/add',
                    edit_url: 'jingqing/edit',
                    del_url: 'jingqing/del',
                    multi_url: 'jingqing/multi',
                    import_url: 'jingqing/import',
                    table: 'jingqing',
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
                        {field: 'type1', title: __('Type1'), searchList: {"调度指令":__('调度指令'),"警情联动":__('警情联动')}, formatter: Table.api.formatter.normal},
                        {field: 'type2', title: __('Type2'), searchList: {"一般":__('一般'),"紧急":__('紧急')}, formatter: Table.api.formatter.normal},
                        {field: 'type3', title: __('Type3'), searchList: {"需反馈":__('需反馈'),"仅签到":__('仅签到')}, formatter: Table.api.formatter.normal},
                        {field: 'type4', title: __('Type4'), searchList: {"民生":__('民生'),"涉黄":__('涉黄'),"涉外":__('涉外'),"刑事":__('刑事'),"其他":__('其他')}, formatter: Table.api.formatter.normal},
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {field: 'state', title: __('State'), searchList: {"已派送":__('已派送'),"未派送":__('未派送')}, formatter: Table.api.formatter.normal},
                        {field: 'userid', title: __('Userid')},
                        {field: 'address', title: __('Address'), operate: 'LIKE'},
                        {field: 'lat', title: __('Lat'), operate: 'LIKE'},
                        {field: 'lng', title: __('Lng'), operate: 'LIKE'},
                        {field: 'paichusuo', title: __('Paichusuo'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'organname1', title: __('Organname1'), operate: 'LIKE'},
                        {field: 'organname2', title: __('Organname2'), operate: 'LIKE'},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'videoimage', title: __('Videoimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'result', title: __('Result'), operate: 'LIKE'},
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