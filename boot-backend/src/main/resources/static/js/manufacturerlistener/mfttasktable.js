/**
 * 根据厂商查询任务包统计
 */
var MftTask = {
    id: "taskTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    company_id: '',//目前点击的厂商id
    type: '',//目前的任务类型
    time: '',//上级页面的时间
    task_id: '',//点击的任务包id
    success: '',//点击运行结果状态
};

/**
 * 初始化表格的列
 */
MftTask.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true, visible: false},
        {
            title: '任务包名称', field: 'work_untis_name', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                return '<a href="' + url(options.id, '') + '">' + value + '</a>';
            }
        },
        {title: '任务包代码', field: 'work_untis_code', align: 'center', valign: 'middle'},
        {title: 'Kettle包名称', field: 'tran_name', align: 'center', valign: 'middle', sortable: true},
        {
            title: '成功次数', field: 'success', align: 'center', valign: 'middle', sortable: true, formatter: function (value, options, rowData) {
                return '<a href="' + url(options.id, 1) + '">' + value + '</a>';
            }
        },
        {
            title: '失败次数', field: 'failed', align: 'center', valign: 'middle', sortable: true, formatter: function (value, options, rowData) {
                return '<a href="' + url(options.id, 0) + '" style="color: red">' + value + '</a>';
            }
        },
        {
            title: '健康度', field: 'oh', align: 'center', valign: 'middle', sortable: true, formatter: function (value, options, rowData) {
                var a = '';
                if (options.success == 0 && options.failed == 0) {
                    a = 0.00 + "%";
                } else {
                    a = (options.success * 100 / (options.success + options.failed)).toFixed(2) + "%"
                }
                return a;
            }
        },
    ];
    return columns;
};

//查询参数
MftTask.params = function () {
    var queryData = {};
    queryData['company_id'] = this.company_id;
    queryData['type'] = this.type;
    if (this.time != "" && this.time != null) {
        var time = this.time.replace(/\s+/g, "").split("~");
        queryData['beginTime'] = time[0];
        queryData['endTime'] = time[1];
    }
    return queryData;
};

MftTask.search = function () {
    this.table.refresh({query: MftTask.params()});
};

//初始化页面
MftTask.init = function () {
    this.company_id = parent.MftListener.mftId;
    this.type = parent.MftListener.type;
    this.time = parent.MftListener.time;
    var defaultColunms = MftTask.initColumn();
    var table = new BSTable("taskTable", "/mft/selectTaskCountByMft", defaultColunms);
    table.setPaginationType("client");//分页
    table.setQueryParams(MftTask.params());
    table.setOnClickRow(function (row) {//绑定单击事件
        MftTask.task_id = row.id;
    });
    table.setHeight("600");
    MftTask.table = table.init();
};

function url(id, success) {
    var url = '';
    if (MftTask.type == 1) {//实时
        url = '/pages/collection/collectionlog/realtimelog.html?id=' + id + '&success=' + success + '&time=' + MftTask.time + '&company_id=' + MftTask.company_id;
    } else if (MftTask.type == 2) {//定时
        url = '/pages/collection/collectionlog/timinglog.html?id=' + id + '&success=' + success + '&time=' + MftTask.time + '&company_id=' + MftTask.company_id;
    }
    return url;
}

$(function () {
    MftTask.init();
});