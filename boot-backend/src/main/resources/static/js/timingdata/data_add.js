var TaskDep = {
    id: "taskDepTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    table_id: ''
};

/**
 * 初始化表格的列
 */
TaskDep.initColumn = function () {
    var columns = [
        {field: 'selectItem', checkbox: true},
        {title: '任务包名称', field: 'work_untis_name', align: 'center', valign: 'middle'},
        {title: '任务包代码', field: 'work_untis_code', align: 'center', valign: 'middle'},
        {
            title: '状态', field: 'status', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '启用';
                } else if (value == 0) {
                    return '禁用';
                }
            }
        },
    ];
    return columns;
};

TaskDep.search = function () {
    TaskDep.table.refresh({query: TaskDep.formPara()});
};

TaskDep.formPara = function () {
    var queryData = {};
    queryData['table_id'] = TaskDep.table_id;
    queryData['type'] = $("#type").val();
    return queryData;
};

/**
 * 关闭此对话框
 */
TaskDep.close = function () {
    parent.layer.close(parent.TimingData.layerIndex);
};

TaskDep.addSubmit = function () {
    var rows = $('#taskDepTable').bootstrapTable('getSelections');
    var ids = "";
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status == 1) {//启用状态
            ids += rows[i].id + ",";
        } else {
            layer.msg('禁用任务,无法分配');
        }
    }
    ids = ids.substring(0, ids.length - 1);
    $.ajax({
        url: "/timingData/insertTaskDep", //请求的url地址
        dataType: "json", //返回格式为json
        data: {
            ids: ids,
            table_id: TaskDep.table_id
        }, //参数值
        type: "POST", //请求方式
        success: function (req) {
            //请求成功时处理
            TaskDep.close();
            parent.TimingData.search();
        }
    });
};

$(function () {
    TaskDep.table_id = parent.TreeOperation.id;
    var defaultColunms = TaskDep.initColumn();
    var table = new BSTable("taskDepTable", "/timingData/selectTaskDepList", defaultColunms);
    table.setPaginationType("client");//分页
    table.setQueryParams(TaskDep.formPara());
    table.setHeight("400");
    TaskDep.table = table.init();
});
