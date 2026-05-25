/**
 * 任务包管理
 */
var TaskMag = {
    id: "managerTable",//表格id
    seItem: null,	   //选中的条目
    table: null,
    layerIndex: -1,
    taskId: ''
};

/**
 * 初始化表格的列
 */
TaskMag.initColumn = function () {
    var columns = [
        {field: 'selectItem', checkbox: true},
        {title: '任务包名称', field: 'work_untis_name', align: 'center', valign: 'middle'},
        {title: '任务包代码', field: 'work_untis_code', align: 'center', valign: 'middle'},
        {title: '厂商', field: 'third_party_name', align: 'center', valign: 'middle'},
        {title: '时间戳', field: 'time_stamp', align: 'center', valign: 'middle', visible: false},
        {title: '执行频率', field: 'cron', align: 'center', valign: 'middle', visible: false},
        {title: 'kettle包名称', field: 'transformation_name', align: 'center', valign: 'middle'},
        {
            title: '任务类别', field: 'type', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '实时';
                } else if (value == 2) {
                    return '定时';
                }
            }
        },
        {
            title: '状态', field: 'status', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '启用';
                } else if (value == 0) {
                    return '禁用';
                }
            }
        },
        {field: 'operate', title: '操作', width: '10%', align: 'center', valign: 'middle', events: operateEvents1, formatter: operateFormatter},
    ];
    return columns;
};

window.operateEvents1 = {
    'click .tabUpdate': function (e, value, row, index) {
        TaskMag.taskId = row.id;
        var index = layer.open({
            type: 2,
            title: '修改任务',
            area: ['50%', '80%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/pages/task/task_edit.html',
            btn: ['修改', '取消'],
            btnAlign: 'c',
            btn1: function (index, layero) {
                var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
                iframeWin.contentWindow.TaskUpdate.updateSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            },
            btn2: function (index, layero) {
                //按钮【按钮二】的回调
            }
        });
        TaskMag.layerIndex = index;
        document.activeElement.blur();
    },
    'click .tabDel': function (e, value, row, index) {
        //询问框
        layer.confirm('确定删除该项', {
            btn: ['确定', '取消'], //按钮
            btnAlign: 'c',
        }, function () {
            var ajax = new $ax(Feng.ctxPath + "/taskMag/updateStatus", function (data) {
                layer.msg(data.message);
                TaskMag.search();
            });
            ajax.set({id: row.id, status: 2});
            ajax.start();
        }, function () {
        });
    }
};

function operateFormatter(value, row, index) {
    return [
        '<button id="tabUpdate" type="button" class="tabUpdate btn btn-info btn-xs">修改</button><button id="tabDel" type="button" class="tabDel btn btn-info btn-xs">删除</button>',
    ].join('');
};

TaskMag.search = function () {
    var queryData = {};
    queryData["work_untis_name"] = $("#work_untis_name").val();
    queryData["type"] = $("#type").val();
    TaskMag.table.refresh({query: queryData});
};

/**
 * 检查是否选中
 */
TaskMag.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        TaskMag.seItem = selected[0];
        return true;
    }
};

/**
 * 新增任务页面
 */
TaskMag.add = function () {
    var index = layer.open({
        type: 2,
        title: '新增任务',
        area: ['50%', '80%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/pages/task/task_add.html',
        btn: ['添加', '取消'],
        btnAlign: 'c',
        btn1: function (index, layero) {
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
            iframeWin.contentWindow.TaskAdd.addSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
        },
        btn2: function (index, layero) {
            //按钮【按钮二】的回调
        }
    });
    TaskMag.layerIndex = index;
    document.activeElement.blur();
};

//启用
TaskMag.enable = function () {
    if (this.check()) {
        var rows = $('#' + this.id).bootstrapTable('getSelections');
        var ids = "";
        for (var i = 0; i < rows.length; i++) {
            ids += rows[i].id + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        var ajax = new $ax(Feng.ctxPath + "/taskMag/updateList", function (data) {
            layer.msg(data.message);
            TaskMag.search();
        });
        ajax.set({ids: ids, status: 1});
        ajax.start();
    }
};

//禁用
TaskMag.prohibit = function () {
    if (this.check()) {
        var rows = $('#' + this.id).bootstrapTable('getSelections');
        var ids = "";
        for (var i = 0; i < rows.length; i++) {
            ids += rows[i].id + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        var ajax = new $ax(Feng.ctxPath + "/taskMag/updateList", function (data) {
            layer.msg(data.message);
            TaskMag.search();
        });
        ajax.set({ids: ids, status: 0});
        ajax.start();
    }
};

//初始化页面
TaskMag.init = function () {
    var defaultColunms = this.initColumn();
    var table = new BSTable("managerTable", "/taskMag/selectTaskList", defaultColunms);
    table.setPaginationType("client");//分页
    this.table = table.init();
};

$(function () {
    TaskMag.init();
});