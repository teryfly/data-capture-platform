var columns = [

];
var node;
var Statistics = {
    time_stamp : null
};
var StatisticsTable = {
    id: "qualityTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 校验加载数据
 */
StatisticsTable.check = function () {
    if ($("#time").val() == "") {
        layer.msg("没有选择时间区间");
        return;
    }
};

$(function () {
	var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth();   //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate();      //获取当前日(1-31)
	$("#time").val(year + "-" + month + "-" + day);
});