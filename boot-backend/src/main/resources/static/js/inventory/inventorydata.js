/**
 * 不符合数据表格
 */
var InventoryData = {
    id: "managerTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    column_id: "",
    hdr_id: "",
    beginTime: "",
    endTime: "",
};

/**
 * 初始化表格的列
 */
InventoryData.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true, visible: false},
        {title: '患者编号', field: 'person_id', align: 'center', valign: 'middle', visible: false},
        {title: '患者姓名', field: 'person_name', align: 'center', valign: 'middle'},
        {title: '住院/门诊编号', field: 'zy_mz_id', align: 'center', valign: 'middle', visible: false},
        {title: '住院/门诊', field: 'zy_mz_name', align: 'center', valign: 'middle'},
        {title: '字段名称', field: 'column_name', align: 'center', valign: 'middle'},
        {title: '字段编码', field: 'column_code', align: 'center', valign: 'middle'},
        {title: '字段类型', field: 'dataType', align: 'center', valign: 'middle'},
        {title: '字段长度', field: 'dataLength', align: 'center', valign: 'middle'},
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
        {title: '表示格式', field: 'dataFormat', align: 'center', valign: 'middle'},
        {title: '备注', field: 'remark', align: 'center', valign: 'middle'},
        {title: '值域', field: 'base_dicts_name', align: 'center', valign: 'middle'},
        {title: '现有数据', field: 'now_value', align: 'center', halign: 'center', valign: 'middle'},
        {title: '问题', field: 'question', align: 'center', halign: 'center', valign: 'middle'},
        {title: '业务id', field: 'do_id', align: 'center', halign: 'center', valign: 'middle'},
        {title: '主键id', field: 'business_id', align: 'center', halign: 'center', valign: 'middle'},
    ];
    return columns;
};

//初始化页面
InventoryData.init = function () {
    var defaultColunms = InventoryData.initColumn();
    var table = new BSTable("managerTable", "/inventory/list", defaultColunms);
    table.setQueryParams(this.fromData());
    table.setPaginationType("server");//分页
    InventoryData.table = table.init();
};

InventoryData.fromData = function () {
    var queryData = {};
    queryData['column_id'] = InventoryData.column_id;
    queryData['hdr_id'] = InventoryData.hdr_id;
    queryData['beginTime'] = InventoryData.beginTime;
    queryData['endTime'] = InventoryData.endTime;
    return queryData;
};

InventoryData.search = function () {
    InventoryData.table.refresh({query: InventoryData.fromData()});
};

$(function () {
    InventoryData.column_id = parent.Inventory.column_id;
    InventoryData.hdr_id = parent.TreeOperation.id;
    InventoryData.beginTime = parent.Inventory.beginTime;
    InventoryData.endTime = parent.Inventory.endTime;
    InventoryData.init();
});
