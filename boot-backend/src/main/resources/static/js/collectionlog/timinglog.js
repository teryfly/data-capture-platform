/**
 * 采集日志管理初始化
 */
var Collectionlog = {
    id: "CollectionlogTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    success: "",
    task_id: "",
    log_id: "",//当前日志id
    company_id: ""
};

/**
 * 初始化表格的列
 */
Collectionlog.initColumn = function () {
    return [
        {field: 'selectItem', radio: true, visible: false},
        {title: '批次编码', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '任务包名称', field: 'work_untis_name', visible: true, align: 'center', valign: 'middle'},
        {title: '任务包代码', field: 'work_untis_code', visible: true, align: 'center', valign: 'middle'},
        {title: '时间戳', field: 'time_stamp', visible: true, align: 'center', valign: 'middle'},
        {title: '执行频率', field: 'cron', visible: true, align: 'center', valign: 'middle'},
        {title: 'Kettle包名称', field: 'tran_name', visible: true, align: 'center', valign: 'middle'},
        {title: '厂商', field: 'third_party_name', visible: true, align: 'center', valign: 'middle'},
        {title: '开始时间', field: 'begin_time', visible: true, align: 'center', valign: 'middle'},
        {title: '结束时间', field: 'end_time', visible: true, align: 'center', valign: 'middle'},
        {
            title: '执行状态', field: 'status', visible: true, align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '执行中';
                } else if (value == 2) {
                    return '执行失败';
                } else if (value == 3) {
                    return '执行成功';
                }
            }
        },
        {
            title: '执行结果', field: 'success', visible: true, align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '成功';
                } else if (value == 0) {
                    return '失败';
                }
            }
        },
        {title: '执行时间', field: 'excute_time', visible: true, align: 'center', valign: 'middle'},
        {field: 'operate', title: '查看详情', width: '5%', align: 'center', valign: 'middle', events: operateEvents1, formatter: operateFormatter}
    ];
};

window.operateEvents1 = {
    'click .tabLook': function (e, value, row, index) {
        Collectionlog.log_id = row.id;
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['50%', '80%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/pages/collection/collectionlog/timingcondition.html',
            btn1: function (index, layero) {
                var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
                iframeWin.contentWindow.TaskUpdate.updateSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            },
            btn2: function (index, layero) {
                //按钮【按钮二】的回调
            }
        });
        Collectionlog.layerIndex = index;
        document.activeElement.blur();
    }
};

function operateFormatter(value, row, index) {
    return [
        '<button id="tabLook" type="button" class="tabLook btn btn-info btn-xs">查看详情</button>',
    ].join('');
};

/**
 * 检查是否选中
 */
Collectionlog.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Collectionlog.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加采集日志
 */
Collectionlog.openAddCollectionlog = function () {
    var index = layer.open({
        type: 2,
        title: '添加采集日志',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/collectionlog/collectionlog_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看采集日志详情
 */
Collectionlog.openCollectionlogDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '采集日志详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/collectionlog/collectionlog_update/' + Collectionlog.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除采集日志
 */
Collectionlog.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/collectionlog/delete", function (data) {
            Feng.success("删除成功!");
            Collectionlog.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("collectionlogId", this.seItem.id);
        ajax.start();
    }
};

Collectionlog.formParams = function () {
    var queryData = {};
    queryData['name'] = $("#name").val();
    if ($("#time").val() != "" && $("#time").val() != null) {
        var time = $("#time").val().replace(/\s+/g, "").split("~");
        queryData['beginTime'] = time[0];
        queryData['endTime'] = time[1];
    } else {
        queryData['beginTime'] = '';
        queryData['endTime'] = '';
    }
    queryData['success'] = $("#success").val();
    queryData['company_name'] = $("#company_name").val();
    queryData['company_id'] = Collectionlog.company_id;
    queryData['id'] = Collectionlog.task_id;
    queryData['type'] = 2;
    return queryData;
};

/**
 * 查询采集日志列表
 */
Collectionlog.search = function () {
    Collectionlog.table.refresh({query: Collectionlog.formParams()});
};

Collectionlog.refresh = function () {
    $("#name").val("");
    $("#company_name").val("");
    $("#time").val("");
    $("#success").val("");
    Collectionlog.task_id = "";
    Collectionlog.company_id = "";
    Collectionlog.search();
};

laydate.render({
    elem: "#time"
    , range: "~"
});

$(function () {
    Collectionlog.task_id = getQueryString("id");
    $("#time").val(getQueryString("time"));
    Collectionlog.success = getQueryString("success");
    Collectionlog.company_id = getQueryString("company_id");
    if (Collectionlog.success != null) {
        $("#success").val(Collectionlog.success);
    }
    var defaultColunms = Collectionlog.initColumn();
    var table = new BSTable(Collectionlog.id, "/collectionlog/list", defaultColunms);
    table.setPaginationType("server");
    table.setQueryParams(Collectionlog.formParams());
    Collectionlog.table = table.init();
    //Collectionlog.search();
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
