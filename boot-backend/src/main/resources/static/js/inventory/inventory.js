/**
 * 规则表格
 */
var Inventory = {
    id: "managerTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    field_name: "",
    column_id: "",
    beginTime: "",
    endTime: "",
};

/**
 * 初始化表格的列
 */
Inventory.initColumn = function () {
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
        {title: '备注', field: 'remark', align: 'center', valign: 'middle'},
        {field: 'operate', title: '操作', width: '10%', align: 'center', valign: 'middle', events: operateEvents1, formatter: operateFormatter},
    ];
    return columns;
};

window.operateEvents1 = {
    'click .tabUpdate': function (e, value, row, index) {
        if ($("#time").val() != '' || $("#time").val() != null) {
            var time = $("#time").val().replace(/\s+/g, "").split("~");
            Inventory.beginTime = time[0];
            Inventory.endTime = time[1];
        }
        Inventory.column_id = row.id;
        var index = layer.open({
            type: 2,
            title: '数据列表',
            area: ['90%', '90%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/pages/inventory/inventorydata.html',
        });
        Inventory.layerIndex = index;
        document.activeElement.blur();
    },
};

function operateFormatter(value, row, index) {
    return [
        '<button id="tabUpdate" type="button" class="tabUpdate btn btn-info btn-xs">查看详情</button>',
    ].join('');
};

Inventory.search = function () {
    var queryData = {};
    queryData['task_id'] = TreeOperation.id;
    Inventory.table.refresh({query: queryData});
};

//初始化页面
Inventory.init = function () {
    //验证输入框
    Feng.initValidator("taskForm", Inventory.validateFields);
    //生成树
    var ztree = new $ZTree("deptTree", "/task/list");
    ztree.bindOnClick(TreeOperation.onClickDept);
    ztree.init();
    var defaultColunms = Inventory.initColumn();
    var table = new BSTable("managerTable", "/rule/list", defaultColunms);
    table.setPaginationType("client");//分页
    table.setPagination(false);
    Inventory.table = table.init();
};

laydate.render({
    elem: "#time"
    , range: "~"
});

$(function () {
    Inventory.init();
});

/******************************************************左边树操作*************************************************************/
var TreeOperation = {
    id: '',//当前节点id
    text: '',//当前文件分类
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
    Inventory.search();
};