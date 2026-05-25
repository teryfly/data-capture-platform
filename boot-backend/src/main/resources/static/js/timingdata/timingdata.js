/**
 * 任务包管理
 */
var TimingData = {
    id: "matchingTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    table2: null,
    layerIndex: -1,
    timingDataId: "",
    workId: ""
};

/**
 * 初始化表格的列
 */
TimingData.initColumn = function () {
    var columns = [
        {field: 'selectItem', checkbox: true},
        {title: '表名称', field: 'hdr_name', align: 'center', valign: 'middle'},
        {title: '任务包名称', field: 'work_untis_name', align: 'center', valign: 'middle'},
        {title: '任务包代码', field: 'work_untis_code', align: 'center', valign: 'middle'},
        {title: '厂商', field: 'third_party_name', align: 'center', valign: 'middle'},
        {title: '时间戳', field: 'time_stamp', align: 'center', valign: 'middle'},
        {title: '执行频率', field: 'cron', align: 'center', valign: 'middle'},
        {title: 'kettle包名称', field: 'transformation_name', align: 'center', valign: 'middle'},
        {
            title: '任务类别', field: 'type3', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
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

/**
 * 初始化表格的列
 */
TimingData.initColumn2 = function () {
    var columns = [
        {field: 'selectItem', radio: true, visible: false},
        {title: '字段名称', field: 'column_name', align: 'center', valign: 'middle'},
        {title: '字段编码', field: 'column_code', align: 'center', valign: 'middle'},
        {title: '数据类型', field: 'DataType', align: 'center', valign: 'middle'},
        {title: '数据长度', field: 'DataLength', align: 'center', valign: 'middle'},
        {
            title: '是否必填', field: 'is_null', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '必填';
                } else if (value == 0) {
                    return '不必填';
                }
            }
        },
        {
            title: '是否主键', field: 'is_pk', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '是';
                } else if (value == 0) {
                    return '否';
                }
            }
        },
        {title: '数据规则', field: 'regular', align: 'center', valign: 'middle'},
        {title: '表示格式', field: 'DataFormat', align: 'center', valign: 'middle'},
        {title: '备注', field: 'remark', align: 'center', valign: 'middle', width: '30%'}
    ];
    return columns;
};

window.operateEvents1 = {
    'click .tabUpdate': function (e, value, row, index) {
        TimingData.timingDataId = row.id;
        TimingData.workId = row.work_id;
        var index = layer.open({
            type: 2,
            title: '修改匹配关系',
            area: ['50%', '80%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/pages/collection/timingdata/data_edit.html',
            btn: ['修改', '取消'],
            btnAlign: 'c',
            btn1: function (index, layero) {
                var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
                iframeWin.contentWindow.TaskDep.updateSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            },
            btn2: function (index, layero) {
                //按钮【按钮二】的回调
            }
        });
        TimingData.layerIndex = index;
        document.activeElement.blur();
    },
    'click .tabDel': function (e, value, row, index) {
        //询问框
        layer.confirm('确定删除该项', {
            btn: ['确定', '取消'], //按钮
            btnAlign: 'c',
        }, function () {
            var ajax = new $ax(Feng.ctxPath + "/timingData/del", function (data) {
                layer.msg(data.message);
                TimingData.search();
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

//点击新增任务按钮
TimingData.addTab = function () {
    if (TreeOperation.id == '') {
        layer.msg('请选择要操作的表');
        return;
    } else if (TreeOperation.text != 3) {
        layer.msg("只能对表进行添加");
        return;
    }
    var index = layer.open({
        type: 2,
        title: '匹配任务',
        area: ['50%', '80%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/pages/collection/timingdata/data_add.html',
        btn: ['匹配', '取消'],
        btnAlign: 'c',
        btn1: function (index, layero) {
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
            iframeWin.contentWindow.TaskDep.addSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
        },
        btn2: function (index, layero) {
            //按钮【按钮二】的回调
        }
    });
    this.layerIndex = index;
    document.activeElement.blur();
};

/**
 * 检查是否选中
 */
TimingData.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        TimingData.seItem = selected[0];
        return true;
    }
};

/**
 * 批量删除按钮
 */
TimingData.delTab = function () {
    if (this.check()) {
        var rows = $('#matchingTable').bootstrapTable('getSelections');
        var ids = "";
        for (var i = 0; i < rows.length; i++) {
            ids += rows[i].id + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        var ajax = new $ax(Feng.ctxPath + "/timingData/delTaskDepList", function (data) {
            layer.msg(data.message);
            TimingData.search();
        });
        ajax.set({ids: ids, status: 2});
        ajax.start();
    }
};

TimingData.search = function () {
    var queryData = {};
    queryData['table_id'] = TreeOperation.id;
    TimingData.table.refresh({query: queryData});
};

TimingData.search2 = function () {
    var queryData = {};
    queryData['task_id'] = TreeOperation.id;
    queryData['name'] = $("#name").val();
    TimingData.table2.refresh({query: queryData});
};

//初始化页面
TimingData.init = function () {
    //生成树
    var ztree = new $ZTree("deptTree", "/task/list");
    ztree.bindOnClick(TreeOperation.onClickDept);
    ztree.init();
    var defaultColunms = TimingData.initColumn();
    var table = new BSTable("matchingTable", "/timingData/selectTaskDepByTableId", defaultColunms);
    table.setPaginationType("client");//分页
    table.setPagination(false);
    table.setHeight("300");
    TimingData.table = table.init();

    var defaultColunms2 = TimingData.initColumn2();
    var table2 = new BSTable("fieldTable", "/rule/list", defaultColunms2);
    table2.setPaginationType("client");//分页
    table2.setPagination(false);
    table2.setHeight("300");
    TimingData.table2 = table2.init();
};

$(function () {
    TimingData.init();
});

/******************************************************左边树操作*************************************************************/
var TreeOperation = {
    id: '',//当前节点id
    text: '',//当前文件分类
    hdr_name: '',
    layerIndex: -1,
};

/**
 * 树的点击事件
 * @param e
 * @param treeId
 * @param treeNode
 */
TreeOperation.onClickDept = function (e, treeId, treeNode) {
    TreeOperation.id = treeNode.id;
    TreeOperation.text = treeNode.text;
    TreeOperation.hdr_name = treeNode.name;
    TimingData.search();
    TimingData.search2();
};