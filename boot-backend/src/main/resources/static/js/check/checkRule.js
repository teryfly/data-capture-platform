/**
 * 规则表格
 */
var CheckRule = {
    id: "checkRuleTable",//表格id
    //isChecked: null,	//是否选中
    table: null,
    layerIndex: -1,
    field_name: "",
    column_id: "",
    beginTime: "",
    endTime: null,
};

//校验按钮点击事件
$("#checkRule").click(function () {
    if ($("#beginTime").val() != null && $("#beginTime").val() != '') {
        CheckRule.beginTime = $("#beginTime").val();
    }
    if ($("#endTime").val() != null && $("#endTime").val() != '') {
        CheckRule.endTime = $("#endTime").val();
    }
    /*var isChecked = $("#unqualified-checked").prop('checked');
    CheckRule.isChecked = isChecked;//true，false*/
    if (CheckRule.beginTime > CheckRule.endTime) {
        layer.msg("结束时间不能小于开始时间", {time: 3 * 1000});
    } else {
        $.ajax({
            type: 'POST',
            url: Feng.ctxPath + "/table/findTableHead",
            dataType: 'json',
            data: {"taskId": TreeOperation.id},
            success: function (resultAll) {
                var initColumn = [];
                $.each(resultAll, function (i, result) {
                    var columnName=(result.column_name==null || result.column_name=='' || result.column_name=='undefined')?result.column_code:result.column_name;
                    initColumn.push({
                        title: columnName, field: result.column_code, align: 'center', valign: 'middle',
                        formatter: function (value, row, index) {
                            if(value=='undefined' || value==null){
                                value="";
                            }
                            if (row.name==null) {
                                return "<div style='color:red;' title='姓名不能为空'>" + value + "</div>";
                            }
                            var tel=/^1(3|4|5|7|8)\d{9}$/;
                            if(!tel.test(row.phoneNum) && (row.phoneNum!=null && row.phoneNum!='' && row.phoneNum!='undefined')){
                                console.log("电话号码"+row.phoneNum)
                                return "<div style='color:red;' title='电话号码无效'>" + value + "</div>";
                            }
                            var checkName=/^[\u4E00-\u9FA5A-Za-z]+$/;
                            if(!checkName.test(row.name)){
                                return "<div style='color:red;' title='姓名只能包含汉字或英文字符，不能包含数字或者其他字符'>" + value + "</div>";
                            }
                            if (row.age <= 0 || row.age >= 120) {
                                return "<div style='color:red;' title='年龄不能小于等于零或者大于120'>" + value + "</div>";
                            }
                            return value;
                        }
                    });
                });
                $('#checkRuleTable').bootstrapTable('destroy');
                var table = new BSTable(CheckRule.id, Feng.ctxPath + "/check/findTableData", initColumn);
                table.setPaginationType("client");
                table.setQueryParams(CheckRule.getFormParams());
                CheckRule.table = table.init();

            }
        });
    }


})


//初始化页面
CheckRule.init = function () {
    //生成树
    var ztree = new $ZTree("deptTree", "/task/list");
    ztree.bindOnClick(TreeOperation.onClickDept);
    ztree.init();
};


$(function () {
    CheckRule.init();
});

//获得表单参数
CheckRule.getFormParams = function () {
    var queryData = {};
    queryData['tableId'] = TreeOperation.id;//表Id
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    /* queryData['isChecked'] = $("#unqualified-checked").prop('checked');*/
    return queryData;
}


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
    //请求后台，获得表头
    $.ajax({
        type: 'POST',
        url: Feng.ctxPath + "/table/findTableHead",
        dataType: 'json',
        data: {"taskId": TreeOperation.id},
        success: function (resultAll) {
            var initColumn = [];
            $.each(resultAll, function (i, result) {
                var columnName=(result.column_name==null || result.column_name=='' || result.column_name=='undefined')?result.column_code:result.column_name;
                initColumn.push({
                    title: columnName, field: result.column_code, align: 'center', valign: 'middle',
                    formatter: function (value, row, index) {
                        if(value=='undefined' || value==null){
                            value="";
                        }
                        if (row.name==null) {
                            return "<div style='color:red;' title='姓名不能为空'>" + value + "</div>";
                        }
                        var tel=/^1(3|4|5|7|8)\d{9}$/;
                        if(!tel.test(row.phoneNum) && (row.phoneNum!=null && row.phoneNum!='' && row.phoneNum!='undefined')){
                            return "<div style='color:red;' title='电话号码无效'>" + value + "</div>";
                        }
                        var checkName=/^[\u4E00-\u9FA5A-Za-z]+$/;
                        if(!checkName.test(row.name)){
                            return "<div style='color:red;' title='姓名只能包含汉字或英文字符，不能包含数字或者其他字符'>" + value + "</div>";
                        }
                        if (row.age <= 0 || row.age >= 120) {
                            return "<div style='color:red;' title='年龄不能小于等于零或者大于120'>" + value + "</div>";
                        }
                        return value;
                    }
                });
            });
            $('#checkRuleTable').bootstrapTable('destroy');
            var table = new BSTable(CheckRule.id, Feng.ctxPath + "/check/findTableData", initColumn);
            table.setPaginationType("client");
            table.setQueryParams(CheckRule.getFormParams());
            CheckRule.table = table.init();

        }
    });

};